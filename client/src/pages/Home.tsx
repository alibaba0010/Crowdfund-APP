import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DisplayCampaigns } from "../components";
import { useReadContract } from "wagmi";
import { wagmiContractConfig } from "../utils/contract";

const Home = () => {
  const address = useSelector((state: any) => state.wallet.addresses?.[0]);
  const { data, isLoading, refetch } = useReadContract({
    ...wagmiContractConfig,
    functionName: "getAllCampaigns",
  });
  console.log(data);
  useEffect(() => {
    if (address) {
      refetch();
    }
  }, [address, refetch]);
  return (
    <DisplayCampaigns
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={data || []}
    />
  );
};

export default Home;
