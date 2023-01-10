import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '@/service';
import { useEffect, useState } from 'react';

export default function MyWallet() {
  const navigate = useNavigate();
  const [token, setToken] = useState(0);
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {
    getCurrentUser().then((user) => {
      setShowPage(true);
      setToken(user.token);
    });
  }, []);

  const handleClick = () => {
    navigate('/home');
  };

  return (
    <div
      className="relative mx-auto mt-10 h-[720px] w-[600px] rounded-2xl bg-zinc-300/40 p-4
          shadow-lg dark:bg-gray-800"
    >
      {showPage && (
        <div>
          <h1 className="wallet-header mb-10 text-center text-3xl">
            My Wallet
          </h1>
          <div className="m-8 flex items-center justify-between">
            <p className="text-2xl font-semibold">My Tokens</p>
            <p className="text-2xl font-semibold text-purple-500">{token}</p>
          </div>
          <div className="m-8 flex items-center justify-between">
            <p className="text-2xl font-semibold">My Bank Account</p>
            <p className="text-2xl font-semibold text-indigo-400">Edit</p>
          </div>
          <div className="m-8 text-2xl font-light">
            <p>1234 5678 9101 1234</p>
          </div>
          <button
            type="button"
            onClick={handleClick}
            className="go-home absolute bottom-10 right-10 h-12 w-1/2 rounded-lg bg-violet-500 px-3 py-3 text-lg font-semibold text-white transition duration-200 ease-in hover:bg-violet-700 "
          >
            Good to Go
          </button>
        </div>
      )}
    </div>
  );
}
