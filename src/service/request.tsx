import { uploadProduct } from '@/components/common/CustomeTypes';
import { uploadFileToBlob } from '@/azure-storage-blob';
import { http } from '@/service/index';
import { imageUrlPrefix } from '@/constants';

export const uploadFile = async (product: uploadProduct) => {
  await Promise.all(product.images.map((image) => uploadFileToBlob(image)));
};
export const postProduct = async (product: uploadProduct) => {
  await http.post('/product/create', {
    ...product,
    images: product.images
      .map((image) => `${imageUrlPrefix}${image.name}`)
      .join(','),
  });
};
