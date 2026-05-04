const fs = require('fs');
const path = require('path');
const dir = path.join(path.resolve(__dirname, '..'), 'heroes');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const replacements = [
  ['href="images/logo.png"', 'href="../images/logo.png"'],
  ['content="images/preview.png"', 'content="../images/preview.png"'],
  ['href="style.css"', 'href="../style.css"'],
  ['src="icon-loader.js"', 'src="../icon-loader.js"'],
  ['src="analytics.js"', 'src="../analytics.js"'],
  ['src="images/logo.png"', 'src="../images/logo.png"'],
  ['href="index.html"', 'href="../index.html"'],
  ['href="heroes.html"', 'href="../heroes.html"'],
  ['href="items.html"', 'href="../items.html"'],
  ['href="mechanics.html"', 'href="../mechanics.html"'],
  ['href="monsters.html"', 'href="../monsters.html"'],
  ['href="info.html"', 'href="../info.html"'],
  ['href="guides.html"', 'href="../guides.html"'],
  ['href="lore.html"', 'href="../lore.html"'],
  ['href="support.html"', 'href="../support.html"'],
  ['href="updates.html"', 'href="../updates.html"'],
  ['src="images/abilities/', 'src="../images/abilities/'],
  ["href='heroes.html'", "href='../heroes.html'"],
];

// Add guides nav link before lore (only if not already present)
function addGuidesNav(content) {
  if (content.includes('guides.html')) return content; // already has guides link
  const loreLink = 'href="../lore.html" class="nav-link"><i class="fas fa-scroll"></i> Лор</a>';
  if (content.includes(loreLink)) {
    content = content.replace(
      loreLink,
      'href="../guides.html" class="nav-link"><i class="fas fa-book-open"></i> Гайды</a>\n            <a href="../lore.html" class="nav-link"><i class="fas fa-scroll"></i> Лор</a>'
    );
  }
  return content;
}

let totalChanges = 0;
files.forEach(f => {
  const fp = dir + '/' + f;
  let content = fs.readFileSync(fp, 'utf8');
  let changed = false;

  replacements.forEach(([from, to]) => {
    if (content.includes(from)) {
      content = content.split(from).join(to);
      changed = true;
    }
  });

  // Add guides nav link
  const beforeGuides = content;
  content = addGuidesNav(content);
  if (content !== beforeGuides) changed = true;

  if (changed) {
    fs.writeFileSync(fp, content, 'utf8');
    totalChanges++;
    console.log('Updated:', f);
  } else {
    console.log('No changes:', f);
  }
});
console.log('Total files updated:', totalChanges);
