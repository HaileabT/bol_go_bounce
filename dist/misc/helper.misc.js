export class CanvasHelper {
    resetCtx(ctx) {
        ctx.reset();
    }
    runAnIsolatedDrawing(drawer, ctx, options) {
        // ctx.save();
        if (options) {
            Object.keys(options).forEach((option) => {
                const opt1 = option;
                const opt2 = option;
                ctx[opt2] = options[opt1] ? options[opt1] : ctx[opt2];
            });
        }
        drawer(ctx);
        ctx.stroke();
        ctx.fill();
        // ctx.restore();
    }
}
