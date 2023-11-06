import { createGameOfLife } from "./typescript/createGameOfLife";

import './css/styles.css'

const gameWrapper1: HTMLDivElement = document.createElement("div");
const gameWrapper2: HTMLDivElement = document.createElement("div");

document.body.appendChild(gameWrapper1);
document.body.appendChild(gameWrapper2);

createGameOfLife(3, 3, gameWrapper1);
createGameOfLife(10, 10, gameWrapper2);