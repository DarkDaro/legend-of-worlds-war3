import fs from 'fs';
const prev = JSON.parse(fs.readFileSync('/tmp/p11-computed.json','utf8'));
const after = JSON.parse(fs.readFileSync('/tmp/p11-after.json','utf8'));
