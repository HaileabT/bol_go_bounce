import Coordinate from "./misc/coordinates.misc.js";
import Circle from "./objects/circle.obj.js";

const canvas = document.getElementById("canvas") as HTMLCanvasElement | null;
const driverCanvas = new OffscreenCanvas(window.innerWidth, window.innerHeight);

if (canvas) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

const driverCtx: CanvasRenderingContext2D | null | undefined =
  canvas?.getContext("2d");
const ctx: OffscreenCanvasRenderingContext2D | null =
  driverCanvas?.getContext("2d");
let bolz: Array<Circle> = [];

const ballGenerator = (x: number, y: number): void => {
  if (canvas?.height) {
    const circle: Circle = new Circle(
      20,
      new Coordinate(x, y),
      canvas?.height - 20
    );
    bolz.push(circle);
  }
};

const drawStill = (circle: Circle): void => {
  if (ctx) {
    circle.runAnIsolatedDrawing(circle.drawCircle.bind(circle), ctx, {
      fillStyle: "green",
      lineWidth: 10,
    });
  }
};

const fallRender = () => {
  bolz.forEach((circle, index) => {
    if (circle.animationEnd) {
      setTimeout(() => {
        delete bolz[bolz.findIndex((bol) => bol === circle)];
      }, 3000);
    }
    if (!circle.animationEnd) {
      circle.heightDifference = circle.heightDifference + circle.ACCELERATION;
      circle.center.y = circle.center.y + circle.heightDifference;
      if (circle.maxVerticalDepth - circle.center.y <= 80 && !circle.goingUp) {
        circle.center.y = circle.maxVerticalDepth;
        circle.goingUp = true;
      }

      if (Math.abs(circle.maxVerticalDepth - circle.maxVerticalHeight) <= 70) {
        drawStill(circle);

        circle.animationEnd = true;
        return;
      }

      if (canvas && circle.center.y + 20 >= canvas?.height) {
        circle.heightDifference = -1 * circle.heightDifference;
        circle.goingUp = true;
      }

      if (circle.heightDifference === 0 && circle.goingUp) {
        circle.maxVerticalHeight = circle.center.y;
        circle.goingUp = false;
      }

      drawStill(circle);
    } else {
      drawStill(circle);
    }
  });
  driverCtx?.drawImage(driverCanvas as CanvasImageSource, 0, 0);
};

window.addEventListener("click", (e) => {
  ballGenerator(e.x, e.y);
});

const checkAnimationActive = (): boolean => {
  let animate: boolean = false;
  if (bolz.length !== 0) {
    bolz.forEach((bol: Circle) => {
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
    ctx?.clearRect(0, 0, driverCanvas?.width, driverCanvas?.height);
    driverCtx?.clearRect(0, 0, canvas?.width, canvas?.height);
    if (checkAnimationActive()) {
      fallRender();
    } else {
      bolz.forEach((bol) => {
        drawStill(bol);
      });
      driverCtx?.drawImage(driverCanvas as CanvasImageSource, 0, 0);
    }
  }
  requestAnimationFrame(fallAnimation);
};

fallAnimation();
