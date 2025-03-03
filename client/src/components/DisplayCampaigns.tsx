import { useNavigate, useSearchParams } from "react-router-dom";
import { loader } from "../assets";
import CampaignCard from "./CampaignCard";
import { useSelector } from "react-redux";
import { useMemo, useState } from "react";
import { encryptId } from "../utils";
import { Select, SelectItem } from "@nextui-org/react";
import { categories } from "../constants";
export interface Campaign {
  creator: string;
  name: string;
  title: string;
  category: string;
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
  category: string;
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

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const campaignsPerPage = 10;

  // Category filter state
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleNavigate = (campaign: CampaignData) => {
    const { id, pId } = campaign;
    const encryptedId = encryptId(id);
    navigate(`/campaigns/campaign-details/${encryptedId}/${pId}`);
  };

  const sortedCampaigns = useMemo(() => {
    let filtered = [...campaigns];

    if (searchQuery) {
      filtered = filtered.filter((campaign) =>
        campaign.title.toLowerCase().includes(searchQuery)
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (campaign) => campaign.category === selectedCategory
      );
    }

    return filtered.sort((a, b) => b.id - a.id);
  }, [campaigns, searchQuery, selectedCategory]);

  // Calculate pagination values
  const totalPages = Math.ceil(sortedCampaigns.length / campaignsPerPage);
  const indexOfLastCampaign = currentPage * campaignsPerPage;
  const indexOfFirstCampaign = indexOfLastCampaign - campaignsPerPage;
  const currentCampaigns = sortedCampaigns.slice(
    indexOfFirstCampaign,
    indexOfLastCampaign
  );

  // Handle page changes
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-epilogue font-semibold text-[18px] text-white">
          {title} ({sortedCampaigns.length})
        </h1>
        {selectedCategory === "all" && (
          <Select
            label="Sort by Category"
            className="max-w-xs bg-[#13131A] text-white"
            onChange={(e) => setSelectedCategory(e.target.value as string)}
          >
            <SelectItem key="all" value="all" className="text-white">
              All Categories
            </SelectItem>
            {
              categories.map((category) => (
                <SelectItem
                  key={category.name}
                  value={category.name}
                  className="text-white"
                >
                  {category.name}
                </SelectItem>
              )) as any
            }
          </Select>
        )}
        {selectedCategory !== "all" && (
          <button
            onClick={() => setSelectedCategory("all")}
            className="px-4 py-2 bg-[#1dc071] text-white rounded-md hover:bg-[#18a05e] transition-colors"
          >
            Clear Filter
          </button>
        )}
      </div>

      {searchQuery && (
        <p className="text-gray-400 text-sm mb-4">
          Searching for: "{searchQuery}"
        </p>
      )}

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
          currentCampaigns.map((campaign: CampaignData) => (
            <CampaignCard
              key={campaign.pId}
              {...campaign}
              handleClick={() => handleNavigate(campaign)}
            />
          ))}
      </div>

      {/* Pagination Controls */}
      {!isLoading && totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md ${
              currentPage === 1
                ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                : "bg-[#1dc071] text-white hover:bg-[#18a05e] transition-colors"
            }`}
          >
            Previous
          </button>

          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              className={`w-10 h-10 rounded-md ${
                currentPage === number
                  ? "bg-[#1dc071] text-white"
                  : "bg-gray-800 text-white hover:bg-gray-700 transition-colors"
              }`}
            >
              {number}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md ${
              currentPage === totalPages
                ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                : "bg-[#1dc071] text-white hover:bg-[#18a05e] transition-colors"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default DisplayCampaigns;
