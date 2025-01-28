import { contractABI, contractAddress } from "./constants";
export const wagmiContractConfig = {
  address: contractAddress,
  abi: contractABI,
} as const;
