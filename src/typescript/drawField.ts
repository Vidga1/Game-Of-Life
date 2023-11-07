/* eslint-disable no-param-reassign */
import { getNumOfAliveNeighbours } from "./getNumOfAliveNeighbours";
import { getNewCellState } from "./getNewCellState";

export function drawField(
  htmlElement: HTMLElement,
  field: number[][],
  onCellClick: (x: number, y: number) => void,
): void {
  const rowIterator = (row: number[], rowIndex: number): string =>
  `<tr>${row
    .map((cell, columnIndex) => {
      const numOfAliveNeighbours = getNumOfAliveNeighbours(columnIndex, rowIndex, field);
      const willDie = cell === 1 && getNewCellState(cell, numOfAliveNeighbours) === 0;

      if (cell === 1) {
        const cellClass = willDie ? "cell doomed" : "cell alive";
        return `<td 
        data-x="${columnIndex}"
        data-y="${rowIndex}"
        class="${cellClass}" 
        style="height:10px; width:10px;"></td>`;
      }
        return `<td 
        data-x="${columnIndex}"
        data-y="${rowIndex}"
        class="cell dead" 
        style="background-color:#FFFFFF; height:10px; width:10px;"></td>`;
      })
      .join("")}</tr>`;

  const table = `<table border="1">${field.map(rowIterator).join("")}</table>`;

  htmlElement.innerHTML = table;

  const tableElement: HTMLTableElement | null =
    htmlElement.querySelector("table");

  tableElement?.addEventListener("click", (ev: Event) => {
    const clickedElement = ev.target as HTMLElement;
    const x = parseInt(clickedElement.getAttribute("data-x") ?? "", 10);
    const y = parseInt(clickedElement.getAttribute("data-y") ?? "", 10);

    if (!isNaN(x) && !isNaN(y)) {
      onCellClick(x, y);
    }
  });
}
