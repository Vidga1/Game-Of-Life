import { getCellState } from "./getCellState";

/**
 * Узнать количество живых соседей вокруг клетки
 * @param column - номер колонки
 * @param row - номер строки
 * @param field - состояние поля
 * @returns число живых соседей
 */
export function getNumOfAliveNeighbours(column: number, row: number, field: number[][]): number {
  let neighbours = 0;

  // Проверяем верхнюю и нижнюю строку относительно выбранной клетки
  for (let j = column - 1; j <= column + 1; j += 1) {
    neighbours += Number(getCellState(field, j, row - 1));
    neighbours += Number(getCellState(field, j, row + 1));
  }

  // Проверяем клетки слева и справа от выбранной клетки
  neighbours += Number(getCellState(field, column - 1, row));
  neighbours += Number(getCellState(field, column + 1, row));

  return neighbours;
}