import { contractABI, contractAddress } from ".";
export const wagmiContractConfig = {
  address: contractAddress,
  abi: contractABI,
} as const;
