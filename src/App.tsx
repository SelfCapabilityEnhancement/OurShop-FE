import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/features/header/Header';

function App() {
  return (
    <div className="app flex flex-col min-w-[1440px]">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
