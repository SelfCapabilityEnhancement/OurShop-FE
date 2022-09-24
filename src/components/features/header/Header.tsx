export default function Header() {
  return (
    <div className="flex justify-between items-center shadow-md">
      <div className="flex items-center basis-1/2">
        <img src="src/assets/images/logo.png" alt="" className="logo" />
        <span>OurShop</span>
      </div>
      <div className="flex items-center basis-1/2">
        <div className="nav-list flex justify-around basis-3/4">
          <a
            href="#"
            className="basis-1/3 mx-4 py-4 text-center border-b-2 border-white
            hover:text-gray-600 hover:border-gray-300
            focus:text-rose-500 focus:border-rose-500"
          >
            Create Product
          </a>
          <a
            href="#"
            className="basis-1/3 mx-4 py-4 text-center border-b-2 border-white
            hover:text-gray-600 hover:border-gray-300
            focus:text-rose-500 focus:border-rose-500"
          >
            Shopping Cart
          </a>
          <a
            href="#"
            className="basis-1/3 mx-4 py-4 text-center border-b-2 border-white
            hover:text-gray-600 hover:border-gray-300
            focus:text-rose-500 focus:border-rose-500"
          >
            My Order
          </a>
        </div>
        <div className="basis-1/4 flex justify-end mr-10">
          <img
            src="src/assets/images/avatar.png"
            alt=""
            className="avatar h-12 w-12 rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
