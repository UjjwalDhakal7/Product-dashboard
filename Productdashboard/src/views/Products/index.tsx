import { useState, useEffect } from "react";
import Container from '#components/Container/index';
import axios from "axios";
import './index.css';
import Card from "#components/cards";

interface productType {
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

const Products = () => {
  const [products, setProducts] = useState<productType[]>([]);
  const [isError, setIsError] = useState("");

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((response) => setProducts(response.data.products)) 
      .catch((error) => setIsError(error.message));
  }, []);

  return (
    <Container>
      {isError !== "" && <h2>{isError}</h2>}

      <div className="product-list">
        {products.map((product) => {
          const { id, title, description, price, rating, stock, brand, category, thumbnail } = product;
          return (
            <Card
            thumbnail={thumbnail}
            key={id}
            title={title}
            description={description}
            price={price}
            rating={rating}
            stock={stock}
            brand={brand}
            category={category}
          />
          );
        })}
      </div>
    </Container>
  );
};

export default Products;
