const fs = require('fs');
const https = require('https');
const http = require('http');
const path = require('path');

const files = [
  'frontend/src/data/mock/drivers.ts',
  'frontend/src/data/mock/teams.ts',
  'frontend/src/data/mock/venues.ts',
];

const root = path.resolve(__dirname, '..');

let allUrls = [];

for (const f of files) {
  const fullPath = path.join(root, f);
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  File not found: ${f}`);
    continue;
  }
  const content = fs.readFileSync(fullPath, 'utf8');
  const matches = [...content.matchAll(/image(?:Url)?:\s*["'`](https?:\/\/[^"'`\s]+)["'`]/g)];
  for (const m of matches) {
    allUrls.push({ url: m[1], file: f });
  }
}

// deduplicate but keep file reference
const seen = new Map();
for (const { url, file } of allUrls) {
  if (!seen.has(url)) seen.set(url, file);
}

const unique = [...seen.entries()];
console.log(`Checking ${unique.length} unique URLs across files...\n`);

let pending = unique.length;
const results = [];

for (const [url, file] of unique) {
  const mod = url.startsWith('https') ? https : http;
  const req = mod.request(url, { method: 'HEAD', timeout: 10000 }, res => {
    const status = res.statusCode;
    const ok = status >= 200 && status < 400;
    results.push({ ok, status, url, file });
    if (!ok) console.log(`❌ ${status} — [${file}] ${url}`);
    if (--pending === 0) summarise();
  });
  req.on('timeout', () => {
    req.destroy();
    results.push({ ok: false, status: 'TIMEOUT', url, file });
    console.log(`💥 TIMEOUT — [${file}] ${url}`);
    if (--pending === 0) summarise();
  });
  req.on('error', e => {
    results.push({ ok: false, status: 'ERROR', url, file });
    console.log(`💥 ERROR — [${file}] ${url} — ${e.message}`);
    if (--pending === 0) summarise();
  });
  req.end();
}

function summarise() {
  const bad = results.filter(r => !r.ok);
  console.log(`\n--- SUMMARY ---`);
  console.log(`Total: ${results.length}  ✅ ${results.length - bad.length}  ❌/💥 ${bad.length}`);
  if (bad.length === 0) console.log('All URLs OK.');
}
