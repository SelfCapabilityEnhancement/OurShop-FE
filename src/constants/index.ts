import {
  Feature,
  Product,
  Role,
  UserInfo,
} from '@/components/common/CustomTypes';

export const imageUrlPrefix = `https://ourshopimages.blob.core.windows.net/images/`;
export const initProduct: Product = {
  id: 1,
  name: '',
  priceToken: 0,
  priceMoney: 0,
  category: '',
  description: '',
  stock: 1,
  images: '',
  imageFiles: [],
  logisticMethod: '',
  logisticMethodComment: '',
  isDeleted: false,
  deletedTime: null,
  officeStockList: [{ officeId: 1, stock: 0 }],
};

export const initUserInfo: UserInfo = {
  userRealName: '',
  officeId: 0,
  telephoneNum: 0,
};

export const initValidateResult = {
  name: false,
  priceToken: false,
  priceMoney: false,
  category: false,
  description: false,
  images: false,
  imageFiles: false,
  logisticMethod: false,
};

export const categoryList = ['Clothes', 'Book', 'Souvenir'];

export const initGoodOption = {
  title: {
    text: 'Most Popular Product',
  },
  grid: { containLabel: true },
  tooltip: {},
  xAxis: {},
  yAxis: {
    inverse: true,
    max: 9,
    data: ['1', '2', '3'],
  },
  series: [
    {
      realtimeSort: true,
      name: '销量',
      type: 'bar',
      data: [1, 2, 3],
      label: {
        show: true,
        position: 'right',
      },
    },
  ],
};

export const initCategoryOption = {
  title: {
    text: 'Sales by Product Category',
  },
  tooltip: {
    trigger: 'item',
  },
  legend: {
    top: '7%',
    left: 'center',
  },
  series: [
    {
      name: 'Category',
      type: 'pie',
      radius: ['30%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2,
      },
      label: {
        show: false,
        position: 'center',
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '20',
          fontWeight: 'bold',
        },
      },
      labelLine: {
        show: true,
      },
      data: [
        { value: 1048, name: 'Clothes' },
        { value: 735, name: 'Souvenir' },
        { value: 580, name: 'Books' },
      ],
    },
  ],
};

export const initFeature: Feature = {
  featureId: 0,
  featureName: '',
  code: '',
  description: '',
  updateTime: '',
};

export const initRole: Role = {
  roleId: 0,
  roleName: '',
  updateTime: '',
  featureNameList: [''],
  featureList: [
    {
      featureId: 0,
      featureName: '',
      code: '',
      description: '',
      updateTime: '',
    },
  ],
};
