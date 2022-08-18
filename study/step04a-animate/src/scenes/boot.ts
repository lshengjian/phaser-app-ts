export class BootScene extends Phaser.Scene {
  

  constructor() {
    super({
      key: 'BootScene'
    });
  }

  preload(): void {
    this.load.multiatlas('cityscene', 'assets/demo.json', 'assets');
  }


  update(): void {
    this.scene.start('GameScene');
  }

 
}
