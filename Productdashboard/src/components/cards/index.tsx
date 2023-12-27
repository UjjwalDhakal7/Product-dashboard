import './index.css';

interface CardProps {
    title: string;
    description: string;
    rating: number;
    price: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail?: string;
}

const Card = ({
    title, description, rating, price, stock, brand, category, thumbnail}: CardProps) => {
    return (
        <div className="card-wrap">
            <div className="card-img">{thumbnail ? <img src={thumbnail} /> : 'Image'}</div>
            <div className="title">{title}</div>
            <div className="description">Description: {description}</div>
            <div className="rating">Rating: {rating}</div>
            <div className="price">Price: {price}</div>
            <div className="stock">Stock: {stock}</div>
            <div className="brand">Brand: {brand}</div>
            <div className="category">Category: {category}</div>
        </div>
    );
};

export default Card;
