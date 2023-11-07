import { isAnyoneAlive } from "../src/typescript/isAnyoneAlive";

describe("isAnyoneAlive", () => {
  test("should return false for an empty field", () => {
    const field: number[][] = [[]];
    expect(isAnyoneAlive(field)).toBe(false);
  });

  test("should return false for a field with all dead cells", () => {
    const field: number[][] = [
      [0, 0],
      [0, 0],
    ];
    expect(isAnyoneAlive(field)).toBe(false);
  });

  test("should return true for a field with one live cell", () => {
    const field: number[][] = [
      [0, 1],
      [0, 0],
    ];
    expect(isAnyoneAlive(field)).toBe(true);
  });

  test("should return true for a field with multiple live cells", () => {
    const field: number[][] = [
      [1, 0],
      [0, 1],
    ];
    expect(isAnyoneAlive(field)).toBe(true);
  });

  test("should return true for a larger field with some live cells", () => {
    const field: number[][] = [
      [0, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 1],
      [0, 0, 0, 0],
    ];
    expect(isAnyoneAlive(field)).toBe(true);
  });
});
