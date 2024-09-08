import { CanvasDrawOptions } from "../misc/CanvasDrawOptions.misc.js";
import Coordinate from "../misc/coordinates.misc.js";
import { CanvasHelper } from "../misc/helper.misc.js";

export default class Circle extends CanvasHelper {
  public ACCELERATION: number = 9.8;
  public heightDifference: number = 0;
  public goingUp: boolean = false;
  public maxVerticalHeight: number = Number.MAX_SAFE_INTEGER;
  public animationEnd: boolean = false;
  constructor(
    public radius: number,
    public center: Coordinate,
    public maxVerticalDepth: number
  ) {
    super();
  }

  public drawCircle(
    ctx: OffscreenCanvasRenderingContext2D
  ): OffscreenCanvasRenderingContext2D {
    ctx.beginPath();
    ctx.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI);
    return ctx;
  }
}
