import { getNewCellState } from '../src/typescript/getNewCellState'; // Replace with your actual file path

describe('getNewCellState', () => {
  test('should become alive if exactly 3 neighbors are alive', () => {
    expect(getNewCellState(0, 3)).toBe(1);
  });

  test('should stay dead if exactly 3 neighbors are alive but cell is already dead', () => {
    expect(getNewCellState(0, 3)).toBe(1);
  });

  test('should die if more than 3 neighbors are alive', () => {
    expect(getNewCellState(1, 4)).toBe(0);
  });

  test('should die if less than 2 neighbors are alive', () => {
    expect(getNewCellState(1, 1)).toBe(0);
  });

  test('should stay alive if exactly 2 neighbors are alive and cell is alive', () => {
    expect(getNewCellState(1, 2)).toBe(1);
  });

  test('should stay dead if exactly 2 neighbors are alive but cell is dead', () => {
    expect(getNewCellState(0, 2)).toBe(0);
  });

  // Additional test: should stay dead if no neighbors are alive
  test('should stay dead if no neighbors are alive', () => {
    expect(getNewCellState(0, 0)).toBe(0);
  });
});