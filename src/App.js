import React from "react";

import "./styles.css";

import alphabets from './alphabets';

export default function App() {
  const [items, setItems] = React.useState(alphabets);

  const moveItem = (index) => {
    if (index === 0) return;
    const tempArray = [...items];
    const newPosition = index - 1;

    const itemToBeMovedUp = tempArray[index];
    const itemToBeMovedDown = tempArray[newPosition];

    tempArray.splice(index, 1, itemToBeMovedDown);
    tempArray.splice(newPosition, 1, itemToBeMovedUp);
    setItems(tempArray);
  };

const handleDrag = (event, indexOfItem, itemDragged) => {
  event.dataTransfer.dropEffect = 'move';
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.setData('index-dragged', indexOfItem);
  event.dataTransfer.setData('item-dragged', itemDragged);
}

const handleDrop = (indexOfItemDroppedOn, event, dropValue) => {
  const indexOfDraggedItem = event.dataTransfer.getData('index-dragged');
  const draggedItem = event.dataTransfer.getData('item-dragged');    
  const tempArray = [...items];
    
  tempArray.splice(indexOfItemDroppedOn, 1, draggedItem);
  tempArray.splice(indexOfDraggedItem, 1, dropValue);

  setItems(tempArray);
}

  return (
    <div className="App">
      <h2>Click or drag, your choice!!!</h2>

      <div className="items">
        {items.map((item, index) => (
          <p 
            key={index} 
            onDragOver={event => event.preventDefault()} 
            onDragEnter={event => event.preventDefault()} 
            onDrop={event => handleDrop(index, event, item)} 
            onDragStart={event => handleDrag(event, index, item)} 
            draggable="true" 
            onClick={() => moveItem(index)}
            >
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}
