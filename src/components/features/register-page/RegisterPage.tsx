import { NavLink } from 'react-router-dom';
import RegisterForm from '@/components/features/register-page/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="Register-page h-screen">
      <div className="Register-page-body flex col-span-2 mx-60">
        <div className="Register-page-left">
          <p className="mt-24 text-5xl font-semibold">Welcome</p>
          <div className="flex col-span-2">
            <div className="ml-2 mt-8 w-8 h-24 border-l-8 border-fuchsia-600"></div>
            <p className="mt-8 py-8 text-l font-semibold">
              Try this shopping platform for TWers
            </p>
          </div>
          <p className="mt-8 text-5xl text-fuchsia-600">Try it now.</p>
        </div>

        <div className="Register-page-right bg-gray-100 ml-40 mt-10 w-[400px] h-[480px] rounded-xl">
          <p className="mt-8 text-center text-2xl font-semibold">
            Register with Us
          </p>
          <p className="mt-6 mx-[50px] text-center text-m text-gray-500">
            Hey TWer, please fill the necessary information to register
          </p>
          <div className="mt-6 place-content-center ml-24 mr-12 w-[300px]">
            <RegisterForm />
          </div>
          <p className="text-center text-gray-500">
            Already has an account?
            <NavLink to="/login" className="text-blue-500 ml-1">
              Login OurShop
            </NavLink>
          </p>
          <button
            className="text-center text-white bg-violet-500 hover:bg-violet-700 focus:ring-purple-500
          transition ease-in font-medium rounded-lg text-l w-52 h-10 mt-12 mx-[100px] py-2 "
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
