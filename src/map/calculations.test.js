import {computeCircleRadius, minRadius} from "./calculations";

describe('calculations', () => {
  it('should compute radius for a range of values', () => {
    expect(computeCircleRadius(0)).toEqual(minRadius);
    expect(computeCircleRadius(10*1000*1000)).toEqual(maxRadius);
  });
});