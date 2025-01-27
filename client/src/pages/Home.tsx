import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DisplayCampaigns } from "../components";
import { useReadContract } from "wagmi";
import { wagmiContractConfig } from "../utils/contract";

const Home = () => {
  // const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const address = useSelector((state: any) => state.wallet.addresses?.[0]);
  const isLoading = true;
  // const { address, contract } = useStateContext(); // getCampaigns

  const { data } = useReadContract({
    ...wagmiContractConfig,
    functionName: "getAllCampaigns",
  });
  console.log("Data fetched", data);
  const fetchCampaigns = async () => {
    // setIsLoading(true);
    // setCampaigns(data);
    // setIsLoading(false);
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  return (
    <DisplayCampaigns
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  );
};

export default Home;
