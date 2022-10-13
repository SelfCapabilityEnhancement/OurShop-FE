import productImage from 'images/product/product1.png';
import { useEffect, useState } from 'react';
import { Product } from '@/components/common/CustomeTypes';
import { http } from '@/service';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const getProducts = async () => {
      await http.get('/product').then(({ data }) => setProducts(data));
    };

    getProducts().then();
  }, []);

  const handleClick = (product: Product) => {
    navigate('/detail', {state: { product }});
  };

  return (
    <div className='grid grid-cols-fluid justify-between my-10'>
      {products.map((product) => (
        <div key={product.id}
             onClick={() => handleClick(product)}
             className='product w-60 h-48 mb-20 mx-auto flex flex-col bg-gray-100'>
          <img src={productImage} alt='product' />
          <div className='bg-gray-100'>
            <div className='text-xl font-normal'>{product.name}</div>
            <div className='text-xl font-normal text-red-600'>
              {`$${product.priceMoney} or ${product.priceToken} Token`}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
