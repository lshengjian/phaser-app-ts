import 'phaser';

import PlayScene from "./scenes/play";
import data from './data';

export default class CatchTheCatGame extends Phaser.Game {
  public readonly mainScene: PlayScene;
  //public readonly myConfig: CatchTheCatGameConfig;
  constructor(config: CatchTheCatGameConfig) {
    
    let w = config.w;
    let h = config.h;
    let r = config.r * window.devicePixelRatio;
    let canvasZoom = 1 / window.devicePixelRatio;
    let canvasWidth = Math.floor((6.5 + 2 * w) * r);
    let canvasHeight = Math.floor((6 + Math.sqrt(3) * h) * r);
    let scene = new PlayScene(w, h, r);
    const gameConfig:Phaser.Types.Core.GameConfig = {
        width: canvasWidth,
        height: canvasHeight,
        type: Phaser.AUTO,
        parent: config.parent,
        backgroundColor: config.backgroundColor,
        scene: scene,
        zoom: canvasZoom,
    };
    super(gameConfig);
    this.mainScene = scene;
    
  }
}

window.addEventListener('load', () => {
  const game =  new CatchTheCatGame(data.myconfig);
});


