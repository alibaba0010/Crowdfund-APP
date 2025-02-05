import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useReadContract } from "wagmi";
import { wagmiContractConfig } from "../utils/contract";
import { refreshCampaigns, setCreatorCampaigns } from "../actions/campaigns";
import DisplayCampaigns, { Campaign } from "../components/DisplayCampaigns";

const Profile = () => {
  const address = useSelector((state: any) => state.wallet.addresses?.[0]);
  const dispatch = useDispatch();
  const { data, isLoading, refetch } = useReadContract({
    ...wagmiContractConfig,
    functionName: "getCampaignsByCreator",
    args: [address],

    query: {
      enabled: !!address,
    },
  });
  const refreshCampaign = useSelector(
    (state: any) => state.campaigns.isChanged
  );

  useEffect(() => {
    if (refreshCampaign) {
      refetch();
      dispatch(refreshCampaigns());
    }
  }, [address, refreshCampaign]);
  useEffect(() => {
    if (data) {
      dispatch(
        setCreatorCampaigns({
          data: data as Campaign[],
        })
      );
    }
  }, [data, isLoading]);

  return (
    <>
      <DisplayCampaigns
        title="Campaigns created by you"
        isLoading={isLoading}
        campaignType="creator"
      />
    </>
  );
};
export default Profile;
