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
  // Use nearly full terminal width without wrapping the border.
  // Boxen's rendered width includes the border; leaving 1 column of slack avoids accidental wraps on 80x24.
  return Math.max(MIN_WIDTH, cols - 2);
}

function getVisibleRows() {
  return Math.max(10, (process.stdout.rows || 24) - 2);
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

function loadChatName() {
  const raw = readFileSync(
    path.join(__dirname, '..', 'ascii', 'name_chat.txt'),
    'utf8'
  );
  const lines = raw.split('\n');
  while (lines.length && !lines[lines.length - 1].trim()) lines.pop();
  return lines;
}

let chatNameLines = [];
try {
  chatNameLines = loadChatName();
} catch {
  chatNameLines = nameLines;
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

function renderInlineFormatting(s) {
  const out = [];
  const str = String(s || '');
  const re = /\*\*(.+?)\*\*/g;
  let last = 0;
  let m;
  while ((m = re.exec(str))) {
    if (m.index > last) out.push(str.slice(last, m.index));
    out.push(chalk.bold(m[1]));
    last = m.index + m[0].length;
  }
  if (last < str.length) out.push(str.slice(last));
  return out.join('');
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
  const { primary } = getTheme();
  return boxen(content, {
    width: contentWidth,
    padding: 0,
    margin: 0,
    borderStyle: 'round',
    borderColor: primary,
    dimBorder: false,
  });
}

export function menuPage(idx) {
  const { primary: p, text, muted } = getTheme();
  const labels = ['ai-adam', 'experience', 'projects', 'links', 'about', 'theme', 'exit'];
  const contentWidth = getContentWidth();
  const rows = process.stdout.rows || 24;
  const borderAndMenu = 2 + 1 + labels.length + 1 + 1 + 1;
  const maxProfileLines = Math.max(3, rows - borderAndMenu) + 1;
  const profileLines = buildProfile(maxProfileLines, contentWidth);
  const menuLines = labels.map((label, i) =>
    (i === idx ? chalk.hex(p)('  > ') : '    ') + (i === idx ? chalk.hex(text).bold(label) : chalk.hex(muted)(label))
  );
  const hint = chalk.hex(getTheme().dim)('    j/k navigate  ·  l/enter select  ·  c ai-adam  ·  q quit');
  const innerWidth = contentWidth - 2;
  const all = [...profileLines, '', ...menuLines, '', hint];
  const padded = all.map((line) => line + ' '.repeat(Math.max(0, innerWidth - stripAnsi(line).length)));
  return frame(padded.join('\n'), contentWidth);
}

export function chatPage({
  messages = [],
  input = '',
  scrollOffset = 0,
  commandPalette,
} = {}) {
  const { muted, text, dim, primary, ok, accent } = getTheme();
  // Chat mode intentionally has NO outer frame border. Use full terminal width.
  const cols = process.stdout.columns || 80;
  const rows = process.stdout.rows || 24;
  const innerWidth = Math.max(40, cols - 2);
  const visibleRows = Math.max(10, rows);

  const leftPad = '  ';

  const nameTagLines = (() => {
    const grad = getThemeGradient();
    const textWidth = Math.max(10, innerWidth - leftPad.length * 2);
    const raw = chatNameLines.map((l) => padLine(l.slice(0, textWidth), textWidth));
    const colored = grad.multiline(raw.join('\n')).split('\n');
    return colored.map((l) => leftPad + l);
  })();

  const formatMsg = (m) => {
    const type = (m?.type || 'message').toLowerCase();
    if (type === 'status') {
      const icon = chalk.hex(ok)('●');
      const label = chalk.hex(ok).bold(m?.label || 'Status');
      const rest = m?.detail ? chalk.hex(dim)(m.detail) : '';
      return [leftPad + icon + ' ' + label + (rest ? ' ' + rest : '')];
    }
    if (type === 'thinking') {
      const body = (m?.content || 'Thinking').trim();
      return [leftPad + chalk.hex(primary).bold(renderInlineFormatting(body))];
    }

    const role = (m?.role || 'user').toLowerCase();
    const body = (m?.content || '').trim();
    if (role === 'user') {
      const wrapped = body === '' ? [''] : wrap(body, Math.max(10, innerWidth - 4));
      const out = [leftPad + chalk.hex(dim)('> ') + chalk.hex(text)(wrapped[0] || '')];
      for (let i = 1; i < wrapped.length; i++) out.push(leftPad + '  ' + chalk.hex(text)(wrapped[i]));
      return out;
    }

    const wrapped = body === '' ? [''] : wrap(body, Math.max(10, innerWidth - 4));
    const out = [
      leftPad + chalk.hex(text)('• ') + chalk.hex(text)(renderInlineFormatting(wrapped[0] || '')),
    ];
    for (let i = 1; i < wrapped.length; i++) {
      out.push(leftPad + '  ' + chalk.hex(text)(renderInlineFormatting(wrapped[i])));
    }
    return out;
  };

  const transcriptLines = messages.flatMap((m) => [...formatMsg(m), '']);

  const paletteOpen = !!commandPalette?.open;
  const paletteItems = Array.isArray(commandPalette?.items) ? commandPalette.items : [];
  const paletteIdx = Math.max(0, Math.min(commandPalette?.idx ?? 0, Math.max(0, paletteItems.length - 1)));
  const paletteScroll = Math.max(0, commandPalette?.scrollOffset ?? 0);
  const paletteMaxRows = 8;
  const paletteMode = commandPalette?.mode || 'commands';

  const inputBox = boxen(leftPad + chalk.hex(dim)('> ') + chalk.hex(text)(input || ''), {
    width: innerWidth,
    padding: { top: 0, bottom: 0, left: 0, right: 0 },
    margin: { top: 0, bottom: 0, left: 0, right: 0 },
    borderStyle: 'round',
    borderColor: muted,
    dimBorder: false,
  });

  const shortcuts = leftPad + chalk.hex(dim)('enter send  ·  / commands  ·  ctrl+c back');

  // Add some breathing room above the tag.
  const headerLines = ['', ...nameTagLines];
  const inputBoxLines = inputBox.split('\n');
  const paletteLines = (() => {
    if (!paletteOpen || !paletteItems.length) return [];
    const rows = paletteItems.map((it, i) => {
      const on = i === paletteIdx;
      const cmd = on ? chalk.hex(text).bold(it.command) : chalk.hex(text)(it.command);
      const desc = it.description
        ? chalk.hex(dim)(paletteMode === 'prompts' ? '  —  ' + it.description : '  ' + it.description)
        : '';
      const pre = on ? chalk.hex(primary)('  ') : '  ';
      return leftPad + pre + cmd + desc;
    });
    const maxScroll = Math.max(0, rows.length - paletteMaxRows);
    const sc = Math.max(0, Math.min(paletteScroll, maxScroll));
    return rows.slice(sc, sc + paletteMaxRows);
  })();

  // Layout: intro card → transcript → input box → (palette) → hint
  // Keep input tight, but leave one line between dropdown and hints.
  const footerLines = [
    ...inputBoxLines,
    ...(paletteLines.length ? paletteLines : []),
    ...(paletteLines.length && !paletteOpen ? [''] : []),
    ...(paletteOpen ? [] : [shortcuts]),
  ];
  const available = Math.max(3, visibleRows - headerLines.length - footerLines.length - 2);

  const total = transcriptLines.length;
  const maxScroll = Math.max(0, total - available);
  const scroll = Math.max(0, Math.min(scrollOffset, maxScroll));
  const slice = transcriptLines.slice(scroll, scroll + available);
  const hasOverflowAbove = scroll > 0;
  const hasOverflowBelow = scroll + available < total;
  const overflowHint =
    hasOverflowAbove || hasOverflowBelow
      ? leftPad +
        chalk.hex(dim)(
          `${hasOverflowAbove ? '↑' : ' '} more  ·  ${hasOverflowBelow ? '↓' : ' '} more  ·  ↑/↓ scroll`
        )
      : '';

  const baseLines = [
    ...headerLines,
    ...(slice.length ? [''] : []),
    ...(overflowHint ? [overflowHint] : []),
    ...slice,
    ...footerLines,
  ];
  const padded = baseLines
    .slice(0, rows) // keep within terminal
    .map((line) => {
      const cleanLen = stripAnsi(line).length;
      const clipped = cleanLen > innerWidth ? line.slice(0, innerWidth) : line;
      return clipped + ' '.repeat(Math.max(0, innerWidth - stripAnsi(clipped).length));
    });

  // Cursor location inside the rendered output (no outer frame).
  const inputPromptRowInner = (() => {
    for (let i = padded.length - inputBoxLines.length; i < padded.length; i++) {
      if (stripAnsi(padded[i]).includes('> ')) return i;
    }
    for (let i = padded.length - 1; i >= 0; i--) {
      if (stripAnsi(padded[i]).includes('> ')) return i;
    }
    return padded.length - 1;
  })();
  const promptColInner0 = Math.max(0, stripAnsi(padded[inputPromptRowInner] || '').indexOf('> '));
  const cursor = {
    row: inputPromptRowInner + 1,
    col: Math.max(1, Math.min(cols, (promptColInner0 + 3 + input.length) + 1)),
  };

  return { frame: padded.join('\n'), scrollOffset: scroll, cursor };
}

function sectionTitle(label) {
  const { primary: p } = getTheme();
  return chalk.hex(p).bold('\n    ── ' + label + ' ──\n');
}

function card(content, active = false) {
  const { primary: p, muted } = getTheme();
  return boxen(content, {
    padding: { top: 0, bottom: 0, left: 1, right: 1 },
    margin: { top: 0, bottom: 0, left: 2, right: 0 },
    borderStyle: 'round',
    borderColor: active ? p : muted,
    dimBorder: !active,
    width: getContentWidth() - 6,
  });
}

export function projectsPage(idx, scrollOffset = 0) {
  const { accent, text, muted, dim, ok } = getTheme();
  const blocks = [sectionTitle('Projects')];
  for (let i = 0; i < projects.length; i++) {
    const proj = projects[i];
    const on = i === idx;
    const content = [
      on ? chalk.hex(text).bold(proj.name) : chalk.hex(muted)(proj.name),
      on ? chalk.hex(text)(proj.desc) : chalk.hex(dim)(proj.desc),
      on ? chalk.hex(accent)(proj.tech) : chalk.hex(dim)(proj.tech),
      on ? chalk.hex(ok)('> ') + chalk.underline.hex(ok)(proj.link) : chalk.hex(dim)('  ' + proj.link),
    ].join('\n');
    blocks.push(card(content, on));
  }
  blocks.push(chalk.hex(getTheme().dim)('\n    j/k navigate  ·  l/enter open  ·  h/q back'));
  const lines = blocks.flatMap((b) => b.split('\n'));
  const visibleRows = getVisibleRows();
  let start = 0;
  const itemStarts = [];
  for (let i = 0; i < blocks.length - 1; i++) {
    itemStarts.push(start);
    start += blocks[i].split('\n').length;
  }
  const totalLines = lines.length;
  const selectedStart = idx < itemStarts.length ? itemStarts[idx] : 0;
  const scroll = Math.max(0, Math.min(selectedStart, totalLines - visibleRows));
  const slice = lines.slice(scroll, scroll + visibleRows);
  const frameStr = frame(slice.join('\n'), getContentWidth());
  return { frame: frameStr, scrollOffset: scroll };
}

export function experiencePage(idx, scrollOffset = 0) {
  const { accent, text, muted, dim } = getTheme();
  const blocks = [sectionTitle('Experience')];
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
    blocks.push(card(content, on));
  }
  blocks.push(chalk.hex(getTheme().dim)('\n    j/k navigate  ·  h/q back'));
  const lines = blocks.flatMap((b) => b.split('\n'));
  const visibleRows = getVisibleRows();
  let start = 0;
  const itemStarts = [];
  for (let i = 0; i < blocks.length - 1; i++) {
    itemStarts.push(start);
    start += blocks[i].split('\n').length;
  }
  const totalLines = lines.length;
  const selectedStart = idx < itemStarts.length ? itemStarts[idx] : 0;
  const scroll = Math.max(0, Math.min(selectedStart, totalLines - visibleRows));
  const slice = lines.slice(scroll, scroll + visibleRows);
  const frameStr = frame(slice.join('\n'), getContentWidth());
  return { frame: frameStr, scrollOffset: scroll };
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
