/**
 * This configuration file lets you run `$ sanity [command]` in this folder
 * Go to https://www.sanity.io/docs/cli to learn more.
 **/
import { defineCliConfig } from 'sanity/cli';

const NEXT_PUBLIC_SANITY_PROJECT_ID = 'qhdcblta';
const NEXT_PUBLIC_SANITY_DATASET = 'production';

const projectId = NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = NEXT_PUBLIC_SANITY_DATASET;

export default defineCliConfig({ api: { projectId, dataset } });
