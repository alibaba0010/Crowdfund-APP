import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
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
}
type CampaignData = {
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
};
const DisplayCampaigns = ({ isLoading }: { isLoading: boolean }) => {
  const navigate = useNavigate();
  const availableCampaigns = useSelector(
    (state: any) => state.campaigns.availableCampaigns
  );
  const { title, campaigns } = availableCampaigns;
  const sortedCampaigns = useMemo(() => {
    return [...campaigns].sort((a, b) => b.pId - a.pId);
  }, [campaigns]);

  const handleNavigate = (campaign: CampaignData) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  };

  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
        {title} ({campaigns.length})
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
            You have not created any campaigns yet
          </p>
        )}

        {!isLoading &&
          campaigns.length > 0 &&
          sortedCampaigns.map((campaign: CampaignData) => (
            <CampaignCard
              key={uuidv4()}
              {...campaign}
              handleClick={() => handleNavigate(campaign)}
            />
          ))}
      </div>
    </div>
  );
};

export default DisplayCampaigns;
