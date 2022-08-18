import PlayScene from "../scenes/play";

class Cell {
    public readonly i: number;
    public readonly j: number;
    public readonly isWall: boolean;
    public readonly isEdge: boolean;
    public distance: number;
    private parent: Grid;

    constructor(parent: Grid, i: number, j: number, isWall: boolean) {
        this.i = i;
        this.j = j;
        this.isWall = isWall;
        this.distance = Infinity;
        this.parent = parent;
        this.isEdge = this.i <= 0 || this.i >= this.parent.w - 1 || this.j <= 0 || this.j >= this.parent.h - 1;
    }

    public _routesCount: number;

    get routesCount(): number {
        if (this._routesCount === undefined) {
            if (this.isEdge) {
                this._routesCount = 1;
            } else {
                let routesCount = 0;
                this.neighbours.forEach(neighbour => {
                    if (neighbour !== null && !neighbour.isWall) {
                        if (neighbour.distance < this.distance) {
                            routesCount += neighbour.routesCount;
                        }
                    }
                });
                this._routesCount = routesCount;
            }
        }
        return this._routesCount;
    }

    private _neighbours: Cell[];

    get neighbours(): Cell[] {
        if (this._neighbours === undefined) {
            let neighbours = PlayScene.getNeighbours(this.i, this.j);
            this._neighbours = neighbours.map(neighbour => {
                return this.parent.getCell(neighbour.i, neighbour.j);
            });
        }
        return this._neighbours;
    }

    get directions(): number[] {
        let result:number[] = [];
        this.neighbours.forEach((neighbour, direction) => {
            if (neighbour !== null && !neighbour.isWall) {
                if (neighbour.distance < this.distance) {
                    result.push(direction);//此方向通向出口
                }
            }
        });
        return result;
    }

    get direction(): number {
        let maxRoutesCount = 0;
        let result = -1;
        this.directions.forEach(direction => {
            let neighbour = this.neighbours[direction];
            if (neighbour.routesCount > maxRoutesCount) {
                maxRoutesCount = neighbour.routesCount;//递归查看出口最多的方向
                result = direction;
            }
        });
        return result;
    }
}

class Grid {
    public readonly w: number;
    public readonly h: number;
    private cells: Cell[][];

    constructor(isWall: boolean[][]) {
        this.w = isWall.length;
        if (this.w <= 0) {
            throw new Error("empty colums");
        }
        this.h = isWall[0].length;
        this.cells = isWall.map((col, i) => {
            return col.map((cell, j) => {
                return new Cell(this, i, j, isWall[i][j]);
            });
        });
    }

    getCell(i: number, j: number): Cell|null{
        if (!(i >= 0 && i < this.w && j >= 0 && j < this.h)) {
            return null;
        }
        return this.cells[i][j];
    }

    /**
     * 洪水法 BFS 求每一块到边缘距离
     *
     * 1. 初始化一个队列，添加所有边界块，距离设为 0
     * 2. 遍历队列中每一个元素，对于他周围的 6 个相邻块
     *     * 如果没有遍历过，则设置为当前距离 + 1
     *     * 如果遍历过，则设置为它的距离与当前距离 + 1 中间的较小值
     */
    BFS() {
        let queue: Cell[] = [];
        //从地图周围开始，空闲格子距离设置为0
        this.cells.forEach(col => {
            col.forEach(cell => {
                cell._routesCount=undefined;
                if (cell.isEdge && !cell.isWall) {
                    cell.distance = 0;
                    queue.push(cell);
                }
            });
        });
        while (queue.length > 0) {
            let cell = queue.shift();
            cell.neighbours.forEach(neighbour => {
                if (neighbour !== null && !neighbour.isEdge && !neighbour.isWall) {
                    if (neighbour.distance > cell.distance + 1) {
                        neighbour.distance = cell.distance + 1;
                        if (queue.indexOf(neighbour) < 0) {
                            queue.push(neighbour);
                        }
                    }
                }
            });
        }
        console.log(this.toString());
    };

    // toString(): string {
    //     let lines = [];
    //     for (let j = 0; j < this.h; j++) {
    //         let distances :(string|number)[]= [];
    //         for (let i = 0; i < this.w; i++) {
    //             let cell = this.getCell(i, j);
    //             if (cell&&cell.isWall) {
    //                 distances.push("*");
    //             } else if (cell&&cell.distance === Infinity) {
    //                 distances.push("-");
    //             } else {
    //                 distances.push(cell.distance);
    //             }
    //         }
    //         let line = distances.join(" ");
    //         if ((j & 1) === 1) {
    //             line = " " + line;
    //         }
    //         lines.push(line);
    //     }
    //     return lines.join("\n");
    // }

    toString(): string {
        let lines = [];
        for (let j = 0; j < this.h; j++) {
            let distances = [];
            for (let i = 0; i < this.w; i++) {
                let cell = this.getCell(i, j);
                if (cell.isWall) {
                    distances.push("*");
                } else {
                    distances.push(cell.routesCount);
                }
            }
            let line = distances.join(" ");
            if ((j & 1) === 1) {
                line = " " + line;
            }
            lines.push(line);
        }
        return lines.join("\n");
    }
}

export default function nearestSolver(mapInfo: boolean[][], i: number, j: number): number {
    let grid = new Grid(mapInfo);
    grid.BFS();
    let cell = grid.getCell(i, j);
    // if(cell===null)
    //    return -1;
    return cell.direction;

}


