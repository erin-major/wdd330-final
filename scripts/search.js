import { searchByTitle } from './ExternalServices.mjs';
import { loadHeaderFooter } from './utils.mjs';

await loadHeaderFooter();

searchByTitle(1, 10, "naruto");