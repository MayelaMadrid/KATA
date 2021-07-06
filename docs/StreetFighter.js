import KeyBoard from "./KeyBoard.js";
import UIManager from "./UIManager.js";

const defaultIndex = 0;

export default class StreetFighter {
  constructor() {
    this.uimanager = new UIManager(defaultIndex);
    this.keyBoardManager = new KeyBoard(this.uimanager, defaultIndex);
  }

  runBoard() {
    this.keyBoardManager.run();
    this.uimanager.run();
  }
  start() {}
  restart() {}
}
