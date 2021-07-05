export default class Player {
  constructor(name, playerFlag) {
    this.name = name;
    this.playerFlag = playerFlag;

    this.player = document.createElement("img");
    this.player.src = `./images/Characters/Selected/${name}.png`;

    this.flag = document.createElement("img");
    const className = ["USA", "Japan"].includes(playerFlag)
      ? `${playerFlag}-${name}`
      : playerFlag;
    this.flag.className = `flag hidden ${className.toLowerCase()}`;
    this.flag.src = `./images/Flags/${playerFlag}.png`;
  }
  get drawFlag() {
    return this.flag;
  }
  get drawPlayer() {
    return this.player;
  }

  onFocus() {
    this.flag.classList.remove("hidden");
  }
  onBlur() {
    this.flag.classList.add("hidden");
  }
}
