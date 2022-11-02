import { useEffect, useState } from 'react';
import { Product } from '@/components/common/CustomeTypes';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '@/service';

export default function HomePage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    getProducts().then((products) => {
      setProducts(products);
    });
  }, []);

  const handleClick = (product: Product) => {
    navigate('/detail', { state: { product } });
  };

  return (
    <div className="grid grid-cols-fluid justify-between my-10">
      {products.map((product, key) => (
        <div
          key={product.id}
          onClick={() => handleClick(product)}
          className="product w-60 h-72 mb-5 mx-auto flex flex-col bg-gray-100"
        >
          <img
            src={product.images.split(',')[0]}
            alt="product"
            className={`image${key} h-48 w-60 object-cover`}
          />
          <div className="bg-gray-100">
            <div className="text-xl font-normal">{product.name}</div>
            <div className="text-l font-normal text-red-600">
              {`$${product.priceMoney} or ${product.priceToken} Token`}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
