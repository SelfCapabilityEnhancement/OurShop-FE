import { NavLink, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { login } from '@/service';
import Banner from '@/components/common/banner/Banner';

const basicClassName =
  'form-control block px-4 py-2 mt-5 h-10 text-base text-gray-900 font-normal border-2' +
  ' border-solid border-gray-500 rounded focus:border-purple-400 focus:outline-none bg-gray-100';
const getClassName = (error: string | undefined) =>
  error ? basicClassName + ' border-red-500 mt-0' : basicClassName;

const initialError = {
  usernameError: '',
  passwordError: '',
};

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] =
    useState<Partial<typeof initialError>>(initialError);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const successMsg = 'Login successfully';

  const handleLogin = async () => {
    let { usernameError, passwordError } = initialError;
    if (!username) {
      usernameError = 'Required field!';
    }
    if (!password) {
      passwordError = 'Required field!';
    }
    if (usernameError || passwordError) {
      return setError({ usernameError, passwordError });
    }

    setError({});
    login(username, password)
      .then((data) => {
        if (data.data.title === 'username & password does not match') {
          setLoginSuccess(false);
          setError({
            usernameError: 'Username & Password does not match!',
            passwordError: ' ',
          });
        } else {
          setLoginSuccess(true);
          resetInput();
          setTimeout(() => {
            navigate('/home');
          }, 1500);
        }
      })
      .catch(() => {
        setLoginSuccess(false);
      });
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

  function resetInput() {
    setUsername('');
    setPassword('');
  }

  const { usernameError, passwordError } = error;

  return (
    <div className="login-page h-screen">
      <Banner visible={loginSuccess} success={true} message={successMsg} />
      <div className="login-page-body flex col-span-2 ml-64">
        <div className="login-page-left">
          <p className="mt-24 text-5xl font-semibold">Welcome</p>
          <div className="flex col-span-2">
            <div className="ml-2 mt-8 w-8 h-24 border-l-8 border-fuchsia-600"></div>
            <p className="mt-8 py-8 text-l font-semibold w-[340px]">
              Try this shopping platform for TWers
            </p>
          </div>
          <p className="mt-8 text-5xl text-fuchsia-600">Try it now.</p>
        </div>

        <div className="login-page-right bg-gray-100 ml-40 mt-12 w-[400px] h-[480px] rounded-xl">
          <p className="mt-6 text-center text-2xl font-semibold">User Login</p>
          <p className="mt-6 mx-[100px] text-center text-m text-gray-500">
            Hey TWer, Enter your detail to get in to OurShop
          </p>
          <form className="place-content-center ml-24 mr-12 w-[300px]">
            <>
              {usernameError && (
                <p className="text-red-500 text-sm h-5">{usernameError}</p>
              )}
              <input
                type="text"
                className={getClassName(usernameError)}
                placeholder="Username"
                id="username"
                data-testid="username"
                value={username}
                onChange={(e) => handleInputChange(e)}
              />
            </>
            <>
              {passwordError && (
                <p className="text-red-500 text-sm h-5">{passwordError}</p>
              )}
              <input
                type="password"
                className={getClassName(passwordError)}
                placeholder="Password"
                id="password"
                data-testid="password"
                value={password}
                onChange={(e) => handleInputChange(e)}
              />
            </>
          </form>
          <p className="text-center text-gray-500 mt-3 mb-8">
            Do not have an account?
            <NavLink to="/register" className="text-blue-500 ml-1">
              Register with us
            </NavLink>
          </p>
          <button
            className="text-center text-white bg-violet-500 hover:bg-violet-700 focus:ring-purple-500
          transition ease-in font-medium rounded-lg text-l w-52 h-10 mt-24 mx-[100px] py-2 "
            data-testid="login-btn"
            onClick={handleLogin}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
