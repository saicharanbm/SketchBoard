import { Element, Pattern, Point } from "./typesAndInterface";
import { Pattern1, Pattern2, Pattern3 } from "./pattern";

const drawFreeStyle = function (
  element: Element,
  context: CanvasRenderingContext2D
) {
  context.moveTo(element.points[0].x, element.points[0].y);
  context.strokeStyle = element.strokeColor;
  context.lineWidth = element.thickness;
  element.points.forEach((point) => {
    context.lineTo(point.x, point.y);
  });
};

const drawLine = function (
  lineStart: Point,
  lineEnd: Point,
  context: CanvasRenderingContext2D,
  strokeColor: string = "black",
  thickness: number = 2
) {
  context.moveTo(lineStart.x, lineStart.y);
  context.strokeStyle = strokeColor;
  context.lineWidth = thickness;
  context.lineTo(lineEnd.x, lineEnd.y);
};
const drawArrow = function (
  context: CanvasRenderingContext2D,
  arrowStart: Point,
  arrowEnd: Point,
  strokeColor: string = "black",
  thickness: number = 3
) {
  const headlen = 12 * thickness; // Slightly longer for a sharper look
  const headAdjust = headlen * 0.2; // Adjust line end position

  const dx = arrowEnd.x - arrowStart.x;
  const dy = arrowEnd.y - arrowStart.y;
  const angle = Math.atan2(dy, dx);
  const sharpAngle = Math.PI / 9; // Reduced angle from 30° to 20°

  // Adjust endpoint to prevent gap
  const arrowTipX = arrowEnd.x - headAdjust * Math.cos(angle);
  const arrowTipY = arrowEnd.y - headAdjust * Math.sin(angle);

  context.beginPath();
  context.strokeStyle = strokeColor;
  context.lineWidth = thickness;

  // Draw main line up to the adjusted tip
  context.moveTo(arrowStart.x, arrowStart.y);
  context.lineTo(arrowTipX, arrowTipY);

  // Draw sharper arrowhead (reduced angle)
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
  context.closePath();
};

const drawRectangle = function (
  start: Point,
  end: Point,
  ctx: CanvasRenderingContext2D,
  pattern: Pattern = "pattern1",
  strokeColor: string = "black",
  fillColor: string = "red",
  thickness: number = 2
) {
  const width = end.x - start.x;
  const height = end.y - start.y;

  ctx.save();

  // Ensure consistent pattern generation
  let patternType: CanvasPattern | null = null;
  switch (pattern) {
    case "pattern1":
      patternType = Pattern1(ctx, fillColor);
      break;
    case "pattern2":
      patternType = Pattern2(ctx, fillColor);
      break;
    case "pattern3":
      patternType = Pattern3(ctx, fillColor);
      break;
    default:
      patternType = null;
  }

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

  // Ensure sharp stroke by drawing separately
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = thickness;
  ctx.strokeRect(rectX, rectY, rectWidth, rectHeight);

  ctx.restore();
};
const drawRhombus = function (
  context: CanvasRenderingContext2D,
  rhombusStart: Point,
  rhombusEnd: Point
) {
  // Calculate the center of the rhombus
  const centerX = (rhombusStart.x + rhombusEnd.x) / 2;
  const centerY = (rhombusStart.y + rhombusEnd.y) / 2;
  context.save();
  // Translate the context to the center of the rhombus
  context.translate(centerX, centerY);

  // Calculate relative positions from the center
  const halfWidth = (rhombusEnd.x - rhombusStart.x) / 2;
  const halfHeight = (rhombusEnd.y - rhombusStart.y) / 2;

  context.beginPath(); // Make sure to begin a new path
  context.moveTo(0, -halfHeight); // Top point
  context.lineTo(halfWidth, 0); // Right point
  context.lineTo(0, halfHeight); // Bottom point
  context.lineTo(-halfWidth, 0); // Left point
  context.closePath();

  const pattern = Pattern2(context, "red");
  if (pattern) context.fillStyle = pattern;
  context.fill();

  // Reset the translation to avoid affecting other drawings
  context.restore();
};

const drawCircle = function (
  context: CanvasRenderingContext2D,
  start: Point,
  end: Point
) {
  // Save the context to restore it later
  context.save();

  // Calculate the center of the ellipse
  const centerX = (start.x + end.x) / 2;
  const centerY = (start.y + end.y) / 2;

  // Calculate the radii (half the width and height)
  const radiusX = Math.abs(end.x - start.x) / 2;
  const radiusY = Math.abs(end.y - start.y) / 2;

  // Translate the context to shift the drawing
  context.translate(centerX, centerY);

  // Draw the ellipse with the translated coordinate system
  context.beginPath();
  context.ellipse(
    0, // Use (0, 0) since we already translated to centerX, centerY
    0,
    radiusX,
    radiusY,
    0, // Rotation
    0, // Start angle
    2 * Math.PI // End angle (full circle)
  );

  // Fill with a pattern if available
  const pattern = Pattern1(context, "red");
  if (pattern) context.fillStyle = pattern;
  context.fill();

  // Restore the context to its original state
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
