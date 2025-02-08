import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshCampaigns, setAllCampaigns } from "../actions/campaigns";
import DisplayCampaigns, { Campaign } from "../components/DisplayCampaigns";
import { wagmiContractConfig } from "../utils/contract";
import { useReadContract } from "wagmi";

const Profile = () => {
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
    }
  }, [data, isLoading]);

  return (
    <>
      <DisplayCampaigns
        title="Available Campaigns Created by you"
        isLoading={isLoading}
        campaignType="availableCreator"
        text="You have no campaigns created yet"
      />
      <div className="mt-32">
        <DisplayCampaigns
          title="Past Campaigns Created by you"
          isLoading={isLoading}
          campaignType="pastCreator"
          text="You have no past campaigns yet"
        />
      </div>
    </>
  );
};
export default Profile;
