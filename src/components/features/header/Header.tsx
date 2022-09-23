export default function Header() {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <img src="src/assets/images/logo.png" alt="" className="logo" />
        <span>OurShop</span>
      </div>
      <div className="flex items-center">
        <div className="nav-list flex justify-around">
          <p className="mr-10">Create Product</p>
          <p className="mr-10">Shopping Cart</p>
          <p className="mr-10">My Order</p>
        </div>
        <img src="" alt="" />
      </div>
    </div>
  );
}
