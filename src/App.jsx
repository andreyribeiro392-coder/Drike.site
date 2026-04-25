import { useRef } from "react";
import { startGame } from "./game";

function App() {
  const canvasRef = useRef(null);

  const iniciar = () => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    startGame(canvas);
  };

  return (
    <div id="menu">
      <button onClick={iniciar}>Jogar</button>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default App;
