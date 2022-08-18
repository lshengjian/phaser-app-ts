
import Block from '../sprites/block';
import Cat from '../sprites/cat';
import data from '../data';
import CreditText from '../sprites/creditText';
import StatusBar from '../sprites/statusBar';
import ResetButton from '../sprites/resetButton';
//  type RecordCoord = {
//   cat: {i:number, j:number}[],
//   wall: {i:number, j:number}[],
// };

enum GameState {
  PLAYING = "playing",
  WIN = "win",
  LOSE = "lose"
};

export default class PlayScene extends Phaser.Scene {


  public readonly w: number;
  public readonly h: number;
  public readonly r: number;
  public readonly dx: number;
  public readonly dy: number;

  constructor(w: number, h: number, r: number) {
    super({
      key: "MainScene",
    });
    this.w = w;
    this.h = h;
    this.r = r;
    this.dx = this.r * 2;
    this.dy = this.r * Math.sqrt(3);
  }

  preload(): void {
    this.load.pack('pack1', '/assets/pack.json', 'cat');
  }

  init(): void {
    console.log('init');
    //  
  }
  get cat(): Cat {
    return this.data.get("cat");
  }

  set cat(value: Cat) {
    this.data.set("cat", value);
  }

  get statusBar(): Phaser.GameObjects.Text {
    return this.data.get("status_bar");
  }

  set statusBar(value: Phaser.GameObjects.Text) {
    this.data.set("status_bar", value);
  }

  get creditText(): CreditText {
    return this.data.get("credit_text");
  }

  set creditText(value: CreditText) {
    this.data.set("credit_text", value);
  }


  get state(): GameState {
    return this.data.get("state");
  }

  set state(value: GameState) {
    switch (value) {
      case GameState.PLAYING:
        break;
      case GameState.LOSE:
        this.setStatusText("猫已经跑到地图边缘了，你输了");
        break;
      case GameState.WIN:
        this.setStatusText("猫已经无路可走，你赢了");
        break;
      default:
        return;
    }
    this.data.set("state", value);
  }

  static getNeighbours(i: number, j: number): NeighbourData[] {
    let left = { i: i - 1, j: j };
    let right = { i: i + 1, j: j };
    let top_left;
    let top_right;
    let bottom_left;
    let bottom_right;
    if ((j & 1) === 0) {
      top_left = { i: i - 1, j: j - 1 };
      top_right = { i: i, j: j - 1 };
      bottom_left = { i: i - 1, j: j + 1 };
      bottom_right = { i: i, j: j + 1 };
    } else {
      top_left = { i: i, j: j - 1 };
      top_right = { i: i + 1, j: j - 1 };
      bottom_left = { i: i, j: j + 1 };
      bottom_right = { i: i + 1, j: j + 1 };
    }
    let neighbours: NeighbourData[] = [];
    neighbours[0] = left;
    neighbours[1] = top_left;
    neighbours[2] = top_right;
    neighbours[3] = right;
    neighbours[4] = bottom_right;
    neighbours[5] = bottom_left;
    return neighbours;
  }
  reset() {
    this.cat.reset();
    this.resetBlocks();


    // this.recordCoord = {
    //     cat: [],
    //     wall: []
    // };
    this.state = GameState.PLAYING;
    this.setStatusText("点击小圆点，围住小猫");
  }
  playerClick(i: number, j: number): boolean {
    if (this.cat.anims.isPlaying) {
      this.cat.anims.stop();
    }
    if (this.state !== GameState.PLAYING) {
      this.setStatusText("游戏已经结束，重新开局");
      this.reset();
      return false;
    }
    let block = this.getBlock(i, j);
    if (!block) {
      this.setStatusText("代码错误，当前位置不存在");
      return false;
    }
    if (block.isWall) {
      this.setStatusText("点击位置已经是墙了，禁止点击");
      return false;
    }
    if (this.cat.i === i && this.cat.j === j) {
      this.setStatusText("点击位置是猫当前位置，禁止点击");
      return false;
    }
    block.isWall = true;
    if (this.cat.isCaught()) {
      this.setStatusText("猫已经无路可走，你赢了");
      this.state = GameState.WIN;
      return false;
    }

    // this.recordCoord.cat.push({i: this.cat.i, j:this.cat.j});
    // this.recordCoord.wall.push({i, j});

    this.setStatusText("点击位置 " + `(行: ${j + 1}，列:${i + 1})`);
    let result = this.cat.step();
    if (!result) {
      this.setStatusText("猫认输，你赢了！");
      this.state = GameState.WIN;
    }
    return true;
  }
  private setStatusText(message: string) {
    this.statusBar.setText(message);
  }

  get blocks(): Block[][] {
    return this.data.get("blocks");
  }

  set blocks(value: Block[][]) {
    this.data.set("blocks", value);
  }

  get blocksData(): boolean[][] {
    let result: boolean[][] = [];
    this.blocks.forEach((column, i) => {
      result[i] = [];
      column.forEach((block, j) => {
        result[i][j] = block.isWall;
      });
    });
    return result;
  }
  create(): void {
    console.log('create');

    this.creditText = new CreditText(this);
    this.statusBar = new StatusBar(this);
    let resetButton = new ResetButton(this);

    resetButton.on("pointerup", () => {
      this.reset();
    });

    this.createAnimations();
    this.createBlocks();
    this.createCat();

    this.reset();


  }
  getPosition(i: number, j: number): NeighbourData {
    return {
      x: this.r * 3 + ((j & 1) === 0 ? this.r : this.dx) + i * this.dx,
      y: this.r * 3 + this.r + j * this.dy,
    };
  }

  getBlock(i: number, j: number): Block | null {
    if (!(i >= 0 && i < this.w && j >= 0 && j < this.h)) {
      return null;
    }
    return this.blocks[i][j];
  }

  private randomWall() {
    for (let k = 0; k < 8; k++) {
      let i = Math.floor(this.w * Math.random());
      let j = Math.floor(this.h * Math.random());
      if (i !== this.cat.i || j !== this.cat.j) {
        let b = this.getBlock(i, j)
        if (b) b.isWall = true;
      }
    }
  }
  private createAnimations(): void {
    data.animations.forEach(animation => {
      let frames: {
        key: string,
        frame: number
      }[] = [];
      animation.textures.forEach(texture => {
        frames.push({
          key: texture,
          frame: 0
        });
      });
      this.anims.create({
        key: animation.name,
        frames: frames,
        frameRate: data.frameRate,
        repeat: animation.repeat,
      });
    });
  }
  private createCat(): void {
    let cat = new Cat(this);
    cat.on("escaped", () => {
      this.state = GameState.LOSE;
    });
    cat.on("win", () => {
      this.state = GameState.WIN;
    });
    //   cat.solver = nearestSolver;
    this.cat = cat;

  }
  private resetBlocks() {
    this.blocks.forEach(cols => {
      cols.forEach(block => {
        block.isWall = false;
      });
    });
    this.randomWall();
  }
  private createBlocks(): void {
    let blocks: Block[][] = [];
    for (let i = 0; i < this.w; i++) {
      blocks[i] = [];
      for (let j = 0; j < this.h; j++) {
        let block = new Block(this, i, j, this.r * 0.9);
        blocks[i][j] = block;

        block.on("player_click", this.playerClick.bind(this));
      }
    }
    this.blocks = blocks;
  }


}
