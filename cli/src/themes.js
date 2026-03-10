import gradient from 'gradient-string';

export const NAME_FONT = 'Gothic';

export const themes = {
  slate: {
    name: 'Slate',
    primary: '#64748b',
    accent: '#94a3b8',
    muted: '#94a3b8',
    dim: '#475569',
    ok: '#22c55e',
    gradient: ['#334155', '#475569', '#64748b', '#94a3b8', '#cbd5e1'],
  },
  sage: {
    name: 'Sage',
    primary: '#6b7c6b',
    accent: '#8a9a8a',
    muted: '#9ca89c',
    dim: '#4a5a4a',
    ok: '#5a8a5a',
    gradient: ['#3d4d3d', '#4a5a4a', '#6b7c6b', '#8a9a8a', '#b8c8b8'],
  },
  navy: {
    name: 'Navy',
    primary: '#4a5568',
    accent: '#5a6a7a',
    muted: '#718096',
    dim: '#2d3748',
    ok: '#48bb78',
    gradient: ['#1e293b', '#334155', '#4a5568', '#64748b', '#94a3b8'],
  },
  warm: {
    name: 'Warm',
    primary: '#78716c',
    accent: '#a8a29e',
    muted: '#a8a29e',
    dim: '#57534e',
    ok: '#65a30d',
    gradient: ['#44403c', '#57534e', '#78716c', '#a8a29e', '#d6d3d1'],
  },
  forest: {
    name: 'Forest',
    primary: '#4a6b4a',
    accent: '#6b8a6b',
    muted: '#94a894',
    dim: '#2d4a2d',
    ok: '#22c55e',
    gradient: ['#1e3d1e', '#2d4a2d', '#4a6b4a', '#6b8a6b', '#9cbc9c'],
  },
  dusk: {
    name: 'Dusk',
    primary: '#5b5b7a',
    accent: '#7a7a9a',
    muted: '#9a9ab8',
    dim: '#3d3d5a',
    ok: '#5a9a7a',
    gradient: ['#2d2d4a', '#3d3d5a', '#5b5b7a', '#7a7a9a', '#b8b8d8'],
  },
};

let currentTheme = 'slate';

export function getTheme() {
  return themes[currentTheme];
}

export function setTheme(themeId) {
  if (themes[themeId]) currentTheme = themeId;
}

export function getThemeId() {
  return currentTheme;
}

export function getThemeIds() {
  return Object.keys(themes);
}

export function getThemeGradient(themeId) {
  const t = themes[themeId] || themes[currentTheme];
  return gradient(t.gradient);
}
