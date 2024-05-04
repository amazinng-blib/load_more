import React, { useEffect, useRef, useState } from 'react';
import './styles.css';

export default function LoadMoreData() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [loadRef, setLoadRef] = useState(true); // New state to control initial data loading

  async function fetchProducts(skip) {
    try {
      setLoading(true);
      const response = await fetch(
        `https://dummyjson.com/products?limit=20&skip=${skip * 20}`
      );

      const result = await response.json();
      if (result && result.products && result.products.length) {
        setProducts((prevData) => [...prevData, ...result.products]);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const handleButtonClick = () => {
    if (count > 0) {
      fetchProducts(count);
      setCount((prev) => prev + 1);
    }
  };

  console.log({ products, loadRef });

  useEffect(() => {
    if (loadRef) {
      fetchProducts(count);
      setLoadRef(false);
      setCount((prev) => prev + 1);
    }
  }, [loadRef, count]);

  if (loading) {
    return <div>Loading data | Please wait ...</div>;
  }

  return (
    <div className="load-more-container">
      <div className="product-container">
        {products?.map((product, index) => (
          <div className="product" key={index}>
            <img src={product.thumbnail} alt={product.title} />
            <p>{product.title}</p>
          </div>
        ))}
      </div>
      <div className="button-container">
        <button
          disabled={products?.length === 100}
          onClick={handleButtonClick}
          style={{
            cursor: `${products?.length === 100 && 'not-allowed'}`,
            color: `${products?.length === 100 && '#909090 '}`,
          }}
        >
          Load More Products
        </button>
      </div>
    </div>
  );
}
