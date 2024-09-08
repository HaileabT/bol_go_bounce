import { CanvasDrawOptions } from "./CanvasDrawOptions.misc";

export class CanvasHelper {
  public resetCtx(ctx: CanvasRenderingContext2D) {
    ctx.reset();
  }

  public runAnIsolatedDrawing(
    drawer: Function,
    ctx: OffscreenCanvasRenderingContext2D,
    options?: CanvasDrawOptions
  ) {
    // ctx.save();
    if (options) {
      Object.keys(options).forEach((option: string) => {
        const opt1 = option as keyof CanvasDrawOptions;
        const opt2 = option as keyof Omit<
          OffscreenCanvasRenderingContext2D,
          "canvas"
        >;
        ctx[opt2] = options[opt1] ? options[opt1] : ctx[opt2];
      });
    }
    drawer(ctx);
    ctx.stroke();
    ctx.fill();
    // ctx.restore();
  }
}
