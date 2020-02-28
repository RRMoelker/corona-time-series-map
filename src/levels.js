export const spreadLevels = { // equal or less than x per day
  'stagnant': 0,
  'low': 5,
  'medium': 50,
  'high': Number.MAX_SAFE_INTEGER,
};

export const spreadLevelsHuman = {
  'stagnant': '0',
  'low': `<=${spreadLevels.low}`,
  'medium': `<=${spreadLevels.medium}`,
  'high': `>${spreadLevels.medium}`,
};

export const spreadColor = {
  'stagnant': '#9bad9e',
  'low': '#4dd8d7',
  'medium': '#38a4c8',
  'high': '#1645c8',
};
