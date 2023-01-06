import { clsx as classNames } from 'clsx';

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
      <div className="mb-3">
        <span className="pr-1 text-red-500">*</span>
        Picture
      </div>
      <div className="grid grid-cols-5 items-center gap-x-0">
        {images.map((image, index) => (
          <div key={index} className="group relative flex w-24 flex-row">
            <img
              src={image}
              alt="product picture"
              className="h-20 w-24 rounded-xl border-2"
            />
            <div
              className="absolute right-0 z-10 hidden group-hover:block"
              onClick={() => handleRemoveImage(index)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4 rounded-full bg-slate-100"
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
              'new-image h-20 w-24 bg-slate-100 rounded-md border-solid',
              { 'outline-none ring ring-rose-500': validation }
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
          className="hidden rounded border border-gray-300 bg-gray-50 p-2 text-base text-gray-900 shadow-sm focus:outline-none focus:ring"
          accept="image/*"
        />
      </div>
    </div>
  );
}
