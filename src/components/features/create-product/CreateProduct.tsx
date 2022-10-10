import ImageUploader from '@/components/common/image-uploader/ImageUploader';
import React, { useState } from 'react';
import { Product } from '@/components/common/CustomeTypes';

function CreateProduct() {
  const [product, setProduct] = useState<Product>({id: '', name: '', token: -1, usd: -1, description: '', sku: -1, images: []});

  const handleNewImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files !== null && files.length > 0) {
      setProduct((prevState) => {
          return {...prevState, images: [...prevState.images, URL.createObjectURL(files[0])]};
        }
      );
    }
  };

  return (
    <form className='m-8'>
      <div className='mb-6 grid grid-cols-2 gap-y-4 text-xl font-normal w-96'>
        <label htmlFor='name'
               className='mr-5 w-30'>
          <span className='text-red-500 pr-1'>*</span>product name
        </label>
        <input type='text'
               className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base p-2 rounded focus:outline-none focus:ring'
               id='name' />

        <label htmlFor='usd'
               className='mr-5'>
          <span className='text-red-500 pr-1'>*</span>price in USD
        </label>
        <input type='number'
               className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base p-2 rounded focus:outline-none focus:ring'
               id='usd' />

        <label htmlFor='token'
               className='mr-5'>
          <span className='text-red-500 pr-1'>*</span>price in token
        </label>
        <input type='number'
               className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base p-2 rounded focus:outline-none focus:ring'
               id='token' />

        <label htmlFor='description'
               className='mr-5 col-span-2'>
          <span className='text-red-500 pr-1'>*</span>product description
        </label>
        <input type='text'
               className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base p-2 rounded focus:outline-none focus:ring'
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
