// const getCampaigns = async () => {
//   const campaigns = await contract.call('getCampaigns');

//   const parsedCampaings = campaigns.map((campaign, i) => ({
//     owner: campaign.owner,
//     title: campaign.title,
//     description: campaign.description,
//     target: ethers.utils.formatEther(campaign.target.toString()),
//     deadline: campaign.deadline.toNumber(),
//     amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
//     image: campaign.image,
//     pId: i
//   }));

//   return parsedCampaings;
// }
export interface Campaigns {
  owner: string;
  title: string;
  description: string;
  target: bigint;
  // image: string;
  // createdAt: Date;
  remainingDays: string;
  amountCollected: number;
  image: string;
  pid: number;
  progress: number;
}
