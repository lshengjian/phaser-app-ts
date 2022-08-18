import { BootScene } from './scenes/boot';
import { PlayScene } from './scenes/play';

export const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Pack Demo',
  version: '1.0',
  width: 800,
  height: 600,
  type: Phaser.AUTO,
  parent: 'game',
  scene: [BootScene, PlayScene],
  backgroundColor: '#de3412',
  render: { pixelArt: true, antialias: true }
};
