import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import chalk from 'chalk';
import boxen from 'boxen';
import gradient from 'gradient-string';
import figlet from 'figlet';
import { profile, projects, experience, links } from './data.js';

const p = '#8b5cf6';
const accent = '#a855f7';
const muted = '#94a3b8';
const dim = '#374151';
const ok = '#22c55e';
const grad = gradient(['#6366f1', '#8b5cf6', '#d946ef']);

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function loadArt() {
  const raw = readFileSync(
    path.join(__dirname, '..', 'ascii', 'terminal_ascii_art_photo.txt'),
    'utf8'
  );
  const lines = raw.split('\n');
  let first = 0;
  let last = lines.length - 1;
  while (first < lines.length && !lines[first].trim()) first++;
  while (last > first && !lines[last].trim()) last--;
  const content = lines.slice(first, last + 1);
  let minIndent = Infinity;
  for (const l of content) {
    if (!l.trim()) continue;
    minIndent = Math.min(minIndent, l.length - l.trimStart().length);
  }
  return content.map((l) => l.slice(minIndent).trimEnd());
}

let artLines = [];
try {
  artLines = loadArt();
} catch {
  /* portrait file missing — menu still works */
}

function scaleArt(lines) {
  const out = [];
  for (let y = 0; y < lines.length; y += 2) {
    let row = '';
    for (let x = 0; x < lines[y].length; x += 2) {
      let ch = lines[y][x] ?? ' ';
      if (ch === ' ') {
        const candidates = [
          lines[y]?.[x + 1],
          lines[y + 1]?.[x],
          lines[y + 1]?.[x + 1],
        ];
        for (const c of candidates) {
          if (c && c !== ' ') { ch = c; break; }
        }
      }
      row += ch;
    }
    out.push(row.trimEnd());
  }
  return out;
}

function buildProfile() {
  let nameLines;
  try {
    const raw = figlet.textSync('Adam', { font: 'ANSI Shadow' });
    nameLines = raw.split('\n');
    while (nameLines.length && !nameLines[nameLines.length - 1].trim())
      nameLines.pop();
  } catch {
    nameLines = ['  ADAM'];
  }

  const nameColored = grad.multiline(nameLines.join('\n')).split('\n');
  const art = artLines.length ? scaleArt(artLines) : [];

  if (!art.length) return nameColored.join('\n');

  const artMax = Math.max(...art.map((l) => l.length));
  const gap = 5;
  const lpad = 2;
  const textCol = artMax + gap;

  const rightSide = [
    ...nameColored,
    '',
    chalk.hex(muted)('ECE student @ UofT'),
    chalk.hex(muted)('ML Researcher @ MIT'),
    '',
    chalk.white('excited about all things ML.'),
    chalk.white('diving into self-supervised'),
    chalk.white('and representation learning.'),
  ];

  const coloredArt = grad.multiline(art.join('\n')).split('\n');
  const totalLines = Math.max(art.length, rightSide.length);
  const out = [];
  const padStr = ' '.repeat(lpad);

  for (let i = 0; i < totalLines; i++) {
    const rawLen = i < art.length ? art[i].length : 0;
    const artPart = i < coloredArt.length ? coloredArt[i] : '';
    const hasText = i < rightSide.length;
    const text = hasText ? rightSide[i] : '';
    const space = hasText ? ' '.repeat(Math.max(0, textCol - rawLen)) : '';
    out.push(padStr + artPart + space + text);
  }

  return out.join('\n');
}

const card = (content, active = false) =>
  boxen(content, {
    padding: { top: 0, bottom: 0, left: 1, right: 1 },
    margin: { top: 0, bottom: 0, left: 4, right: 0 },
    borderStyle: 'round',
    borderColor: active ? p : dim,
    dimBorder: !active,
  });

function hintLine(items) {
  return '\n' + chalk.hex(dim)('    ' + items.join('  ·  '));
}

// every renderer returns a string — no console.log

