import { useEffect, useState } from 'react';
import { Save, Trash2, Upload, X, Loader2 } from 'lucide-react';
import type { Project } from '../../types';

type FormState = {
  id: string;
  titleFr: string;
  titleEn: string;
  descFr: string;
  descEn: string;
  descShortFr: string;
  descShortEn: string;
  ideaFr: string;
  ideaEn: string;
  challengesFr: string;
  challengesEn: string;
  solutionFr: string;
  solutionEn: string;
  tags: string;
  hardware: string;
  demo: string;
  repo: string;
  image: string;
  published: boolean;
  displayOrder: number;
};

const empty: FormState = {
  id: '',
  titleFr: '',
  titleEn: '',
  descFr: '',
  descEn: '',
  descShortFr: '',
  descShortEn: '',
  ideaFr: '',
  ideaEn: '',
  challengesFr: '',
  challengesEn: '',
  solutionFr: '',
  solutionEn: '',
  tags: '',
  hardware: '',
  demo: '',
  repo: '',
  image: '',
  published: true,
  displayOrder: 0,
};

function projectToForm(p: Project & { published?: boolean; displayOrder?: number }): FormState {
  return {
    id: p.id,
    titleFr: p.title.fr,
    titleEn: p.title.en,
    descFr: p.desc.fr,
    descEn: p.desc.en,
    descShortFr: p.descShort.fr,
    descShortEn: p.descShort.en,
    ideaFr: p.idea.fr,
    ideaEn: p.idea.en,
    challengesFr: p.challenges.fr,
    challengesEn: p.challenges.en,
    solutionFr: p.solution.fr,
    solutionEn: p.solution.en,
    tags: p.tags.join(', '),
    hardware: p.hardware.join(', '),
    demo: p.demo,
    repo: p.repo,
    image: p.image,
    published: p.published ?? true,
    displayOrder: p.displayOrder ?? 0,
  };
}

function formToPayload(f: FormState) {
  return {
    id: f.id.trim(),
    title: { fr: f.titleFr, en: f.titleEn },
    desc: { fr: f.descFr, en: f.descEn },
    descShort: { fr: f.descShortFr, en: f.descShortEn },
    idea: { fr: f.ideaFr, en: f.ideaEn },
    challenges: { fr: f.challengesFr, en: f.challengesEn },
    solution: { fr: f.solutionFr, en: f.solutionEn },
    tags: f.tags
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean),
    hardware: f.hardware
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean),
    demo: f.demo,
    repo: f.repo,
    image: f.image,
    published: f.published,
    displayOrder: Number(f.displayOrder) || 0,
  };
}

type Props = {
  project: (Project & { published?: boolean; displayOrder?: number }) | null;
  mode: 'create' | 'edit';
  onSaved: () => void;
  onDeleted: () => void;
  onCancel: () => void;
};

