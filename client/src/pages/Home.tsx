import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DisplayCampaigns } from "../components";
import { useReadContract } from "wagmi";
import { wagmiContractConfig } from "../utils/contract";
import { toggleWalletConnect } from "../actions/wallet";
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
    if (address) {
      refetch();
    }
    if (refreshCampaign) {
      refetch();
      dispatch(refreshCampaigns());
    }
  }, [address, refreshCampaign]);

  useEffect(() => {
    if (data) {
      dispatch(
        setAvailableCampaigns({
          title: "All Campaigns",
          isLoading,
          data: data as Campaign[],
        })
      );
    }
  }, [data, isLoading]);
  return (
    <>
      {address ? (
        <DisplayCampaigns />
      ) : (
        <div className="p-4 text-center">
          <p className="mb-4 text-lg text-red-500">
            Please connect your wallet to view campaigns
          </p>
          <button
            onClick={() => dispatch(toggleWalletConnect())}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Connect Wallet
          </button>
        </div>
      )}
    </>
  );
};

export default Home;
