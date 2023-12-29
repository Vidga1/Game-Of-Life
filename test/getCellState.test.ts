import { getCellState } from "../src/typescript/getCellState";

describe("getCellState", () => {
  const testField: number[][] = [
    [0, 1, 0],
    [0, 0, 1],
    [1, 1, 0],
  ];

  test("should return the correct state of a cell within the bounds", () => {
    expect(getCellState(testField, 1, 0)).toBe(1);
    expect(getCellState(testField, 2, 1)).toBe(1);
    expect(getCellState(testField, 0, 2)).toBe(1);
  });

  test("should return 0 for a cell out of the horizontal bounds", () => {
    expect(getCellState(testField, -1, 0)).toBe(0);
    expect(getCellState(testField, 3, 0)).toBe(0);
  });

  test("should return 0 for a cell out of the vertical bounds", () => {
    expect(getCellState(testField, 0, -1)).toBe(0);
    expect(getCellState(testField, 0, 3)).toBe(0);
  });

  test("should return 0 for a cell out of both horizontal and vertical bounds", () => {
    expect(getCellState(testField, -1, -1)).toBe(0);
    expect(getCellState(testField, 3, 3)).toBe(0);
  });

  // Additional test: Checking for cells within the bounds that are dead
  test("should return 0 for a dead cell within the bounds", () => {
    expect(getCellState(testField, 0, 0)).toBe(0);
    expect(getCellState(testField, 2, 2)).toBe(0);
  });
});
