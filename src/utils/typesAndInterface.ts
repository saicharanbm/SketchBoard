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

export type Pattern = "pattern1" | "pattern2" | "pattern3" | "none";

export type ToolDetails = {
  name: Tool;
  strokeColor: string;
  fillColor: string;
  thickness: number;
  pattern: Pattern;
};

interface Element {
  id: number;
  type: Tool;
  strokeColor: string;
  fillColor: string;
  thickness: number;
  pattern: Pattern;
  points: Point[];
}
export type { Tool, Element, Point };
