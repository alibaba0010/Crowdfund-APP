import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useReadContract } from "wagmi";
import CampaignDetails from "./CampaignDetails";
import { useEffect, useState } from "react";
import { wagmiContractConfig } from "../utils/contract";
import type { Campaign, CampaignData } from "../components/DisplayCampaigns";
import { formatEther } from "viem";
import { daysLeft } from "../utils";

const Campaign = () => {
  const { id, pId } = useParams();
  const campaignId = id ? parseInt(id, 10) : undefined; // Convert to number
  const address = useSelector((state: any) => state.wallet.addresses?.[0]);
  const [campaign, setCampaign] = useState<CampaignData | null>(null);
  const { data, isLoading, error, refetch } = useReadContract({
    ...wagmiContractConfig,
    functionName: "getCampaignById",
    args: [campaignId],
    query: {
      enabled: !!address && !!campaignId,
    },
  });
  useEffect(() => {
    if (data) {
      const campaign = data as Campaign;
      const campaignData = {
        creator: campaign.creator,
        name: campaign.name,
        title: campaign.title,
        description: campaign.description,
        targetAmount: formatEther(campaign.targetAmount),
        deadline: daysLeft(campaign.deadline),
        totalDonated: Number(formatEther(campaign.totalDonated)),
        image: campaign.image,
        donators: campaign.donators,
        id: Number(id),
        pId: Number(pId),
      };

      setCampaign((prev) =>
        JSON.stringify(prev) === JSON.stringify(campaignData)
          ? prev
          : campaignData
      );
    }
  }, [data, id, pId]);
  return (
    <>
      {campaign ? (
        <CampaignDetails isLoading={isLoading} campaign={campaign} />
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Campaign;
