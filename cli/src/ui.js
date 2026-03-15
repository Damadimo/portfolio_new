import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import chalk from 'chalk';
import boxen from 'boxen';
import { profile, projects, experience, links } from './data.js';
import { getTheme, getThemeGradient, getThemeIds, themes } from './themes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PAD = 2;
const MIN_WIDTH = 40;

function getContentWidth() {
  const cols = process.stdout.columns || 80;
  return Math.max(MIN_WIDTH, cols - 8);
}

function loadName() {
  const raw = readFileSync(
    path.join(__dirname, '..', 'ascii', 'name.txt'),
    'utf8'
  );
  const lines = raw.split('\n');
  while (lines.length && !lines[lines.length - 1].trim()) lines.pop();
  return lines.filter((l) => l.trim());
}

let nameLines = [];
try {
  nameLines = loadName();
} catch {
  nameLines = ['  ADAM'];
}

function wrap(str, width) {
  if (!str || width < 8) return [str || ''];
  const words = str.trim().split(/\s+/);
  const out = [];
  let line = '';
  for (const w of words) {
    const next = line ? line + ' ' + w : w;
    if (next.length <= width) {
      line = next;
    } else {
      if (line) out.push(line);
      line = w.length > width ? w.slice(0, width) : w;
    }
  }
  if (line) out.push(line);
  return out;
}

function padLine(s, width) {
  return (s || '').slice(0, width).padEnd(width);
}

function stripAnsi(s) {
  return (s || '').replace(/\x1B\[[0-9;]*m/g, '');
}

function buildProfile(maxLines, contentWidth) {
  const grad = getThemeGradient();
  const text = getTheme().text;
  const innerWidth = contentWidth - 2;
  const textWidth = Math.max(10, innerWidth - 2 * PAD);
  const maxNameLines = 8;
  const nameBudget = maxLines != null ? Math.max(1, Math.min(maxNameLines, maxLines - 2)) : maxNameLines;
  const taglineBudget = maxLines != null ? Math.max(0, maxLines - nameBudget - 1) : 6;
  const namePadded = nameLines.slice(0, nameBudget).map((l) => padLine(l.slice(0, textWidth), textWidth));
  const nameColored = grad.multiline(namePadded.join('\n')).split('\n');
  const lines = profile.tagline.split(/\n/).map((s) => s.trim());
  const tagline = lines
    .flatMap((line) => (line === '' ? [''] : wrap(line, textWidth)))
    .slice(0, taglineBudget)
    .map((l) => (l === '' ? l : chalk.hex(text)(l)));
  const out = [...nameColored, '', ...tagline].map(
    (l) => ' '.repeat(PAD) + l + ' '.repeat(Math.max(0, textWidth - stripAnsi(l).length)) + ' '.repeat(PAD)
  );
  return out;
}

function frame(content, contentWidth) {
  const { dim } = getTheme();
  return boxen(content, {
    width: contentWidth,
    padding: 0,
    margin: 0,
    borderStyle: 'round',
    borderColor: dim,
    dimBorder: true,
  });
}

export function menuPage(idx) {
  const { primary: p, text, muted } = getTheme();
  const labels = ['Projects', 'Experience', 'Links', 'About', 'Theme', 'Exit'];
  const contentWidth = getContentWidth();
  const rows = process.stdout.rows || 24;
  const borderAndMenu = 2 + 1 + labels.length + 1 + 1 + 1;
  const maxProfileLines = Math.max(3, rows - borderAndMenu) + 1;
  const profileLines = buildProfile(maxProfileLines, contentWidth);
  const menuLines = labels.map((label, i) =>
    (i === idx ? chalk.hex(p)('  > ') : '    ') + (i === idx ? chalk.hex(text).bold(label) : chalk.hex(muted)(label))
  );
  const hint = chalk.hex(getTheme().dim)('    j/k navigate  ·  l/enter select  ·  q quit');
  const innerWidth = contentWidth - 2;
  const all = [...profileLines, '', ...menuLines, '', hint];
  const padded = all.map((line) => line + ' '.repeat(Math.max(0, innerWidth - stripAnsi(line).length)));
  return frame(padded.join('\n'), contentWidth);
}

function sectionTitle(label) {
  const { primary: p } = getTheme();
  return chalk.hex(p).bold('\n    ── ' + label + ' ──\n');
}

function card(content, active = false) {
  const { primary: p, dim } = getTheme();
  return boxen(content, {
    padding: { top: 0, bottom: 0, left: 1, right: 1 },
    margin: { top: 0, bottom: 0, left: 2, right: 0 },
    borderStyle: 'round',
    borderColor: active ? p : dim,
    dimBorder: !active,
    width: getContentWidth() - 6,
  });
}

export function projectsPage(idx) {
  const { accent, text, muted, dim, ok } = getTheme();
  const o = [sectionTitle('Projects')];
  for (let i = 0; i < projects.length; i++) {
    const proj = projects[i];
    const on = i === idx;
    const content = [
      on ? chalk.hex(text).bold(proj.name) : chalk.hex(muted)(proj.name),
      on ? chalk.hex(text)(proj.desc) : chalk.hex(dim)(proj.desc),
      on ? chalk.hex(accent)(proj.tech) : chalk.hex(dim)(proj.tech),
      on ? chalk.hex(ok)('> ') + chalk.underline.hex(ok)(proj.link) : chalk.hex(dim)('  ' + proj.link),
    ].join('\n');
    o.push(card(content, on));
  }
  o.push(chalk.hex(getTheme().dim)('\n    j/k navigate  ·  l/enter open  ·  h/q back'));
  return frame(o.join('\n'), getContentWidth());
}

export function experiencePage(idx) {
  const { accent, text, muted, dim } = getTheme();
  const o = [sectionTitle('Experience')];
  for (let i = 0; i < experience.length; i++) {
    const exp = experience[i];
    const on = i === idx;
    const title =
      (on ? chalk.hex(text).bold(exp.role) + chalk.hex(muted)(' @ ') + chalk.hex(accent).bold(exp.company)
        : chalk.hex(muted)(exp.role) + chalk.hex(dim)(' @ ') + chalk.hex(dim)(exp.company));
    const content = [
      title,
      on ? chalk.hex(muted)(`${exp.location}  ·  ${exp.period}`) : chalk.hex(dim)(`${exp.location}  ·  ${exp.period}`),
      on ? chalk.hex(text)(exp.desc) : chalk.hex(dim)(exp.desc),
    ].join('\n');
    o.push(card(content, on));
  }
  o.push(chalk.hex(getTheme().dim)('\n    j/k navigate  ·  h/q back'));
  return frame(o.join('\n'), getContentWidth());
}

export function linksPage(idx) {
  const { primary: p, text, muted, dim, ok } = getTheme();
  const o = [sectionTitle('Links')];
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
    const lbl = on ? chalk.hex(text).bold(label.padEnd(14)) : chalk.hex(muted)(label.padEnd(14));
    const link = on ? chalk.underline.hex(ok)(url) : chalk.hex(dim)(url);
    o.push(pre + lbl + link);
  }
  o.push(chalk.hex(getTheme().dim)('\n    j/k navigate  ·  l/enter open  ·  h/q back'));
  return frame(o.join('\n'), getContentWidth());
}

