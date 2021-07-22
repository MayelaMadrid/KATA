import Character from "./Character.js";
import Selector from "./Selector.js";
const dataCharacters = [
  { character: "Ryu", flag: "Japan" },
  { character: "Honda", flag: "Japan" },
  { character: "Blanka", flag: "Brazil" },
  { character: "Guile", flag: "USA" },
  { character: "Balrog", flag: "USA" },
  { character: "Vega", flag: "Spain" },
  { character: "Ken", flag: "USA" },
  { character: "ChunLi", flag: "China" },
  { character: "Zangief", flag: "USSR" },
  { character: "Dhalsim", flag: "India" },
  { character: "Sagat", flag: "ThaiLand" },
  { character: "VIson", flag: "ThaiLand" },
];
export default class UIManager {
  constructor(defaultIndex) {
    this.characters = [];
    this.defaultIndex = defaultIndex;
    this.selector = new Selector();
  }

  drawCharactersAndFlags() {
    const map = document.getElementById("map");
    const selectionContainer =
      document.getElementsByClassName("grid-selection")[0];
    let newCharacters = [];
    for (let item of dataCharacters) {
      const character = new Character(item.character, item.flag);
      selectionContainer.appendChild(character.drawCharacter);
      map.appendChild(character.drawFlag);
      newCharacters = [...newCharacters, character];
    }
    this.characters = newCharacters;
    selectionContainer.appendChild(this.selector.draw);
  }

  drawSelection(lastIndex, idx) {
    this.characters[idx].onFocus();
    this.characters[lastIndex].onBlur();
    this.selector.changePosition(idx);
  }

  run() {
    this.drawCharactersAndFlags();
    this.characters[this.defaultIndex].onFocus();
    this.selector.changePosition(this.defaultIndex);
  }
}
