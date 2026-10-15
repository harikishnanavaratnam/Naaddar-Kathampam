import { createClient, type SanityClient } from '@sanity/client';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production';
// Server-only read token (no PUBLIC_ prefix → never shipped to the browser).
const token = import.meta.env.SANITY_TOKEN || process.env.SANITY_TOKEN;

export const sanityConfigured = Boolean(projectId);

export const sanity: SanityClient | null = sanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2024-10-01',
      useCdn: false,
      perspective: 'published',
      token, // optional; enables reliable authenticated reads
    })
  : null;
