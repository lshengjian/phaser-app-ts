import { GameScene } from './scenes/play';

export const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'My Game',
  url: 'https://github.com/lshengjian/phaser-app-ts',
  version: '1.0',
  width: 768,
  height: 576,
  type: Phaser.AUTO,
  parent: 'game',
  scene: [GameScene],
  input: {
    keyboard: true
  },
  backgroundColor: '#3A99D9',
  render: { pixelArt: false, antialias: true }
};
export const AppConfig:CatchTheCatGameConfig={
  w: 11,
  h: 11,
  r: 20,
  backgroundColor: 0xffffff,
  parent: 'game',
  statusBarAlign: 'center',
  credit: 'github.com/lshengjian'
};
