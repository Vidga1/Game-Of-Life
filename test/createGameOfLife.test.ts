import { createGameOfLife } from "../src/typescript/createGameOfLife";
import { drawField } from "../src/typescript/drawField";
import { getNextState } from "../src/typescript/getNextState";
import { isAnyoneAlive } from "../src/typescript/isAnyoneAlive";

jest.mock("../src/typescript/drawField");
jest.mock("../src/typescript/getNextState");
jest.mock("../src/typescript/isAnyoneAlive");

describe("createGameOfLife", () => {
  let htmlElement: HTMLElement;
  let fieldWrapper: HTMLElement;
  let startButton: HTMLButtonElement;

  beforeEach(() => {
    jest.useFakeTimers();
    jest.useFakeTimers();
    jest.spyOn(global, "setInterval");
    jest.spyOn(global, "clearInterval");
    htmlElement = document.createElement("div");
    document.body.appendChild(htmlElement);
    createGameOfLife(3, 3, htmlElement);
    fieldWrapper = htmlElement.querySelector(".field-wrapper")!;
    startButton = htmlElement.querySelector("button")! as HTMLButtonElement;
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.restoreAllMocks();
    document.body.removeChild(htmlElement);
  });

  it("initializes a game field and a start button", () => {
    expect(fieldWrapper).not.toBeNull();
    expect(startButton).not.toBeNull();
    expect(startButton.innerHTML).toBe("Start");
  });

  it("starts the game when the start button is clicked", () => {
    startButton.click();
    expect(startButton.innerHTML).toBe("Stop");
    expect(setInterval).toHaveBeenCalledTimes(1);
  });

  it("stops the game when the start button is clicked again", () => {
    // Start the game
    startButton.click();
    // Stop the game
    startButton.click();
    expect(startButton.innerHTML).toBe("Start");
    expect(clearInterval).toHaveBeenCalledTimes(1);
  });

  it("updates the game state periodically when the game is running", () => {
    (getNextState as jest.Mock).mockImplementation((field) => field); // Assume state remains the same for testing
    (isAnyoneAlive as jest.Mock).mockReturnValue(true); // Assume some cells are alive for testing

    startButton.click(); // Start the game
    expect(setInterval).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(1000); // Advance time by 1 second
    expect(getNextState).toHaveBeenCalledTimes(1);
    expect(drawField).toHaveBeenCalledTimes(2); // Initial drawField + one for state update
  });

  it("stops the game and alerts if all cells are dead", () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});
    (isAnyoneAlive as jest.Mock).mockReturnValue(false); // All cells are dead

    startButton.click(); // Start the game
    jest.runOnlyPendingTimers(); // Run the interval callback

    expect(alertMock).toHaveBeenCalledWith("Все клетки мертвы");
    expect(startButton.innerHTML).toBe("Start");
    expect(clearInterval).toHaveBeenCalledTimes(1);

    alertMock.mockRestore();
  });
});
