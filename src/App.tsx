import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/features/header/Header';

function App() {
  return (
    <div className="app flex flex-col">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
