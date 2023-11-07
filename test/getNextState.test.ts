import { getNextState } from '../src/typescript/getNextState';

describe('getNextState', () => {
  it('should return a new state for a 3x3 field where a live cell with fewer than two live neighbours dies', () => {
    const initialState = [
      [0, 0, 0],
      [1, 1, 0],
      [0, 0, 0]
    ];
    const nextState = getNextState(initialState);
    expect(nextState).toEqual([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ]);
  });

  it('should return a new state for a 3x3 field where a live cell with two or three live neighbours lives on to the next generation', () => {
    const initialState = [
      [1, 1, 0],
      [1, 0, 0],
      [0, 0, 0]
    ];
    const nextState = getNextState(initialState);
    expect(nextState).toEqual([
      [1, 1, 0],
      [1, 1, 0],
      [0, 0, 0]
    ]);
  });

  it('should handle the edges of the field correctly', () => {
    const initialState = [
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0]
    ];
    const nextState = getNextState(initialState);
    expect(nextState).toEqual([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ]);
  });
});