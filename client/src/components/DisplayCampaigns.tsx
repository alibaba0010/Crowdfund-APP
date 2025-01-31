import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import FundCard from "./CampaignCard";
import { loader } from "../assets";
import { useSelector } from "react-redux";

export interface Campaign {
  owner: string;
  title: string;
  description: string;
  target: bigint;
  deadline: bigint;
  amountCollected: bigint;
  image: string;
}

const DisplayCampaigns = () => {
  const navigate = useNavigate();
  const availableCampaigns = useSelector(
    (state: any) => state.campaigns.availableCampaigns
  );
  const handleNavigate = (campaign: Campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  };
  const { title, isLoading, campaigns } = availableCampaigns;

  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
        {title} ({campaigns.length})
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img
            src={loader}
            alt="loader"
            className="w-[100px] h-[100px] object-contain"
          />
        )}

        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any campigns yet
          </p>
        )}

        {!isLoading &&
          campaigns.length > 0 &&
          campaigns.map((campaign: Campaign) => (
            <FundCard
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
