import "./App.css";
import { useState } from "react";

const cols = 16;
const rows = 9;

const surroundingCells = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];
let interval = 0;

function App() {
  const defaultGrid = [];
  defaultGrid[0] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  defaultGrid[1] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  defaultGrid[2] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  defaultGrid[3] = [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0];
  defaultGrid[4] = [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0];
  defaultGrid[5] = [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0];
  defaultGrid[6] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  defaultGrid[7] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  defaultGrid[8] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  const [grid, setGrid] = useState(defaultGrid);
  const [started, setStarted] = useState(false);

  const start = () => {
    setGrid((previousGrid) => {
      const newGrid = previousGrid.map((row, i) => {
        return row.map((cell, j) => {
          let sum = 0;
          surroundingCells.forEach((surroundingCell) => {
            const x = i + surroundingCell[1];
            const y = j + surroundingCell[0];
            if (x >= 0 && x < rows && y >= 0 && y < cols) {
              sum += previousGrid[x][y];
            }
          });
          if (sum < 2 || sum > 3) {
            return 0;
          }
          if (sum === 3) {
            return 1;
          }
          return previousGrid[i][j];
        });
      });
      return newGrid;
    });
  };

  return (
    <>
      <div className="button-container">
        <button
          className="button"
          onClick={() => {
            clearInterval(interval);
            setStarted(false);
            setGrid(defaultGrid);
          }}
        >
          Reset
        </button>
        <button
          className="button"
          onClick={() => {
            if (started) {
              setStarted((prevState) => !prevState);
              clearInterval(interval);
              return;
            }
            setStarted((prevState) => !prevState);

            interval = setInterval(() => {
              start();
            }, 700);
          }}
        >
          {started ? "Stop" : "Start"}
        </button>
      </div>
      <div className="board">
        {grid.map((rows, i) =>
          rows.map((cols, j) => (
            <div
              key={j}
              className="square"
              style={{
                backgroundColor: grid[i][j] ? "black" : "",
              }}
            />
          ))
        )}
      </div>
    </>
  );
}

export default App;
