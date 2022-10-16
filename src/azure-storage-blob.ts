// THIS IS SAMPLE CODE ONLY - NOT MEANT FOR PRODUCTION USE
import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';

const containerName = `images`;
const sasToken = import.meta.env.VITE_STORAGE_SAS_TOKEN;
const storageAccountName = import.meta.env.VITE_STORAGE_ACCOUNT_NAME;

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
