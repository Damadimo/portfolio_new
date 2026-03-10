import readline from 'node:readline';
import open from 'open';
import {
  menuPage,
  projectsPage,
  experiencePage,
  linksPage,
  aboutPage,
  goodbyePage,
} from './ui.js';
import { projects, experience, links } from './data.js';

const menuTargets = ['projects', 'experience', 'links', 'about', 'exit'];

const linkUrls = [
  links.github,
  links.linkedin,
  links.twitter,
  `mailto:${links.email}`,
];

const pageLengths = {
  menu: menuTargets.length,
  projects: projects.length,
  experience: experience.length,
  links: linkUrls.length,
  about: 0,
};

const renderers = {
  menu: menuPage,
  projects: projectsPage,
  experience: experiencePage,
  links: linksPage,
  about: aboutPage,
};

const ALT_ON = '\x1B[?1049h';
const ALT_OFF = '\x1B[?1049l';
const HIDE = '\x1B[?25l';
const SHOW = '\x1B[?25h';
const HOME = '\x1B[H';
const CLEAR = '\x1B[0J';
const WRAP_OFF = '\x1B[?7l';
const WRAP_ON = '\x1B[?7h';

export async function run() {
  let page = 'menu';
  let idx = 0;

  const write = (s) => process.stdout.write(s);

  write(ALT_ON + HIDE + WRAP_OFF);

  readline.emitKeypressEvents(process.stdin);
  if (process.stdin.isTTY) process.stdin.setRawMode(true);
  process.stdin.resume();

  const draw = () => {
    const frame = renderers[page](idx);
    // \x1B[K on every line erases leftover chars from wider previous frames
    // \x1B[0J after the last line erases leftover rows from taller previous frames
    const lines = frame.split('\n').map((l) => l + '\x1B[K').join('\n');
    write(HIDE + HOME + lines + '\n\x1B[0J' + SHOW);
  };

  const go = (target) => {
    page = target;
    idx = 0;
    draw();
  };

  const cleanup = () => {
    if (process.stdin.isTTY) process.stdin.setRawMode(false);
    process.stdin.pause();
    write(WRAP_ON + ALT_OFF + SHOW);
  };

  const exit = () => {
    cleanup();
    console.log(goodbyePage());
    process.exit(0);
  };

  const back = () => (page === 'menu' ? exit() : go('menu'));

  draw();

  process.stdin.on('keypress', async (ch, key) => {
    const n = key?.name;
    const len = pageLengths[page];

    if ((n === 'up' || ch === 'k') && len > 0) {
      idx = (idx - 1 + len) % len;
      draw();
    } else if ((n === 'down' || ch === 'j') && len > 0) {
      idx = (idx + 1) % len;
      draw();
    } else if (n === 'return' || ch === 'l') {
      if (page === 'menu') {
        const target = menuTargets[idx];
        target === 'exit' ? exit() : go(target);
      } else if (page === 'projects') {
        await open(projects[idx].link);
      } else if (page === 'links') {
        await open(linkUrls[idx]);
      }
    } else if (ch === 'q' || ch === 'h' || (key?.ctrl && n === 'c')) {
      back();
    }
  });
}
