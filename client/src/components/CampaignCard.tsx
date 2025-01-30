import React from "react";
import { thirdweb } from "../assets";
import { formatEther } from "viem";
import { daysLeft, shortenAddress } from "../utils";

interface FundCardProps {
  creator?: string;
  title?: string;
  description?: string;
  targetAmount?: bigint;
  deadline?: bigint;
  totalDonated?: bigint;
  image?: string;
  createdAt?: bigint;
  handleClick: () => void;
}

const FundCard: React.FC<FundCardProps> = ({
  creator,
  title,
  // description,
  targetAmount,
  deadline,
  totalDonated,
  image,
  // createdAt,
  handleClick,
}) => {
  const remainingDays = deadline ? daysLeft(deadline) : 0;
  const target = targetAmount ? formatEther(targetAmount) : 0;
  const amountCollected = Number(totalDonated);
  const owner = creator ? shortenAddress(creator) : "0x";
  const progress = (amountCollected / Number(target)) * 100;

  return (
    <div
      className="group relative sm:w-[288px] w-full rounded-[15px] bg-gradient-to-br from-[#1c1c24] to-[#2a2a36] cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#3d3d4d44]"
      onClick={handleClick}
    >
      <div className="absolute inset-0 bg-black/50 rounded-[15px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <img
        src={image}
        alt="fund"
        className="w-full h-[180px] object-cover rounded-t-[15px]"
      />

      <div className="flex flex-col p-4 relative">
        <div className="mb-3">
          <h3 className="font-epilogue font-semibold text-lg text-white truncate mb-1">
            {title}
          </h3>
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
              {amountCollected.toFixed(2)} ETH
            </p>
            <p className="text-xs text-[#808191]">
              Raised of {Number(target).toFixed(2)} ETH
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-[#b2b3bd] font-medium">
              {remainingDays}
            </p>
            <p className="text-xs text-[#808191]">Days Remaining</p>
          </div>
        </div>

        <div className="flex items-center pt-3 border-t border-[#ffffff11]">
          <div className="w-8 h-8 rounded-full bg-[#13131a] flex items-center justify-center">
            <img src={thirdweb} alt="user" className="w-4 h-4 object-contain" />
          </div>
          <p className="ml-3 text-sm text-[#808191] truncate">
            Created by <span className="text-[#00a3ff]">{owner}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FundCard;
