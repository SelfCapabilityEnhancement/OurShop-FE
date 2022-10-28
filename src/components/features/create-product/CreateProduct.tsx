import ImageUploader from '@/components/common/image-uploader/ImageUploader';
import React, { useEffect, useState } from 'react';
import { Tab } from '@headlessui/react';
import { UploadProduct } from '@/components/common/CustomeTypes';
import Banner from '@/components/common/banner/Banner';
import { classNames, generateUniqueImageName, validateForm } from '@/utils';
import Loading from '@/components/common/loading/Loading';
import { postProduct, uploadFile } from '@/service';

const successMsg = 'The Product was Created Successfully!';
const failMsg = 'All Required Field Must be Filled';

const emptyProduct: UploadProduct = {
  id: 1,
  name: '',
  priceToken: 0,
  priceMoney: 0,
  description: '',
  stock: 1,
  images: [],
  logisticMethod: '',
  logisticMethodComment: '',
};

const initValidateResult = {
  name: false,
  priceToken: false,
  priceMoney: false,
  description: false,
  images: false,
  logisticMethod: false,
};

const basicForm: { id: keyof UploadProduct; label: string; type: string }[] = [
  { id: 'name', label: 'Product Name', type: 'string' },
  { id: 'priceMoney', label: 'Price in USD', type: 'number' },
  { id: 'priceToken', label: 'Price in Token', type: 'number' },
];

const tabs = [
  { id: 'productInfo', name: 'Product Information' },
  { id: 'logisticInfo', name: 'Logistic Information' },
  { id: 'approvalFlow', name: 'Approval Flow' },
];

