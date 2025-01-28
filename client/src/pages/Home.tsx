import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DisplayCampaigns } from "../components";
import { useReadContract } from "wagmi";
import { wagmiContractConfig } from "../utils/contract";
import { toggleWalletConnect } from "../actions/wallet";
import { Campaign } from "../components/DisplayCampaigns";

const Home = () => {
  const address = useSelector((state: any) => state.wallet.addresses?.[0]);
  const dispatch = useDispatch();
  const { data, isLoading, refetch } = useReadContract({
    ...wagmiContractConfig,
    functionName: "getAllCampaigns",
    query: {
      enabled: !!address,
    },
  });
  console.log(data);
  useEffect(() => {
    if (address) {
      refetch();
    }
  }, [address, refetch]);
  return (
    <>
      {address ? (
        <DisplayCampaigns
          title="All Campaigns"
          isLoading={isLoading}
          campaigns={(data as Campaign[]) || []}
        />
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
