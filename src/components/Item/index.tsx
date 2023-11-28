import './index.css';

type DragEvent = React.DragEvent<HTMLDivElement> | undefined;
interface ItemInterface {
  name: string;
  image: string;
  draggable: boolean;
  onDragOver: (event: DragEvent) => void;
  onDragEnter: (event: DragEvent) => void;
  onDragStart: (event: DragEvent) => void;
  onDrop: (event: DragEvent) => void;
  onTouchEnd: (event: DragEvent) => void;
  onTouchStart: (event: DragEvent) => void;
  onClick: (event: DragEvent) => void;
}
const Item = ({ name, image }: ItemInterface) => (
  <div className="item">
    <img src={image} draggable="false" alt="property" className="item-image" />
    <p className="item-name">{name}</p>
  </div>
);

export default Item;
