const fs = require('fs');
const path = require('path');

const templatePath = path.join(__dirname, 'index.template.html');
const outputPath = path.join(__dirname, 'index.html');

let html = fs.readFileSync(templatePath, 'utf8');

console.log('=== BUILD DEBUG INFO ===');

// Get the secrets
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

console.log('SUPABASE_URL length:', supabaseUrl.length);
console.log('SUPABASE_ANON_KEY length:', supabaseAnonKey.length);

// Method 1: Direct string replacement
html = html.replace("'{{SUPABASE_URL}}'", `'${supabaseUrl}'`);
html = html.replace("'{{SUPABASE_ANON_KEY}}'", `'${supabaseAnonKey}'`);

// Method 2: Also try without quotes (just in case)
html = html.replace(/{{SUPABASE_URL}}/g, supabaseUrl);
html = html.replace(/{{SUPABASE_ANON_KEY}}/g, supabaseAnonKey);

// Method 3: Handle any whitespace issues
html = html.replace(/\{\{\s*SUPABASE_URL\s*\}\}/g, supabaseUrl);
html = html.replace(/\{\{\s*SUPABASE_ANON_KEY\s*\}\}/g, supabaseAnonKey);

console.log('After replacement - still has {{SUPABASE_URL}}:', html.includes('{{SUPABASE_URL}}'));
console.log('After replacement - still has {{SUPABASE_ANON_KEY}}:', html.includes('{{SUPABASE_ANON_KEY}}'));

// Check if the URL was properly inserted
const urlMatch = html.match(/const SUPABASE_URL = '([^']+)'/);
console.log('Extracted SUPABASE_URL:', urlMatch ? urlMatch[1].substring(0, 30) + '...' : 'NOT FOUND');

if (html.includes('{{SUPABASE_URL}}') || html.includes('{{SUPABASE_ANON_KEY}}')) {
    console.error('❌ Error: Could not replace placeholders!');
    process.exit(1);
}

fs.writeFileSync(outputPath, html);
console.log('✅ Build complete! index.html generated');

// Verify the output file
const outputContent = fs.readFileSync(outputPath, 'utf8');
const hasUrl = outputContent.includes('const SUPABASE_URL');
const hasKey = outputContent.includes('const SUPABASE_ANON_KEY');
console.log('Output file has URL line:', hasUrl);
console.log('Output file has KEY line:', hasKey);
