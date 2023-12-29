// eslint-disable-next-line import/no-extraneous-dependencies, @typescript-eslint/no-unused-vars
import { drawField } from "../src/typescript/drawField";

describe("drawField", () => {
  let htmlElement: HTMLElement;
  let mockCallback: jest.Mock;

  beforeEach(() => {
    // Подготовка мока для HTMLElement
    htmlElement = document.createElement("div");
    document.body.appendChild(htmlElement);
    // Подготовка мока для коллбэка
    mockCallback = jest.fn();
  });

  afterEach(() => {
    document.body.removeChild(htmlElement);
  });

  it("renders a table with correct rows and columns based on field argument", () => {
    const field = [
      [0, 1],
      [1, 0],
    ];
    drawField(htmlElement, field, mockCallback);
    const tableRows = htmlElement.querySelectorAll("tr");
    expect(tableRows).toHaveLength(2);
    const firstRowCells = tableRows[0].querySelectorAll("td");
    expect(firstRowCells).toHaveLength(2);
    expect(firstRowCells[0].getAttribute("class")).toContain("dead");
    expect(firstRowCells[1].getAttribute("class")).toContain("alive");
  });

  it("calls onCellClick with the right arguments when a cell is clicked", () => {
    const field = [
      [0, 1],
      [1, 0],
    ];
    drawField(htmlElement, field, mockCallback);

    // Имитация клика на живую ячейку
    const aliveCell = htmlElement.querySelector("td.alive");
    aliveCell?.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    // Проверка, что коллбэк был вызван с правильными координатами
    expect(mockCallback).toHaveBeenCalledWith(1, 0);

    // Имитация клика на мёртвую ячейку
    const deadCell = htmlElement.querySelector("td.dead");
    deadCell?.dispatchEvent(new MouseEvent("click", { bubbles: true }));

    // Проверка, что коллбэк был вызван с правильными координатами
    expect(mockCallback).toHaveBeenCalledWith(0, 0);
  });
});
