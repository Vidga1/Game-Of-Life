/* eslint-disable no-param-reassign */
import { drawField } from "./drawField";
import { getNextState } from "./getNextState";
import { isAnyoneAlive } from "./isAnyoneAlive";

export function createGameOfLife(sizeX: number, sizeY: number, htmlElement: HTMLElement): void {
  let gameIsRunning: boolean = false;
  let timer: number | undefined;

  htmlElement.innerHTML = `
    <button id="resize">RESIZE</button>
    <input type="number" id="sizeX" placeholder="Кол-во колонок" value="${sizeX}" />
    <input type="number" id="sizeY" placeholder="Кол-во строк" value="${sizeY}" />
    <div class="field-wrapper"></div>
    <button id="start">START</button>
  `;

  const fieldWrapper: HTMLElement = htmlElement.querySelector(".field-wrapper")!;
  const buttonStart: HTMLButtonElement = htmlElement.querySelector("#start")! as HTMLButtonElement;
  const buttonResize: HTMLButtonElement = htmlElement.querySelector("#resize")! as HTMLButtonElement;
  const inputSizeX: HTMLInputElement = htmlElement.querySelector("#sizeX")! as HTMLInputElement;
  const inputSizeY: HTMLInputElement = htmlElement.querySelector("#sizeY")! as HTMLInputElement;

  let field: number[][] = Array.from({ length: sizeY }, () =>
    Array.from({ length: sizeX }, () => 0)
  );

  const cellClickHandler = (x: number, y: number): void => {
    field[y][x] = field[y][x] === 0 ? 1 : 0;
    drawField(fieldWrapper, field, cellClickHandler);
  };

  const resizeField = () => {
    sizeX = parseInt(inputSizeX.value, 10);
    sizeY = parseInt(inputSizeY.value, 10);
    field = Array.from({ length: sizeY }, () => Array.from({ length: sizeX }, () => 0));
    drawField(fieldWrapper, field, cellClickHandler);
  };

  drawField(fieldWrapper, field, cellClickHandler);

  function stopGame(): void {
    gameIsRunning = false;
    buttonStart.innerHTML = "Start";
    if (timer) {
      clearInterval(timer);
    }
  }

  function startGame(): void {
    gameIsRunning = true;
    buttonStart.innerHTML = "Stop";
    timer = window.setInterval(() => {
      field = getNextState(field);
      drawField(fieldWrapper, field, cellClickHandler);
      if (!isAnyoneAlive(field)) {
        alert("Все клетки мертвы");
        stopGame();
      }
    }, 1000);
  }

  buttonStart.addEventListener("click", () => {
    if (!gameIsRunning) {
      startGame();
    } else {
      stopGame();
    }
  });

  buttonResize.addEventListener("click", () => {
    if (!gameIsRunning) {
      resizeField();
    } else {
      alert('Остановите игру перед изменением размера поля.');
    }
  });
}