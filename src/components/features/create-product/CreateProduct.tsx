function CreateProduct() {
  return (
    <form className='m-8'>
      <div className='mb-6 grid grid-cols-2 gap-y-4 text-xl font-normal w-96'>
        <label htmlFor='name'
               className='mr-5 w-30'>
          <span className='text-red-500 pr-1'>*</span>product name
        </label>
        <input type='text'
               id='name'
               className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base p-2 rounded focus:outline-none focus:ring'
               required />

        <label htmlFor='usd'
               className='mr-5'>
          <span className='text-red-500 pr-1'>*</span>price in USD
        </label>
        <input type='number'
               id='usd'
               className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base p-2 rounded focus:outline-none focus:ring'
               required />

        <label htmlFor='token'
               className='mr-5'>
          <span className='text-red-500 pr-1'>*</span>price in token
        </label>
        <input type='number'
               id='token'
               className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base p-2 rounded focus:outline-none focus:ring'
               required />

        <label htmlFor='description'
               className='mr-5 col-span-2'>
          <span className='text-red-500 pr-1'>*</span>product description
        </label>
        <input type='text'
               id='description'
               className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base p-2 rounded focus:outline-none focus:ring'
               required />

        <label htmlFor='description'
               className='mr-5 col-span-2'>
          <span className='text-red-500 pr-1'>*</span>picture
        </label>
        <input type='text'
               id='description'
               className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base p-2 rounded focus:outline-none focus:ring'
               required />
      </div>
      <button type='submit'
              className='create button text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'>
        Create Product
      </button>
    </form>
  );
}

export default CreateProduct;
