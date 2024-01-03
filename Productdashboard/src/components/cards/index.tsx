import { useNavigate } from 'react-router-dom';
import Button from '#components/Button';
import { ProductType } from '#views/Products';
import './index.css';

export interface CardProps extends ProductType {
  onClick: () => void;
  onEdit: () => void;
  onDelete: () => void; 
}

const Card = ({
  id,
  title,
  price,
  rating,
  brand,
  category,
  thumbnail,
  onEdit,
  onDelete 
}: CardProps) => {

  const navigate = useNavigate();

  const handleonClick = () => {
    navigate(`/products/${id}`);
  };
  const handleEdit = () => {
    onEdit(); 
  };

  const handleDelete = () => {
    onDelete(); 
  };

  return (
    <div className="card-main">
      <div className="card-wrap" onClick={handleonClick}>
        {thumbnail ? <img src={thumbnail} alt="Product" className='card-img'/> : 'Image'}
        <h1><div className="title">{title}</div></h1>
        <div className="rating">Rating: {rating}</div>
        <h3><div className="price">Price: &#x20A8; {price}</div></h3>
        <div className="brand">Brand: {brand}</div>
        <div className="category">Category: {category}</div>
      </div>
      <div className="action">
        <Button onClick={handleEdit} classname='btn'>Edit</Button>
        <Button onClick={handleDelete} classname='btn'>Delete</Button>
      </div>
    </div>
  );
};

export default Card;