export function menuPage(idx) {
  const o = [buildProfile(), ''];

  const labels = ['Projects', 'Experience', 'Links', 'About', 'Exit'];
  for (let i = 0; i < labels.length; i++) {
    const on = i === idx;
    const pre = on ? chalk.hex(p)('  > ') : '    ';
    const txt = on ? chalk.bold.white(labels[i]) : chalk.hex(muted)(labels[i]);
    o.push(pre + txt);
  }

  o.push(hintLine(['j/k navigate', 'l/enter select', 'q quit']));
  return o.join('\n');
}

export function projectsPage(idx) {
  const o = [chalk.hex(p).bold('\n    ── Projects ──\n')];

  for (let i = 0; i < projects.length; i++) {
    const proj = projects[i];
    const on = i === idx;
    const content = [
      on ? chalk.bold.white(proj.name) : chalk.hex(muted)(proj.name),
      on ? chalk.white(proj.desc) : chalk.hex(dim)(proj.desc),
      on ? chalk.hex(accent)(proj.tech) : chalk.hex(dim)(proj.tech),
      on
        ? chalk.hex(ok)('> ') + chalk.underline.hex(ok)(proj.link)
        : chalk.hex(dim)('  ' + proj.link),
    ].join('\n');
    o.push(card(content, on));
  }

  o.push(hintLine(['j/k navigate', 'l/enter open', 'h/q back']));
  return o.join('\n');
}

export function experiencePage(idx) {
  const o = [chalk.hex(p).bold('\n    ── Experience ──\n')];

  for (let i = 0; i < experience.length; i++) {
    const exp = experience[i];
    const on = i === idx;
    const title = on
      ? chalk.bold.white(exp.role) +
        chalk.hex(muted)(' @ ') +
        chalk.hex(accent).bold(exp.company)
      : chalk.hex(muted)(exp.role) +
        chalk.hex(dim)(' @ ') +
        chalk.hex(dim)(exp.company);
    const content = [
      title,
      on
        ? chalk.hex(muted)(`${exp.location}  ·  ${exp.period}`)
        : chalk.hex(dim)(`${exp.location}  ·  ${exp.period}`),
      on ? chalk.white(exp.desc) : chalk.hex(dim)(exp.desc),
    ].join('\n');
    o.push(card(content, on));
  }

  o.push(hintLine(['j/k navigate', 'h/q back']));
  return o.join('\n');
}

export function linksPage(idx) {
  const o = [chalk.hex(p).bold('\n    ── Links ──\n')];

  const rows = [
    ['GitHub', links.github],
    ['LinkedIn', links.linkedin],
    ['Twitter / X', links.twitter],
    ['Email', links.email],
  ];

  for (let i = 0; i < rows.length; i++) {
    const [label, url] = rows[i];
    const on = i === idx;
    const pre = on ? chalk.hex(p)('  > ') : '    ';
    const lbl = on
      ? chalk.bold.white(label.padEnd(14))
      : chalk.hex(muted)(label.padEnd(14));
    const link = on ? chalk.underline.hex(ok)(url) : chalk.hex(dim)(url);
    o.push(pre + lbl + link);
  }

  o.push(hintLine(['j/k navigate', 'l/enter open', 'h/q back']));
  return o.join('\n');
}

export function aboutPage() {
  const content = profile.about
    .map((line) => (line ? chalk.white(line) : ''))
    .join('\n');

  const o = [
    chalk.hex(p).bold('\n    ── About ──\n'),
    boxen(content, {
      padding: { top: 0, bottom: 0, left: 1, right: 1 },
      margin: { top: 0, bottom: 0, left: 4, right: 0 },
      borderStyle: 'round',
      borderColor: p,
    }),
    hintLine(['h/q back']),
  ];
  return o.join('\n');
}

export function goodbyePage() {
  return boxen(chalk.hex(p).bold('Thanks for stopping by.'), {
    padding: { top: 0, bottom: 0, left: 2, right: 2 },
    margin: { top: 1, bottom: 1, left: 4, right: 0 },
    borderStyle: 'round',
    borderColor: accent,
  });
}
