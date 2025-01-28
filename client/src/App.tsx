import { useAccount } from "wagmi";
import Navbar from "./components/Navbar";
import { Route, Routes, useNavigate } from "react-router-dom";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setWalletAdress } from "./actions/wallet";
import { Sidebar } from "./components";
import { CreateCampaign, Home, Profile } from "./pages";

function App() {
  const account = useAccount();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (account.isConnected) {
      const { address, addresses, status } = account;
      dispatch(setWalletAdress({ address, addresses, status }));
    } else {
      navigate("/");
    }
  }, [account.address]);
  return (
    <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
      <div className="sm:flex hidden mr-10 relative">{<Sidebar />}</div>

      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          {/* <Route path="/campaign-details/:id" element={<CampaignDetails />} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;

{
  // const { status, error } = useConnect();
  // const { disconnect } = useDisconnect();
  /* <div>
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
</div> */
}