function CreateProduct() {
  const [imageURL, setImageURL] = useState<string[]>([]);
  const [product, setProduct] = useState<UploadProduct>(emptyProduct);
  const [showLoading, setLoading] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [logisticMethods, setLogisticMethods] = useState(new Set());
  const [validations, setValidations] = useState<any>(initValidateResult);

  useEffect(() => {
    if (Object.values(validations).includes(true)) {
      setTimeout(() => {
        setValidations(initValidateResult);
      }, 2000);
    }
  }, [validations]);

  const handleNewImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files !== null && files.length > 0) {
      const newFileName = generateUniqueImageName(files[0].name);
      const renamedFile = new File([files[0]], newFileName);

      setImageURL((prevState) => [
        ...prevState,
        URL.createObjectURL(renamedFile),
      ]);
      setProduct((prevState) => {
        return {
          ...prevState,
          images: [...prevState.images, renamedFile],
        };
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

  const handleCheckBox = (
    event: React.ChangeEvent<HTMLInputElement>,
    logisticMethod: string
  ) => {
    if (event.target.checked) {
      setLogisticMethods((prevState) => {
        const tmp = [...prevState, logisticMethod];
        setProduct((prevState) => {
          const logisticMethod = [...tmp].join(';');
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
          const logisticMethod = [...tmp].join(';');
          return {
            ...prevState,
            logisticMethod,
          };
        });
        return new Set(tmp);
      });
    }
  };

  const handleNext = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    const result = validateForm(product, [
      'logisticMethod',
      'logisticMethodComment',
    ]);

    if (Object.values(result).includes(true)) {
      setValidations(result);
      setShowBanner(true);
      setTimeout(() => setShowBanner(false), 1500);
    } else {
      setSelectedTab(1);
    }
  };

  const handleSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    const result = validateForm(product, ['logisticMethodComment']);

    if (Object.values(result).includes(true)) {
      setValidations(result);
    } else {
      setLoading(true);
      await uploadFile(product);
      await postProduct(product);

      setLoading(false);
      setProduct(() => emptyProduct);
      setImageURL(() => []);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }

    setShowBanner(true);
    setTimeout(() => setShowBanner(false), 1500);
  };

  return (
    <div className="w-full max-w-full p-3">
      <Tab.Group manual selectedIndex={selectedTab} onChange={setSelectedTab}>
        <Tab.List className="flex space-x-10 p-1">
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              onClick={(event: { preventDefault: () => void }) => {
                event.preventDefault();
              }}
              className={({ selected }) =>
                classNames(
                  'w-52 rounded-lg text-xl font-normal',
                  selected
                    ? `${tab.id} text-purple-500 underline underline-offset-8`
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
            <div className="m-8">
              <Banner visible={showBanner} success={false} message={failMsg} />
              <form className="mb-6 grid grid-cols-2 gap-y-4 text-xl font-normal w-96">
                {basicForm.map(({ id, label, type }) => (
                  <div key={id} className="col-span-2 grid grid-cols-2 gap-y-4">
                    <label htmlFor={id} className="mr-5 w-30">
                      <span className="text-red-500 pr-1">*</span>
                      {label}
                    </label>
                    <input
                      type={type === 'string' ? 'text' : 'number'}
                      className={classNames(
                        'shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base p-2 text-center rounded focus:outline-none focus:ring',
                        validations[id] ? 'outline-none ring ring-rose-500' : ''
                      )}
                      onChange={(event) => handleInputField(event, id)}
                      value={
                        type === 'number' && product[id] === 0
                          ? ''
                          : `${product[id]}`
                      }
                      id={id}
                    />
                  </div>
                ))}

                <label htmlFor="description" className="mr-5 col-span-2">
                  <span className="text-red-500 pr-1">*</span>
                  Product Description
                </label>
                <textarea
                  className={classNames(
                    'col-span-2 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base p-2 rounded focus:outline-none focus:ring',
                    validations.description
                      ? 'outline-none ring ring-rose-500'
                      : ''
                  )}
                  value={product.description}
                  onChange={(event) => handleInputField(event, 'description')}
                  id="description"
                />

                <ImageUploader
                  images={imageURL}
                  handleNewImage={handleNewImage}
                  validation={validations.images}
                />
                <button
                  onClick={(event) => handleNext(event)}
                  className="next text-white bg-violet-500 hover:bg-violet-700 font-medium rounded-lg text-lg w-64 px-5 py-2.5 text-center"
                >
                  Next
                </button>
              </form>
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <Banner
              visible={showBanner}
              success={!Object.values(validations).includes(true)}
              message={
                Object.values(validations).includes(true) ? failMsg : successMsg
              }
            />
            <Loading message="Processing..." visible={showLoading} />
            <div className="flex flex-col m-8 w-96">
              <div className="text-xl mb-5">
                <span className="text-red-500 mb-1 pr-1">*</span>
                Logistic Methods
              </div>
              <label
                htmlFor="office"
                className="flex flex-row items-center mb-3"
              >
                <input
                  id="office"
                  type="checkbox"
                  name="logistic"
                  checked={logisticMethods.has('office')}
                  className={classNames(
                    'firstLogisticMethod w-5 h-5 mr-2 accent-purple-500 outline-none',
                    validations.logisticMethod
                      ? 'outline-none ring-inset ring ring-rose-500'
                      : ''
                  )}
                  onChange={(event) => handleCheckBox(event, 'office')}
                />
                collecting at office
              </label>
              <label htmlFor="address" className="flex flex-row items-center">
                <input
                  id="address"
                  type="checkbox"
                  name="logistic"
                  checked={logisticMethods.has('address')}
                  className={classNames(
                    'firstLogisticMethod w-5 h-5 mr-2 accent-purple-500 outline-none',
                    validations.logisticMethod
                      ? 'outline-none ring-inset ring ring-rose-500'
                      : ''
                  )}
                  onChange={(event) => handleCheckBox(event, 'address')}
                />
                shipping to an address
              </label>
              <label
                htmlFor="logisticMethodComment"
                className="text-xl mr-5 col-span-2 mt-10 mb-2"
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
                className="create text-white bg-violet-500 hover:bg-violet-700 font-medium rounded-lg text-lg w-64 px-5 py-2.5 text-center"
              >
                Create Product
              </button>
            </div>
          </Tab.Panel>
          <Tab.Panel>Approval Flow</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export default CreateProduct;
