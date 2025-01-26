import { contractABI, contractAddress } from "./constants";
console.log(contractABI, contractAddress);
export const wagmiContractConfig = {
  address: contractAddress,
  abi: contractABI,
} as const;
