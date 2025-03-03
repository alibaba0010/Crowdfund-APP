import abi from "./Crowdfund.json";
import axios from "axios";
export const contractABI = abi.abi;
export const activeChain = "electroneum";
export const clientId = import.meta.env.VITE_HELLO;
// export const contractAddress = "0x74B2e72879876a8535deBc56ae3844bb1a2c7ca1";
export const contractAddress = "0xd509662722AdF6613d58252259Ef559632951A83";

export const calculateBarPercentage = (goal: number, raisedAmount: number) => {
  const percentage = Math.round((raisedAmount * 100) / goal);

  return percentage;
};
export const encryptId = (id: any) => {
  return btoa(id); // Encode to Base64
};

export const decryptId = (encryptedId: any) => {
  return atob(encryptedId); // Decode from Base64
};
export const daysLeft = (deadline: bigint) => {
  const msPerDay = 86_400_000n; // 1000 * 60 * 60 * 24P
  const deadlineMs = deadline * 1000n;
  const now = BigInt(Date.now());
  const difference = deadlineMs - now;

  if (difference <= 0n) return "0";

  // Ceiling division: (a + b - 1n) / b
  const remainingDays = (difference + msPerDay - 1n) / msPerDay;

  return remainingDays.toString();
};

export const shortenAddress = (address: string) => {
  if (address) return address.slice(0, 6) + "..." + address.slice(-4);
};

interface UploadToPinataResponse {
  IpfsHash: string;
}

export const uploadToPinata = async (
  file: any
): Promise<UploadToPinataResponse> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post<UploadToPinataResponse>(
    "https://api.pinata.cloud/pinning/pinFileToIPFS",
    formData,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_WC_PINATA_JWT}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};
