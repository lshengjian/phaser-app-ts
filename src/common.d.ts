declare type CatSolver = (blocksIsWall: boolean[][], i: number, j: number) => number;
declare type NeighbourData = {
    i?: number,
    j?: number,
    x?: number,
    y?: number,
  };
declare type CatchTheCatGameConfig = {
  /**
   * grid columns
   */
  w: number,
  /**
   * grid rows
   */
  h: number,
  /**
   * grid circle radius
   */
  r: number,
  /**
   * The background color of the game canvas. The default is black.
   */
  backgroundColor?: string | number;
  /**
   * The DOM element that will contain the game canvas, or its `id`. If null (the default) or if the named element doesn't exist, the game canvas is inserted directly into the document body.
   */
  parent?: HTMLElement | string;
  /**
   * 'left' or 'center'
   */
  statusBarAlign?: string;
  /**
   * text at bottom right corner
   */
  credit?: string;
};
