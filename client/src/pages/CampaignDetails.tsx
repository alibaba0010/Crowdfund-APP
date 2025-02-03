"use client";

import { useEffect, useState } from "react";
import {
  FiClock,
  FiUsers,
  FiDollarSign,
  FiUser,
  FiBookOpen,
  FiHeart,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useWaitForTransactionReceipt } from "wagmi";
import { useWriteContract } from "wagmi";
import { CustomButton, Loader } from "../components";
import { wagmiContractConfig } from "../utils/contract";
import { parseEther } from "viem";
import { shortenAddress } from "../utils";
import { loader } from "../assets";
import { CampaignData } from "../components/DisplayCampaigns";

const CampaignDetails = ({
  isLoading,
  campaign,
}: {
  isLoading: boolean;
  campaign: CampaignData;
}) => {
  const [amount, setAmount] = useState("");
  const address = useSelector((state: any) => state.wallet.addresses?.[0]);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
  }, [amount]);
  const {
    deadline,
    donators,
    targetAmount,
    totalDonated,
    name,
    image,
    description,
    creator,
    // pId,
    id,
  } = campaign;
  const creatorAddress = shortenAddress(campaign.creator);
  const target = Number(targetAmount);
  const {
    data: hash,
    isPending,
    writeContract,
    error: writeError,
  } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const handleDonate = async () => {
    const donate = Number(amount);
    if (isNaN(donate) || donate <= 0 || donate > target) {
      setError("Invalid amount or amount exceeds the target.");
      return;
    }
    if (address === creator) {
      setError("You can't donate to your own campaign.");
      return;
    }
    try {
      writeContract({
        ...wagmiContractConfig,
        functionName: "donate",
        args: [id],
        value: parseEther(amount),
      });
    } catch (error) {
      console.log(error);
    }

    //  await donate(state.pId, amount);
  };

  return (
    <>
      {isLoading ? (
        <img
          src={loader || "/placeholder.svg"}
          alt="loader"
          className="w-[100px] h-[100px] object-contain"
        />
      ) : (
        <div className="min-h-screen bg-[#1a1b1f] text-white p-6">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Main Image */}
            <img
              src={image}
              alt="CrowdFund Me"
              className="h-[400px] object-contain w-full rounded-xl"
            />

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#21222d] rounded-lg p-4">
                <p className="text-gray-400 text-sm">Days Left</p>
                <div className="flex items-center gap-2 mt-1">
                  <FiClock className="text-gray-400" />
                  <span className="text-2xl font-bold">{deadline}</span>
                </div>
              </div>

              <div className="bg-[#21222d] rounded-lg p-4">
                <p className="text-gray-400 text-sm">{`Raised of ${target}`}</p>
                <div className="flex items-center gap-2 mt-1">
                  <FiDollarSign className="text-gray-400" />
                  <span className="text-2xl font-bold">{totalDonated}</span>
                </div>
              </div>

              <div className="bg-[#21222d] rounded-lg p-4">
                <p className="text-gray-400 text-sm">Total Backers</p>
                <div className="flex items-center gap-2 mt-1">
                  <FiUsers className="text-gray-400" />
                  <span className="text-2xl font-bold">{donators.length}</span>
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="md:col-span-2 space-y-6">
                {/* Creator Section */}
                <div className="bg-[#21222d] rounded-lg p-6">
                  <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <FiUser />
                    CREATOR
                  </h2>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#2c2f32] rounded-full flex items-center justify-center">
                      <FiUser className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">{name}</p>
                      <p className="text-xs text-gray-500 break-all">
                        {creatorAddress}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Story Section */}
                <div className="bg-[#21222d] rounded-lg p-6">
                  <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <FiBookOpen />
                    STORY
                  </h2>
                  <p className="text-gray-400 text-sm">{description}</p>
                </div>

                {/* Donators Section */}
                <div className="bg-[#21222d] rounded-lg p-6">
                  <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <FiHeart />
                    DONATORS
                  </h2>
                  <div className="mt-[20px] flex flex-col gap-4">
                    {donators.length > 0 ? (
                      donators.map((item: any, index: any) => (
                        <div
                          key={`${item.donator}-${index}`}
                          className="flex justify-between items-center gap-4"
                        >
                          <p className="font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-ll">
                            {index + 1}. {item.donator}
                          </p>
                          <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] break-ll">
                            {item.donation}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                        No donators yet. Be the first one!
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column - Fund Section */}
              <div className="bg-[#21222d] rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">
                  Donate to the campaign
                </h2>
                <div className="space-y-4">
                  <input
                    type="number"
                    placeholder="ETH 0.1"
                    step="0.0001"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-4 py-3 bg-[#1a1b1f] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  {error && (
                    <p className="mt-[10px] font-epilogue font-normal leading-[22px] text-red-500">
                      {error}
                    </p>
                  )}
                  <div className="bg-[#1a1b1f] p-4 rounded-lg">
                    <h4 className="font-semibold">
                      Believe in the vision, invest in the future.
                    </h4>
                    <p className="text-sm text-gray-400 mt-2">
                      Champion dreams that resonate with your soul
                    </p>
                  </div>

                  <CustomButton
                    btnType="button"
                    title="Fund Campaign"
                    styles="w-full bg-[#8c6dfd]"
                    handleClick={handleDonate}
                    disabled={isPending}
                  />
                  {writeError && (
                    <span className="text-red-500 text-sm mt-1">
                      Error: {writeError.message}
                    </span>
                  )}

                  {isConfirming && (
                    <Loader
                      text={
                        <span className="text-yellow-500 text-sm mt-1">
                          Waiting for transaction confirmation...
                        </span>
                      }
                    />
                  )}

                  {isConfirmed && (
                    <Loader
                      text={
                        <span className="text-green-500 text-sm mt-1">
                          Transaction confirmed! Campaign created successfully.
                        </span>
                      }
                      isChecker
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default CampaignDetails;
