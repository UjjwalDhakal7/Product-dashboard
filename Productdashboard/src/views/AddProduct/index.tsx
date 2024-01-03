import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

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

interface AddProductProps {
  productId?: number;
}

function AddProduct({ productId }: AddProductProps) {
  const [productData, setProductData] = useState<ProductFormData>(initialFormData);
  const [showForm, setShowForm] = useState(true);
  const [thumbnail, setThumbnail] = useState<string | null>('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnail(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://dummyjson.com/products/add',
        productData,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (response.status === 200) {
        const addedProduct = response.data;

        const existingProducts =
          JSON.parse(localStorage.getItem('products') || '[]') || [];
        const updatedProducts = [...existingProducts, addedProduct];
        localStorage.setItem('products', JSON.stringify(updatedProducts));

        setProductData(initialFormData);
        setShowForm(false);
        console.log('Product added successfully!');
      } else {
        console.error('Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

 
  
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

  if (!showForm) {
    return <div>Product added successfully!</div>;
  }

  return (
    <div>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit} className='addproduct'>
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
        <label htmlFor="thumbnail">Thumbnail:</label>
          <input
            type="file"
            accept="image/*"
            id="thumbnail"
            name="thumbnail"
            onChange={handleThumbnail}
            required
          />
        </div>
        {thumbnail && (
          <div>
            <img src={thumbnail} alt="Thumbnail Preview" style={{ width: '100px' }} />
          </div>
        )}
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;




