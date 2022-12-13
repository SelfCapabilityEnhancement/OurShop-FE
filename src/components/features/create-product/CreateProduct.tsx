import ImageUploader from '@/components/common/image-uploader/ImageUploader';
import React, { useEffect, useState } from 'react';
import { Tab } from '@headlessui/react';
import { Product } from '@/components/common/CustomTypes';
import Banner from '@/components/common/banner/Banner';
import { classNames, generateUniqueImageName, validateForm } from '@/utils';
import Loading from '@/components/common/loading/Loading';
import { newProduct, uploadFile } from '@/service';
import { categoryList, initProduct, initValidateResult } from '@/constants';
// import Dropdown from 'react-bootstrap/Dropdown';
import { Dropdown } from 'rsuite';

const successMsg = 'The Product was Created Successfully!';
const failMsg = 'All Required Field Must be Filled';

const basicForm: { id: keyof Product; label: string; type: string }[] = [
  { id: 'name', label: 'Product Name', type: 'string' },
  { id: 'priceMoney', label: 'Price in USD', type: 'number' },
  { id: 'priceToken', label: 'Price in Token', type: 'number' },
];

const tabs = [
  { id: 'productInfo', name: 'Product Information' },
  { id: 'officeInventory', name: 'Office & Inventory' },
  { id: 'approvalFlow', name: 'Approval Flow' },
];

const officeList = [
  { id: 'beijing', name: 'Beijing' },
  { id: 'chengdu', name: 'Chengdu' },
  { id: 'shanghai', name: 'Shanghai' },
  { id: 'shenzhen', name: 'Shenzhen' },
  { id: 'wuhan', name: 'Wuhan' },
  { id: 'xian', name: 'Xian' },
];

function CreateProduct() {
  const [imageURL, setImageURL] = useState<string[]>([]);
  const [product, setProduct] = useState<Product>(initProduct);
  const [showLoading, setLoading] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [selectedTab, setSelectedTab] = useState(1);
  // const [logisticMethods, setLogisticMethods] = useState(new Set());
  const [validations, setValidations] = useState<any>(initValidateResult);
  const [categories, setCategories] = useState(new Set());

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
          imageFiles: [...prevState.imageFiles, renamedFile],
        };
      });
    }
  };

  const handleRemoveImage = async (index: number) => {
    setImageURL((prevState) => {
      const tmp = [...prevState];
      tmp.splice(index, 1);
      return tmp;
    });

    setProduct((prevState) => {
      const tmp = [...prevState.imageFiles];
      tmp.splice(index, 1);
      return {
        ...prevState,
        imageFiles: tmp,
      };
    });
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

  const handleCategory = (item: string) => {
    if (!categories.has(item)) {
      setCategories(categories.add(item));
      const category = [...categories].join(';');
      setProduct({ ...product, category });
    } else {
      const tmp = [...categories].filter((x) => x !== item);
      setCategories(new Set([...tmp]));
      const category = [...tmp].join(';');
      setProduct({ ...product, category });
    }
  };

  const renderCategory = (item: string) => {
    return (
      <div
        key={item}
        onClick={() => handleCategory(item)}
        className={classNames(
          'w-20 h-8 ml-2 mr-2 text-center text-sm font-normal py-1.5',
          categories.has(item) ? 'bg-purple-300' : 'bg-gray-200',
          validations.category
            ? 'outline-none ring-inset ring ring-rose-500'
            : ''
        )}
      >
        {item}
      </div>
    );
  };

  const handleNext = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    const result = validateForm(product, [
      'images',
      'logisticMethod',
      'logisticMethodComment',
      'deletedTime',
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
    const result = validateForm(product, [
      'images',
      'logisticMethodComment',
      'deletedTime',
    ]);

    if (Object.values(result).includes(true)) {
      setValidations(result);
    } else {
      setLoading(true);
      await uploadFile(product.imageFiles);
      await newProduct(product);

      setLoading(false);
      setProduct(() => initProduct);
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
                  'w-52 rounded-lg text-xl font-semibold mt-4',
                  selected
                    ? `${tab.id} text-pink-500 underline underline-offset-8 border-b-2 border-white`
                    : 'text-gray-500'
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
              <form className="mb-6 grid grid-cols-2 gap-y-4 text-xl font-normal w-[500px]">
                {basicForm.map(({ id, label, type }) => (
                  <div key={id} className="col-span-2 grid grid-cols-2 gap-y-4">
                    <label htmlFor={id} className="mr-5 w-30">
                      <span className="text-red-500 pr-1">*</span>
                      {label}
                    </label>
                    <input
                      type={type === 'string' ? 'text' : 'number'}
                      className={classNames(
                        'shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base p-2 text-center rounded focus:outline-none focus:ring focus:ring-purple-300',
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

                <div className="col-span-2">
                  <div>
                    <span className="text-red-500 pr-1">*</span>
                    Product Category
                  </div>
                  <div className="grid grid-cols-3 mt-3 w-7/12">
                    {categoryList.map((item) => renderCategory(item))}
                  </div>
                </div>

                <label htmlFor="description" className="mr-5 col-span-2">
                  <span className="text-red-500 pr-1">*</span>
                  Product Description
                </label>
                <textarea
                  className={classNames(
                    'h-[200px] col-span-2 shadow-sm bg-gray-50 resize-none border border-gray-300 text-gray-900 text-base p-2 rounded focus:outline-none focus:ring focus:ring-purple-300',
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
                  handleRemoveImage={handleRemoveImage}
                  validation={validations.imageFiles}
                />
                <button
                  onClick={(event) => handleNext(event)}
                  className="next text-white bg-violet-500 hover:bg-violet-700 focus:ring-purple-500 transition ease-in font-medium rounded-lg text-lg w-64 px-5 py-2.5 text-center"
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
            <div className="flex flex-col m-8">
              <p className="text-xl mb-5">
                <span className="text-red-500 mb-1 pr-1">*</span>
                Please indicate the office and number of product you want to
                sell
              </p>
              <p className="text-2xl mb-5">Office 1</p>
              <div className="flex">
                <Dropdown
                  title="Select an office"
                  className="bg-gray-100 w-40 h-12 py-2 text-lg text-center text-gray-500"
                >
                  <Dropdown.Item>{officeList[0].name}</Dropdown.Item>
                  <Dropdown.Item>{officeList[1].name}</Dropdown.Item>
                  <Dropdown.Item>{officeList[2].name}</Dropdown.Item>
                  <Dropdown.Item>{officeList[3].name}</Dropdown.Item>
                  <Dropdown.Item>{officeList[4].name}</Dropdown.Item>
                  <Dropdown.Item>{officeList[5].name}</Dropdown.Item>
                </Dropdown>
                <span className="text-lg text-center mx-8 py-2">has</span>
                <input
                  value="Number of Products"
                  className="w-52 h-12 py-2 bg-gray-100 text-lg text-center text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <span className="text-lg text-center mx-8 py-2">Available</span>
              </div>

              <button
                onClick={(event) => handleSubmit(event)}
                className="mt-80 create text-white bg-violet-500 hover:bg-violet-700 focus:ring-violet-500 transition ease-in duration-200 font-medium rounded-lg text-lg w-64 px-5 py-2.5 text-center"
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
