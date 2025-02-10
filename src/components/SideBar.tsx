// Sidebar.jsx
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./Sidebar.css";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>

      <div className="sidebar-content">
        {/* Stroke Color */}
        <div className="section">
          <h3>Stroke</h3>
          <div className="color-buttons">
            {["black", "red", "green", "blue", "orange"].map((color, i) => (
              <button
                key={i}
                className={`color-btn ${i === 1 ? "selected" : ""}`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        {/* Background Color */}
        <div className="section">
          <h3>Background</h3>
          <div className="color-buttons">
            {[
              "transparent",
              "pink",
              "lightgreen",
              "lightblue",
              "yellow",
              "salmon",
            ].map((color, i) => (
              <button
                key={i}
                className={`color-btn ${
                  color === "transparent" ? "transparent" : ""
                } ${i === 0 ? "selected" : ""}`}
                style={{
                  backgroundColor: `${color === "transparent" ? "" : color}`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Fill Pattern */}
        <div className="section">
          <h3>Fill</h3>
          <div className="option-buttons">
            {["striped", "dotted", "solid"].map((pattern, i) => (
              <button key={i} className="option-btn">
                <div className={`fill-pattern ${pattern}`}></div>
              </button>
            ))}
          </div>
        </div>

        {/* Stroke Width */}
        <div className="section">
          <h3>Stroke width</h3>
          <div className="option-buttons">
            {[1, 2, 3, 5].map((width) => (
              <button key={width} className="option-btn">
                <div
                  className="stroke-line"
                  style={{ height: `${width}px` }}
                ></div>
              </button>
            ))}
          </div>
        </div>

        {/* Stroke Style */}
        <div className="section">
          <h3>Stroke style</h3>
          <div className="option-buttons">
            {["—", "···", "····"].map((style, i) => (
              <button key={i} className="option-btn">
                <span>{style}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sloppiness */}
        <div className="section">
          <h3>Sloppiness</h3>
          <div className="option-buttons">
            {["〜", "〰", "〰️〰️"].map((wave, i) => (
              <button key={i} className="option-btn">
                <span>{wave}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
