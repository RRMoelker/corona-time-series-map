import { easeOutCirc } from "js-easing-functions";

const minRadius = 5000;
const maxRadius = 500000;
const diffRadius = maxRadius - minRadius;

const rangeMax = 50000; // max out radius at this count

export const computeCircleRadius = count => {
  if (count > rangeMax) {
    return maxRadius;
  }

  // elapsed: number, initialValue: number, amountOfChange: number, duration: number
  const value = easeOutCirc(count, minRadius, diffRadius, rangeMax);
  return Math.min(value, maxRadius);
};

