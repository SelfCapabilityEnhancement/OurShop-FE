import ImageUploader from '@/components/common/image-uploader/ImageUploader';
import React, { useState } from 'react';
import { Product } from '@/components/common/CustomeTypes';
import Banner from '@/components/common/banner/Banner';

const successMsg = 'The product was created successfully!';
const failMsg = 'all required field must be filled';

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
    <div className='m-8'>
      <Banner visible={showBanner} result={validateForm()} successMsg={successMsg} failMsg={failMsg} />
      <form className='mb-6 grid grid-cols-2 gap-y-4 text-xl font-normal w-96'>
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
      </form>
      <button onClick={handleSubmit}
              className='create button text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'>
        Create Product
      </button>
    </div>
  );
}

export default CreateProduct;
