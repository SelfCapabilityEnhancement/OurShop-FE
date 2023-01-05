import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Product } from '@/components/common/CustomTypes';
import { deleteProduct } from '@/service';

export default function DeleteProduct({
  isOpen,
  handleCancel,
  handleDelete,
  product,
}: {
  isOpen: boolean;
  handleCancel: Function;
  handleDelete: Function;
  product: Product | null;
}) {
  const handleDeleteBtn = () => {
    if (product !== null) {
      deleteProduct(product).then(() => {
        handleDelete();
      });
    }
  };
  return (
    <div>
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
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="ml-32 text-lg font-medium leading-6 text-gray-900 block"
                  >
                    <div data-testid="cancel-icon">
                      <span className="text-purple-400">Warning Message</span>
                    </div>
                  </Dialog.Title>
                  <div className="text-center">
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                      Do you want to delete the followed product?
                    </h3>
                  </div>
                  <div>
                    {product != null ? (
                      <div className="flex mb-48">
                        <img
                          alt="profile"
                          src={product.images.split(',')[0]}
                          className="w-20 h-16 ml-10 mr-5 object-cover rounded-lg"
                        />
                        <div className="mt-4">{product.name}</div>
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                  <div>
                    <button
                      onClick={() => handleCancel()}
                      data-modal-toggle="popup-modal"
                      type="button"
                      className="text-white rounded-lg bg-gray-400 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg text-sm font-medium px-14 py-2.5 ml-6 mr-10 focus:z-10 "
                    >
                      Cancel
                    </button>
                    <button
                      data-modal-toggle="popup-modal"
                      type="button"
                      className="text-white bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-14 py-2.5 text-center"
                      onClick={handleDeleteBtn}
                      data-testid="delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
