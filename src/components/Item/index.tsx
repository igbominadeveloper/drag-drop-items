import './index.css';

interface ItemInterface {
  name: string;
  image: string;
  onDragOver: (event: React.DragEvent<HTMLDivElement> | undefined) => void;
  onDragEnter: (event: React.DragEvent<HTMLDivElement> | undefined) => void;
}
const Item = ({ name, image }: ItemInterface) => (
  <div className="item">
    <img src={image} draggable="false" alt="property" className="item-image" />
    <p className="item-name">{name}</p>
  </div>
);

export default Item;
