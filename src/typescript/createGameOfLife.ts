/* eslint-disable no-param-reassign */
import { drawField } from "./drawField";
import { getNextState } from "./getNextState";
import { isAnyoneAlive } from "./isAnyoneAlive";

/**
 * Создание игры Жизнь
 * @param sizeX {number} - число колонок
 * @param sizeY {number} - число строк
 * @param htmlElement {HTMLElement} - элемент, в котором будет отрисована игра
 * @returns void
 */
export function createGameOfLife(sizeX: number, sizeY: number, htmlElement: HTMLElement): void {
  let gameIsRunning: boolean = false;
  let timer: number | undefined;

  htmlElement.innerHTML = `<div class="field-wrapper"></div><button>Start</button>`;
  const fieldWrapper: HTMLElement = htmlElement.querySelector(".field-wrapper")!;
  const button: HTMLButtonElement = htmlElement.querySelector("button")! as HTMLButtonElement;

  let field: number[][] = Array.from({ length: sizeY }, () =>
    Array.from({ length: sizeX }, () => 0)
  );

  const cellClickHandler = (x: number, y: number): void => {
    field[y][x] = field[y][x] === 0 ? 1 : 0;
    drawField(fieldWrapper, field, cellClickHandler);
  };

  drawField(fieldWrapper, field, cellClickHandler);

  function stopGame(): void {
    gameIsRunning = false;
    button.innerHTML = "Start";
    if (timer) {
      clearInterval(timer);
    }
  }

  function startGame(): void {
    gameIsRunning = true;
    button.innerHTML = "Stop";
    timer = window.setInterval(() => {
      field = getNextState(field);
      drawField(fieldWrapper, field, cellClickHandler);
      if (!isAnyoneAlive(field)) {
        alert("Все клетки мертвы");
        stopGame();
      }
    }, 1000);
  }

  button.addEventListener("click", () => {
    if (!gameIsRunning) {
      startGame();
    } else {
      stopGame();
    }
  });
}