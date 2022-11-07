import { classNames } from '@/utils';

export default function ImageUploader({
  images,
  handleNewImage,
  handleRemoveImage,
  validation,
}: {
  images: string[];
  handleNewImage: Function;
  handleRemoveImage: Function;
  validation: boolean;
}) {
  return (
    <div className="col-span-2">
      <div className="mb-5">
        <span className="text-red-500 pr-1">*</span>
        Picture
      </div>
      <div className="grid grid-cols-5 gap-x-1 items-center">
        {images.map((image, index) => (
          <div key={index} className="flex flex-row group">
            <img
              src={image}
              alt="product picture"
              className="rounded-xl border-2"
            />
            <div
              className="z-10 w-6 h-6 relative right-5 hidden group-hover:block"
              onClick={() => handleRemoveImage(index)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 bg-slate-100 rounded-full"
              >
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </div>
          </div>
        ))}
        <label htmlFor="image" className={images.length >= 5 ? 'hidden' : ''}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="0.5"
            stroke="currentColor"
            className={classNames(
              'new-image bg-slate-100 rounded-md border-solid',
              validation ? 'outline-none ring ring-rose-500' : ''
            )}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </label>
        <input
          type="file"
          id="image"
          onChange={(event) => handleNewImage(event)}
          className="hidden shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base p-2 rounded focus:outline-none focus:ring"
          accept="image/*"
        />
      </div>
    </div>
  );
}
