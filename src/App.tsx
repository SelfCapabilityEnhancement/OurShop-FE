import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Header from './components/features/header/Header';
import { useLoginStore } from '@/hooks/useLoginStore';
import { isEmpty, last } from 'lodash';
import { useEffect } from 'react';
import Banner from '@/components/common/banner/Banner';

function GoToLoginPageLater() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  }, []);

  return <Banner visible success={false} message={'Not Login'} />;
}

function GoToHomePageLater() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/home');
    }, 2000);
  }, []);

  return (
    <Banner
      visible
      success={false}
      message={'You are forbidden to access this page.'}
    />
  );
}

function App() {
  const accessiblePaths = useLoginStore((state) => state.accessiblePaths);
  const jwt = useLoginStore((state) => state.jwt);
  const location = useLocation();
  const pathname = last(location.pathname.toLowerCase().split('/'));
  const shouldGoToLoginPage =
    pathname && !['login', 'register'].includes(pathname) && isEmpty(jwt);
  const shouldGoToHomePage =
    pathname &&
    !['login', 'register', 'home'].includes(pathname) &&
    !accessiblePaths.includes(pathname);

  if (shouldGoToLoginPage) {
    return <GoToLoginPageLater />;
  }

  if (shouldGoToHomePage) {
    return <GoToHomePageLater />;
  }

  return (
    <div className="app flex flex-col">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
