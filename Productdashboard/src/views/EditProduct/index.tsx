import { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';
import { ProductType } from '#views/Products';

interface ProductFormData {
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
}

const initialFormData: ProductFormData = {
  title: '',
  description: '',
  price: 0,
  discountPercentage: 0,
  rating: 0,
  stock: 0,
  brand: '',
  category: '',
  thumbnail: '',
};

interface EditProductProps {
  productId: number | null;
  onClose: () => void;
}

function EditProduct({ productId, onClose }: EditProductProps) {
  const [productData, setProductData] = useState<ProductFormData>(initialFormData);
  const [showForm, setShowForm] = useState(true);

  useEffect(() => {
    const fetchProductForEdit = async () => {
      try {
        if (productId) {
          const response = await axios.get(`https://dummyjson.com/products/${productId}`);

          if (response.status === 200) {
            const fetchedProduct = response.data;

            setProductData({
              title: fetchedProduct.title,
              description: fetchedProduct.description,
              price: fetchedProduct.price,
              discountPercentage: fetchedProduct.discountPercentage,
              rating: fetchedProduct.rating,
              stock: fetchedProduct.stock,
              brand: fetchedProduct.brand,
              category: fetchedProduct.category,
              thumbnail: fetchedProduct.thumbnail,
            });
          } else {
            console.error('Failed to fetch product for editing');
          }
        }
      } catch (error) {
        console.error('Error fetching product for editing:', error);
      }
    };

    fetchProductForEdit();
  }, [productId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (productId) {
        const response = await axios.put(
          `https://dummyjson.com/products/${productId}`, 
          productData,
          {
            headers: { 'Content-Type': 'application/json' },
          }
        );

        if (response.status === 200) {
          const existingProducts =
            JSON.parse(localStorage.getItem('products') || '[]') || [];
          const updatedProducts = existingProducts.map((existingProduct: ProductType) => {
            if (existingProduct.id === productId) {
              return {
                ...existingProduct,
                ...productData,
              };
            }
            return existingProduct;
          });

          localStorage.setItem('products', JSON.stringify(updatedProducts));

          setShowForm(false);
          console.log('Product updated successfully!');
        } else {
          console.error('Failed to update product');
        }
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  if (!showForm) {
    onClose(); 
    return <span>Product updated successfully!</span>;
  }
    
      return (
        <div>
          <h2>Edit Product</h2>
          <form onSubmit={handleSubmit} className='editproduct'>
            <div>
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={productData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                value={productData.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="price">Price:</label>
              <input
                type="number"
                id="price"
                name="price"
                value={productData.price}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="discountPercentage">Discount Percentage:</label>
              <input
                type="number"
                id="discountPercentage"
                name="discountPercentage"
                value={productData.discountPercentage}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="rating">Rating:</label>
              <input
                type="number"
                id="rating"
                name="rating"
                value={productData.rating}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="stock">Stock:</label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={productData.stock}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="brand">Brand:</label>
              <input
                type="text"
                id="brand"
                name="brand"
                value={productData.brand}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="category">Category:</label>
              <input
                type="text"
                id="category"
                name="category"
                value={productData.category}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="thumbnail">Thumbnail URL:</label>
              <input
                type="text"
                id="thumbnail"
                name="thumbnail"
                value={productData.thumbnail}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit">Update Product</button>
          </form>
        </div>
      );
  }
  
  export default EditProduct;
  

