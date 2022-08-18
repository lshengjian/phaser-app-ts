import PlayScene from "../scenes/play";

export default function defaultSolver(blocksIsWall: boolean[][], i: number, j: number): number {
    let result = -1;
    let neighbours = PlayScene.getNeighbours(i, j);
    neighbours.forEach((neighbour:NeighbourData, direction:number) => {
        if (result === -1) {
            if (blocksIsWall[neighbour.i] !== undefined
                && blocksIsWall[neighbour.i][neighbour.j] !== undefined
                && !blocksIsWall[neighbour.i][neighbour.j]) {
                result = direction;
            }
        }
    });
    return result;
}
