import fs from 'fs';
const content = fs.readFileSync('src/utils/profileLoader.ts', 'utf-8');
console.log(content);
