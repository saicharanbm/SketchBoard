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

  const drawElement = useCallback(function (
    element: Element,
    context: CanvasRenderingContext2D
  ) {
    if (!element.points || element.points.length === 0) return;
    // context.save();
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
    // context.restore();
  },
  []);
  const deleteCanvas = function () {
    setElements([]);
    setHistory([]);
    setRedoStack([]);
  };

  const redrawStaticCanvas = useCallback(
    function (elements: Element[]) {
      console.log("redraw");
      if (!staticContext || !staticCanvasRef.current) return;
      staticContext.clearRect(
        0,
        0,
        staticCanvasRef.current.width,
        staticCanvasRef.current.height
      );
      elements.forEach((element) => drawElement(element, staticContext));
    },
    [drawElement, staticContext]
  );
  useEffect(() => {
    console.log(elements);
    redrawStaticCanvas(elements);
  }, [elements, redrawStaticCanvas]);

  const handleMouseDown = useCallback(
    function (e: React.MouseEvent<HTMLCanvasElement>) {
      setDrawing(true);

      const rect = staticCanvasRef.current?.getBoundingClientRect();
      // console.log(e.changedTouches[0].clientX);
      if (rect) {
        const x =
          e instanceof TouchEvent
            ? e.changedTouches[0].clientX - rect.left
            : e.clientX - rect.left;
        const y =
          e instanceof TouchEvent
            ? e.changedTouches[0].clientY - rect.top
            : e.clientY - rect.top;
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
    function (e: React.MouseEvent<HTMLCanvasElement>) {
      if (
        !drawing ||
        !dynamicContext ||
        !dynamicCanvasRef.current ||
        !tempElement.points
      )
        return;
      const rect = staticCanvasRef.current?.getBoundingClientRect();
      if (rect) {
        const x =
          e instanceof TouchEvent
            ? e.changedTouches[0].clientX - rect.left
            : e.clientX - rect.left;
        const y =
          e instanceof TouchEvent
            ? e.changedTouches[0].clientY - rect.top
            : e.clientY - rect.top;

        setTempElement((prev) => ({
          ...prev,
          points:
            prev.type === "pencil"
              ? [...(prev.points || []), { x, y }]
              : [prev.points![0], { x, y }],
        }));
        if (dynamicContext && dynamicCanvasRef.current) {
          if (tool !== "pencil") {
            dynamicContext.clearRect(
              0,
              0,
              dynamicCanvasRef.current.width,
              dynamicCanvasRef.current.height
            );
          }
          drawElement(tempElement as Element, dynamicContext);
        }

        // redrawCanvas(dynamicContext, [tempElement as Element]);
      }
    },
    [drawing, dynamicContext, tempElement, drawElement, tool]
  );

  const handleMouseUp = useCallback(
    function () {
      if (!drawing || !tempElement.type || !tempElement.points) return;
      setDrawing(false);
      const newElement = tempElement as Element;

      if (newElement.points.length < 2) return;

      // drawElement(newElement, staticContext as CanvasRenderingContext2D);
      // captureSnapshot();
      // repaintFromSnapshot();

      setElements((prev) => [...prev, newElement]);
      setHistory((prevHistory) => [...prevHistory, newElement]);
      setRedoStack([]);

      if (dynamicContext && dynamicCanvasRef.current) {
        dynamicContext.clearRect(
          0,
          0,
          dynamicCanvasRef.current.width,
          dynamicCanvasRef.current.height
        );
      }

      setTempElement({});
    },
    [drawing, tempElement, dynamicContext]
  );

  const undo = function () {
    if (history.length === 0) return;
    const lastElement = history[history.length - 1];
    setHistory((prev) => prev.slice(0, -1));
    setRedoStack((prev) => [...prev, lastElement]);
    setElements((prev) => prev.filter((el) => el.id !== lastElement.id));
  };

  const redo = function () {
    if (redoStack.length === 0) return;
    const redoElement = redoStack[redoStack.length - 1];
    setRedoStack((prev) => prev.slice(0, -1));
    setHistory((prev) => [...prev, redoElement]);
    setElements((prev) => [...prev, redoElement]);
  };

  useEffect(() => {
    // Use the correct native event types for handling mouse and touch events
    const handleMouseDownEvent = (e: MouseEvent) => {
      e.preventDefault();
      handleMouseDown(e as unknown as React.MouseEvent<HTMLCanvasElement>);
    };
    const handleMouseMoveEvent = (e: MouseEvent) => {
      e.preventDefault();
      handleMouseMove(e as unknown as React.MouseEvent<HTMLCanvasElement>);
    };
    const handleMouseUpEvent = (e: MouseEvent) => {
      e.preventDefault();
      handleMouseUp();
    };

    const handleTouchStartEvent = (e: TouchEvent) => {
      // e.preventDefault();
      handleMouseDown(e as unknown as React.MouseEvent<HTMLCanvasElement>);
    };
    const handleTouchMoveEvent = (e: TouchEvent) => {
      e.preventDefault();
      handleMouseMove(e as unknown as React.MouseEvent<HTMLCanvasElement>);
    };
    const handleTouchEndEvent = () => {
      // e.preventDefault();
      handleMouseUp();
    };

    // Add event listeners for both touch and mouse events
    window.addEventListener("touchstart", handleTouchStartEvent, {
      passive: false,
    });
    window.addEventListener("touchmove", handleTouchMoveEvent, {
      passive: false,
    });
    window.addEventListener("touchend", handleTouchEndEvent, {
      passive: false,
    });

    window.addEventListener("mousedown", handleMouseDownEvent);
    window.addEventListener("mousemove", handleMouseMoveEvent);
    window.addEventListener("mouseup", handleMouseUpEvent);

    return () => {
      window.removeEventListener("touchstart", handleTouchStartEvent);
      window.removeEventListener("touchmove", handleTouchMoveEvent);
      window.removeEventListener("touchend", handleTouchEndEvent);

      window.removeEventListener("mousedown", handleMouseDownEvent);
      window.removeEventListener("mousemove", handleMouseMoveEvent);
      window.removeEventListener("mouseup", handleMouseUpEvent);
    };
  }, [handleMouseDown, handleMouseMove, handleMouseUp]);

  return (
    <div
      style={{
        position: "fixed",
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
        deleteAll={deleteCanvas}
      />
      <canvas
        ref={staticCanvasRef}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          cursor: "crosshair",
        }}
      />
      <canvas
        ref={dynamicCanvasRef}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          cursor: "crosshair",
        }}
      />
    </div>
  );
}

export default SketchBoard;
