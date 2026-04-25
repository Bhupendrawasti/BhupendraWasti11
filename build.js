const fs = require('fs');
const path = require('path');

const templatePath = path.join(__dirname, 'index.template.html');
const outputPath = path.join(__dirname, 'index.html');

let html = fs.readFileSync(templatePath, 'utf8');

html = html.replace('{{SUPABASE_URL}}', process.env.SUPABASE_URL || '');
html = html.replace('{{SUPABASE_ANON_KEY}}', process.env.SUPABASE_ANON_KEY || '');

if (html.includes('{{SUPABASE_URL}}') || html.includes('{{SUPABASE_ANON_KEY}}')) {
    console.error('❌ Error: Missing environment variables!');
    process.exit(1);
}

fs.writeFileSync(outputPath, html);
console.log('✅ Build complete!');
