import { useAccount } from "wagmi";
import Navbar from "./components/Navbar";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setWalletAdress } from "./actions/wallet";
import { Sidebar } from "./components";
import {
  CampaignById,
  CreateCampaign,
  AvailableCampaigns,
  Profile,
  About,
  PastCampaigns,
} from "./pages";
import { setSearchButtonState } from "./actions/campaigns";

function App() {
  const account = useAccount();
  const [url, setUrl] = useState("");
  const [hasAccess, setHasAccess] = useState(false);
  const [hasNavigated, setHasNavigated] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (account.isConnected) {
      const { address, addresses, status, chain } = account;
      dispatch(setWalletAdress({ address, addresses, status }));
      if (chain?.name === "Electroneum Testnet") {
        // Electroneum Mainnet remove  testnet in wagmi.ts
        setHasAccess(true);
        if (url && !hasNavigated) {
          navigate(url);
          setHasNavigated(true);
        }
      }
    } else {
      navigate("/");
    }
  }, [account, url, hasNavigated]);

  useEffect(() => {
    const path = window.location.pathname;
    if (path !== "/") {
      setUrl(path);
    }
    if (path === "/campaigns") {
      dispatch(setSearchButtonState(true));
    } else {
      dispatch(setSearchButtonState(false));
    }
  }, []);
  return (
    <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
      <div className="sm:flex hidden mr-10 relative">{<Sidebar />}</div>

      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar hasAccess={hasAccess} />

        <Routes>
          <Route path="/" element={<About hasAccess={hasAccess} />} />
          {hasAccess && (
            <>
              <Route
                path="/campaigns/available"
                element={<AvailableCampaigns />}
              />
              <Route path="/campaigns/past" element={<PastCampaigns />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/create-campaign" element={<CreateCampaign />} />
              <Route
                path="/campaigns/campaign-details/:id/:pId"
                element={<CampaignById />}
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          )}
        </Routes>
        {/* <ParticleBackground /> */}
      </div>
    </div>
  );
}

export default App;
