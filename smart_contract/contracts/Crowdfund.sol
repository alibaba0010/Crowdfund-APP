// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract GoFundme {
    constructor() payable {}

    struct Campaign {
        address payable creator;
        string name;
        string title; 
        string description;
        uint256 targetAmount;
        string image;
        uint256 createdAt;
        uint256 deadline; // Unix timestamp (seconds since epoch)
        uint256 totalDonated;
        mapping(address => uint256) donations;
        address[] donators;
        bool withdrawn;
        bool reachedDeadline;
    }
    
    // Struct for returning campaign details in memory (no mappings)
    struct CampaignDetails {
        address creator;
        string name;
        string title;
        string description;
        uint256 targetAmount;
        string image;
        uint256 createdAt;
        uint256 deadline;
        uint256 totalDonated;
        address[] donators;
        bool withdrawn;
        bool reachedDeadline;
    }

    // Struct for returning donor information
    struct Donor {
        address donor;
        uint256 amount;
    }

    mapping(uint256 => Campaign) public campaigns;
    uint256 public campaignCount;

    // Events
    event CampaignCreated(uint256 campaignId, address creator, uint256 targetAmount, uint256 deadline, string title, string description);
    event DonationMade(uint256 campaignId, address donor, uint256 amount);
    event FundsWithdrawn(uint256 campaignId, address creator, uint256 amount);
    event TargetUpdated(uint256 campaignId, uint256 newTargetAmount);
    event RefundClaimed(uint256 campaignId, address donor, uint256 amount);

    modifier campaignExists(uint campaignId) {
        require(campaignId < campaignCount, "Campaign does not exist");
        _;
    }

    // 1. Create a new campaign
    function createCampaign(
        string memory name,
        string memory title,
        string memory description,
        uint256 targetAmount,
        string memory image,
        uint256 deadline
    ) public payable returns (uint256) {
        require(targetAmount > 0, "Target amount must be greater than zero.");
        require(deadline > block.timestamp, "Deadline must be in the future.");

        Campaign storage newCampaign = campaigns[campaignCount];
        newCampaign.creator = payable(msg.sender);
        newCampaign.name = name;
        newCampaign.title = title;
        newCampaign.description = description;
        newCampaign.targetAmount = targetAmount;
        newCampaign.image = image;
        newCampaign.createdAt = block.timestamp;
        newCampaign.deadline = deadline;
        newCampaign.totalDonated = 0;
        newCampaign.withdrawn = false;
        newCampaign.reachedDeadline = false;

        emit CampaignCreated(campaignCount, msg.sender, targetAmount, deadline, title, description);
        campaignCount++; // Increment campaign count
        return campaignCount - 1;
    }

    // 2. Donate to the campaign
    function donate(uint256 campaignId) public payable campaignExists(campaignId) {
        Campaign storage campaign = campaigns[campaignId];
          if (block.timestamp >= campaign.deadline && !campaign.reachedDeadline) {
        campaign.reachedDeadline = true;  // Mark as reached the deadline
    }
        require(!campaign.withdrawn, "Campaign funds already withdrawn.");
        require(block.timestamp <= campaign.deadline, "Campaign has expired");
        require(!campaign.reachedDeadline, "Campaign deadline has passed.");

        // If first donation from sender, add them to the donators array.
        if (campaign.donations[msg.sender] == 0) {
            campaign.donators.push(msg.sender);
        }

        campaign.totalDonated += msg.value;
        campaign.donations[msg.sender] += msg.value;
        emit DonationMade(campaignId, msg.sender, msg.value);
    }

    // 3. Check if campaign has reached the deadline
    function checkDeadline(uint256 campaignId) public view campaignExists(campaignId) returns (bool) {
        Campaign storage campaign = campaigns[campaignId];
        return campaign.deadline <= block.timestamp;
    }

    // 4. Check if the target for the campaign has been reached 
    function checkTargetReached(uint256 campaignId) public view campaignExists(campaignId) returns (bool) {
        Campaign storage campaign = campaigns[campaignId];
        return campaign.totalDonated >= campaign.targetAmount;
    }

    // 5. Withdraw funds by the campaign creator
    function withdrawFunds(uint256 campaignId) public campaignExists(campaignId) {
        Campaign storage campaign = campaigns[campaignId];
         
        require(campaign.creator == msg.sender, "Only the creator can withdraw funds.");
        require(!campaign.withdrawn, "Funds already withdrawn.");
        require(checkTargetReached(campaignId), "Target not reached.");

        uint256 amount = campaign.totalDonated;
        campaign.withdrawn = true;
        campaign.reachedDeadline = true;

        // Transfer funds
        (bool success, ) = payable(campaign.creator).call{value: amount}("");
        require(success, "Transfer failed");

        emit FundsWithdrawn(campaignId, msg.sender, amount);
    }
