import data from '../data';

export default class CreditText extends Phaser.GameObjects.Text {
    constructor(scene: Phaser.Scene) {
        super(scene, 0, 0, "", {});
        this.setColor("#000000");
        this.setPosition(scene.game.canvas.width, scene.game.canvas.height);
        this.setOrigin(1, 1);
        let r = 30;//scene.r
        this.setFontSize(r * 0.8);
        this.setPadding(r, r, r, r);
       
        this.setText(data.myconfig.credit);
        this.scene.add.existing(this);
    }
}

