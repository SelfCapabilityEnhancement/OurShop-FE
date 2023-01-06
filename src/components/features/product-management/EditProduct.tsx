import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';
import {
  OfficeAndStock,
  Product,
  StoresError,
} from '@/components/common/CustomTypes';
import { clsx as classNames } from 'clsx';
import {
  generateUniqueImageName,
  validateForm,
  validateOffices,
} from '@/utils';
import ImageUploader from '@/components/common/image-uploader/ImageUploader';
import { updateProduct, uploadFile } from '@/service';
import { categoryList, imageUrlPrefix, initValidateResult } from '@/constants';
import Banner from '@/components/common/banner/Banner';
import Loading from '@/components/common/loading/Loading';
import { officeList } from '@/components/features/create-product/CreateProduct';
import OfficeStoreSelect from '@/components/features/product-management/OfficeStoreSelect';

const successMsg = 'The product was updated successfully!';
const failMsg = 'All required fields must be filled.';

const basicForm: { id: keyof Product; label: string; type: string }[] = [
  { id: 'name', label: 'Product Name', type: 'string' },
  { id: 'priceMoney', label: 'Price in USD', type: 'number' },
  { id: 'priceToken', label: 'Price in Token', type: 'number' },
];

export default function EditProduct({
  isOpen,
  handleClose,
  oldProduct,
}: {
  isOpen: boolean;
  handleClose: Function;
  oldProduct: Product;
}) {
  const [validations, setValidations] = useState<any>(initValidateResult);
  const [product, setProduct] = useState<Product>(oldProduct);
  const [categories, setCategories] = useState(new Set());
  const [showLoading, setLoading] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  const [stores, setStores] = useState<OfficeAndStock[]>(
    oldProduct.officeStockList
  );

  const [storesError, setStoresError] = useState<StoresError>({});

  useEffect(() => {
    const imagesNum = oldProduct.images.split(',').length;
    const imageFiles = new Array(imagesNum).fill(new File([], ''));
    setProduct({ ...oldProduct, imageFiles });
    setCategories(new Set(oldProduct.category.split(';')));
    setStores(oldProduct.officeStockList);
  }, [oldProduct, isOpen]);

  const setStoreItem = (
    storeItem: OfficeAndStock,
    needToUpdateOfficeName: boolean,
    index: number
  ) => {
    if (needToUpdateOfficeName) {
      storeItem.officeName = getOfficeName(storeItem.officeId);
    }
    stores.splice(index, 1, storeItem);
    setStores([...stores]);
    setProduct((product) => {
      return {
        ...product,
        officeStockList: stores.map(({ officeId, officeName, stock }) => ({
          officeId,
          officeName,
          stock,
        })),
      };
    });
  };

  const addStoreItem = () => {
    stores.push({
      officeId: 0,
      officeName: 'Select an Office',
      stock: 0,
    });
    setStores([...stores]);
  };

  const deleteStoreItem = (id: number) => {
    const targetIndex = stores.findIndex((item) => item.officeId === id);
    stores.splice(targetIndex, 1);
    setStores([...stores]);
    setProduct((product) => {
      return {
        ...product,
        officeStockList: stores.map(({ officeId, officeName, stock }) => ({
          officeId,
          officeName,
          stock,
        })),
      };
    });
  };

  const getOfficeName = (id: number) => {
    const target = officeList.find((item) => item.id === id);
    return target!.name;
  };

  const selectedOffices = stores.map((item) => item.officeId);
  const newOfficeList = officeList.filter(
    (item) => !selectedOffices.includes(item.id)
  );
  const handleCategory = (item: string) => {
    if (!categories.has(item)) {
      const tmp = [...categories, item];
      setCategories(new Set(tmp));
      setProduct({ ...product, category: tmp.join(';') });
    } else {
      const tmp = [...categories].filter((x) => x !== item);
      setCategories(new Set(tmp));
      setProduct({ ...product, category: tmp.join(';') });
    }
  };

  const renderCategory = (item: string) => {
    return (
      <div
        key={item}
        onClick={() => handleCategory(item)}
        className={classNames(
          'ml-2 h-6 w-16 py-0.5 text-center text-sm font-normal',
          categories.has(item) ? 'bg-purple-300' : 'bg-gray-300',
          validations.category
            ? 'outline-none ring ring-inset ring-rose-500'
            : ''
        )}
      >
        {item}
      </div>
    );
  };

  const handleInputField = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    const value = event.target.value;
    const tmp = { ...product };
    switch (field) {
      case 'name':
        tmp.name = value;
        break;
      case 'priceMoney':
        tmp.priceMoney = Number(value);
        break;
      case 'priceToken':
        tmp.priceToken = Number(value);
        break;
      case 'description':
        tmp.description = value;
        break;
      case 'logisticMethodComment':
        tmp.logisticMethodComment = value;
    }

    setProduct(tmp);
  };

  const handleNewImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files !== null && files.length > 0) {
      const newFileName = generateUniqueImageName(files[0].name);
      const renamedFile = new File([files[0]], newFileName);
      const newFileURL = URL.createObjectURL(renamedFile);

      setProduct((prevState) => {
        return {
          ...prevState,
          images: prevState.images
            ? [prevState.images, newFileURL].join(',')
            : newFileURL,
          imageFiles: [...prevState.imageFiles, renamedFile],
        };
      });
    }
  };

  const handleRemoveImage = async (index: number) => {
    const tmpImages = product.images.split(',');
    const tmpImageFiles = [...product.imageFiles];

    tmpImages.splice(index, 1);
    tmpImageFiles.splice(index, 1);

    setProduct((prevState) => {
      return {
        ...prevState,
        images: tmpImages.join(','),
        imageFiles: tmpImageFiles,
      };
    });
  };

  const handleSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    const result = validateForm(product, ['imageFiles', 'deletedTime']);
    const storesValidateResult = validateOffices(stores);
    setStoresError(storesValidateResult);

    const isInvalidStoreExist = !!Object.keys(storesValidateResult).length;

    if (Object.values(result).includes(true) && isInvalidStoreExist) {
      setValidations(result);
      setTimeout(() => setValidations(initValidateResult), 2000);
    } else {
      setLoading(true);
      const imagesURL = product.images.split(',');
      await uploadFile(
        product.imageFiles.filter(
          (_, index) => !imagesURL[index].startsWith(imageUrlPrefix)
        )
      );
      await updateProduct(product);

      setLoading(false);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }

    setShowBanner(true);
    setTimeout(() => setShowBanner(false), 1500);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-[550px] transform overflow-hidden rounded-2xl bg-gray-200 p-6 align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="grid grid-cols-3 text-lg font-medium leading-6 text-gray-900"
                >
                  <div></div>
                  <div className="justify-self-center font-semibold">
                    Edit Product
                  </div>
                  <div
                    className="justify-self-end"
                    data-testid="cancelIcon"
                    onClick={() => handleClose()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                </Dialog.Title>
                <div className="mt-2">
                  <Banner
                    visible={showBanner}
                    success={!Object.values(validations).includes(true)}
                    message={
                      Object.values(validations).includes(true)
                        ? failMsg
                        : successMsg
                    }
                  />
                  <Loading message="Processing..." visible={showLoading} />
                  <form className="mb-6 grid grid-cols-2 gap-y-3 text-xl font-normal">
                    {basicForm.map(({ id, label, type }) => (
                      <div
                        key={id}
                        className="col-span-2 grid grid-cols-2 gap-y-4"
                      >
                        <label htmlFor={id} className="w-30 mr-5">
                          <span className="pr-1 text-red-500">*</span>
                          {label}
                        </label>
                        <input
                          type={type === 'string' ? 'text' : 'number'}
                          className={classNames(
                            'border border-gray-300 bg-gray-50 text-gray-900 shadow-sm ' +
                              'rounded p-2 text-center text-base focus:outline-none focus:ring focus:ring-purple-300',
                            validations[id]
                              ? 'outline-none ring ring-rose-500'
                              : ''
                          )}
                          onChange={(event) => handleInputField(event, id)}
                          value={product[id] as string}
                          id={id}
                        />
                      </div>
                    ))}

                    <div className="col-span-2">
                      <div>
                        <span className="pr-1 text-red-500">*</span>
                        Product Category
                      </div>
                      <div className="mt-3 grid w-1/2 grid-cols-3">
                        {categoryList.map((item) => renderCategory(item))}
                      </div>
                    </div>

                    <label htmlFor="description" className="col-span-2 mr-5">
                      <span className="pr-1 text-red-500">*</span>
                      Product Description
                    </label>
                    <textarea
                      className={classNames(
                        'col-span-2 h-28 resize-none rounded border border-gray-300 bg-gray-50 p-2 text-base text-gray-900 shadow-sm focus:outline-none focus:ring focus:ring-purple-300',
                        validations.description
                          ? 'outline-none ring ring-rose-500'
                          : ''
                      )}
                      value={product.description}
                      onChange={(event) =>
                        handleInputField(event, 'description')
                      }
                      id="description"
                    />

                    <ImageUploader
                      images={
                        product.images.length > 0
                          ? product.images.split(',')
                          : []
                      }
                      handleNewImage={handleNewImage}
                      handleRemoveImage={handleRemoveImage}
                      validation={validations.images}
                    />

                    <div className="col-span-2 mt-3 flex flex-col">
                      <div>Office & Inventory</div>
                      <div>
                        <p className="mb-3 mt-3">
                          <span className="pr-1 text-red-500">*</span>
                          Please indicate the office and number of product you
                          want to sell.
                        </p>
                        <div>
                          {stores.map((item, index) => (
                            <div key={item.officeId}>
                              <p className=" my-3 font-semibold">{`Office ${
                                index + 1
                              }`}</p>

                              <OfficeStoreSelect
                                index={index}
                                storeItem={item}
                                officeList={newOfficeList}
                                error={storesError[item.officeId] || {}}
                                isMinCounts={stores.length === 1}
                                isMaxCounts={stores.length === 6}
                                setStoreItem={setStoreItem}
                                addStoreItem={addStoreItem}
                                deleteStoreItem={deleteStoreItem}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <button
                      data-testid="save-btn"
                      onClick={(event) => handleSubmit(event)}
                      className="update col-start-2 mt-[100px] w-64 rounded-lg bg-violet-500 px-5 py-2.5 text-center text-lg font-medium text-white transition duration-200 ease-in hover:bg-violet-700 focus:ring-violet-500"
                    >
                      Save
                    </button>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
