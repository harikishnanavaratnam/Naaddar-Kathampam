import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';
import { deskStructure } from './structure/deskStructure';

export default defineConfig({
  name: 'default',
  title: 'Naaddaar Kathampam',

  // Set these in studio/.env (SANITY_STUDIO_PROJECT_ID, SANITY_STUDIO_DATASET)
  // or replace the fallback below with your real project id.
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'REPLACE_WITH_PROJECT_ID',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [structureTool({ structure: deskStructure }), visionTool()],

  schema: { types: schemaTypes },
});
