import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';
import {
  OfficeAndStock,
  Product,
  StoresError,
} from '@/components/common/CustomTypes';
import {
  classNames,
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

const successMsg = 'The Product was Updated Successfully!';
const failMsg = 'All Required Field Must be Filled';

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
    need2UpdateOfficeName = false
  ) => {
    if (need2UpdateOfficeName) {
      storeItem.officeName = getOfficeName(storeItem.officeId);
    }
    const targetIndex = stores.findIndex(
      (item) => item.officeId === storeItem.officeId
    );
    stores.splice(targetIndex, 1, storeItem);
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
      officeName: 'Select Office',
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
          'w-16 h-6 ml-2 text-center text-sm font-normal py-0.5',
          categories.has(item) ? 'bg-purple-300' : 'bg-gray-300',
          validations.category
            ? 'outline-none ring-inset ring ring-rose-500'
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
    // TODO 判错昨天下午和吕靖测得时候还好，后来就不好了
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
        // window.location.reload();
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
                  className="text-lg font-medium leading-6 text-gray-900 grid grid-cols-3"
                >
                  <div></div>
                  <div className="justify-self-center font-semibold">
                    Edit Product
                  </div>
                  <div className="justify-self-end" data-testid="cancel-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                      onClick={() => handleClose()}
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
                        <label htmlFor={id} className="mr-5 w-30">
                          <span className="text-red-500 pr-1">*</span>
                          {label}
                        </label>
                        <input
                          type={type === 'string' ? 'text' : 'number'}
                          className={classNames(
                            'shadow-sm bg-gray-50 border border-gray-300 text-gray-900 ' +
                              'text-base p-2 text-center rounded focus:outline-none focus:ring focus:ring-purple-300',
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
                        <span className="text-red-500 pr-1">*</span>
                        Product Category
                      </div>
                      <div className="grid grid-cols-3 mt-3 w-1/2">
                        {categoryList.map((item) => renderCategory(item))}
                      </div>
                    </div>

                    <label htmlFor="description" className="mr-5 col-span-2">
                      <span className="text-red-500 pr-1">*</span>
                      Product Description
                    </label>
                    <textarea
                      className={classNames(
                        'col-span-2 h-28 shadow-sm resize-none bg-gray-50 border border-gray-300 text-gray-900 text-base p-2 rounded focus:outline-none focus:ring focus:ring-purple-300',
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

                    <div className="col-span-2 flex flex-col mt-3">
                      <div>Logistic & Inventory</div>
                      <div>
                        <p className="mb-3 mt-3">
                          <span className="text-red-500 pr-1">*</span>
                          Please indicate the office and number of product you
                          want to sell
                        </p>
                        <div>
                          {stores.map((item, index) => (
                            <>
                              <p className=" font-semibold my-3">{`Office ${
                                index + 1
                              }`}</p>
                              <OfficeStoreSelect
                                key={item.officeId}
                                storeItem={item}
                                officeList={newOfficeList}
                                error={storesError[item.officeId] || {}}
                                isMinCounts={stores.length === 1}
                                isMaxCounts={stores.length === 6}
                                setStoreItem={setStoreItem}
                                addStoreItem={addStoreItem}
                                deleteStoreItem={deleteStoreItem}
                              />
                            </>
                          ))}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={(event) => handleSubmit(event)}
                      className="mt-[100px] update col-start-2 text-white bg-violet-500 hover:bg-violet-700 focus:ring-violet-500 transition ease-in duration-200 font-medium rounded-lg text-lg w-64 px-5 py-2.5 text-center"
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
