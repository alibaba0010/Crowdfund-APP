import { useAccount, useConnect, useDisconnect } from "wagmi";
import Navbar from "./pages/Navbar";
import { Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setWalletAdress } from "./actions/wallet";

function App() {
  const account = useAccount();
  const { status, error } = useConnect();
  const { disconnect } = useDisconnect();
  const dispatch = useDispatch();

  useEffect(() => {
    if (account) {
      const { address, addresses, status } = account;
      dispatch(setWalletAdress({ address, addresses, status }));
    }
  }, [account.address]);
  return (
    <>
      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>

      <div>
        <h2>Account</h2>

        <div>
          status: {account.status}
          chainId: {account.chainId}
        </div>

        {account.status === "connected" && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>

      <div>
        <div>{status}</div>
        <div>{error?.message}</div>
      </div>
    </>
  );
}

export default App;
