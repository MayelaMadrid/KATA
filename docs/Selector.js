const defaultIndex = 0;

export default class Selector {
  constructor(index = defaultIndex) {
    this.index = index;
    this.selector = document.createElement("img");
    this.selector.className = `flash`;
    this.selector.src = `./images/Characters/Selected/Selector.png`;
    this.top = this.calculateNewTop();
    this.left = this.calculateNewLeft();
  }

  get draw() {
    return this.selector;
  }

  changePosition(index) {
    this.index = index;
    this.selector.style.top = this.calculateNewTop();
    this.selector.style.left = this.calculateNewLeft();
  }

  calculateNewLeft() {
    if (this.index < 6) return this.index * 17 + "%";
    return (this.index - 6) * 17 + "%";
  }

  calculateNewTop() {
    if (this.index < 6) return -6 + "%";
    return 44 + "%";
  }
}
