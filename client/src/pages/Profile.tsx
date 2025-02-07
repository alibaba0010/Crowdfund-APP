import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshCampaigns } from "../actions/campaigns";
import DisplayCampaigns from "../components/DisplayCampaigns";

const Profile = () => {
  const address = useSelector((state: any) => state.wallet.addresses?.[0]);
  const isLoading = useSelector((state: any) => state.campaigns.isLoading);
  const dispatch = useDispatch();

  const refreshCampaign = useSelector(
    (state: any) => state.campaigns.isChanged
  );

  useEffect(() => {
    if (refreshCampaign) {
      dispatch(refreshCampaigns());
    }
  }, [address, refreshCampaign]);

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
