import PlayScene from "../scenes/play";


export default class Block extends Phaser.GameObjects.Arc {
    public readonly i: number;
    public readonly j: number;
    public readonly r: number;
   // protected scene: PlayScene;
    private m_isWall: boolean;
    constructor(scene: PlayScene, i: number, j: number, r: number) {
        let position = scene.getPosition(i, j);
        super(scene, position.x, position.y, r, 0, 360, false, 0, 1);
        this.i = i;
        this.j = j;
        this.r = r;
        
       
        let shape = new Phaser.Geom.Circle(this.r / 2, this.r / 2, this.r);
 
        this.setInteractive(shape, Phaser.Geom.Circle.Contains);
        this.on("pointerdown", () => {
            this.emit("player_click", this.i, this.j);
        });
        this.isWall = false;
        this.scene.add.existing(this);
       
    }

  

    get isWall(): boolean {
        return this.m_isWall;
    }

    set isWall(value: boolean) {
        this.m_isWall = value;
        if (value) {
            this.fillColor = 0x003366;
        } else {
            this.fillColor = 0xb3d9ff;
        }
    }
}
