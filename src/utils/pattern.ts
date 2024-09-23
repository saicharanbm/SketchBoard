const Pattern1 = (context: CanvasRenderingContext2D, color: string) => {
  const patternCanvas = document.createElement("canvas");
  patternCanvas.width = 5; // Adjust to control pattern repetition size
  patternCanvas.height = 5;
  const patternContext = patternCanvas.getContext("2d");

  // Draw diagonal stripes on the pattern canvas
  if (patternContext) {
    patternContext.strokeStyle = color; // Light gray color for stripes
    patternContext.lineWidth = 1;
    patternContext.beginPath();
    patternContext.moveTo(0, 5); // Start bottom-left
    patternContext.lineTo(5, 0); // End top-right
    patternContext.stroke();
    patternContext.closePath();
  }

  // Create the pattern
  return context.createPattern(patternCanvas, "repeat");
};
const Pattern2 = (context: CanvasRenderingContext2D, color: string) => {
  const patternCanvas = document.createElement("canvas");
  patternCanvas.width = 5;
  patternCanvas.height = 5;
  const patternContext = patternCanvas.getContext("2d");

  // Draw diagonal stripes on the pattern canvas
  if (!patternContext) return;
  patternContext.strokeStyle = color; // Light gray color for stripes
  patternContext.lineWidth = 1;
  // First diagonal (top-left to bottom-right)
  patternContext.beginPath();
  patternContext.moveTo(0, 5);
  patternContext.lineTo(5, 0);
  patternContext.stroke();
  patternContext.closePath();

  // Second diagonal (top-right to bottom-left)
  patternContext.beginPath();
  patternContext.moveTo(0, 0);
  patternContext.lineTo(5, 5);
  patternContext.stroke();
  patternContext.closePath();
  // Create the pattern
  return context.createPattern(patternCanvas, "repeat");
};

export { Pattern1, Pattern2 };
