import {
  Pencil,
  Square,
  Circle,
  MoveRight,
  Diamond,
  Minus,
  Undo,
  Redo,
  Trash2,
} from "lucide-react";
import Button from "./Button";
import { Dispatch, SetStateAction } from "react";
import { Tool, ToolDetails } from "../../utils/typesAndInterface";

function TopBar({
  onUndo,
  onRedo,
  setToolDetails,
  selectedTool,
  deleteAll,
}: {
  onUndo: () => void;
  onRedo: () => void;
  setToolDetails: Dispatch<SetStateAction<ToolDetails>>;
  selectedTool: Tool; // Selected tool type
  deleteAll: () => void;
}) {
  function setTool(tool: Tool) {
    setToolDetails((prev) => ({ ...prev, name: tool }));
  }
  return (
    <div className="topbar">
      <Button
        setTool={setTool}
        tool="pencil"
        selected={selectedTool === "pencil"}
      >
        <Pencil color="#fff" />
      </Button>
      <Button
        setTool={setTool}
        tool="rectangle"
        selected={selectedTool === "rectangle"}
      >
        <Square color="#fff" />
      </Button>
      <Button
        setTool={setTool}
        tool="ellipse"
        selected={selectedTool === "ellipse"}
      >
        <Circle color="#fff" />
      </Button>
      <Button
        setTool={setTool}
        tool="rhombus"
        selected={selectedTool === "rhombus"}
      >
        <Diamond color="#fff" />
      </Button>
      <Button
        setTool={setTool}
        tool="arrow"
        selected={selectedTool === "arrow"}
      >
        <MoveRight color="#fff" />
      </Button>
      <Button setTool={setTool} tool="line" selected={selectedTool === "line"}>
        <Minus color="#fff" />
      </Button>
      <button type="button" className="button" onClick={onUndo}>
        {""}
        <Undo color="#fff" />
      </button>

      {/* Directly call onRedo for redo button */}
      <button type="button" className="button" onClick={onRedo}>
        {""}
        <Redo color="#fff" />
      </button>
      <button type="button" className="button" onClick={() => deleteAll()}>
        {""}
        <Trash2 color="#fff" />
      </button>
    </div>
  );
}

export default TopBar;
