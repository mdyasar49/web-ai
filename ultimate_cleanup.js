import fs from 'fs';
import path from 'path';

const itemsToDelete = [
  'server',
  'cleanup.js',
  '.env.example',
  'final_cleanup.js',
  'src/services/geminiService.js',
  'src/services/README.md'
];

itemsToDelete.forEach(item => {
  const fullPath = path.resolve(process.cwd(), item);
  if (fs.existsSync(fullPath)) {
    try {
      if (fs.lstatSync(fullPath).isDirectory()) {
        fs.rmSync(fullPath, { recursive: true, force: true });
      } else {
        fs.unlinkSync(fullPath);
      }
      console.log(`Successfully deleted: ${item}`);
    } catch (err) {
      console.error(`Error deleting ${item}: ${err.message}`);
    }
  } else {
    console.log(`Item not found: ${item}`);
  }
});
