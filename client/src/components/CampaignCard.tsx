import type React from "react";
import { thirdweb } from "../assets";
import { shortenAddress } from "../utils";
import {
  FaGraduationCap,
  FaAmbulance,
  FaHeartbeat,
  FaHandsHelping,
} from "react-icons/fa";

interface CampaignCardProps {
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
  category: string;
  handleClick: () => void;
}

const CampaignCard: React.FC<CampaignCardProps> = ({
  creator,
  title,
  targetAmount,
  deadline,
  totalDonated,
  image,
  category,
  handleClick,
}) => {
  const owner = creator ? shortenAddress(creator) : "0x";
  const progress = (totalDonated / Number(targetAmount)) * 100;

  const getCategoryIcon = () => {
    switch (category) {
      case "Education":
        return <FaGraduationCap className="text-yellow-400" />;
      case "Emergencies":
        return <FaAmbulance className="text-red-500" />;
      case "Health":
        return <FaHeartbeat className="text-green-500" />;
      case "Community Support":
        return <FaHandsHelping className="text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div
      className="group relative sm:w-[288px] w-full rounded-[15px] bg-gradient-to-br from-[#1c1c24] to-[#2a2a36] cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#3d3d4d44]"
      onClick={handleClick}
    >
      <div className="absolute inset-0 bg-black/50 rounded-[15px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <img
        src={image || "/placeholder.svg"}
        alt="fund"
        className="w-full h-[180px] object-cover rounded-t-[15px]"
      />

      <div className="flex flex-col p-4 relative">
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-1">
            {getCategoryIcon() && (
              <div className="text-lg">{getCategoryIcon()}</div>
            )}
            <h3 className="font-epilogue font-semibold text-lg text-white truncate">
              {title}
            </h3>
          </div>
          {category && <p className="text-xs text-[#808191]">{category}</p>}
        </div>

        <div className="w-full bg-[#373745] rounded-full h-2 mb-4">
          <div
            className="bg-[#00a3ff] h-2 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-1">
            <p className="text-sm text-[#b2b3bd] font-medium">
              {totalDonated === 0 ? "0" : totalDonated.toFixed(3)} ETN
            </p>
            <p className="text-xs text-[#808191]">
              Raised of {Number.parseFloat(targetAmount).toString()} ETN
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-[#b2b3bd] font-medium">{deadline}</p>
            <p className="text-xs text-[#808191]">Days Remaining</p>
          </div>
        </div>

        <div className="flex items-center pt-3 border-t border-[#ffffff11]">
          <div className="w-8 h-8 rounded-full bg-[#13131a] flex items-center justify-center">
            <img
              src={thirdweb || "/placeholder.svg"}
              alt="user"
              className="w-4 h-4 object-contain"
            />
          </div>
          <p className="ml-3 text-sm text-[#808191] truncate">
            Created by <span className="text-[#00a3ff]">{owner}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
