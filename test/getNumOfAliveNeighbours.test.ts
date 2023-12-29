import { getNumOfAliveNeighbours } from "../src/typescript/getNumOfAliveNeighbours";

describe("getNumOfAliveNeighbours", () => {
  const field = [
    [0, 1, 0],
    [1, 1, 0],
    [0, 0, 1],
  ];

  it("should return the correct number of alive neighbours for an edge cell", () => {
    expect(getNumOfAliveNeighbours(0, 1, field)).toBe(2);
  });

  it("should return the correct number of alive neighbours for a corner cell", () => {
    expect(getNumOfAliveNeighbours(0, 0, field)).toBe(3);
  });
});
