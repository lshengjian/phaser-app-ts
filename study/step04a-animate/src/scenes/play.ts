
export class PlayScene extends Phaser.Scene {
  private capguy!: Phaser.GameObjects.Sprite;

  constructor() {
    super({
      key: 'GameScene'
    });
  }

  create(): void {
    this.add.sprite(0, 0, 'cityscene', 'background.png');
    this.capguy = this.add.sprite(0, 400, 'cityscene', 'capguy/walk/0001.png');
    this.capguy.setScale(0.5, 0.5);
    let frameNames = this.anims.generateFrameNames('cityscene', {
      start: 1, end: 8, zeroPad: 4,
      prefix: 'capguy/walk/', suffix: '.png'
    });
    this.anims.create({ key: 'walk', frames: frameNames, frameRate: 10, repeat: -1 });
    this.capguy.anims.play('walk');
  }
  update(t: number, dt: number): void {

    this.capguy.x += dt / 8;
    if (this.capguy.x > 800) {
      this.capguy.x = -50;
    }
  }

}
