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
import { useSelector } from "react-redux";
import { useWaitForTransactionReceipt } from "wagmi";
import { useWriteContract } from "wagmi";
import { CustomButton, Loader } from "../components";
import { wagmiContractConfig } from "../utils/contract";
import { parseEther } from "viem";
import { shortenAddress } from "../utils";
import { loader } from "../assets";
import type { CampaignData } from "../components/DisplayCampaigns";

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
  const [openWithdraw, setOpenWithdraw] = useState(false);
  const [newTarget, setNewTarget] = useState(false);
  const { balance } = useSelector((state: any) => state.wallet);
  console.log(campaign.reachedDeadline);
  const {
    deadline,
    donators,
    targetAmount,
    name,
    image,
    description,
    creator,
    // pId,
    withdrawn,
    reachedDeadline,
    id,
    totalDonated,
  } = campaign;
  console.log(withdrawn);
  const creatorAddress = shortenAddress(campaign.creator);
  const target = Number(targetAmount);
  const {
    data: hash,
    isPending,
    writeContract,
    error: writeError,
  } = useWriteContract();
  // Deadline passed
  // const isDeadlinePassed = new Date(deadline).getTime() < Date.now();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });
  useEffect(() => {
    if (isConfirmed) {
      window.location.reload();
    }
    const totalTarget = Number(targetAmount);
    if (address === creator && totalDonated >= totalTarget) {
      setOpenWithdraw(true);
    }
    setError("");
  }, [amount, totalDonated, address, isConfirmed]);

  const handleWithDraw = async () => {
    // Implement withdrawal logic here
    try {
      writeContract({
        ...wagmiContractConfig,
        functionName: "withdrawFunds",
        args: [id],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleIncreaseTarget = async () => {
    const newTargetAmount = Number(amount);
    if (isNaN(newTargetAmount) || newTargetAmount <= target) {
      setError(
        "Invalid amount or new target is not higher than current target."
      );
      return;
    }
    if (totalDonated > newTargetAmount) {
      setError("New target must be greater than amount donated");
      return;
    }
    setError("");
    try {
      writeContract({
        ...wagmiContractConfig,
        functionName: "updateTargetAmount",
        args: [id, parseEther(amount)],
      });
    } catch (error) {
      console.log(error);
    }
  };

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
    if (donate >= Number(balance)) {
      setError("Insufficient balance.");
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
  };

  return (
    <>
      {openWithdraw && (
        <div className="fixed inset-0 z-10 h-screen bg-[rgba(0,0,0,0.7)] flex items-center justify-center flex-col">
          <div className="text-white text-xl mb-4">
            <p className="mb-2">
              Target Amount:{" "}
              <span className="font-bold">{targetAmount} ETH</span>
            </p>
            <p>
              Total Donated:{" "}
              <span className="font-bold">{totalDonated} ETH</span>
            </p>
          </div>
          {!newTarget && !withdrawn && (
            <div className="mt-4 space-x-4">
              <CustomButton
                btnType="button"
                title="Increase Target"
                styles="bg-[#4acd8d]"
                handleClick={() => setNewTarget(true)}
              />
              <CustomButton
                btnType="button"
                title="Withdraw Donations"
                styles="bg-[#8c6dfd] "
                handleClick={handleWithDraw}
              />
            </div>
          )}
          {newTarget && (
            <div className="flex flex-col items-center">
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
              <CustomButton
                btnType="button"
                title="Set New Target"
                styles={`w-full mt-4 ${
                  isPending || isConfirming
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-[#8c6dfd]"
                }`}
                disabled={isPending || isConfirming}
                handleClick={handleIncreaseTarget}
              />
              {writeError && (
                <span className="text-red-500 text-sm mt-1">
                  Error: {writeError.message}
                </span>
              )}
            </div>
          )}
        </div>
      )}
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
              src={image || "/placeholder.svg"}
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
                      <p className="text-base text-gray-400">{name}</p>
                      <p className="text-base text-[#60a5fa] break-all">
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
                  <p className="text-gray-400 text-base">{description}</p>
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
                            {index + 1}. {item}
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
                  <div className="flex justify-between items-center">
                    <span>Target Amount:</span>
                    <span>{targetAmount} ETH</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Total Donated:</span>
                    <span>{totalDonated} ETH</span>
                  </div>
                  <input
                    type="number"
                    placeholder="ETH 0.1"
                    step="0.0001"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-4 py-3 bg-[#1a1b1f] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  {error && !newTarget && (
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
                  {/* // TODO: isDeadlinePassed */}
                  <CustomButton
                    btnType="button"
                    title="Fund Campaign"
                    disabled={isPending || isConfirming || reachedDeadline}
                    styles={`w-full ${
                      isPending || isConfirming
                        ? "bg-gray-500 cursor-not-allowed"
                        : "bg-[#8c6dfd]"
                    }`}
                    handleClick={handleDonate}
                  />
                  {writeError && !newTarget && (
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
