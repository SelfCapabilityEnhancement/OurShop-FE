import ImageUploader from '@/components/common/image-uploader/ImageUploader';
import React, { useState } from 'react';
import { Product } from '@/components/common/CustomeTypes';

const emptyProduct: Product = {
  id: '',
  name: '',
  token: -1,
  usd: -1,
  description: '',
  sku: -1,
  images: [],
};

const basicForm = [
  { id: 'name', label: 'product name' },
  { id: 'usd', label: 'price in USD' },
  { id: 'token', label: 'price in token' }];

function CreateProduct() {
  const [product, setProduct] = useState<Product>(emptyProduct);

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

  return (
    <form className='m-8'>
      <div className='mb-6 grid grid-cols-2 gap-y-4 text-xl font-normal w-96'>
        {basicForm.map(({ id, label }) => (
          <>
            <label htmlFor={id}
                   className='mr-5 w-30'>
              <span className='text-red-500 pr-1'>*</span>{label}
            </label>
            <input type='text'
                   className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base p-2 rounded focus:outline-none focus:ring'
                   id={id} />
          </>
        ))}

        <label htmlFor='description'
               className='mr-5 col-span-2'>
          <span className='text-red-500 pr-1'>*</span>product description
        </label>
        <textarea
          className='col-span-2 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base p-2 rounded focus:outline-none focus:ring'
          value={product.description}
          id='description' />

        <ImageUploader images={product.images} handleNewImage={handleNewImage} />
      </div>
      <button type='submit'
              className='create button text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'>
        Create Product
      </button>
    </form>
  );
}

export default CreateProduct;
