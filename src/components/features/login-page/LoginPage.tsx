import { NavLink, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { login } from '@/service';

export default function LoginPage() {
  const navigate = useNavigate();
  // const location = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (loginValidate()) {
      const result = await login(username, password);
      console.log(result);
    } else {
      // setRegisterValidation(false);
    }
    navigate('/home');
  };

  const loginValidate = () => {
    return username !== '' && password !== '';
  };

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;
    if (id === 'username') {
      setUsername(value);
    }
    if (id === 'password') {
      setPassword(value);
    }
  }

  return (
    <div className="login-page h-screen">
      <div className="login-page-body flex col-span-2 mx-60">
        <div className="login-page-left">
          <p className="mt-24 text-5xl font-semibold">Welcome</p>
          <div className="flex col-span-2">
            <div className="ml-2 mt-8 w-8 h-24 border-l-8 border-fuchsia-600"></div>
            <p className="mt-8 py-8 text-l font-semibold">
              Try this shopping platform for TWers
            </p>
          </div>
          <p className="mt-8 text-5xl text-fuchsia-600">Try it now.</p>
        </div>

        <div className="login-page-right bg-gray-100 ml-40 mt-12 w-[400px] h-[480px] rounded-xl">
          <p className="mt-8 text-center text-2xl font-semibold">User Login</p>
          <p className="mt-6 mx-[100px] text-center text-m text-gray-500">
            Hey TWer, Enter your detail to get in to OurShop
          </p>
          <div className="mt-6 place-content-center ml-24 mr-12 w-[300px]">
            <form className="mt-4">
              <input
                type="text"
                className="form-control block px-4 py-2 mb-6 text-base text-gray-900 font-normal
                border-2 border-solid border-gray-500 rounded focus:border-purple-400 focus:outline-none"
                placeholder="Username"
                id="username"
                value={username}
                onChange={(e) => handleInputChange(e)}
              />
              <input
                type="password"
                className="form-control block px-4 py-2 mb-6 text-base text-gray-900 font-normal
                border-2 border-solid border-gray-500 rounded focus:border-purple-400 focus:outline-none"
                placeholder="Password"
                id="password"
                value={password}
                onChange={(e) => handleInputChange(e)}
              />
            </form>
          </div>
          <p className="text-center text-gray-500">
            Do not have an account?
            <NavLink to="/register" className="text-blue-500 ml-1">
              Register with us
            </NavLink>
          </p>
          <button
            className="text-center text-white bg-violet-500 hover:bg-violet-700 focus:ring-purple-500
          transition ease-in font-medium rounded-lg text-l w-52 h-10 mt-24 mx-[100px] py-2 "
            onClick={handleLogin}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