function getAddressBalance() public view returns (uint256) {
        return address(this).balance;
    }
    // 6. Fetch the balance for a campaign
    function getBalance(uint256 campaignId) public view campaignExists(campaignId) returns (uint256) {
        Campaign storage campaign = campaigns[campaignId];
        return campaign.totalDonated;
    }

    // 7. Get donators with the amounts they donated
    function getDonors(uint256 campaignId) public view campaignExists(campaignId) returns (Donor[] memory) {
        Campaign storage campaign = campaigns[campaignId];
        uint256 donorCount = campaign.donators.length;
        Donor[] memory donorsList = new Donor[](donorCount);

        for (uint256 i = 0; i < donorCount; i++) {
            address donorAddr = campaign.donators[i];
            donorsList[i] = Donor({
                donor: donorAddr,
                amount: campaign.donations[donorAddr]
            });
        }
        return donorsList;
    }

    // 8. Get all campaigns for a particular creator using _mapCampaign
    function getAvailableCampaignsByCreator(address creator) public view returns (CampaignDetails[] memory) {
        // First, count how many campaigns are created by the given creator.
        uint256 countResult;
        for (uint256 i = 0; i < campaignCount; i++) {
            if (_isAvailable(campaigns[i]) && campaigns[i].creator == creator) {
                countResult++;
            }
        }

        // Allocate a new array for matching campaigns.
        CampaignDetails[] memory result = new CampaignDetails[](countResult);
        uint256 index;
        for (uint256 i = 0; i < campaignCount; i++) {
            if (_isAvailable(campaigns[i]) && campaigns[i].creator == creator) {
                result[index] = _mapCampaign(campaigns[i]);
                index++;
            }
        }
        return result;
    }
    function getPastCampaignsByCreator(address creator) public view returns (CampaignDetails[] memory) {
        // First, count how many campaigns are created by the given creator.
        uint256 countResult;
        for (uint256 i = 0; i < campaignCount; i++) {
            if (_isPast(campaigns[i]) && campaigns[i].creator == creator) {
                countResult++;
            }
        }

        // Allocate a new array for matching campaigns.
        CampaignDetails[] memory result = new CampaignDetails[](countResult);
        uint256 index;
        for (uint256 i = 0; i < campaignCount; i++) {
            if (_isPast(campaigns[i]) && campaigns[i].creator == creator) {
                result[index] = _mapCampaign(campaigns[i]);
                index++;
            }
        }
        return result;
    }

    // 9. Get all active campaigns
    function getAvailableCampaigns() public view returns (CampaignDetails[] memory) {
        uint256 matchCount;
        for (uint256 i = 0; i < campaignCount; i++) {
            if (_isAvailable(campaigns[i])) {
                matchCount++;
            }
        }

        CampaignDetails[] memory result = new CampaignDetails[](matchCount);
        uint256 index;
        for (uint256 i = 0; i < campaignCount; i++) {
            if (_isAvailable(campaigns[i])) {
                result[index++] = _mapCampaign(campaigns[i]);
            }
        }
        return result;
    }

    // 10. Get all past campaigns
    function getPastCampaigns() public view returns (CampaignDetails[] memory) {
        uint256 matchCount;
        for (uint256 i = 0; i < campaignCount; i++) {
            if (_isPast(campaigns[i])) {
                matchCount++;
            }
        }

        CampaignDetails[] memory result = new CampaignDetails[](matchCount);
        uint256 index;
        for (uint256 i = 0; i < campaignCount; i++) {
            if (_isPast(campaigns[i])) {
                result[index++] = _mapCampaign(campaigns[i]);
            }
        }
        return result;
    }

    // Internal helper to check campaign availability
    function _isAvailable(Campaign storage c) internal view returns (bool) {
        return !c.withdrawn && !c.reachedDeadline && block.timestamp <= c.deadline;
    }

    // Internal helper to check if a campaign is past (i.e. finished or expired)
    function _isPast(Campaign storage c) internal view returns (bool) {
        return c.withdrawn || c.reachedDeadline || block.timestamp > c.deadline;
    }

    // Internal helper to map storage Campaign struct to a memory CampaignDetails struct
    function _mapCampaign(Campaign storage c) internal view returns (CampaignDetails memory) {
        return CampaignDetails({
            creator: c.creator,
            name: c.name,
            title: c.title,
            description: c.description,
            targetAmount: c.targetAmount,
            image: c.image,
            createdAt: c.createdAt,
            deadline: c.deadline,
            totalDonated: c.totalDonated,
            donators: c.donators,
            withdrawn: c.withdrawn,
            reachedDeadline: c.reachedDeadline
        });
    }

    // 11. Delete a campaign by the creator
    function deleteCampaign(uint256 campaignId) public campaignExists(campaignId) {
        Campaign storage campaign = campaigns[campaignId];
        require(campaign.creator == msg.sender, "Only the creator can delete this campaign.");
        require(campaign.totalDonated == 0, "Cannot delete a campaign that has received donations.");

        campaign.withdrawn = true;
        campaign.reachedDeadline = true;
        // The donators array remains intact to maintain record history.
    }

    // 12. Get a campaign using its ID
    function getCampaignById(uint256 campaignId) public view campaignExists(campaignId) returns (CampaignDetails memory) {
        return _mapCampaign(campaigns[campaignId]);
    }


    // Update targetAmount field for a campaign.
    function updateTargetAmount(uint256 campaignId, uint256 newTargetAmount) public campaignExists(campaignId) {
        Campaign storage campaign = campaigns[campaignId];
        require(campaign.creator == msg.sender, "Only the creator can update the target amount.");
        // Ensure the new target is greater than the amount already donated.
        require(newTargetAmount > campaign.totalDonated, "New target must be greater than the amount already donated.");
        campaign.targetAmount = newTargetAmount;
        emit TargetUpdated(campaignId, newTargetAmount);
    }

    // Allow donors to claim a refund if the campaign did not reach its target by the deadline.
    function claimRefund(uint256 campaignId) public campaignExists(campaignId) {
        Campaign storage campaign = campaigns[campaignId];
        require(block.timestamp > campaign.deadline, "Campaign is still active.");
        require(campaign.totalDonated < campaign.targetAmount, "Campaign reached its target; refund not available.");
        uint256 donatedAmount = campaign.donations[msg.sender];
        require(donatedAmount > 0, "No donation found for sender.");

        // Set donation to zero before transfer to prevent re-entrancy.
        campaign.donations[msg.sender] = 0;
        // Adjust totalDonated if needed (optional)
        campaign.totalDonated -= donatedAmount;
        
        (bool success, ) = payable(msg.sender).call{value: donatedAmount}("");
        require(success, "Refund transfer failed");

        emit RefundClaimed(campaignId, msg.sender, donatedAmount);
    }
}
