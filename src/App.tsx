import { useState } from 'react';
import _shuffle from 'lodash.shuffle';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import Item from './components/Item';
import store from './store';

import './index.css';

export default function App() {
  const [items, setItems] = useState(store);
  const [animationParent] = useAutoAnimate({
    duration: 500,
  });

  const moveItem = (index: number) => {
    debugger;
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
    debugger;
    event.target.classList.add('dragged');
    event.dataTransfer.dropEffect = 'move';
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('index-dragged', indexOfItem);
    event.dataTransfer.setData('item-dragged', JSON.stringify(itemDragged));
    event.dataTransfer.setData('original-element', event.target);
    event.target.classList.remove('dragged');
  };

  const handleTouchStart = (event, indexOfItem, itemDragged) => {
    debugger;
    // event.dataTransfer.dropEffect = 'move';
    // event.dataTransfer.effectAllowed = 'move';
    // event.dataTransfer.setData('index-dragged', indexOfItem);
    // event.dataTransfer.setData('item-dragged', JSON.stringify(itemDragged));
    // event.dataTransfer.setData('original-element', event.target);
    // event.target.classList.remove('dragged');

    // const tempArray = [...items];
    // tempArray.splice(indexOfItem, 1);
  };

  const handleDrop = (indexOfItemDroppedOn, event, dropValue) => {
    const indexOfDraggedItem = event.dataTransfer.getData('index-dragged');
    const draggedItem = JSON.parse(event.dataTransfer.getData('item-dragged'));

    const tempArray = [...items];

    tempArray.splice(indexOfItemDroppedOn, 1, draggedItem);
    tempArray.splice(indexOfDraggedItem, 1, dropValue);

    setItems(tempArray);
  };

  const preventDefault = (
    event: React.DragEvent<HTMLDivElement> | undefined
  ) => {
    event?.preventDefault();
  };

  const reset = () => setItems(store);

  const shuffle = () => {
    const shuffledItems = _shuffle(items);
    setItems(shuffledItems);
  };

  return (
    <div className="App">
      <h2 className="heading">Click or drag, your choice!!!</h2>

      <div className="controls">
        <button className="button shuffle-button" onClick={shuffle}>
          Shuffle
        </button>
        <button className="button reset-button" onClick={reset}>
          Reset
        </button>
      </div>

      <div className="items" ref={animationParent}>
        {items.map((item, index) => (
          <Item
            key={item.name}
            name={item.name}
            image={item.image}
            onDragOver={preventDefault}
            onDragEnter={preventDefault}
            onDrop={(event) => handleDrop(index, event, item)}
            onTouchEnd={(event) => handleDrop(index, event, item)}
            onDragStart={(event) => handleDrag(event, index, item)}
            onTouchStart={(event) => handleTouchStart(event, index, item)}
            onClick={() => moveItem(index)}
          />
        ))}
      </div>
    </div>
  );
}
