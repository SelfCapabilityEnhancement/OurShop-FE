import { NavLink } from 'react-router-dom';
import { register } from '@/service';
import React, { useState } from 'react';
import Banner from '@/components/common/banner/Banner';

const basicClassName =
  'form-control block px-4 py-2 mt-5 h-10 text-base text-gray-900 font-normal border-2' +
  ' border-solid border-gray-500 rounded focus:border-purple-400 focus:outline-none bg-gray-100';
const getClassName = (error: string | undefined) =>
  error ? basicClassName + ' border-red-500 mt-0' : basicClassName;

const initialError = {
  usernameError: '',
  passwordError: '',
  confirmPasswordError: '',
};

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] =
    useState<Partial<typeof initialError>>(initialError);

  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [buttonEnabled, setButtonEnabled] = useState(true);

  const successMsg = 'Registered successfully, you can login now';

  const handleRegister = async () => {
    let { usernameError, passwordError, confirmPasswordError } = initialError;
    if (!username) {
      usernameError = 'Required field!';
    }
    if (!password) {
      passwordError = 'Required field!';
    }
    if (!confirmPassword) {
      confirmPasswordError = 'Required field!';
    }
    if (usernameError || passwordError || confirmPasswordError) {
      return setError({ usernameError, passwordError, confirmPasswordError });
    }

    if (isPasswordMatch()) {
      setError({});
      setButtonEnabled(false);
      register(username, password)
        .then((data) => {
          if (data.data.message === 'error.http.200') {
            // 先判断status，再判断tab
            if (data.data.title === 'username exists') {
              setButtonEnabled(true);
              return setError({ usernameError: 'Username already exist!' });
            }
          }
          setRegisterSuccess(true);
          resetInput();
          setTimeout(() => {
            setRegisterSuccess(false);
          }, 2000);
          setButtonEnabled(true);
        })
        .catch(() => {
          setRegisterSuccess(false);
        });
    } else {
      setRegisterSuccess(false);
      setError({ confirmPasswordError: 'Passwords does not match!' });
    }
  };

  const isPasswordMatch = () => {
    return password === confirmPassword;
  };

  function resetInput() {
    setUsername('');
    setPassword('');
    setConfirmPassword('');
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;
    if (id === 'username') {
      setUsername(value);
    }
    if (id === 'password') {
      setPassword(value);
    }
    if (id === 'confirmPassword') {
      setConfirmPassword(value);
    }
  }

  const { usernameError, passwordError, confirmPasswordError } = error;

  return (
    <div className="Register-page h-screen">
      <Banner visible={registerSuccess} success={true} message={successMsg} />
      <div className="Register-page-body flex col-span-2 ml-64">
        <div className="Register-page-left">
          <p className="mt-24 text-5xl font-semibold">Welcome</p>
          <div className="flex col-span-2">
            <div className="ml-2 mt-8 w-8 h-24 border-l-8 border-fuchsia-600"></div>
            <p className="mt-8 py-8 text-l font-semibold w-[340px]">
              Try this shopping platform for TWers
            </p>
          </div>
          <p className="mt-8 text-5xl text-fuchsia-600">Try it now.</p>
        </div>

        <div className="Register-page-right bg-gray-100 ml-40 mt-12 w-[400px] h-[480px] rounded-xl">
          <p className="mt-6 text-center text-2xl font-semibold">
            Register with Us
          </p>
          <p className="mt-6 mx-[50px] text-center text-m text-gray-500">
            Hey TWer, please fill the necessary information to register
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
            <>
              {confirmPasswordError && (
                <p className="text-red-500 text-sm h-5">
                  {confirmPasswordError}
                </p>
              )}
              <input
                type="password"
                className={getClassName(confirmPasswordError)}
                placeholder="Confirm Password"
                id="confirmPassword"
                data-testid="confirmPassword"
                value={confirmPassword}
                onChange={(e) => handleInputChange(e)}
              />
            </>
          </form>
          <p className="text-center text-gray-500 mt-3 mb-8">
            Already has an account?
            <NavLink to="/login" className="text-blue-500 ml-1">
              Login OurShop
            </NavLink>
          </p>
          <button
            className="text-center text-white bg-violet-500 hover:bg-violet-700 focus:ring-purple-500
            transition ease-in font-medium rounded-lg text-l w-52 h-10 mt-9 mx-[100px] py-2 disabled:opacity-50"
            onClick={handleRegister}
            disabled={!buttonEnabled}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
