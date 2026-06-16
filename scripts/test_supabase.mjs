import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createClient } from '@supabase/supabase-js';

function loadEnvFile(fileName) {
  const path = resolve(process.cwd(), fileName);
  if (!existsSync(path)) return;

  const lines = readFileSync(path, 'utf8').split(/\r?\n/);
  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;

    const separator = line.indexOf('=');
    if (separator < 0) continue;

    const key = line.slice(0, separator).trim();
    const value = line
      .slice(separator + 1)
      .trim()
      .replace(/^['"]|['"]$/g, '');

    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is missing. Add it to .env.local or export it before running.`);
  }
  return value;
}

loadEnvFile('.env.local');
loadEnvFile('.env');

const url = requireEnv('NEXT_PUBLIC_SUPABASE_URL');
const anonKey = requireEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY');
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('=== Test with ANON KEY (what portfolio uses) ===');
const anon = createClient(url, anonKey);
const { data: anonData, error: anonError } = await anon
  .from('projects')
  .select('id, title_fr, published, display_order')
  .order('display_order', { ascending: true });

if (anonError) {
  console.error('ANON ERROR:', anonError.message, anonError.code, anonError.details);
} else {
  console.log(`ANON: ${anonData.length} project(s) found`);
  anonData.forEach((p) =>
    console.log(`  - [${p.published ? 'PUB' : 'DRAFT'}] #${p.display_order} ${p.id}: ${p.title_fr}`)
  );
}

console.log('\n=== Test with ANON + published=true filter ===');
const { data: pubData, error: pubError } = await anon
  .from('projects')
  .select('id, title_fr, published')
  .eq('published', true)
  .order('display_order', { ascending: true });

if (pubError) {
  console.error('PUB FILTER ERROR:', pubError.message, pubError.code);
} else {
  console.log(`ANON+published=true: ${pubData.length} project(s)`);
  pubData.forEach((p) => console.log(`  - ${p.id}: ${p.title_fr}`));
}

if (!serviceKey) {
  console.log('\nSkipping SERVICE ROLE KEY test: SUPABASE_SERVICE_ROLE_KEY is not set.');
  process.exit(0);
}

console.log('\n=== Test with SERVICE ROLE KEY (server-only RLS bypass) ===');
const admin = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});
const { data: adminData, error: adminError } = await admin
  .from('projects')
  .select('id, title_fr, published, display_order')
  .order('display_order', { ascending: true });

if (adminError) {
  console.error('ADMIN ERROR:', adminError.message, adminError.code);
} else {
  console.log(`ADMIN: ${adminData.length} project(s) found`);
  adminData.forEach((p) =>
    console.log(`  - [${p.published ? 'PUB' : 'DRAFT'}] #${p.display_order} ${p.id}: ${p.title_fr}`)
  );
}
