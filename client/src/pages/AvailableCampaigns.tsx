import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DisplayCampaigns } from "../components";
import { useReadContract } from "wagmi";
import { wagmiContractConfig } from "../utils/contract";
import { Campaign } from "../components/DisplayCampaigns";
import {
  refreshCampaigns,
  setAllCampaigns,
  setSearchButtonState,
} from "../actions/campaigns";

const AvailableCampaigns = () => {
  const address = useSelector((state: any) => state.wallet.addresses?.[0]);
  const dispatch = useDispatch();
  const refreshCampaign = useSelector(
    (state: any) => state.campaigns.isChanged
  );
  const { data, isLoading, refetch } = useReadContract({
    ...wagmiContractConfig,
    functionName: "getAllCampaigns",
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
        setAllCampaigns({
          data: data as Campaign[],
          address,
        })
      );
      dispatch(setSearchButtonState(true));
    }
  }, [data, isLoading]);
  return (
    <>
      <DisplayCampaigns
        title="Available Campaigns"
        isLoading={isLoading}
        campaignType="available"
        text="You have no available campaigns yet"
      />
    </>
  );
};

export default AvailableCampaigns;
