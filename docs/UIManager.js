import Character from "./Character.js";
import Selector from "./Selector.js";
const dataCharacters = [
  { character: "Balrog", flag: "USA" },
  { character: "Blanka", flag: "Brazil" },
  { character: "ChunLi", flag: "China" },
  { character: "Dhalsim", flag: "India" },
  { character: "Guile", flag: "USA" },
  { character: "Honda", flag: "Japan" },
  { character: "Ken", flag: "USA" },
  { character: "Ryu", flag: "Japan" },
  { character: "Sagat", flag: "ThaiLand" },
  { character: "Vega", flag: "Spain" },
  { character: "VIson", flag: "ThaiLand" },
  { character: "Zangief", flag: "USSR" },
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
