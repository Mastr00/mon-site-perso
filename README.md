# Mehdi — Next.js + Auth0 + Tailwind Starter

## Prérequis
- Node.js LTS installé (`node -v` >= 18 recommandé)
- Git installé
- Un compte Auth0 (gratuit) — depuis le GitHub Student Pack ou directement

## Démarrage rapide
```bash
# 1) Installer les deps
npm install

# 2) Copier l'exemple d'env et remplir
cp .env.example .env.local
# (édite .env.local avec tes valeurs Auth0)

# 3) Lancer en local
npm run dev
```

## Déploiement (Vercel)
- Pousse ce repo sur GitHub, puis "Import" sur Vercel
- Ajoute les variables d'environnement de `.env.local` dans Vercel
- Ajoute ton domaine (Namecheap) dans Vercel -> Domains
- Mets à jour `AUTH0_BASE_URL` (dans Vercel) avec ton domaine en `https://`

## Sécurité
- En-têtes de sécurité ajoutés dans `next.config.js`
- Protection des pages `/dashboard` via middleware Auth0
- Pas de secrets committés : utilise `.env.local` / Vercel Env