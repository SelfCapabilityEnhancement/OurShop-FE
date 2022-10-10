import ImageUploader from '@/components/common/image-uploader/ImageUploader';
import React, { Fragment, useState } from 'react';
import { Product } from '@/components/common/CustomeTypes';
import { Dialog, Transition } from '@headlessui/react';

const emptyProduct: Product = {
  id: '',
  name: '',
  token: 0,
  usd: 0,
  description: '',
  sku: 1,
  images: [],
};

const basicForm = [
  { id: 'name', label: 'product name', type: 'string' },
  { id: 'usd', label: 'price in USD', type: 'number' },
  { id: 'token', label: 'price in token', type: 'number' }];

function CreateProduct() {
  const [product, setProduct] = useState<Product>(emptyProduct);
  const [showBanner, SetShowBanner] = useState(false);

  const handleNewImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files !== null && files.length > 0) {
      setProduct((prevState) => {
          return {
            ...prevState,
            images: [...prevState.images, URL.createObjectURL(files[0])],
          };
        }
      );
    }
  };

  const handleInputField = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
    const value = event.target.value;
    const tmp = { ...product };
    switch (field) {
      case 'name':
        tmp.name = value;
        break;
      case 'usd':
        tmp.usd = Number(value);
        break;
      case 'token':
        tmp.token = Number(value);
        break;
      case 'description':
        tmp.description = value;
    }

    setProduct(tmp);
  };


  const getBanner = (validateResult: boolean) => {
    return (
      <Transition appear show={showBanner} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={() => {
        }}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex mt-20 items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className={`${validateResult ? 'bg-green-200' : 'bg-red-200'} transform overflow-hidden rounded-md p-3 text-left align-middle shadow-xl transition-all`}>
                  <div className={`flex flex-row items-center text-sm`}>
                    <svg xmlns='http://www.w3.org/2000/svg'
                         fill='none'
                         viewBox='0 0 24 24'
                         strokeWidth={1.5}
                         stroke='currentColor'
                         className={`w-6 h-6 ${validateResult ? 'text-green-600' : 'text-red-600'} mr-2`}>
                      <path strokeLinecap='round'
                            strokeLinejoin='round'
                            d={validateResult ? 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z' : 'M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z'} />
                    </svg>
                    {validateResult ? 'The product was created successfully!' : 'all required field must be filled'}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    );
  };

  const validateForm = () => {
    let result = true;
    Object.entries(product).forEach(([key, value]) => {
      if (typeof value === 'number' && value <= 0) {
        result = false;
      } else if (key !== 'id' && value.length <= 0) {
        result = false;
      }
    });
    return result;
  };

  const handleSubmit = () => {
    SetShowBanner(true);
    setTimeout(() => SetShowBanner(false), 1500);

    if (validateForm()) {
      // Post
    }
  };

  return (
    <div className=''>
      {getBanner(validateForm())}
      <form className='m-8'>
        <div className='mb-6 grid grid-cols-2 gap-y-4 text-xl font-normal w-96'>
          {basicForm.map(({ id, label, type }) => (
            <div key={id} className='col-span-2 grid grid-cols-2 gap-y-4'>
              <label htmlFor={id}
                     className='mr-5 w-30'>
                <span className='text-red-500 pr-1'>*</span>{label}
              </label>
              <input type={type === 'string' ? 'text' : 'number'}
                     className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base p-2 rounded focus:outline-none focus:ring'
                     onChange={(event) => handleInputField(event, id)}
                     value={ product[id as keyof Product] === 0 ? '' : product[id as keyof Product]}
                     id={id} />
            </div>
          ))}

          <label htmlFor='description'
                 className='mr-5 col-span-2'>
            <span className='text-red-500 pr-1'>*</span>product description
          </label>
          <textarea
            className='col-span-2 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base p-2 rounded focus:outline-none focus:ring'
            value={product.description}
            onChange={(event) => handleInputField(event, 'description')}
            id='description' />

          <ImageUploader images={product.images} handleNewImage={handleNewImage} />
        </div>
      </form>
      <button onClick={handleSubmit}
              className='create button text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'>
        Create Product
      </button>
    </div>
  );
}

export default CreateProduct;
