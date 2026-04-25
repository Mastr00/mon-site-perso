import { describe, it, expect } from 'vitest';
import { rowToProject, projectToRow, type ProjectRow } from './supabase';

describe('rowToProject', () => {
  const fullRow: ProjectRow = {
    id: 'my-project',
    title_fr: 'Titre FR',
    title_en: 'Title EN',
    desc_fr: 'Desc FR',
    desc_en: 'Desc EN',
    desc_short_fr: 'Court FR',
    desc_short_en: 'Short EN',
    idea_fr: 'Idée FR',
    idea_en: 'Idea EN',
    challenges_fr: 'Défis FR',
    challenges_en: 'Challenges EN',
    solution_fr: 'Solution FR',
    solution_en: 'Solution EN',
    tags: ['React', 'Next.js'],
    demo: 'https://demo.example.com',
    repo: 'https://github.com/x/y',
    image: 'https://img.example.com/a.png',
    hardware: ['ESP32', 'OLED'],
    published: true,
    display_order: 3,
    created_at: '2024-01-01',
    updated_at: '2024-01-02',
  };

  it('produces nested bilingual shape from flat row', () => {
    const p = rowToProject(fullRow);
    expect(p.id).toBe('my-project');
    expect(p.title).toEqual({ fr: 'Titre FR', en: 'Title EN' });
    expect(p.desc).toEqual({ fr: 'Desc FR', en: 'Desc EN' });
    expect(p.descShort).toEqual({ fr: 'Court FR', en: 'Short EN' });
    expect(p.idea).toEqual({ fr: 'Idée FR', en: 'Idea EN' });
    expect(p.tags).toEqual(['React', 'Next.js']);
    expect(p.hardware).toEqual(['ESP32', 'OLED']);
  });

  it('coerces nullable text columns to empty strings', () => {
    const p = rowToProject({
      ...fullRow,
      idea_fr: null,
      idea_en: null,
      challenges_fr: null,
      challenges_en: null,
      solution_fr: null,
      solution_en: null,
      demo: null,
      repo: null,
      image: null,
    });
    expect(p.idea).toEqual({ fr: '', en: '' });
    expect(p.challenges).toEqual({ fr: '', en: '' });
    expect(p.solution).toEqual({ fr: '', en: '' });
    expect(p.demo).toBe('');
    expect(p.repo).toBe('');
    expect(p.image).toBe('');
  });
});

describe('projectToRow', () => {
  it('only emits keys for fields actually provided (PATCH-friendly)', () => {
    const row = projectToRow({ id: 'partial', title: { fr: 'A', en: 'B' } });
    expect(row.id).toBe('partial');
    expect(row.title_fr).toBe('A');
    expect(row.title_en).toBe('B');
    // desc/idea/etc. were not provided — must NOT appear in the row, otherwise
    // a PATCH would null out those columns server-side.
    expect(row).not.toHaveProperty('desc_fr');
    expect(row).not.toHaveProperty('idea_fr');
    expect(row).not.toHaveProperty('tags');
  });

  it('round-trips with rowToProject for a full payload', () => {
    const project = rowToProject({
      id: 'rt',
      title_fr: 'A',
      title_en: 'B',
      desc_fr: 'C',
      desc_en: 'D',
      desc_short_fr: 'E',
      desc_short_en: 'F',
      idea_fr: 'G',
      idea_en: 'H',
      challenges_fr: 'I',
      challenges_en: 'J',
      solution_fr: 'K',
      solution_en: 'L',
      tags: ['t1'],
      demo: 'demo',
      repo: 'repo',
      image: 'img',
      hardware: ['h1'],
      published: true,
      display_order: 0,
      created_at: '',
      updated_at: '',
    });
    const row = projectToRow({ ...project, published: true, displayOrder: 0 });
    expect(row.title_fr).toBe('A');
    expect(row.tags).toEqual(['t1']);
    expect(row.hardware).toEqual(['h1']);
    expect(row.published).toBe(true);
    expect(row.display_order).toBe(0);
  });

  it('passes empty arrays through (allows clearing tags/hardware)', () => {
    const row = projectToRow({ id: 'x', tags: [], hardware: [] });
    expect(row.tags).toEqual([]);
    expect(row.hardware).toEqual([]);
  });
});
