import { NavLink, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { login } from '@/service';
import Banner from '@/components/common/banner/Banner';
import { useLoginStore } from '@/hooks/useLoginStore';
import { isEmpty } from 'lodash';

const basicClassName =
  'form-control block px-4 py-2 mt-5 h-11 w-full text-base text-gray-900 font-normal border-2' +
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
  const setJwt = useLoginStore((state) => state.setJwt);
  const setAccessiblePaths = useLoginStore((state) => state.setAccessiblePaths);
  const accessiblePaths = useLoginStore((state) => state.accessiblePaths);

  const successMsg = 'Login successfully';

  useEffect(() => {
    if (!isEmpty(accessiblePaths)) {
      navigate('/home');
    }
  });
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
      .then((res) => {
        if (res.data.title === 'username & password does not match') {
          setLoginSuccess(false);
          setError({
            usernameError: 'Username & Password does not match!',
            passwordError: ' ',
          });
        } else {
          setLoginSuccess(true);
          resetInput();
          localStorage.setItem('jwt', 'Bearer ' + res.data.token); // todo: delete
          localStorage.setItem('router', res.data.routerResponses); // todo: delete
          setJwt(res.data.token);
          setAccessiblePaths(res.data.routerResponses);
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
      <div className="login-page-body col-span-2 flex justify-center gap-32">
        <div className="login-page-left">
          <p className="mt-24 text-6xl font-semibold">Welcome</p>
          <div className="col-span-2 flex">
            <div className="mt-12 h-28 w-8 border-l-8 border-fuchsia-600"></div>
            <p className="mt-12 w-[360px] py-8 text-xl font-semibold">
              Try this shopping platform for TWers
            </p>
          </div>
          <p className="mt-12 text-6xl text-fuchsia-600">Try it now.</p>
        </div>

        <div className="login-page-right mt-16 h-[520px] w-[480px] rounded-xl bg-gray-100 text-center">
          <p className="mt-6 text-3xl font-semibold">User Login</p>
          <p className="text-m mx-[120px] mt-6 h-14 text-gray-500">
            Hey TWer, enter your detail to get in to OurShop
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
          </form>
          <p className="mt-4 mb-36 text-center text-gray-500">
            Do not have an account?
            <NavLink to="/register" className="ml-1 text-blue-500">
              Register with us
            </NavLink>
          </p>
          <button
            className="text-l h-10 w-56 rounded-lg
          bg-violet-500 py-2 font-medium text-white transition ease-in hover:bg-violet-700 focus:ring-purple-500 "
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
