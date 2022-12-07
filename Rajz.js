import React, { useLayoutEffect, useState } from "react";
import rough from "roughjs/bundled/rough.esm";

import "../css/rajz.css";

const generator = rough.generator();

function createElement(x1, y1, x2, y2, type) {
  const roughElement =
    type === "line"
      ? generator.line(x1, y1, x2, y2)
      : generator.rectangle(x1, y1, x2 - x1, y2 - y1);
  return { x1, y1, x2, y2, roughElement };
}

const Rajz = () => {
  const [elements, setElements] = useState([]);
  const [drawing, setDrawing] = useState(false);
  const [elementType, setElementType] = useState("line");
  //const [isShow, setIsShow] = useState("");

  useLayoutEffect(() => {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    const roughCanvas = rough.canvas(canvas);

    elements.forEach(({ roughElement }) => roughCanvas.draw(roughElement));
  }, [elements]);

  const rect = () => {
    console.log("megvan");
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    const roughCanvas = rough.canvas(canvas);
    const rect = generator.rectangle(110, 110, 200, 200);
    roughCanvas.draw(rect);
  };

  const mouseDown = (event) => {
    setDrawing(true);

    const { clientX, clientY } = event;

    const element = createElement(
      clientX,
      clientY,
      clientX,
      clientY,
      elementType
    ); //kezdő és végpontok, típus
    setElements((prevState) => [...prevState, element]);
  };

  const mouseMove = (event) => {
    if (!drawing) return;

    const { clientX, clientY } = event;

    const { x1, y1 } = elements[elements.length - 1];
    const updatedElement = createElement(x1, y1, clientX, clientY, elementType);

    const elementsCopy = [...elements];
    elementsCopy[elements.length - 1] = updatedElement;
    setElements(elementsCopy);
  };

  const mouseUp = () => {
    setDrawing(false);
  };
  return (
    <div>
      <div style={{ position: "fixed" }}>
        <table>
          <thead>
            <tr>
              <th></th>
            </tr>
          </thead>
          <tbody id="canvasbody">
            <tr>
              <td>
                <input
                  type="radio"
                  className="radio"
                  id="line"
                  checked={elementType === "line"}
                  onChange={() => setElementType("line")}
                />
                <label htmlFor="rectangle">Vonal</label>
              </td>

              <td>
                <input
                  type="radio"
                  className="radio"
                  id="rectangle"
                  checked={elementType === "rectangle"}
                  onChange={() => setElementType("rectangle")}
                />
                <label htmlFor="rectangle">Négyszög</label>
              </td>
              <td>
                <input type="radio" className="size" id="size" />
                <label>Méretezés</label>
              </td>
              <td>
                <button onClick={rect}>Ház</button>
              </td>
              <td>
                <button>Virág</button>
              </td>
              <td>
                <button>Sövény</button>
              </td>
            </tr>
            <tr></tr>
            <tr>
              <td></td>
              <td>
                <button>Vissza</button>
              </td>
              <td>
                <button>Újra</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <canvas
        id="canvas"
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={mouseDown}
        onMouseMove={mouseMove}
        onMouseUp={mouseUp}
      >
        Canvas
      </canvas>
    </div>
  );
};

export default Rajz;
