import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DisplayCampaigns } from "../components";
import { useReadContract } from "wagmi";
import { wagmiContractConfig } from "../utils/contract";
import { Campaign } from "../components/DisplayCampaigns";
import { refreshCampaigns, setAvailableCampaigns } from "../actions/campaigns";

const Home = () => {
  const address = useSelector((state: any) => state.wallet.addresses?.[0]);
  const dispatch = useDispatch();
  const refreshCampaign = useSelector(
    (state: any) => state.campaigns.isChanged
  );
  const { data, isLoading, refetch } = useReadContract({
    ...wagmiContractConfig,
    functionName: "getAvailableCampaigns",
    query: {
      enabled: !!address,
    },
  });
  useEffect(() => {
    if (refreshCampaign) {
      refetch();
      dispatch(refreshCampaigns());
    }
  }, [address, refreshCampaign]);
  useEffect(() => {
    if (data) {
      dispatch(
        setAvailableCampaigns({
          data: data as Campaign[],
        })
      );
    }
  }, [data, isLoading]);

  return (
    <>
      <DisplayCampaigns title="Available Campaigns" isLoading={isLoading} />
    </>
  );
};

export default Home;
