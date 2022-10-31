import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '@/service';
import { useEffect, useState } from 'react';
import { User } from '@/components/common/CustomeTypes';

export default function MyWallet() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    getCurrentUser().then((data) => setUser(data[0]));
  }, []);

  const handleClick = () => {
    navigate('/home');
  };

  return (
    <div className="relative shadow-lg rounded-2xl mx-auto mt-10 w-[600px] h-[720px] bg-zinc-300/40 dark:bg-gray-800 p-4">
      <h1 className="wallet-header text-center text-3xl mb-10">My Wallet</h1>
      <div className="flex items-center justify-between m-8">
        <p className="text-2xl font-semibold">My Tokens</p>
        <p className="text-2xl font-semibold text-purple-500">{user?.token}</p>
      </div>
      <div className="flex items-center justify-between m-8">
        <p className="text-2xl font-semibold">My Bank Account</p>
        <p className="text-2xl font-semibold text-indigo-400">Edit</p>
      </div>
      <div className="m-8 text-2xl font-light">
        <p>1234 5678 9101 1234</p>
      </div>
      <button
        type="button"
        onClick={handleClick}
        className="go-home w-1/2 px-3 py-3 h-12 absolute bottom-10 right-10 text-lg text-white font-semibold rounded-lg bg-violet-500 hover:bg-violet-700 "
      >
        Good to Go
      </button>
    </div>
  );
}
