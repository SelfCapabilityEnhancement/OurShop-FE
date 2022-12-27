import { useEffect, useState } from 'react';
import { Product } from '@/components/common/CustomTypes';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, getProducts } from '@/service';
import SearchBar from '@/components/features/home-page/SearchBar';
import SaveUserInfo from '@/components/features/home-page/SaveUserInfo';

export default function HomePage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [, setUserRealName] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getCurrentUser().then((user) => {
      setUserRealName(user.realName);
      user.realName === '' ? setIsOpen(true) : setIsOpen(false);
    });
  }, [isOpen]);

  useEffect(() => {
    getProducts().then((products) => {
      setProducts(products);
      setIsLoading(false);
    });
  }, []);

  const handleClick = (product: Product) => {
    navigate('/detail', { state: { product } });
  };

  function renderProducts(products: Product[]) {
    return products.map((product, key) => (
      <div
        key={product.id}
        onClick={() => handleClick(product)}
        className="product w-full h-72 mb-5 flex flex-col bg-gray-100"
        id="home-product"
      >
        <img
          src={product.images.split(',')[0]}
          alt="product"
          className={`image${key} h-48 w-full object-cover`}
          id="product-img"
        />
        <div className="bg-gray-100">
          <div className="text-xl font-normal">{product.name}</div>
          <div className="text-l font-normal text-red-600">
            {`$${product.priceMoney} or ${product.priceToken} Token`}
          </div>
        </div>
      </div>
    ));
  }

  function renderNoProducts(products: Product[]) {
    if (products.length === 0) {
      return (
        <p className="text-xl font-normal text-gray-500">
          Sorry, no result matched with your searching criteria ({'>'}﹏{'<'})
        </p>
      );
    }
  }

  return (
    <div className="relative">
      {!isLoading && (
        <div>
          <div className="flex justify-center">
            <SearchBar setProduct={setProducts} />
          </div>
          <SaveUserInfo isOpen={isOpen} setIsOpen={setIsOpen} />
          <div className="grid grid-cols-5 gap-7 justify-between my-10 mx-10">
            {renderProducts(products)}
          </div>
          <div className="mt-[3%] flex justify-center">
            {renderNoProducts(products)}
          </div>
        </div>
      )}
    </div>
  );
}
