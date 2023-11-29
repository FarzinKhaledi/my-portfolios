// sanity.js
import { createClient } from '@sanity/client';
// Import using ESM URL imports in environments that supports it:
// import {createClient} from 'https://esm.sh/@sanity/client'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // Find this at manage.sanity.io or in your sanity.json
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET, // this is from your Sanity project
  useCdn: true, // `false` if you want to ensure fresh data
  apiVersion: '2023-05-03', // use current date (YYYY-MM-DD) to target the latest API version
  // token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
});
