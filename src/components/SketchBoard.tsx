import React, { useState, useRef, useEffect, useCallback } from "react";
import TopBar from "./topbar/TopBar";
import { Tool, Element } from "../utils/typesAndInterface";
import {
  drawFreeStyle,
  drawRectangle,
  drawLine,
  drawArrow,
  drawRhombus,
  drawCircle,
} from "../utils/draw";

function SketchBoard() {
  const staticCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const dynamicCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [staticContext, setStaticContext] =
    useState<CanvasRenderingContext2D | null>(null);
  const [dynamicContext, setDynamicContext] =
    useState<CanvasRenderingContext2D | null>(null);
  const [drawing, setDrawing] = useState<boolean>(false);
  const [tool, setTool] = useState<Tool>("pencil");
  const [elements, setElements] = useState<Element[]>([]);
  const [tempElement, setTempElement] = useState<Partial<Element>>({});

  const [history, setHistory] = useState<Element[]>([]);
  const [redoStack, setRedoStack] = useState<Element[]>([]);

  useEffect(() => {
    const staticCanvas = staticCanvasRef.current;
    const dynamicCanvas = dynamicCanvasRef.current;
    const updateCanvasSize = () => {
      if (staticCanvas && dynamicCanvas) {
        staticCanvas.width = window.innerWidth;
        staticCanvas.height = window.innerHeight;
        dynamicCanvas.width = window.innerWidth;
        dynamicCanvas.height = window.innerHeight;
        setElements((prev) => [...prev]);
      }
    };
    updateCanvasSize();
    if (staticCanvas) {
      setStaticContext(staticCanvas.getContext("2d"));
    }
    if (dynamicCanvas) {
      setDynamicContext(dynamicCanvas.getContext("2d"));
    }
    window.addEventListener("resize", updateCanvasSize);
    return () => window.removeEventListener("resize", updateCanvasSize);
  }, []);

  const drawElement = useCallback(
    (element: Element, context: CanvasRenderingContext2D) => {
      if (!element.points || element.points.length === 0) return;
      context.save();
      context.beginPath();
      context.lineWidth = 2;
      context.strokeStyle = "#000";

      switch (element.type) {
        case "pencil":
          drawFreeStyle(element, context);

          break;
        case "rectangle": {
          if (element.points.length < 2) return;
          const [start, end] = element.points;
          drawRectangle(start, end, context);
          // context.rect(start.x, start.y, end.x - start.x, end.y - start.y);
          break;
        }
        case "line": {
          if (element.points.length < 2) return;
          const [lineStart, lineEnd] = element.points;
          drawLine(lineStart, lineEnd, context);
          break;
        }
        // Add placeholder implementations for other shapes
        case "ellipse": {
          if (element.points.length < 2) return;

          const [start, end] = element.points;
          drawCircle(context, start, end);

          break;
        }
        case "rhombus": {
          if (element.points.length < 2) return;
          const [rhombusStart, rhombusEnd] = element.points;
          drawRhombus(context, rhombusStart, rhombusEnd);
          break;
        }
        case "arrow": {
          if (element.points.length < 2) return;
          const [arrowStart, arrowEnd] = element.points;
          drawArrow(context, arrowStart, arrowEnd);

          break;
        }
      }

      context.stroke();
      context.closePath();
      context.restore();
    },
    []
  );

  const redrawCanvas = useCallback(
    (context: CanvasRenderingContext2D | null, elements: Element[]) => {
      if (!context || !staticCanvasRef.current) return;
      context.clearRect(
        0,
        0,
        staticCanvasRef.current.width,
        staticCanvasRef.current.height
      );
      elements.forEach((element) => drawElement(element, context));
    },
    [drawElement]
  );

  useEffect(() => {
    redrawCanvas(staticContext, elements);
  }, [redrawCanvas, staticContext, elements]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      setDrawing(true);
      const rect = staticCanvasRef.current?.getBoundingClientRect();
      if (rect) {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const newElement: Element = {
          id: Date.now(),
          type: tool,
          points: [{ x, y }],
        };
        setTempElement(newElement);
      }
    },
    [tool]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (
        !drawing ||
        !dynamicContext ||
        !dynamicCanvasRef.current ||
        !tempElement.points
      )
        return;
      const rect = staticCanvasRef.current?.getBoundingClientRect();
      if (rect) {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setTempElement((prev) => ({
          ...prev,
          points:
            prev.type === "pencil"
              ? [...(prev.points || []), { x, y }]
              : [prev.points![0], { x, y }],
        }));

        redrawCanvas(dynamicContext, [tempElement as Element]);
      }
    },
    [drawing, dynamicContext, tempElement, redrawCanvas]
  );

  const handleMouseUp = useCallback(() => {
    if (!drawing || !tempElement.type || !tempElement.points) return;
    setDrawing(false);
    const newElement = tempElement as Element;
    setElements((prev) => [...prev, newElement]);
    setHistory((prevHistory) => [...prevHistory, newElement]);
    setRedoStack([]);

    setTempElement({});
    if (dynamicContext && dynamicCanvasRef.current) {
      dynamicContext.clearRect(
        0,
        0,
        dynamicCanvasRef.current.width,
        dynamicCanvasRef.current.height
      );
    }
  }, [drawing, tempElement, dynamicContext]);

  const undo = () => {
    if (history.length === 0) return;
    const lastElement = history[history.length - 1];
    setHistory((prev) => prev.slice(0, -1));
    setRedoStack((prev) => [...prev, lastElement]);
    setElements((prev) => prev.filter((el) => el.id !== lastElement.id));
  };

  const redo = () => {
    if (redoStack.length === 0) return;
    const redoElement = redoStack[redoStack.length - 1];
    setRedoStack((prev) => prev.slice(0, -1));
    setHistory((prev) => [...prev, redoElement]);
    setElements((prev) => [...prev, redoElement]);
  };

  useEffect(() => {
    const handleMouseDownEvent = (e: MouseEvent) => {
      handleMouseDown(e as unknown as React.MouseEvent<HTMLCanvasElement>);
    };
    const handleMouseMoveEvent = (e: MouseEvent) => {
      handleMouseMove(e as unknown as React.MouseEvent<HTMLCanvasElement>);
    };
    const handleMouseUpEvent = () => {
      handleMouseUp();
    };

    window.addEventListener("mousedown", handleMouseDownEvent);
    window.addEventListener("mousemove", handleMouseMoveEvent);
    window.addEventListener("mouseup", handleMouseUpEvent);

    return () => {
      window.removeEventListener("mousedown", handleMouseDownEvent);
      window.removeEventListener("mousemove", handleMouseMoveEvent);
      window.removeEventListener("mouseup", handleMouseUpEvent);
    };
  }, [handleMouseDown, handleMouseMove, handleMouseUp]);

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <TopBar
        onUndo={undo}
        onRedo={redo}
        setTool={setTool}
        selectedTool={tool}
      />
      <canvas
        ref={staticCanvasRef}
        style={{ position: "absolute", width: "100%", height: "100%" }}
      />
      <canvas
        ref={dynamicCanvasRef}
        style={{ position: "absolute", width: "100%", height: "100%" }}
      />
    </div>
  );
}

export default SketchBoard;
