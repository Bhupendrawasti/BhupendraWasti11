const fs = require('fs');
const path = require('path');

console.log('=== BUILD DEBUG INFO ===');
console.log('Current directory:', __dirname);
console.log('Files in directory:', fs.readdirSync(__dirname));

console.log('Environment variables check:');
console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? '✅ EXISTS' : '❌ MISSING');
console.log('SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY ? '✅ EXISTS' : '❌ MISSING');

const templatePath = path.join(__dirname, 'index.template.html');
console.log('Template path:', templatePath);
console.log('Template exists:', fs.existsSync(templatePath));

const outputPath = path.join(__dirname, 'index.html');

let html = fs.readFileSync(templatePath, 'utf8');

html = html.replace('{{SUPABASE_URL}}', process.env.SUPABASE_URL || '');
html = html.replace('{{SUPABASE_ANON_KEY}}', process.env.SUPABASE_ANON_KEY || '');

if (html.includes('{{SUPABASE_URL}}') || html.includes('{{SUPABASE_ANON_KEY}}')) {
    console.error('❌ Error: Missing environment variables in template replacement!');
    console.error('Still has {{SUPABASE_URL}}:', html.includes('{{SUPABASE_URL}}'));
    console.error('Still has {{SUPABASE_ANON_KEY}}:', html.includes('{{SUPABASE_ANON_KEY}}'));
    process.exit(1);
}

fs.writeFileSync(outputPath, html);
console.log('✅ Build complete! index.html generated');
console.log('Output file exists:', fs.existsSync(outputPath));
