import PlayScene from "../scenes/play";

export default function randomSolver(blocksIsWall: boolean[][], i: number, j: number): number {
    let neighbours = PlayScene.getNeighbours(i, j);
    let directions:number[] = [];
    neighbours.forEach((neighbour:NeighbourData, direction:number) => {
        if (blocksIsWall[neighbour.i] !== undefined
            && blocksIsWall[neighbour.i][neighbour.j] !== undefined
            && !blocksIsWall[neighbour.i][neighbour.j]) {
            directions.push(direction);
        }
    });
    return directions.length>0?
    directions[Math.floor(directions.length * Math.random())]:-1;
}
