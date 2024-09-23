type Tool =
  | "pencil"
  | "rectangle"
  | "ellipse"
  | "rhombus"
  | "arrow"
  | "undo"
  | "redo"
  | "line";

interface Point {
  x: number;
  y: number;
}

interface Element {
  id: number;
  type: Tool;
  points: Point[];
}
export type { Tool, Element, Point };
