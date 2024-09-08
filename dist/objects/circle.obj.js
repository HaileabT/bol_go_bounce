import { CanvasHelper } from "../misc/helper.misc.js";
export default class Circle extends CanvasHelper {
    constructor(radius, center, maxVerticalDepth) {
        super();
        this.radius = radius;
        this.center = center;
        this.maxVerticalDepth = maxVerticalDepth;
        this.ACCELERATION = 4;
        this.heightDifference = 0;
        this.goingUp = false;
        this.maxVerticalHeight = Number.MAX_SAFE_INTEGER;
        this.animationEnd = false;
    }
    drawCircle(ctx) {
        ctx.beginPath();
        ctx.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI);
        return ctx;
    }
}
