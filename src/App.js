import { useEffect, useState } from 'react';
import React from 'react';
import './App.css';

function App() {
  const [boxes, setBoxes] = useState([]);
  const [duplicatedBoxes, setDuplicatedBoxes] = useState([]);
  


  useEffect(() => {
    let n = 0;
    let id = 0;
    let newArr = [];

    for (let i = 1; i < 9; i++) {
      n++;
      for (let j = 1; j < 9; j++) {
        id = id + 1;
        if (n % 2 === 0) {
          newArr.push({ "color": "black", "id": id })
        } else {
          newArr.push({ "color": "white", "id": id })
        }
        n++
      }
    }

    setBoxes(newArr)
    setDuplicatedBoxes(newArr)

  }, [])


  const handleClick = (item) => {

    if (item.color === "white" || item.color === "red") {
      const clickedId = item.id;

      const clickedRow = Math.floor((clickedId - 1) / 8);
      const clickedCol = (clickedId - 1) % 8;

      const diagonalBoxes = duplicatedBoxes.filter(box => {
        const row = Math.floor((box.id - 1) / 8);
        const col = (box.id - 1) % 8;
        console.log(row,col)
        return Math.abs(row - clickedRow) === Math.abs(col - clickedCol);
      });

      const newBoxes = duplicatedBoxes.map(box => {
        if (diagonalBoxes.includes(box)) {
          return { "color": "red", "id": box.id };
        }
        return box;
      });

      setBoxes(newBoxes);
    }
  }
  return (
   <>
   <div className='main'>
      <div className='boxes'>
        {boxes.length > 0 &&
          React.Children.toArray(
            boxes.map((item) => (
              <div onClick={() => handleClick(item)} style={{ background: item.color }} className='box'></div>
            ))
          )
        }
      </div>
    </div>
   </>
  );
}

export default App;
