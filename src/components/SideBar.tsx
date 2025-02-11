import React, { Dispatch, SetStateAction, useState } from "react";
import { PanelLeftOpen, PanelRightOpen } from "lucide-react";
import "./Sidebar.css";
import { ToolDetails } from "../utils/typesAndInterface";

export default function Sidebar({
  toolDetails,
  setToolDetails,
}: {
  toolDetails: ToolDetails;
  setToolDetails: Dispatch<SetStateAction<ToolDetails>>;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [showContent, setShowContent] = useState(true);
  const updateToolDetails = (key: string, value: string | number | boolean) => {
    setToolDetails((prev) => ({ ...prev, [key]: value }));
  };

  const toggleSidebar = () => {
    if (!isOpen) {
      // Sidebar opening
      setIsOpen(true);
      setTimeout(() => {
        setShowContent(true);
      }, 350); // Delay text visibility by 350ms
    } else {
      // Sidebar closing
      setShowContent(false);
      setTimeout(() => {
        setIsOpen(false);
      }, 100); // Match sidebar closing animation duration
    }
  };

  return (
    <div className={`sidebar ${isOpen && "open"}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        {isOpen ? <PanelRightOpen size={30} /> : <PanelLeftOpen size={30} />}
      </button>

      <div className={`sidebar-content ${!isOpen && "closed"}`}>
        {/* Stroke Color */}
        <div className={`section ${!showContent && "showContent"}`}>
          <h3>Stroke</h3>
          <div className={`color-buttons ${!showContent && "showContent"}`}>
            {["black", "red", "green", "blue", "white"].map((color, i) => (
              <button
                key={i}
                className={`color-btn ${
                  toolDetails.strokeColor === color && "selected"
                }`}
                style={{ backgroundColor: color }}
                onClick={() => updateToolDetails("strokeColor", color)}
              />
            ))}
          </div>
        </div>

        {/* Background Color */}
        <div className={`section ${!showContent && "showContent"}`}>
          <h3>Background</h3>
          <div className="color-buttons">
            {["transparent", "pink", "lightgreen", "lightblue", "yellow"].map(
              (color, i) => (
                <button
                  key={i}
                  className={`color-btn ${
                    color === "transparent" ? "transparent" : ""
                  } ${toolDetails.fillColor === color && "selected"}`}
                  onClick={() => updateToolDetails("fillColor", color)}
                  style={{
                    backgroundColor: `${color === "transparent" ? "" : color}`,
                  }}
                />
              )
            )}
          </div>
        </div>

        {/* Fill Pattern */}
        <div className={`section ${!showContent && "showContent"}`}>
          <h3>Fill</h3>
          <div className="option-buttons">
            {["pattern", "pattern2", "pattern3", "solid"].map((pattern, i) => (
              <button
                key={i}
                className={`option-btn ${
                  toolDetails.pattern === pattern && "selected"
                }`}
                onClick={() => updateToolDetails("pattern", pattern)}
              >
                <div
                  className={`fill-pattern ${
                    pattern === "pattern1" ? "pattern" : pattern
                  }`}
                ></div>
              </button>
            ))}
          </div>
        </div>

        {/* Stroke Width */}
        <div className={`section ${!showContent && "showContent"}`}>
          <h3>Stroke width</h3>
          <div className="option-buttons">
            {[2, 3, 5, 8].map((width) => (
              <button
                key={width}
                className={`option-btn ${
                  toolDetails.thickness === width && "selected"
                }`}
                onClick={() => updateToolDetails("thickness", width)}
              >
                <div
                  className="stroke-line"
                  style={{ height: `${width}px` }}
                ></div>
              </button>
            ))}
          </div>
        </div>

        {/* Stroke Style */}
        <div className={`section ${!showContent && "showContent"}`}>
          <h3>Stroke style</h3>
          <div className="option-buttons">
            {[false, true].map((style, i) => (
              <button
                key={i}
                className={`option-btn ${
                  toolDetails.isDotted === style && "selected"
                }`}
                onClick={() => updateToolDetails("isDotted", style)}
              >
                <span className={!style ? "solid-line" : "dotted-line"}></span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
