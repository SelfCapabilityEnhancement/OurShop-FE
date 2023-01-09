import { NavLink } from 'react-router-dom';
import { register } from '@/service';
import React, { useState } from 'react';
import Banner from '@/components/common/banner/Banner';

const basicClassName =
  'form-control block px-4 py-2 mt-5 h-11 w-full text-base text-gray-900 font-normal border-2' +
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
        .then(() => {
          setRegisterSuccess(true);
          resetInput();
          setTimeout(() => {
            setRegisterSuccess(false);
          }, 2000);
          setButtonEnabled(true);
        })
        .catch((data) => {
          if (
            data.response.data?.status === 500 &&
            data.response.data?.detail === 'username exists'
          ) {
            setButtonEnabled(true);
            return setError({ usernameError: 'Username already exist!' });
          }
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
      <div className="Register-page-body col-span-2 flex justify-center gap-32">
        <div className="Register-page-left">
          <p className="mt-24 text-6xl font-semibold">Welcome</p>
          <div className="col-span-2 flex">
            <div className="mt-12 h-28 w-8 border-l-8 border-fuchsia-600"></div>
            <p className="mt-12 w-[360px] py-8 text-xl font-semibold">
              Try this shopping platform for TWers
            </p>
          </div>
          <p className="mt-12 text-6xl text-fuchsia-600">Try it now.</p>
        </div>

        <div className="Register-page-right mt-16 h-[520px] w-[480px] rounded-xl bg-gray-100 text-center">
          <p className="mt-6 text-3xl font-semibold">Register with Us</p>
          <p className="text-m mx-[100px] mt-6 h-14 text-gray-500">
            Hey TWer, please fill the necessary information to register
          </p>
          <form className="mx-24 text-left">
            <>
              {usernameError && (
                <p className="h-5 text-sm text-red-500">{usernameError}</p>
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
                <p className="h-5 text-sm text-red-500">{passwordError}</p>
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
                <p className="h-5 text-sm text-red-500">
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
          <p className="mt-4 mb-20 text-gray-500">
            Already have an account?
            <NavLink to="/login" className="ml-1 text-blue-500">
              Login OurShop
            </NavLink>
          </p>
          <button
            className="text-l h-10 w-56 rounded-lg
            bg-violet-500 py-2 font-medium text-white transition ease-in hover:bg-violet-700 focus:ring-purple-500 disabled:opacity-50"
            data-testid="register-btn"
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
