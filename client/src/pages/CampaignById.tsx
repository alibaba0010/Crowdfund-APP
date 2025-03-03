import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useReadContract } from "wagmi";
import { useEffect, useState } from "react";
import { wagmiContractConfig } from "../utils/contract";
import type { Campaign, CampaignData } from "../components/DisplayCampaigns";
import { formatEther } from "viem";
import { daysLeft, decryptId } from "../utils";
import { CampaignDetails } from "../components";

export interface Donations {
  donor: string;
  amount: bigint;
}
const CampaignById = () => {
  const { id, pId } = useParams();
  const navigate = useNavigate();
  const campaignId = decryptId(id) ? parseInt(decryptId(id), 10) : undefined; // Convert to number
  const address = useSelector((state: any) => state.wallet.addresses?.[0]);
  const [campaign, setCampaign] = useState<CampaignData | null>(null);
  const { data, isLoading, error } = useReadContract({
    ...wagmiContractConfig,
    functionName: "getCampaignById",
    args: [campaignId],
    query: {
      enabled: !!address,
    },
  });
  const { data: donations, isLoading: isRefreshing } = useReadContract({
    ...wagmiContractConfig,
    functionName: "getDonors",
    args: [campaignId],
    query: {
      enabled: !!address,
    },
  });
  useEffect(() => {
    if (error) {
      navigate("/", { replace: true });
    }
    if (data) {
      const campaign = data as Campaign;
      const deadline = daysLeft(campaign.deadline);
      const campaignData = {
        creator: campaign.creator,
        name: campaign.name,
        title: campaign.title,
        category: campaign.category,
        description: campaign.description,
        targetAmount: formatEther(campaign.targetAmount),
        deadline,
        totalDonated: Number(formatEther(campaign.totalDonated)),
        image: campaign.image,
        donators: campaign.donators,
        id: Number(decryptId(id)),
        pId: Number(pId),
        reachedDeadline: Number(deadline) === 0 || campaign.reachedDeadline,
        withdrawn: campaign.withdrawn,
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
      {campaign && (
        <CampaignDetails
          isLoading={isLoading}
          campaign={campaign}
          donations={donations as Donations[]}
          isRefreshing={isRefreshing}
        />
      )}
    </>
  );
};

export default CampaignById;
