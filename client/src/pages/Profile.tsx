import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshCampaigns } from "../actions/campaigns";
import DisplayCampaigns from "../components/DisplayCampaigns";

const Profile = () => {
  const address = useSelector((state: any) => state.wallet.addresses?.[0]);
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
        title="Campaigns created by you"
        isLoading={true}
        campaignType="creator"
        text="You have no campaigns created yet"
      />
    </>
  );
};
export default Profile;
