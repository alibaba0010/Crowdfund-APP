import { useNavigate, useSearchParams } from "react-router-dom";
import { loader } from "../assets";
import CampaignCard from "./CampaignCard";
import { useSelector } from "react-redux";
import { useMemo } from "react";

export interface Campaign {
  creator: string;
  name: string;
  title: string;
  description: string;
  targetAmount: bigint;
  deadline: bigint;
  totalDonated: bigint;
  donators: string[];
  image: string;
  createdAt: bigint;
  reachedDeadline: boolean;
  withdrawn: boolean;
}
export type CampaignData = {
  id: number;
  creator: string;
  name: string;
  title: string;
  description: string;
  targetAmount: string;
  deadline: string;
  totalDonated: number;
  donators: string[];
  image: string;
  pId: number;
  reachedDeadline: boolean;
  withdrawn: boolean;
};
interface DisplayCampaignsProps {
  isLoading: boolean;
  title: string;
  campaignType: "available" | "past" | "availableCreator" | "pastCreator";
  text: string;
}

const DisplayCampaigns = ({
  isLoading,
  title,
  campaignType,
  text,
}: DisplayCampaignsProps) => {
  const navigate = useNavigate();
  const campaignData = useSelector(
    (state: any) => state.campaigns[`${campaignType}Campaigns`]
  );
  const { campaigns } = campaignData;
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  const handleNavigate = (campaign: CampaignData) => {
    const { id, pId } = campaign;

    navigate(`/campaign-details/${pId}/${id}`);
  };

  const sortedCampaigns = useMemo(() => {
    let filtered = [...campaigns];

    if (searchQuery) {
      filtered = filtered.filter((campaign) =>
        campaign.title.toLowerCase().includes(searchQuery)
      );
    }

    return filtered.sort((a, b) => b.id - a.id);
  }, [campaigns, searchQuery]);

  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
        {title} ({sortedCampaigns.length})
        {searchQuery && (
          <span className="text-gray-400 text-sm ml-2">
            - Searching for: "{searchQuery}"
          </span>
        )}
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img
            src={loader || "/placeholder.svg"}
            alt="loader"
            className="w-[100px] h-[100px] object-contain"
          />
        )}

        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            {text}
          </p>
        )}

        {!isLoading &&
          campaigns.length > 0 &&
          sortedCampaigns.map((campaign: CampaignData) => (
            <CampaignCard
              key={campaign.pId}
              {...campaign}
              handleClick={() => handleNavigate(campaign)}
            />
          ))}
      </div>
    </div>
  );
};

export default DisplayCampaigns;
