// THIS IS SAMPLE CODE ONLY - NOT MEANT FOR PRODUCTION USE
import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';

const containerName = `images`;
const sasToken =
  'sv=2021-06-08&ss=bf&srt=sco&sp=rwdlaciytfx&se=2022-10-31T10:44:43Z&st=2022-10-16T02:44:43Z&spr=https&sig=tNFpqPwgAWjv6WnmOl%2FMMFIkYUSHMiaFv%2FogrDNKZ8U%3D';
const storageAccountName = 'ourshopimages';

// Feature flag - disable storage feature to app if not configured
export const isStorageConfigured = () => {
  return !(!storageAccountName || !sasToken);
};

// get BlobService = notice `?` is pulled out of sasToken - if created in Azure portal
const blobService = new BlobServiceClient(
  `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
);

// get Container - full public read access
const containerClient: ContainerClient =
  blobService.getContainerClient(containerName);
// containerClient.createIfNotExists({
//   access: 'container',
// });

export const uploadFileToBlob = async (
  file: File | null
): Promise<string[]> => {
  if (!file) return [];

  // upload file
  await createBlobInContainer(file);

  // get list of blobs in container
  return getBlobsInContainer();
};

// return list of blobs in container to display
export const getBlobsInContainer = async () => {
  const returnedBlobUrls: string[] = [];

  // get list of blobs in container
  for await (const blob of containerClient.listBlobsFlat()) {
    // if image is public, just construct URL
    returnedBlobUrls.push(
      `https://${storageAccountName}.blob.core.windows.net/${containerName}/${blob.name}`
    );
  }
  return returnedBlobUrls;
};

const createBlobInContainer = async (file: File) => {
  // create blobClient for container
  const blobClient = containerClient.getBlockBlobClient(file.name);

  // set mimetype as determined from browser with file upload control
  const options = { blobHTTPHeaders: { blobContentType: file.type } };

  // upload file
  await blobClient.uploadData(file, options);
};
