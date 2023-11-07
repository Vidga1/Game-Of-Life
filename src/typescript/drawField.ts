/* eslint-disable no-param-reassign */
import { getNumOfAliveNeighbours } from "./getNumOfAliveNeighbours";
import { getNewCellState } from "./getNewCellState";

export function drawField(
  htmlElement: HTMLElement,
  field: number[][],
  onCellClick: (x: number, y: number) => void,
): void {
  // Вспомогательная функция для определения стиля ячейки
  const determineCellStyle = (cell: number, columnIndex: number, rowIndex: number): string => {
    if (cell === 1) {
      const numOfAliveNeighbours = getNumOfAliveNeighbours(columnIndex, rowIndex, field);
      const willDie = getNewCellState(cell, numOfAliveNeighbours) === 0;
      // Возвращает стиль для "живой" клетки
      return `height:10px; width:10px; background-color:${willDie ? '#000000' : '#FF0000'};`;
    }
    // Возвращает стиль для "мертвой" клетки
    return 'height:10px; width:10px; background-color:#FFFFFF;';
  };

  // Итератор для создания строк таблицы
  const rowIterator = (row: number[], rowIndex: number): string =>
    `<tr>${row
      .map((cell, columnIndex) => {
        // Получаем стиль для текущей ячейки
        const cellStyle = determineCellStyle(cell, columnIndex, rowIndex);
        // Возвращаем HTML для ячейки с соответствующим стилем и обработчиками данных
        return `<td 
          data-x="${columnIndex}"
          data-y="${rowIndex}"
          class="cell ${cell === 1 ? 'alive' : 'dead'}" 
          style="${cellStyle}"></td>`;
      })
      .join('')}</tr>`;

  // Создание HTML таблицы с помощью итератора для строк
  const table = `<table border="1">${field.map(rowIterator).join('')}</table>`;

  // Устанавливаем HTML таблицы как содержимое переданного HTML элемента
  htmlElement.innerHTML = table;

  // Находим элемент таблицы в DOM
  const tableElement: HTMLTableElement | null = htmlElement.querySelector('table');

  // Добавляем обработчик события клика к таблице
  tableElement?.addEventListener('click', (event: Event) => {
    // Определяем элемент, по которому был совершен клик
    const clickedElement = event.target as HTMLElement;
    // Получаем данные из атрибутов элемента
    const x = parseInt(clickedElement.getAttribute('data-x') ?? '', 10);
    const y = parseInt(clickedElement.getAttribute('data-y') ?? '', 10);

    // Если данные валидны, вызываем функцию обработки клика
    if (!isNaN(x) && !isNaN(y)) {
      onCellClick(x, y);
    }
  });
}