export default function ProjectEditor({ project, mode, onSaved, onDeleted, onCancel }: Props) {
  const [form, setForm] = useState<FormState>(empty);
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setForm(project ? projectToForm(project) : empty);
    setError(null);
  }, [project, mode]);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  async function handleSave() {
    setBusy(true);
    setError(null);
    try {
      const payload = formToPayload(form);
      if (!payload.id) throw new Error('ID requis');
      const url = mode === 'create' ? '/api/projects' : `/api/projects/${payload.id}`;
      const method = mode === 'create' ? 'POST' : 'PATCH';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || `HTTP ${res.status}`);
      }
      onSaved();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete() {
    if (!project) return;
    if (!confirm(`Supprimer le projet "${project.id}" ?`)) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/projects/${project.id}`, { method: 'DELETE' });
      if (!res.ok && res.status !== 204) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || `HTTP ${res.status}`);
      }
      onDeleted();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }

  async function handleImageUpload(file: File) {
    if (file.size > 5 * 1024 * 1024) {
      setError('Image trop lourde (max 5 Mo)');
      return;
    }
    setUploading(true);
    setError(null);
    try {
      const dataBase64 = await fileToBase64(file);
      const res = await fetch('/api/upload-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName: file.name, contentType: file.type, dataBase64 }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || `HTTP ${res.status}`);
      }
      const j = (await res.json()) as { publicUrl: string };
      set('image', j.publicUrl);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="bg-cyber-50 dark:bg-cyber-900 border border-cyber-200 dark:border-cyber-800 rounded-sm p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold font-mono text-cyber-950 dark:text-cyber-100">
          {mode === 'create' ? '＋ Nouveau projet' : `Éditer — ${project?.id}`}
        </h3>
        <button
          onClick={onCancel}
          className="text-cyber-500 hover:text-cyber-accent"
          aria-label="Fermer"
        >
          <X size={18} />
        </button>
      </div>

      {error && (
        <div className="text-sm text-red-500 bg-red-500/10 border border-red-500/30 rounded-sm p-2">
          {error}
        </div>
      )}

      <Field label="Slug / ID (unique, kebab-case)" disabled={mode === 'edit'}>
        <input
          type="text"
          value={form.id}
          onChange={(e) => set('id', e.target.value)}
          disabled={mode === 'edit'}
          className={inputCls}
          placeholder="mon-projet"
        />
      </Field>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Field label="Titre FR">
          <input
            value={form.titleFr}
            onChange={(e) => set('titleFr', e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="Titre EN">
          <input
            value={form.titleEn}
            onChange={(e) => set('titleEn', e.target.value)}
            className={inputCls}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Field label="Résumé court FR">
          <input
            value={form.descShortFr}
            onChange={(e) => set('descShortFr', e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="Résumé court EN">
          <input
            value={form.descShortEn}
            onChange={(e) => set('descShortEn', e.target.value)}
            className={inputCls}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Field label="Description FR">
          <textarea
            rows={3}
            value={form.descFr}
            onChange={(e) => set('descFr', e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="Description EN">
          <textarea
            rows={3}
            value={form.descEn}
            onChange={(e) => set('descEn', e.target.value)}
            className={inputCls}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Field label="Idée FR">
          <textarea
            rows={3}
            value={form.ideaFr}
            onChange={(e) => set('ideaFr', e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="Idée EN">
          <textarea
            rows={3}
            value={form.ideaEn}
            onChange={(e) => set('ideaEn', e.target.value)}
            className={inputCls}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Field label="Défis FR">
          <textarea
            rows={3}
            value={form.challengesFr}
            onChange={(e) => set('challengesFr', e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="Défis EN">
          <textarea
            rows={3}
            value={form.challengesEn}
            onChange={(e) => set('challengesEn', e.target.value)}
            className={inputCls}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Field label="Solution FR">
          <textarea
            rows={3}
            value={form.solutionFr}
            onChange={(e) => set('solutionFr', e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="Solution EN">
          <textarea
            rows={3}
            value={form.solutionEn}
            onChange={(e) => set('solutionEn', e.target.value)}
            className={inputCls}
          />
        </Field>
      </div>

      <Field label="Tags (séparés par une virgule)">
        <input
          value={form.tags}
          onChange={(e) => set('tags', e.target.value)}
          className={inputCls}
          placeholder="IoT, ESP32, C++"
        />
      </Field>

      <Field label="Matériel / Stack (séparés par une virgule)">
        <input
          value={form.hardware}
          onChange={(e) => set('hardware', e.target.value)}
          className={inputCls}
          placeholder="ESP32-S3, OLED, DHT22"
        />
      </Field>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Field label="Lien démo">
          <input
            value={form.demo}
            onChange={(e) => set('demo', e.target.value)}
            className={inputCls}
            placeholder="https://…"
          />
        </Field>
        <Field label="Dépôt GitHub">
          <input
            value={form.repo}
            onChange={(e) => set('repo', e.target.value)}
            className={inputCls}
            placeholder="https://github.com/…"
          />
        </Field>
      </div>

      <Field label="Image (upload ou URL)">
        <div className="flex flex-col gap-2">
          <input
            value={form.image}
            onChange={(e) => set('image', e.target.value)}
            className={inputCls}
            placeholder="/images/projects/… ou https://…"
          />
          <label className="inline-flex items-center gap-2 px-3 py-2 bg-cyber-100 dark:bg-cyber-800 border border-cyber-200 dark:border-cyber-700 rounded-sm cursor-pointer hover:border-cyber-accent/50 w-fit">
            {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
            <span className="text-sm">{uploading ? 'Envoi…' : 'Uploader une image'}</span>
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleImageUpload(f);
                e.currentTarget.value = '';
              }}
            />
          </label>
          {form.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={form.image}
              alt="preview"
              className="h-32 w-auto rounded-sm border border-cyber-200 dark:border-cyber-700 object-cover"
            />
          )}
        </div>
      </Field>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Field label="Ordre d'affichage">
          <input
            type="number"
            value={form.displayOrder}
            onChange={(e) => set('displayOrder', Number(e.target.value))}
            className={inputCls}
          />
        </Field>
        <label className="flex items-end gap-2 pb-3">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => set('published', e.target.checked)}
            className="w-4 h-4 accent-cyber-accent"
          />
          <span className="text-sm text-cyber-700 dark:text-cyber-100">
            Publié (visible sur /portfolio)
          </span>
        </label>
      </div>

      <div className="flex items-center gap-3 pt-3 border-t border-cyber-200 dark:border-cyber-800">
        <button
          onClick={handleSave}
          disabled={busy}
          className="inline-flex items-center gap-2 px-4 py-2 bg-cyber-cta hover:bg-cyber-accent text-white font-bold rounded-sm disabled:opacity-50"
        >
          {busy ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          Enregistrer
        </button>
        {mode === 'edit' && (
          <button
            onClick={handleDelete}
            disabled={busy}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/40 text-red-500 hover:bg-red-500 hover:text-white rounded-sm disabled:opacity-50"
          >
            <Trash2 size={16} />
            Supprimer
          </button>
        )}
        <button
          onClick={onCancel}
          disabled={busy}
          className="ml-auto px-4 py-2 text-cyber-500 hover:text-cyber-950 dark:hover:text-cyber-100"
        >
          Annuler
        </button>
      </div>
    </div>
  );
}

const inputCls =
  'w-full px-3 py-2 rounded-sm bg-cyber-100 dark:bg-cyber-800 text-cyber-950 dark:text-cyber-100 border border-cyber-200 dark:border-cyber-700 focus:border-cyber-accent outline-none text-sm disabled:opacity-60';

function Field({
  label,
  children,
  disabled,
}: {
  label: string;
  children: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <div>
      <label
        className={`block text-xs font-semibold mb-1 ${disabled ? 'text-cyber-400' : 'text-cyber-700 dark:text-cyber-300'}`}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const s = String(reader.result ?? '');
      const comma = s.indexOf(',');
      resolve(comma >= 0 ? s.slice(comma + 1) : s);
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
