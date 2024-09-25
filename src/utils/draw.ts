import { Element, Point } from "./typesAndInterface";
import { Pattern1, Pattern2 } from "./pattern";
const drawRectangle = function (
  start: Point,
  end: Point,
  ctx: CanvasRenderingContext2D
) {
  // Save the current context state
  ctx.save();

  // Translate the context to localize the pattern to this rectangle
  ctx.translate(start.x, start.y);

  // Generate a new pattern for each rectangle
  const pattern = Pattern1(ctx, "red");
  if (pattern) ctx.fillStyle = pattern;

  // Draw the rectangle relative to the translated context
  ctx.beginPath();
  ctx.rect(0, 0, end.x - start.x, end.y - start.y);
  ctx.fill();

  // Draw the stroke/outline
  ctx.strokeStyle = "black"; // Customize stroke color
  ctx.lineWidth = 2; // Customize stroke thickness
  ctx.stroke();

  // Restore the context to its original state
  ctx.restore();
};

const drawFreeStyle = function (
  element: Element,
  context: CanvasRenderingContext2D
) {
  context.moveTo(element.points[0].x, element.points[0].y);
  element.points.forEach((point) => {
    context.lineTo(point.x, point.y);
  });
};

const drawLine = function (
  lineStart: Point,
  lineEnd: Point,
  context: CanvasRenderingContext2D
) {
  context.moveTo(lineStart.x, lineStart.y);
  context.lineTo(lineEnd.x, lineEnd.y);
};
const drawArrow = function (
  context: CanvasRenderingContext2D,
  arrowStart: Point,
  arrowEnd: Point
) {
  const headlen = 10;
  const dx = arrowEnd.x - arrowStart.x;
  const dy = arrowEnd.y - arrowStart.y;
  const angle = Math.atan2(dy, dx);
  context.moveTo(arrowStart.x, arrowStart.y);
  context.lineTo(arrowEnd.x, arrowEnd.y);
  context.lineTo(
    arrowEnd.x - headlen * Math.cos(angle - Math.PI / 6),
    arrowEnd.y - headlen * Math.sin(angle - Math.PI / 6)
  );
  context.moveTo(arrowEnd.x, arrowEnd.y);
  context.lineTo(
    arrowEnd.x - headlen * Math.cos(angle + Math.PI / 6),
    arrowEnd.y - headlen * Math.sin(angle + Math.PI / 6)
  );
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
