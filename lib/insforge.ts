import { createClient } from '@insforge/sdk';

const insforgeUrl = process.env.NEXT_PUBLIC_INSFORGE_URL || 'https://qy8w2kuq.ap-southeast.insforge.app';
const insforgeAnonKey = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY || '';

if (!insforgeAnonKey) {
  console.warn('Missing NEXT_PUBLIC_INSFORGE_ANON_KEY environment variable');
}

export const insforge = createClient({
  baseUrl: insforgeUrl,
  anonKey: insforgeAnonKey
});
