export default function EditUserInfo() {
  return (
    <div className="mx-auto container flex items-center" id="nav">
      <div className="w-full pt-2 p-4">
        <div className="mx-auto md:p-6 md:w-1/3">
          <div className="bg-[#EEEEEE] shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <p className="mt-6 text-center text-3xl text-purple-400 font-normal">
              Welcome
            </p>
            <p className="mt-6 h-14 text-center text-lg text-black-500">
              Please fill some information before purchases
            </p>
            <form>
              <div className="mb-8">
                <label
                  htmlFor="userRealName"
                  className="block text-gray-700 text-sm mb-2"
                >
                  Name
                  <span className="text-red-500">&nbsp;*</span>
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="userRealName"
                    className="block pr-10 bg-inherit shadow border-solid border border-black rounded w-full py-2 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring focus:ring-purple-300 transition duration-500 ease-in-out"
                  />
                </div>
              </div>

              <div className="mb-8">
                <label
                  htmlFor="telephoneNum"
                  className="block text-gray-700 text-sm mb-2"
                >
                  Phone
                  <span className="text-red-500">&nbsp;*</span>
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="telephoneNum"
                    type="text"
                    className="block pr-10 bg-inherit shadow border-solid border border-black rounded w-full py-2 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring focus:ring-purple-300 transition duration-500 ease-in-out"
                  />
                </div>
              </div>

              <div className="mb-8">
                <label
                  htmlFor="officeId"
                  className="block text-gray-700 text-sm mb-2"
                >
                  Select an Office
                  <span className="text-red-500">&nbsp;*</span>
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="officeId"
                    type="text"
                    className="block pr-10 bg-inherit shadow border-solid border border-black rounded w-full py-2 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring focus:ring-purple-300 transition duration-500 ease-in-out"
                  />
                </div>
              </div>

              <div className="mb-4 ml-[70%]">
                <button
                  className="transition duration-500 bg-violet-500 text-white bg-violet-500 hover:bg-violet-700 focus:ring-violet-500 ease-in duration-200 font-medium rounded-2xl text-lg font-bold py-2 px-10 rounded "
                  type="submit"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
