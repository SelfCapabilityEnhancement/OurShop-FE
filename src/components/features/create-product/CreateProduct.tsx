import ImageUploader from '@/components/common/image-uploader/ImageUploader';
import React, { useEffect, useState } from 'react';
import { Tab } from '@headlessui/react';
import {
  OfficeItem,
  StoreItem,
  Product,
  StoresError,
} from '@/components/common/CustomTypes';
import Banner from '@/components/common/banner/Banner';
import {
  classNames,
  generateUniqueImageName,
  validateForm,
  validateStores,
} from '@/utils';
import Loading from '@/components/common/loading/Loading';
import { newProduct, uploadFile } from '@/service';
import { categoryList, initProduct, initValidateResult } from '@/constants';
import OfficeStoreItem from '@/components/features/create-product/OfficeStoreItem';

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

export const officeList: OfficeItem[] = [
  { id: 1, name: 'Beijing' },
  { id: 2, name: 'Chengdu' },
  { id: 3, name: 'Shanghai' },
  { id: 4, name: 'Shenzhen' },
  { id: 5, name: 'Wuhan' },
  { id: 6, name: 'Xian' },
];

const getOfficeName = (id: number) => {
  const target = officeList.find((item) => item.id === id);
  return target!.name;
};

function CreateProduct() {
  const [imageURL, setImageURL] = useState<string[]>([]);
  const [product, setProduct] = useState<Product>(initProduct);
  const [showLoading, setLoading] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  // const [logisticMethods, setLogisticMethods] = useState(new Set());
  const [validations, setValidations] = useState<any>(initValidateResult);
  const [categories, setCategories] = useState(new Set());
  const [stores, setStores] = useState<StoreItem[]>([
    { id: new Date().getTime(), officeId: 0, officeName: '', inventory: 0 },
  ]);
  const [storesError, setStoresError] = useState<StoresError>({});

  useEffect(() => {
    if (Object.values(validations).includes(true)) {
      setTimeout(() => {
        setValidations(initValidateResult);
      }, 2000);
    }
  }, [validations]);

  const setStoreItem = (
    storeItem: StoreItem,
    need2UpdateOfficeName = false
  ) => {
    if (need2UpdateOfficeName) {
      storeItem.officeName = getOfficeName(storeItem.officeId);
    }
    const targetIndex = stores.findIndex((item) => item.id === storeItem.id);
    stores.splice(targetIndex, 1, storeItem);
    setStores([...stores]);
  };

  const addStoreItem = () => {
    stores.push({
      id: new Date().getTime(),
      officeId: 0,
      officeName: '',
      inventory: 0,
    });
    setStores([...stores]);
  };

  const deleteStoreItem = (id: number) => {
    const targetIndex = stores.findIndex((item) => item.id === id);
    stores.splice(targetIndex, 1);
    setStores([...stores]);
  };

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

  const handleCreateProduct = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    const storesValidateResult = validateStores(stores);
    console.log(storesValidateResult);
    setStoresError(storesValidateResult);

    const isInvalidStoreExist = Object.keys(storesValidateResult).length;
    if (!isInvalidStoreExist) {
      setLoading(true);
      await uploadFile(product.imageFiles);
      await newProduct(product);

      setLoading(false);
      setProduct(() => initProduct);
      setImageURL(() => []);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
      setShowBanner(true);
      setTimeout(() => setShowBanner(false), 1500);
    }
  };

  const selectedOffices = stores.map((item) => item.officeId);
  const newOfficeList = officeList.filter(
    (item) => !selectedOffices.includes(item.id)
  );

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
              <p className="text-xl font-medium mb-3">
                <span className="text-red-500 pr-1">*</span>
                Please indicate the office and number of product you want to
                sell
              </p>

              {stores.map((item, index) => (
                <>
                  <p className="text-xl font-semibold my-3">{`Office ${
                    index + 1
                  }`}</p>
                  <OfficeStoreItem
                    key={item.id}
                    storeItem={item}
                    officeList={newOfficeList}
                    error={storesError[item.id] || {}}
                    isMinCounts={stores.length === 1}
                    isMaxCounts={stores.length === 6}
                    setStoreItem={setStoreItem}
                    addStoreItem={addStoreItem}
                    deleteStoreItem={deleteStoreItem}
                  />
                </>
              ))}
              <button
                onClick={(event) => handleCreateProduct(event)}
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
