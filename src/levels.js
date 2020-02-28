export const spreadLevels = { // equal or less than x per day
  'stagnant': 0,
  'low': 5,
  'medium': 50,
  'high': Number.MAX_SAFE_INTEGER,
};

export const spreadLevelsHuman = {
  'stagnant': '0',
  'low': `<= ${spreadLevels.low}`,
  'medium': `<= ${spreadLevels.medium}`,
  'high': `> ${spreadLevels.medium}`,
};

// Blue tints
// export const spreadColor = {
//   'stagnant': '#9bad9e',
//   'low': '#00c8ff',
//   'medium': '#0b54e7',
//   'high': '#6200ff',
// };

// Red tints, higher contrast
export const spreadColor = {
  'stagnant': '#4c4f46',
  'low': '#ff9100',
  'medium': '#ff1e00',
  'high': '#ac001a',
};
