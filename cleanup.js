import fs from 'fs';
import path from 'path';

const filesToDelete = [
  'd:/web-ai/src/services/geminiService.js',
  'd:/web-ai/src/services/README.md',
  'd:/web-ai/.env.example'
];

filesToDelete.forEach(file => {
  const fullPath = path.resolve(process.cwd(), file);
  if (fs.existsSync(fullPath)) {
    try {
      fs.unlinkSync(fullPath);
      console.log(`Deleted: ${file}`);
    } catch (err) {
      console.error(`Error deleting ${file}: ${err.message}`);
    }
  } else {
    console.log(`File not found: ${file}`);
  }
});
