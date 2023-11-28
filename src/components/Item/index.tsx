import './index.css';

type DragEvent = React.DragEvent<HTMLDivElement> | undefined;
type TouchEvent = React.TouchEvent<HTMLDivElement> | undefined;
interface ItemInterface {
  name: string;
  image: string;
  onDragOver: (event: DragEvent) => void;
  onDragEnter: (event: DragEvent) => void;
  onDragStart: (event: DragEvent) => void;
  onDrop: (event: DragEvent) => void;
  onTouchEnd: (event: TouchEvent) => void;
  onTouchStart: (event: TouchEvent) => void;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
const Item = ({
  name,
  image,
  onDragEnter,
  onDragOver,
  onClick,
  onDragStart,
  onTouchEnd,
  onDrop,
  onTouchStart,
}: ItemInterface) => (
  <div
    className="item"
    draggable
    onDragEnter={onDragEnter}
    onDragOver={onDragOver}
    onClick={onClick}
    onDragStart={onDragStart}
    onTouchEnd={onTouchEnd}
    onDrop={onDrop}
    onTouchStart={onTouchStart}
  >
    <img src={image} draggable="false" alt="property" className="item-image" />
    <p className="item-name">{name}</p>
  </div>
);

export default Item;
