import { Tab } from '@headlessui/react';
import { classNames } from '@/utils';
import { useEffect, useState } from 'react';
import { Product } from '@/components/common/CustomTypes';
import { getDeletedProducts, getProducts } from '@/service';
import EditProduct from '@/components/features/product-management/EditProduct';
import DeleteProduct from '@/components/features/product-management/DeleteProduct';
import Banner from '@/components/common/banner/Banner';
import { useNavigate } from 'react-router-dom';

const tabs = [
  { id: 'available', name: 'Available Products' },
  { id: 'deleted', name: 'Deleted Products' },
];

const deleteProductSuccessfullyMessage = 'The product was deleted successfully';

export default function ProductManagement() {
  const navigate = useNavigate();
  const [available, setAvailable] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [deleted, setDeleted] = useState<Product[]>([]);
  const [showDeletedModal, setShowDeletedModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [chosen, setChosen] = useState(0);
  const [showDeleteProductBanner, setShowDeleteProductBanner] = useState(false);
  const [showNotLoginBanner, setShowNotLoginBanner] = useState(false);
  const [showNotAuthorizedBanner, setShowNotAuthorizedBanner] = useState(false);

  const routerList = localStorage.getItem('router');
  if (routerList === null) {
    useEffect(() => {
      setShowNotLoginBanner(true);
      setTimeout(() => {
        setShowNotLoginBanner(false);
        navigate('/login');
      }, 2000);
    }, []);
    return (
      <Banner
        visible={showNotLoginBanner}
        success={false}
        message={'Not Login'}
      />
    );
  } else if (!routerList.includes('product-management')) {
    useEffect(() => {
      setShowNotAuthorizedBanner(true);
      setTimeout(() => {
        setShowNotAuthorizedBanner(false);
        navigate('/home');
      }, 2000);
    }, []);
    return (
      <Banner
        visible={showNotAuthorizedBanner}
        success={false}
        message={'You are forbidden to access this page.'}
      />
    );
  } else {
    useEffect(() => {
      getProducts().then((products) => {
        setAvailable(products);
      });
      getDeletedProducts().then((deletedProducts) => {
        setDeleted(deletedProducts);
      });
    }, []);

    const handleEdit = (index: number) => {
      setChosen(index);
      setShowModal(true);
    };

    const handleCancelEdit = () => {
      setShowModal(false);
    };

    const handleDeleteModalEdit = () => {
      setShowDeletedModal(false);
      setShowDeleteProductBanner(true);
      setTimeout(() => setShowDeleteProductBanner(false), 1500);
      setTimeout(() => window.location.reload(), 1500);
    };

    const handleCancelBtn = () => {
      setShowDeletedModal(false);
    };

    const handleDelete = (index: number) => {
      setShowDeletedModal(true);
      if (available.length > 0) {
        setSelectedProduct(available[index]);
      }
    };

    return (
      <div className="w-full max-w-full p-3">
        {available.length > 0 && (
          <EditProduct
            isOpen={showModal}
            handleClose={handleCancelEdit}
            oldProduct={available[chosen]}
          />
        )}
        <DeleteProduct
          isOpen={showDeletedModal}
          handleCancel={handleCancelBtn}
          handleDelete={handleDeleteModalEdit}
          product={selectedProduct}
        />
        <Banner
          visible={showDeleteProductBanner}
          success={true}
          message={deleteProductSuccessfullyMessage}
        ></Banner>
        <Tab.Group>
          <Tab.List className="flex space-x-10 p-1">
            {tabs.map((tab) => (
              <Tab
                key={tab.id}
                className={({ selected }) =>
                  classNames(
                    'w-52 rounded-lg text-xl font-semibold outline-0 mt-4',
                    selected
                      ? `${tab.id} text-pink-500 underline underline-offset-8 border-b-2 border-white`
                      : 'text-gray-800'
                  )
                }
              >
                {tab.name}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <div className="flex justify-around">
                <ul className="flex flex-col w-11/12">
                  {available.map((product, index) => (
                    <li
                      key={product.id}
                      className="available border-gray-400 my-3 h-20"
                    >
                      <div className="flex transition duration-500 shadow ease-in-out transform hover:-translate-y-1 hover:shadow-lg select-none cursor-pointer bg-white rounded-md items-center p-4">
                        <div className="mx-5">
                          <img
                            alt="profile"
                            src={product.images.split(',')[0]}
                            className="w-20 h-16 mx-auto object-cover rounded-lg"
                          />
                        </div>
                        <div className="font-medium w-2/5 mx-5">
                          {product.name}
                        </div>
                        <div className="text-red-600 flex-1">{`$${product.priceMoney} or ${product.priceToken} Token`}</div>
                        <div className="grid grid-cols-2 gap-x-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                            onClick={() => handleEdit(index)}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            />
                          </svg>

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                            onClick={() => handleDelete(index)}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className="flex justify-around">
                <ul className="flex flex-col w-11/12">
                  {deleted.map((product) => (
                    <li
                      key={product.id}
                      className="deleted border-gray-400 my-3 h-20"
                    >
                      <div className="flex transition duration-500 shadow ease-in-out transform hover:-translate-y-1 hover:shadow-lg select-none cursor-pointer bg-white rounded-md items-center p-4">
                        <div className="mx-5">
                          <img
                            alt="profile"
                            src={product.images.split(',')[0]}
                            className="w-20 h-16 mx-auto object-cover rounded-lg"
                          />
                        </div>
                        <div className="font-medium w-2/5 mx-5">
                          {product.name}
                        </div>
                        <div className="text-red-600 flex-1">{`$${product.priceMoney} or ${product.priceToken} Token`}</div>
                        <div className="font-medium">
                          Delete Time:
                          <span className="mx-1">
                            {product.deletedTime !== null
                              ? product.deletedTime
                              : ' '}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    );
  }
}
