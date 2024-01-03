import { useState, useEffect, useMemo } from 'react';
import Container from '#components/Container/index';
import axios from 'axios';
import Card from '#components/cards'; 
import EditProduct from '#views/EditProduct';
import './index.css';

export interface ProductType {
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

const generateRandomId = () => {
  return Math.floor(Math.random() * 100000) + Date.now();
};

const Products = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isError, setIsError] = useState('');
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  const handleAddProduct = (product: ProductType) => {
    setProducts([...products, product]); 
  };

  useEffect(() => {
    const localProducts = JSON.parse(localStorage.getItem('products') || '[]');

    if (localProducts.length > 0) {
      setProducts(localProducts);
    } else {
      axios
        .get('https://dummyjson.com/products')
        .then((response) => {
          const fetchedProducts = response.data.products;

          const updatedProducts = fetchedProducts.map((product: ProductType) => ({
            ...product,
            id: product.id || generateRandomId(),
          }));

          setProducts(updatedProducts);
          localStorage.setItem('products', JSON.stringify(updatedProducts));
        })
        .catch((error) => setIsError(error.message));
    }
  }, []);

  const handleProductClick = (productId: number) => {
    setSelectedProductId(productId);
  };

  const handleProductEdit = (productId: number) => {
    setSelectedProductId(productId);
    setShowEditForm(true);
  };

  const handleProductDelete = (productId: number) => {
    const updatedProducts = products.filter((product) => product.id !== productId);
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const DisplayProducts = useMemo(() => {
    return products.map((product) => {
      if (!product || !product.id) {
        return null;
      }
      return (
        <Card
          key={product.id}
          {...product}
          onClick={() => handleProductClick(product.id)}
          onEdit={() => handleProductEdit(product.id)}
          onDelete={() => handleProductDelete(product.id)} 
        />
      );
    });
  }, [products]);

  return (
    <Container>
      {isError !== '' && <h2>{isError}</h2>}
      <div className="product-list">
        {DisplayProducts}
      </div>
      {showEditForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close" onClick={() => setShowEditForm(false)}>Close</span>
            <EditProduct productId={selectedProductId} onClose={() => setShowEditForm(false)}  />
          </div>
        </div>
      )}
    </Container>
  );
};

export default Products;