export function aboutPage() {
  const { primary: p, text } = getTheme();
  const content = profile.about.map((line) => (line ? chalk.hex(text)(line) : '')).join('\n');
  const o = [
    sectionTitle('About'),
    boxen(content, {
      padding: { top: 0, bottom: 0, left: 1, right: 1 },
      margin: { top: 0, bottom: 0, left: 2, right: 0 },
      borderStyle: 'round',
      borderColor: p,
      width: getContentWidth() - 6,
    }),
    chalk.hex(getTheme().dim)('\n    h/q back'),
  ];
  return frame(o.join('\n'), getContentWidth());
}

export function themePage(idx) {
  const { primary: p, text, muted } = getTheme();
  const themeIds = getThemeIds();
  const o = [sectionTitle('Theme')];
  for (let i = 0; i < themeIds.length; i++) {
    const id = themeIds[i];
    const t = themes[id];
    const on = i === idx;
    const pre = on ? chalk.hex(p)('  > ') : '    ';
    const label = on ? chalk.hex(text).bold(t.name) : chalk.hex(muted)(t.name);
    o.push(pre + label);
  }
  o.push(chalk.hex(getTheme().dim)('\n    j/k navigate  ·  l/enter select  ·  h/q back'));
  return frame(o.join('\n'), getContentWidth());
}

export function goodbyePage() {
  const { primary: p } = getTheme();
  const w = getContentWidth();
  const line = chalk.hex(p).bold('Thanks for stopping by.');
  return frame(line + ' '.repeat(Math.max(0, w - 24)), w);
}
