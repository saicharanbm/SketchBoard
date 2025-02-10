import { Element, Pattern, Point } from "./typesAndInterface";
import { Pattern1, Pattern2, Pattern3 } from "./pattern";

const drawFreeStyle = function (
  element: Element,
  context: CanvasRenderingContext2D
) {
  context.beginPath();
  context.moveTo(element.points[0].x, element.points[0].y);
  context.strokeStyle = element.strokeColor;
  context.lineWidth = element.thickness;
  element.points.forEach((point) => {
    context.lineTo(point.x, point.y);
  });
  context.stroke();
};

const drawLine = function (
  lineStart: Point,
  lineEnd: Point,
  context: CanvasRenderingContext2D,
  strokeColor: string = "black",
  thickness: number = 2
) {
  context.beginPath();
  context.moveTo(lineStart.x, lineStart.y);
  context.strokeStyle = strokeColor;
  context.lineWidth = thickness;
  context.lineTo(lineEnd.x, lineEnd.y);
  context.stroke();
};

const drawArrow = function (
  context: CanvasRenderingContext2D,
  arrowStart: Point,
  arrowEnd: Point,
  strokeColor: string = "black",
  thickness: number = 3
) {
  const headlen = 12 * thickness;
  const headAdjust = headlen * 0.2;

  const dx = arrowEnd.x - arrowStart.x;
  const dy = arrowEnd.y - arrowStart.y;
  const angle = Math.atan2(dy, dx);
  const sharpAngle = Math.PI / 9;

  const arrowTipX = arrowEnd.x - headAdjust * Math.cos(angle);
  const arrowTipY = arrowEnd.y - headAdjust * Math.sin(angle);

  context.beginPath();
  context.strokeStyle = strokeColor;
  context.lineWidth = thickness;

  context.moveTo(arrowStart.x, arrowStart.y);
  context.lineTo(arrowTipX, arrowTipY);

  context.moveTo(arrowEnd.x, arrowEnd.y);
  context.lineTo(
    arrowEnd.x - headlen * Math.cos(angle - sharpAngle),
    arrowEnd.y - headlen * Math.sin(angle - sharpAngle)
  );
  context.moveTo(arrowEnd.x, arrowEnd.y);
  context.lineTo(
    arrowEnd.x - headlen * Math.cos(angle + sharpAngle),
    arrowEnd.y - headlen * Math.sin(angle + sharpAngle)
  );

  context.stroke();
};

const getPatternType = (
  pattern: Pattern,
  ctx: CanvasRenderingContext2D,
  fillColor: string
) => {
  switch (pattern) {
    case "pattern1":
      return Pattern1(ctx, fillColor);
      break;
    case "pattern2":
      return Pattern2(ctx, fillColor);
      break;
    case "pattern3":
      return Pattern3(ctx, fillColor);
      break;
    default:
      return null;
  }
};

const drawRectangle = function (
  start: Point,
  end: Point,
  ctx: CanvasRenderingContext2D,
  pattern: Pattern = "pattern1",
  strokeColor: string = "blue",
  fillColor: string = "red",
  thickness: number = 2,
  isDotted: boolean = true
) {
  const width = end.x - start.x;
  const height = end.y - start.y;

  ctx.save();

  // Ensure consistent pattern generation
  const patternType = getPatternType(pattern, ctx, fillColor);
  // Normalize for negative width/height
  const rectX = Math.min(start.x, end.x);
  const rectY = Math.min(start.y, end.y);
  const rectWidth = Math.abs(width);
  const rectHeight = Math.abs(height);

  // Translate for correct pattern alignment
  ctx.translate(rectX, rectY);

  if (patternType) {
    ctx.fillStyle = patternType;
  } else {
    ctx.fillStyle = fillColor;
  }

  ctx.fillRect(0, 0, rectWidth, rectHeight);

  // Reset translation before applying stroke to avoid misalignment
  ctx.translate(-rectX, -rectY);

  if (isDotted) {
    ctx.setLineDash([4, 4]); // 5px dash, 5px gap (adjust as needed)
  } else {
    ctx.setLineDash([]); // Reset to solid line
  }

  // Ensure sharp stroke by drawing separately
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = thickness;
  ctx.strokeRect(rectX, rectY, rectWidth, rectHeight);

  ctx.restore();
};
const drawRhombus = function (
  context: CanvasRenderingContext2D,
  rhombusStart: Point,
  rhombusEnd: Point,
  pattern: Pattern = "pattern2",
  strokeColor: string = "blue",
  fillColor: string = "red",
  thickness: number = 2
) {
  context.save();

  const centerX = (rhombusStart.x + rhombusEnd.x) / 2;
  const centerY = (rhombusStart.y + rhombusEnd.y) / 2;
  context.translate(centerX, centerY);

  const halfWidth = (rhombusEnd.x - rhombusStart.x) / 2;
  const halfHeight = (rhombusEnd.y - rhombusStart.y) / 2;

  context.beginPath();
  context.moveTo(0, -halfHeight);
  context.lineTo(halfWidth, 0);
  context.lineTo(0, halfHeight);
  context.lineTo(-halfWidth, 0);
  context.closePath();

  // Explicitly set stroke properties BEFORE drawing
  context.lineWidth = thickness;
  context.strokeStyle = strokeColor;

  // Fill first
  const patternType = getPatternType(pattern, context, fillColor);
  context.fillStyle = patternType || fillColor;
  context.fill();

  // Stroke AFTER fill
  context.stroke();

  context.restore();
};

const drawCircle = function (
  context: CanvasRenderingContext2D,
  start: Point,
  end: Point,
  pattern: Pattern = "pattern2",
  strokeColor: string = "red",
  fillColor: string = "red",
  thickness: number = 5
) {
  context.save();

  const centerX = (start.x + end.x) / 2;
  const centerY = (start.y + end.y) / 2;

  const radiusX = Math.abs(end.x - start.x) / 2;
  const radiusY = Math.abs(end.y - start.y) / 2;

  context.translate(centerX, centerY);

  context.beginPath();
  context.ellipse(0, 0, radiusX, radiusY, 0, 0, 2 * Math.PI);

  // Explicitly set stroke properties BEFORE drawing
  context.lineWidth = thickness;
  context.strokeStyle = strokeColor;

  // Fill first
  const patternType = getPatternType(pattern, context, fillColor);
  context.fillStyle = patternType || fillColor;
  context.fill();

  // Stroke AFTER fill
  context.stroke();

  context.restore();
};

export {
  drawRectangle,
  drawFreeStyle,
  drawLine,
  drawArrow,
  drawRhombus,
  drawCircle,
};
