import { Element, Point } from "./typesAndInterface";
const drawRectangle = function (
  start: Point,
  end: Point,
  ctx: CanvasRenderingContext2D
) {
  ctx.roundRect(start.x, start.y, end.x - start.x, end.y - start.y);

  //   ctx.fill();
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
  const midX = (rhombusStart.x + rhombusEnd.x) / 2;
  context.moveTo(midX, rhombusStart.y);
  context.lineTo(rhombusEnd.x, (rhombusStart.y + rhombusEnd.y) / 2);
  context.lineTo(midX, rhombusEnd.y);
  context.lineTo(rhombusStart.x, (rhombusStart.y + rhombusEnd.y) / 2);
  context.closePath();
};
const drawCircle = function (
  context: CanvasRenderingContext2D,
  start: Point,
  end: Point
) {
  // Calculate the center of the ellipse
  const centerX = (start.x + end.x) / 2;
  const centerY = (start.y + end.y) / 2;

  // Calculate the radii (half the width and height)
  const radiusX = Math.abs(end.x - start.x) / 2;
  const radiusY = Math.abs(end.y - start.y) / 2;

  // Draw the ellipse
  context.ellipse(
    centerX,
    centerY,
    radiusX,
    radiusY,
    0, // Rotation
    0, // Start angle
    2 * Math.PI // End angle (full circle)
  );
};

export {
  drawRectangle,
  drawFreeStyle,
  drawLine,
  drawArrow,
  drawRhombus,
  drawCircle,
};
