import { useReadContract } from "wagmi";
import { erc20Abi } from "viem";

import React from "react";

const Profile = () => {
  const tokenAddress = "0xfff9976782d46cc05630d1f6ebab18b2324d6b14"; // Replace with the ERC-20 token contract address
  const userAddress = "0x5518Bd143bf64807104DdB2421f4D8d3A60828F9"; // Replace with the wallet address you want to check

  const {
    data: balance,
    isError,
    isLoading,
  } = useReadContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [userAddress],
  });

  const { data: decimals } = useReadContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: "decimals",
  });

  const formattedBalance = balance
    ? (Number(balance) / 10 ** (decimals || 18)).toFixed(4)
    : "0";
  console.log(`Token Balance: ${formattedBalance}`);

  return <div>Profile</div>;
};

export default Profile;
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
