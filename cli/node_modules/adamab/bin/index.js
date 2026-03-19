#!/usr/bin/env node

import { program } from 'commander';
import { run } from '../src/cli.js';
import {
  menuPage,
  projectsPage,
  experiencePage,
  linksPage,
  aboutPage,
} from '../src/ui.js';

program
  .name('adamab')
  .description("Adam Abdalla's portfolio — right in your terminal")
  .version('1.0.0');

program
  .option('-p, --projects', 'Show projects')
  .option('-e, --experience', 'Show experience')
  .option('-l, --links', 'Show links')
  .option('-a, --about', 'Show about')
  .action(async (opts) => {
    if (opts.projects) return console.log(projectsPage(0));
    if (opts.experience) return console.log(experiencePage(0));
    if (opts.links) return console.log(linksPage(0));
    if (opts.about) return console.log(aboutPage());
    await run();
  });

process.on('SIGINT', () => {
  process.stdout.write('\x1B[?7h\x1B[?1049l\x1B[?25h\x1B[0m');
  if (process.stdin.isTTY) process.stdin.setRawMode(false);
  process.exit(0);
});

program.parse();
