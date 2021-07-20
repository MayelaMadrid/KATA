import KeyBoard from "./KeyBoard.js";
import UIManager from "./UIManager.js";

const defaultIndex = 0;

export default class StreetFighter {
  constructor() {
    this.uimanager = new UIManager(defaultIndex);
    this.keyBoardManager = new KeyBoard(this.uimanager, defaultIndex);
  }

  playAudio() {
    let audio = new Audio("./audio/videoplayback.mp4");
    audio.oncanplaythrough = () => {
      audio.play();
    };
  }

  runBoard() {
    this.playAudio();
    this.keyBoardManager.run();
    this.uimanager.run();
  }

  start() {}
  restart() {}
}
