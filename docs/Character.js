export default class Character {
  constructor(name, characterFlag) {
    this.name = name;
    this.characterFlag = characterFlag;

    this.character = document.createElement("img");
    this.character.src = `./images/Characters/Selected/${this.name}.png`;

    this.flag = document.createElement("img");
    const className = ["USA", "Japan"].includes(characterFlag)
      ? `${characterFlag}-${this.name}`
      : characterFlag;
    this.flag.className = `flag hidden ${className.toLowerCase()}`;
    this.flag.src = `./images/Flags/${characterFlag}.png`;

    this.portrait = document.getElementById("portrait");
    this.namePortrait = document.getElementById("name-portrait");
  }
  get drawFlag() {
    return this.flag;
  }
  get drawCharacter() {
    return this.character;
  }

  onFocus() {
    this.flag.classList.remove("hidden");
    this.portrait.src = `./images/Characters/Portraits/${this.name}.png`;
    this.namePortrait.src = `./images/Names/${this.name}.png`;
  }

  onBlur() {
    this.flag.classList.add("hidden");
  }
}
