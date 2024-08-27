import React, { useEffect, useState } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductOpen, setIsProductOpen] = useState(false);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const openProduct = (product) => {
    setSelectedProduct(product);
    setIsProductOpen(true);
  };

  const closeProduct = () => {
    setSelectedProduct(null);
    setIsProductOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product Listing</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map(product => (
          <div
            key={product.id}
            className="border p-4 rounded shadow cursor-pointer"
            onClick={() => openProduct(product)}
          >
            <img src={product.image} alt={product.title} className="w-full h-48 object-cover mb-2" />
            <h2 className="text-lg font-bold">{product.title}</h2>
            <p className="text-gray-700">${product.price}</p>
          </div>
        ))}
      </div>

      {isProductOpen && selectedProduct && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{selectedProduct.title}</h2>
              <button onClick={closeProduct} className="text-gray-700 text-xl">&times;</button>
            </div>
            <img src={selectedProduct.image} alt={selectedProduct.title} className="w-full h-64 object-cover mb-4" />
            <p className="text-lg mb-4">Price: ${selectedProduct.price}</p>
            <p className="text-gray-700 mb-4">{selectedProduct.description}</p>
            <p className="text-sm text-gray-500">Category: {selectedProduct.category}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
