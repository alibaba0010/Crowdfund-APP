import React from "react";
import { useSelector } from "react-redux";
import { useReadContract } from "wagmi";
import { wagmiContractConfig } from "../utils/contract";

const Profile = () => {
  const address = useSelector((state: any) => state.wallet.addresses?.[0]);
  const { data, isLoading, refetch } = useReadContract({
    ...wagmiContractConfig,
    functionName: "getCampaignsByCreator",
    args: [address],

    query: {
      enabled: !!address,
    },
  });
  console.log("Data: " + data);
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
  return <div>Profile</div>;
};
export default Profile;
