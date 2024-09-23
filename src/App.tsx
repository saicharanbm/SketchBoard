import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SketchBoard from "./components/SketchBoard";

function App() {
  const [count, setCount] = useState(0);

  return <SketchBoard />;
}

export default App;
