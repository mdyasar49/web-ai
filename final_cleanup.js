import fs from 'fs';
import path from 'path';

const itemsToDelete = [
  'server',
  'cleanup.js',
  '.env.example',
  'src/services/geminiService.js',
  'src/services/README.md'
];

itemsToDelete.forEach(item => {
  const fullPath = path.resolve(process.cwd(), item);
  if (fs.existsSync(fullPath)) {
    try {
      fs.rmSync(fullPath, { recursive: true, force: true });
      console.log(`Deleted: ${item}`);
    } catch (err) {
      console.error(`Error deleting ${item}: ${err.message}`);
    }
  } else {
    console.log(`Not found: ${item}`);
  }
});
