import Coordinate from "./misc/coordinates.misc.js";
import Circle from "./objects/circle.obj.js";
const canvas = document.getElementById("canvas");
const driverCanvas = new OffscreenCanvas(window.innerWidth, window.innerHeight);
let fps = 60;
if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
const driverCtx = canvas === null || canvas === void 0 ? void 0 : canvas.getContext("2d");
const ctx = driverCanvas === null || driverCanvas === void 0 ? void 0 : driverCanvas.getContext("2d");
let bolz = [];
const ballGenerator = (x, y) => {
    if (canvas === null || canvas === void 0 ? void 0 : canvas.height) {
        const circle = new Circle(20, new Coordinate(x, y), (canvas === null || canvas === void 0 ? void 0 : canvas.height) - 20);
        bolz.push(circle);
    }
};
const drawStill = (circle) => {
    if (ctx) {
        circle.runAnIsolatedDrawing(circle.drawCircle.bind(circle), ctx, {
            fillStyle: "green",
            lineWidth: 10,
        });
    }
};
const fallRender = () => {
    bolz.forEach((circle) => {
        if (circle.animationEnd) {
            setTimeout(() => {
                delete bolz[bolz.findIndex((bol) => bol === circle)];
            }, 3000);
        }
        if (!circle.animationEnd) {
            circle.heightDifference = circle.heightDifference + circle.ACCELERATION;
            circle.center.y = circle.center.y + circle.heightDifference;
            if (circle.maxVerticalDepth - circle.center.y <= 70 && !circle.goingUp) {
                circle.center.y = circle.maxVerticalDepth;
                circle.goingUp = true;
            }
            if (Math.abs(circle.maxVerticalDepth - circle.maxVerticalHeight) <= 60) {
                drawStill(circle);
                circle.animationEnd = true;
                return;
            }
            if (canvas && circle.center.y + 30 >= (canvas === null || canvas === void 0 ? void 0 : canvas.height)) {
                circle.heightDifference = -1 * circle.heightDifference;
                circle.goingUp = true;
            }
            if (circle.heightDifference === 0 && circle.goingUp) {
                circle.maxVerticalHeight = circle.center.y;
                circle.goingUp = false;
            }
            drawStill(circle);
        }
        else {
            drawStill(circle);
        }
    });
    driverCtx === null || driverCtx === void 0 ? void 0 : driverCtx.drawImage(driverCanvas, 0, 0);
};
window.addEventListener("mousemove", (e) => {
    ballGenerator(e.x, e.y);
});
window.addEventListener("resize", () => {
    if (canvas) {
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
    }
    driverCanvas.height = window.innerHeight;
    driverCanvas.width = window.innerWidth;
});
const checkAnimationActive = () => {
    let animate = false;
    if (bolz.length !== 0) {
        bolz.forEach((bol) => {
            if (!bol.animationEnd) {
                animate = true;
                return;
            }
        });
    }
    return animate;
};
const fallAnimation = () => {
    if (driverCanvas && canvas) {
        ctx === null || ctx === void 0 ? void 0 : ctx.clearRect(0, 0, driverCanvas === null || driverCanvas === void 0 ? void 0 : driverCanvas.width, driverCanvas === null || driverCanvas === void 0 ? void 0 : driverCanvas.height);
        driverCtx === null || driverCtx === void 0 ? void 0 : driverCtx.clearRect(0, 0, canvas === null || canvas === void 0 ? void 0 : canvas.width, canvas === null || canvas === void 0 ? void 0 : canvas.height);
        if (checkAnimationActive()) {
            fallRender();
        }
        else {
            bolz.forEach((bol) => {
                drawStill(bol);
            });
            driverCtx === null || driverCtx === void 0 ? void 0 : driverCtx.drawImage(driverCanvas, 0, 0);
        }
    }
    requestAnimationFrame(fallAnimation);
};
fallAnimation();
