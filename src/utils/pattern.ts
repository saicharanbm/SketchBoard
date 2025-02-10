const createPatternCanvas = (
  size: number,
  draw: (ctx: CanvasRenderingContext2D) => void
) => {
  const patternCanvas = document.createElement("canvas");
  patternCanvas.width = size;
  patternCanvas.height = size;
  const patternContext = patternCanvas.getContext("2d");

  if (patternContext) {
    patternContext.clearRect(0, 0, size, size); // Ensure consistency
    draw(patternContext);
  }

  return patternCanvas;
};

const Pattern1 = (context: CanvasRenderingContext2D, color: string) => {
  const patternCanvas = createPatternCanvas(15, (ctx) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(0, 15);
    ctx.lineTo(15, 0);
    ctx.stroke();
    ctx.closePath();
  });

  return context.createPattern(patternCanvas, "repeat");
};

const Pattern2 = (context: CanvasRenderingContext2D, color: string) => {
  const patternCanvas = createPatternCanvas(5, (ctx) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(0, 5);
    ctx.lineTo(5, 0);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(5, 5);
    ctx.stroke();
    ctx.closePath();
  });

  return context.createPattern(patternCanvas, "repeat");
};

const Pattern3 = (context: CanvasRenderingContext2D, color: string) => {
  const patternCanvas = createPatternCanvas(15, (ctx) => {
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(0, 15);
    ctx.lineTo(15, 0);
    ctx.moveTo(0, 0);
    ctx.lineTo(15, 15);
    ctx.stroke();
    ctx.closePath();
  });

  return context.createPattern(patternCanvas, "repeat");
};

export { Pattern1, Pattern2, Pattern3 };
