import gradient from 'gradient-string';

export const NAME_FONT = 'Bloody';
export const NAME_FONT_LARGE = 'Electronic';

export const themes = {
  forest: {
    name: 'Forest',
    primary: '#16a34a',
    accent: '#22c55e',
    text: '#a3d9a5',
    muted: '#4ade80',
    dim: '#14532d',
    ok: '#65a30d',
    gradient: ['#052e16', '#14532d', '#166534', '#15803d', '#16a34a'],
  },
  rain: {
    name: 'Rain',
    primary: '#64748b',
    accent: '#94a3b8',
    text: '#e2e8f0',
    muted: '#94a3b8',
    dim: '#1e293b',
    ok: '#38bdf8',
    gradient: ['#334155', '#475569', '#64748b', '#94a3b8', '#cbd5e1'],
  },
  ember: {
    name: 'Ember',
    primary: '#b45309',
    accent: '#dc2626',
    text: '#fef3c7',
    muted: '#d97706',
    dim: '#292524',
    ok: '#ca8a04',
    gradient: ['#44403c', '#78350f', '#b45309', '#dc2626', '#f59e0b'],
  },
  dusk: {
    name: 'Dusk',
    primary: '#8b5cf6',
    accent: '#a78bfa',
    text: '#e0d4fc',
    muted: '#c4b5fd',
    dim: '#1e1b4b',
    ok: '#a78bfa',
    gradient: ['#4c1d95', '#6d28d9', '#7c3aed', '#8b5cf6', '#a78bfa'],
  },
  stone: {
    name: 'Stone',
    primary: '#a8a29e',
    accent: '#d6d3d1',
    text: '#fafaf9',
    muted: '#d6d3d1',
    dim: '#292524',
    ok: '#a3e635',
    gradient: ['#44403c', '#57534e', '#78716c', '#a8a29e', '#d6d3d1'],
  },
  ocean: {
    name: 'Ocean',
    primary: '#0ea5e9',
    accent: '#38bdf8',
    text: '#bae6fd',
    muted: '#7dd3fc',
    dim: '#0c4a6e',
    ok: '#34d399',
    gradient: ['#075985', '#0369a1', '#0284c7', '#0ea5e9', '#38bdf8'],
  },
};

let currentTheme = 'ember';

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
