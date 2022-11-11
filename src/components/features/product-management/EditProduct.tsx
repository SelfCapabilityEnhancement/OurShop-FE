import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';
import { Product } from '@/components/common/CustomeTypes';
import { classNames, generateUniqueImageName, validateForm } from '@/utils';
import ImageUploader from '@/components/common/image-uploader/ImageUploader';
import { updateProduct, uploadFile } from '@/service';
import { imageUrlPrefix, initValidateResult } from '@/constants';
import Banner from '@/components/common/banner/Banner';
import Loading from '@/components/common/loading/Loading';

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
  const [logisticMethods, setLogisticMethods] = useState(new Set());
  const [categories, setCategories] = useState(new Set());
  const [showLoading, setLoading] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const imagesNum = oldProduct.images.split(',').length;
    const imageFiles = new Array(imagesNum).fill(new File([], ''));
    setProduct({ ...oldProduct, imageFiles });
    setLogisticMethods(new Set(oldProduct.logisticMethod.split(';')));
    setCategories(new Set(oldProduct.category.split(';')));
  }, [oldProduct, isOpen]);

  const handleCategory = (
    event: React.ChangeEvent<HTMLInputElement>,
    category: string
  ) => {
    if (event.target.checked) {
      setCategories((prevState) => {
        const tmp = [...prevState, category];
        setProduct((prevState) => {
          const category = [...tmp].join(';');
          return {
            ...prevState,
            category,
          };
        });
        return new Set(tmp);
      });
    } else {
      setCategories((prevState) => {
        const tmp = [...prevState].filter((x) => x !== category);
        setProduct((prevState) => {
          const category = tmp.join(';');
          return {
            ...prevState,
            category,
          };
        });
        return new Set(tmp);
      });
    }
  };

  const handleLogisticMethod = (
    event: React.ChangeEvent<HTMLInputElement>,
    logisticMethod: string
  ) => {
    if (event.target.checked) {
      setLogisticMethods((prevState) => {
        const tmp = [...prevState, logisticMethod];
        setProduct((prevState) => {
          const logisticMethod = tmp.join(';');
          return {
            ...prevState,
            logisticMethod,
          };
        });
        return new Set(tmp);
      });
    } else {
      setLogisticMethods((prevState) => {
        const tmp = [...prevState].filter((x) => x !== logisticMethod);
        setProduct((prevState) => {
          const logisticMethod = tmp.join(';');
          return {
            ...prevState,
            logisticMethod,
          };
        });
        return new Set(tmp);
      });
    }
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
    const result = validateForm(product, [
      'logisticMethodComment',
      'imageFiles',
    ]);

    if (Object.values(result).includes(true)) {
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
                            'shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base p-2 text-center rounded focus:outline-none focus:ring',
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
                      <label htmlFor="category" className="mr-5 col-span-2">
                        <span className="text-red-500 pr-1">*</span>
                        Product Category
                      </label>
                      <div className="grid grid-cols-3 justify-around">
                        <label
                          htmlFor="clothes"
                          className="flex flex-row justify-items-start items-center mb-3"
                        >
                          <input
                            id="clothes"
                            type="checkbox"
                            name="category"
                            checked={categories.has('clothes')}
                            className={classNames(
                              'w-5 h-5 mr-2 accent-violet-500 outline-none',
                              validations.category
                                ? 'outline-none ring-inset ring ring-violet-500'
                                : ''
                            )}
                            onChange={(event) =>
                              handleCategory(event, 'clothes')
                            }
                          />
                          Clothes
                        </label>
                        <label
                          htmlFor="books"
                          className="flex flex-row justify-items-center items-center mb-3"
                        >
                          <input
                            id="book"
                            type="checkbox"
                            name="category"
                            checked={categories.has('book')}
                            className={classNames(
                              'w-5 h-5 mr-2 accent-violet-500 outline-none',
                              validations.category
                                ? 'outline-none ring-inset ring ring-violet-500'
                                : ''
                            )}
                            onChange={(event) => handleCategory(event, 'book')}
                          />
                          Book
                        </label>
                        <label
                          htmlFor="souvenir"
                          className="flex flex-row justify-items-end items-center mb-3 "
                        >
                          <input
                            id="souvenir"
                            type="checkbox"
                            name="category"
                            checked={categories.has('souvenir')}
                            className={classNames(
                              'w-5 h-5 mr-2 accent-violet-500 outline-none',
                              validations.category
                                ? 'outline-none ring-inset ring ring-violet-500'
                                : ''
                            )}
                            onChange={(event) =>
                              handleCategory(event, 'souvenir')
                            }
                          />
                          Souvenir
                        </label>
                      </div>
                    </div>

                    <label htmlFor="description" className="mr-5 col-span-2">
                      <span className="text-red-500 pr-1">*</span>
                      Product Description
                    </label>
                    <textarea
                      className={classNames(
                        'col-span-2 h-28 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base p-2 rounded focus:outline-none focus:ring',
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
                      <div className="text-xl mb-3">
                        <span className="text-red-500 mb-1 pr-1">*</span>
                        Logistic Methods
                      </div>
                      <label
                        htmlFor="office"
                        className="flex flex-row items-center mb-2"
                      >
                        <input
                          id="office"
                          type="checkbox"
                          name="logistic"
                          checked={logisticMethods.has('office')}
                          className={classNames(
                            'firstLogisticMethod w-5 h-5 mr-2 accent-violet-500 outline-none',
                            validations.logisticMethod
                              ? 'outline-none ring-inset ring ring-rose-500'
                              : ''
                          )}
                          onChange={(event) =>
                            handleLogisticMethod(event, 'office')
                          }
                        />
                        Collecting at Office
                      </label>
                      <label
                        htmlFor="address"
                        className="flex flex-row items-center"
                      >
                        <input
                          id="address"
                          type="checkbox"
                          name="logistic"
                          checked={logisticMethods.has('address')}
                          className={classNames(
                            'secondLogisticMethod w-5 h-5 mr-2 accent-violet-500 outline-none',
                            validations.logisticMethod
                              ? 'outline-none ring-inset ring ring-rose-500'
                              : ''
                          )}
                          onChange={(event) =>
                            handleLogisticMethod(event, 'address')
                          }
                        />
                        Shipping to an Address
                      </label>
                    </div>
                    <label
                      htmlFor="logisticMethodComment"
                      className="text-xl mr-5 col-span-2 mt-2"
                    >
                      Comment
                    </label>
                    <textarea
                      className="col-span-2 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base p-2 rounded mb-5 focus:outline-none focus:ring"
                      value={product.logisticMethodComment}
                      onChange={(event) =>
                        handleInputField(event, 'logisticMethodComment')
                      }
                      id="logisticMethodComment"
                    />
                    <button
                      onClick={(event) => handleSubmit(event)}
                      className="update col-start-2 text-white bg-violet-500 hover:bg-violet-700 focus:ring-violet-500 transition ease-in duration-200 font-medium rounded-lg text-lg w-64 px-5 py-2.5 text-center"
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
