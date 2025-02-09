import { useAccount } from "wagmi";
import Navbar from "./components/Navbar";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setWalletAdress } from "./actions/wallet";
import { Sidebar } from "./components";
import { CampaignById, CreateCampaign, Home, Profile } from "./pages";

function App() {
  const account = useAccount();
  const [hasAccess, setHasAccess] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(account?.chain?.name);
  useEffect(() => {
    if (account.isConnected) {
      const { address, addresses, status, chain } = account;
      dispatch(setWalletAdress({ address, addresses, status }));
      if (chain?.name === "Electroneum Testnet") {
        setHasAccess(true);
      }
    } else {
      navigate("/");
    }
  }, [account]);
  return (
    <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
      <div className="sm:flex hidden mr-10 relative">{<Sidebar />}</div>

      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar hasAccess={hasAccess} />

        {hasAccess ? (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-campaign" element={<CreateCampaign />} />
            <Route
              path="/campaign-details/:pId/:id"
              element={<CampaignById />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        ) : (
          <p className="text-center text-xl font-medium text-gray-300 bg-gray-800 rounded-lg p-6 shadow-lg mt-8">
            Connect Wallet and set network to Sepolia testnet to access this
            application
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
