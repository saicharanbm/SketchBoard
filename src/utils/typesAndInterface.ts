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

export type Pattern = "pattern1" | "pattern2" | "pattern3" | "solid";

export type ToolDetails = {
  name: Tool;
  strokeColor: string;
  fillColor: string;
  thickness: number;
  pattern: Pattern;
  isDotted: boolean;
};

interface Element {
  id: number;
  type: Tool;
  strokeColor: string;
  fillColor: string;
  thickness: number;
  isDotted: boolean;
  pattern: Pattern;
  points: Point[];
}
export type { Tool, Element, Point };
