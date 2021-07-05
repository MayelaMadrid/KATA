import Player from "./Player.js";
import Selector from "./Selector.js";
const dataPlayers = [
  { player: "Balrog", flag: "USA" },
  { player: "Blanka", flag: "Brazil" },
  { player: "ChunLi", flag: "China" },
  { player: "Dhalsim", flag: "India" },
  { player: "Guile", flag: "USA" },
  { player: "Honda", flag: "Japan" },
  { player: "Ken", flag: "USA" },
  { player: "Ryu", flag: "Japan" },
  { player: "Sagat", flag: "ThaiLand" },
  { player: "Vega", flag: "Spain" },
  { player: "VIson", flag: "ThaiLand" },
  { player: "Zangief", flag: "USSR" },
];
export default class UIManager {
  constructor() {
    this.players = [];
    this.selector = new Selector();
  }

  drawPlayersAndFlags() {
    const map = document.getElementById("map");
    const selectionContainer =
      document.getElementsByClassName("grid-selection")[0];
    let newPlayers = [];
    for (let item of dataPlayers) {
      const player = new Player(item.player, item.flag);
      selectionContainer.appendChild(player.drawPlayer);
      map.appendChild(player.drawFlag);
      newPlayers = [...newPlayers, player];
    }
    this.players = newPlayers;
    selectionContainer.appendChild(this.selector.draw);
  }

  drawSelection(lastIndex, idx) {
    this.players[idx].onFocus();
    this.players[lastIndex].onBlur();
    this.selector.changePosition(idx);
  }

  run() {
    this.drawPlayersAndFlags();
  }
}
