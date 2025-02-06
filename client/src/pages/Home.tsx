import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DisplayCampaigns } from "../components";
import { useReadContract } from "wagmi";
import { wagmiContractConfig } from "../utils/contract";
import { Campaign } from "../components/DisplayCampaigns";
import {
  refreshCampaigns,
  setAvailableCampaigns,
  setPastCampaigns,
} from "../actions/campaigns";

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
  const {
    data: campaigns,
    isLoading: isRefreshing,
    refetch: refresh,
  } = useReadContract({
    ...wagmiContractConfig,
    functionName: "getPastCampaigns",
    query: {
      enabled: !!address,
    },
  });
  useEffect(() => {
    if (refreshCampaign) {
      refetch();
      refresh();
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
    if (campaigns) {
      dispatch(
        setPastCampaigns({
          data: campaigns as Campaign[],
        })
      );
    }
  }, [data, campaigns, isLoading]);
  return (
    <>
      <DisplayCampaigns
        title="Available Campaigns"
        isLoading={isLoading}
        campaignType="available"
        text="You have no available campaigns yet"
      />
      <div className="mt-32">
        <DisplayCampaigns
          title="Past Campaigns"
          isLoading={isRefreshing}
          campaignType="past"
          text="You have no past campaigns yet"
        />
      </div>
    </>
  );
};

export default Home;
