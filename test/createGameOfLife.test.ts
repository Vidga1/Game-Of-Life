/* import { createGameOfLife } from "../src/typescript/createGameOfLife"; */
import { drawField } from "../src/typescript/drawField";
import { getNextState } from "../src/typescript/getNextState";
import { isAnyoneAlive } from "../src/typescript/isAnyoneAlive";

describe("drawField", () => {
  it("should create a visual representation of the field", () => {
    const mockField = [
      [0, 1],
      [1, 0],
    ];
    const mockHandler = jest.fn();
    const container = document.createElement("div");

    drawField(container, mockField, mockHandler);

    // Проверяем, что контейнер был заполнен
    expect(container.innerHTML).toBeTruthy();
    // Проверяем, что был создан правильный количеств клеток
    expect(container.querySelectorAll(".cell").length).toBe(4);
  });
});

describe("getNextState", () => {
  it("should calculate the next state of the field correctly", () => {
    const initialState = [
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
    ];
    const expectedNextState = [
      [0, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ];

    const nextState = getNextState(initialState);

    expect(nextState).toEqual(expectedNextState);
  });
});

describe("isAnyoneAlive", () => {
  it("should return false if all cells are dead", () => {
    const deadField = [
      [0, 0],
      [0, 0],
    ];

    expect(isAnyoneAlive(deadField)).toBe(false);
  });

  it("should return true if any cell is alive", () => {
    const liveField = [
      [0, 1],
      [0, 0],
    ];

    expect(isAnyoneAlive(liveField)).toBe(true);
  });
});
