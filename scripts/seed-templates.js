import { createClient } from '@supabase/supabaseConfig.js';
import 'dotenv/config';

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const templates = [
  { title: 'Modern SaaS Landing Page', description: '...', price: 49, preview_url: '...', download_url: '...', approved: true, featured: true },
  // ... more
];

async function seed() {
  for (const t of templates) {
    await supabase.from('templates').insert(t);
  }
  console.log('Seeded templates');
}
seed();