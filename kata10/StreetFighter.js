import KeyBoard from "./KeyBoard.js";
import UIManager from "./UIManager.js";
export default class StreetFighter {
  constructor() {
    this.uimanager = new UIManager();
    this.keyBoardManager = new KeyBoard(this.uimanager);
  }

  runBoard() {
    this.keyBoardManager.run();
    this.uimanager.run();
  }
  start() {}
  restart() {}
}
