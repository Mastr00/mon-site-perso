import { createClient } from '@supabase/supabase-js';

const url = 'https://jkascxrnpgaqsxcskzzi.supabase.co';
const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImprYXNjeHJucGdhcXN4Y3NrenppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwMzY0ODIsImV4cCI6MjA5MjYxMjQ4Mn0.Eax17jsMQ8LXAlPzMuZlcqp6d2y5vsdcPirmHUsp0pw';
const serviceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImprYXNjeHJucGdhcXN4Y3NrenppIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzAzNjQ4MiwiZXhwIjoyMDkyNjEyNDgyfQ.gnUcuhejje0KrcNDiKh_7v1RF5N_72G1Njf-HfzQmiI';

console.log('=== Test avec ANON KEY (ce que portfolio utilise) ===');
const anon = createClient(url, anonKey);
const { data: anonData, error: anonError } = await anon
  .from('projects')
  .select('id, title_fr, published, display_order')
  .order('display_order', { ascending: true });

if (anonError) {
  console.error('ANON ERROR:', anonError.message, anonError.code, anonError.details);
} else {
  console.log(`ANON: ${anonData.length} projet(s) trouvé(s)`);
  anonData.forEach(p => console.log(`  - [${p.published ? 'PUB' : 'DRAFT'}] #${p.display_order} ${p.id}: ${p.title_fr}`));
}

console.log('\n=== Test avec ANON + filtre published=true ===');
const { data: pubData, error: pubError } = await anon
  .from('projects')
  .select('id, title_fr, published')
  .eq('published', true)
  .order('display_order', { ascending: true });

if (pubError) {
  console.error('PUB FILTER ERROR:', pubError.message, pubError.code);
} else {
  console.log(`ANON+published=true: ${pubData.length} projet(s)`);
  pubData.forEach(p => console.log(`  - ${p.id}: ${p.title_fr}`));
}

console.log('\n=== Test avec SERVICE ROLE KEY (bypass RLS) ===');
const admin = createClient(url, serviceKey, { auth: { persistSession: false } });
const { data: adminData, error: adminError } = await admin
  .from('projects')
  .select('id, title_fr, published, display_order')
  .order('display_order', { ascending: true });

if (adminError) {
  console.error('ADMIN ERROR:', adminError.message, adminError.code);
} else {
  console.log(`ADMIN: ${adminData.length} projet(s) trouvé(s)`);
  adminData.forEach(p => console.log(`  - [${p.published ? 'PUB' : 'DRAFT'}] #${p.display_order} ${p.id}: ${p.title_fr}`));
}
