import { useEffect } from "react";
import { useState } from "react";

export default function App() {
  const [globalMousePos, setGlobalMousePos] = useState({ x: 0, y: 0 });
  const [localMousePos, setLocalMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    // 👇 Get mouse position relative to element
    const localX = event.clientX - event.target.offsetLeft;
    const localY = event.clientY - event.target.offsetTop;

    setLocalMousePos({ x: localX, y: localY });
  };

  useEffect(() => {
    const handleGlobalMouseMove = (event) => {
      setGlobalMousePos({
        x: event.clientX,
        y: event.clientY
      });
    };

    window.addEventListener("mousemove", handleGlobalMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
    };
  }, []);

  return (
    <div>
      <div
        style={{
          border: "1px solid gray",
          display: "inline-block",
          padding: "75px",
          textAlign: "center"
        }}
        onMouseMove={handleMouseMove}
      >
        Local
        <br />
        <b>
          ({localMousePos.x}, {localMousePos.y})
        </b>
      </div>
      <br />
      Global
      <br />
      <b>
        ({globalMousePos.x}, {globalMousePos.y})
      </b>
    </div>
  );
}
