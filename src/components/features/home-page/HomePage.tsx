import { getProducts } from '@/assets/mockData';
import productImage from 'images/product/product1.png';

export default function HomePage() {
  const products = getProducts();

  return (
    <div className='grid grid-flow-col auto-cols-min mt-10'>
      {products.map((product) => (
        <div key={product.id}
             className='product w-60 h-48 mx-5 flex flex-col bg-gray-100'>
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
