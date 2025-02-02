import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useReadContract } from "wagmi";
import CampaignDetails from "./CampaignDetails";
import { useEffect } from "react";
import { getCampaignById } from "../actions/campaigns";
import { wagmiContractConfig } from "../utils/contract";

const Campaign = () => {
  const { id } = useParams();
  const address = useSelector((state: any) => state.wallet.addresses?.[0]);
  const dispatch = useDispatch();
  const { data, isLoading, refetch } = useReadContract({
    ...wagmiContractConfig,
    functionName: "getCampaignById",
    args: [id],
    query: {
      enabled: !!address,
    },
  });
  useEffect(() => {
    if (data) {
      dispatch(getCampaignById(data));
    }
  }, [data, isLoading]);
  return (
    <>
      <CampaignDetails isLoading={isLoading} />
    </>
  );
};

export default Campaign;
