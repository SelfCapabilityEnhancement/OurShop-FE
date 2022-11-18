import { NavLink } from 'react-router-dom';
import LoginForm from '@/components/features/login-page/LoginForm';

export default function LoginPage() {
  // const navigate = useNavigate();
  // const location = useLocation();
  // const { handleLogin, handleLogout } = useAuthContext();

  // const from = (location.state && location.state.from.pathname) || '/';

  // useEffect(() => {
  //   handleLogout();
  // }, [handleLogout]);

  // const handleFinish = (params) => {
  //   handleLogin(params).then(() => navigate(from, { replace: true }));
  // };

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
            <LoginForm />
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
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
