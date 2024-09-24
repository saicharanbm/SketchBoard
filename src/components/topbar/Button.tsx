import { Tool } from "../../utils/typesAndInterface";

function Button({
  children,
  selected = false,
  setTool,
  tool,
}: {
  children: React.ReactNode;
  selected?: boolean; // Indicate if the button is selected
  setTool: (tool: Tool) => void;
  tool: Tool;
}) {
  function handleClick(): void {
    if (tool !== "undo" && tool !== "redo") {
      setTool(tool);
    }
  }

  return (
    <button
      className={`button ${selected ? "selected" : ""}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

export default Button;
