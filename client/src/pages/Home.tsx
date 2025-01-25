import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DisplayCampaigns from "../components/DisplayCampains";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const address = useSelector((state: any) => state.wallet.addresses[0]);

  // const { address, contract } = useStateContext(); // getCampaigns

  const fetchCampaigns = async () => {
    setIsLoading(true);
    // const data = await getCampaigns();
    // setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    // if (contract) fetchCampaigns();
  }, [address]);

  return (
    <DisplayCampaigns
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  );
};

export default Home;
