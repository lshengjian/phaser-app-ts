import PlayScene from "../scenes/play";

export default class ResetButton extends Phaser.GameObjects.Text {
    constructor(scene: PlayScene) {
        super(scene, 0, 0, "重置", {});
        this.setColor("#000000");
        let r = scene.r;
        this.setFontSize(r);
        this.setPadding(r, r, r, r);
        this.setPosition(0, scene.game.canvas.height);
        this.setOrigin(0, 1);
        let shape = new Phaser.Geom.Rectangle(0, 0, this.width, this.height);
        this.setInteractive(shape, Phaser.Geom.Rectangle.Contains);
        this.scene.add.existing(this);
    }
}

