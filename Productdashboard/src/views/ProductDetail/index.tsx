import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Container from '#components/Container/index';
import './index.css';
import axios from 'axios';

export interface DetailType {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail?: string;
}

function ProductDetail() {
  const { productsid } = useParams<{ productsid: string }>(); 
  const [product, setProduct] = useState<DetailType | null>(null);
  const [isError, setIsError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${productsid}`)
      .then((response) => {
        setProduct(response.data); 
      })
      .catch((error) => {
        console.error('Error fetching product:', error.message);
        setIsError(error.message);
      });
  }, [productsid]);

  return (
    <Container>
      {isError && <div className='detail'>Error: {isError}</div>}
      {product && (
        <div>
          <p><img src={product.thumbnail} className='image' alt="Product Thumbnail" /></p>
          <h1>Title: {product.title}</h1>
          <p>Product ID: {productsid}</p>
          <p>Description: {product.description}</p>
          <p>Price: &#x20A8; {product.price}</p> 
          <p>Rating: {product.rating}</p> 
          <p>Stock: {product.stock}</p> 
          <p>Brand: {product.brand}</p> 
          <p>Category: {product.category}</p>
        </div>
      )}
    </Container>
  );
}
export default ProductDetail;
