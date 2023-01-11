import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { login } from '@/service';
import Banner from '@/components/common/banner/Banner';
import { useLoginStore } from '@/hooks/useLoginStore';
import { useForm } from 'react-hook-form';
import { clsx } from 'clsx';

const basicClassName =
  'form-control block px-4 py-2 h-11 w-full text-base text-gray-900 font-normal border-2' +
  ' border-solid rounded focus:border-purple-400 focus:outline-none bg-gray-100 invalid:border-red-500';

const errorMsg = 'Required field!';

type Values = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const navigate = useNavigate();
  const [loginSuccess, setLoginSuccess] = useState(false);
  const setJwt = useLoginStore((state) => state.setJwt);
  const setAccessiblePaths = useLoginStore((state) => state.setAccessiblePaths);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>();

  const successMsg = 'Login successfully';

  const handleLogin = handleSubmit(({ username, password }) => {
    login(username, password)
      .then((res) => {
        if (res.data.title === 'username & password does not match') {
          setLoginSuccess(false);
          setError('username', {
            message: 'Username & Password does not match!',
          });
        } else {
          setLoginSuccess(true);
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
  });

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

        <form
          className="login-page-right mt-16 flex h-[520px] w-[480px] flex-col items-center rounded-xl bg-gray-100 px-24 py-6"
          onSubmit={handleLogin}
        >
          <p className="text-3xl font-semibold">User Login</p>
          <p className="text-m mt-6 h-14 w-9/12 text-center text-gray-500">
            Hey TWer, enter your detail to get in to OurShop
          </p>

          <div className="w-full">
            {errors.username && (
              <span role="alert" className="h-5 text-sm text-red-500">
                {errors.username.message}
              </span>
            )}
            <input
              type="text"
              className={clsx(
                basicClassName,
                errors.username ? 'mt-0 border-red-500' : 'mt-5 border-gray-500'
              )}
              placeholder="Username"
              id="username"
              data-testid="username"
              aria-invalid={!!errors.username}
              {...register('username', { required: errorMsg })}
            />
          </div>
          <div className="w-full">
            {errors.password && (
              <span role="alert" className="h-5 text-sm text-red-500">
                {errors.password.message}
              </span>
            )}
            <input
              type="password"
              className={clsx(
                basicClassName,
                errors.password ? 'mt-0 border-red-500' : 'mt-5 border-gray-500'
              )}
              placeholder="Password"
              id="password"
              data-testid="password"
              aria-invalid={!!errors.password}
              {...register('password', { required: errorMsg })}
            />
          </div>

          <p className="mt-4 text-center text-gray-500">
            Do not have an account?
            <NavLink to="/register" className="ml-1 text-blue-500">
              Register with us
            </NavLink>
          </p>
          <button
            className="text-l mt-auto h-10 w-56 rounded-lg
          bg-violet-500 py-2 font-medium text-white transition ease-in hover:bg-violet-700 focus:ring-purple-500 "
            data-testid="login-btn"
            type="submit"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
