const defaultIndex = 0;

export default class KeyBoard {
  constructor(uimanager, index = defaultIndex) {
    this.index = index;
    this.lastIndex = index;
    this.uimanager = uimanager;
  }

  activeSelector(index) {
    this.uimanager.drawSelection(this.index, index);
    this.index = index;
  }

  up() {
    this.activeSelector(this.index > 5 ? this.index - 6 : this.index);
  }

  down() {
    this.activeSelector(this.index < 6 ? this.index + 6 : this.index);
  }

  right() {
    this.activeSelector(
      ![5, 11].includes(this.index) ? this.index + 1 : this.index - 5
    );
  }

  left() {
    this.activeSelector(
      ![0, 6].includes(this.index) ? this.index - 1 : this.index - 5
    );
  }

  checkKey({ keyCode }, self) {
    switch (keyCode) {
      case 38:
        self.up();
        break;
      case 40:
        self.down();
        break;
      case 39:
        self.right();
        break;
      case 37:
        self.left();
        break;
    }
  }
  run() {
    window.addEventListener("keydown", (e) => this.checkKey(e, this));
  }
}
