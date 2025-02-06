import abi from "./Crowdfund.json";
import axios from "axios";
export const contractABI = abi.abi;
export const activeChain = "sepolia";
export const clientId = import.meta.env.VITE_HELLO;
// export const contractAddress = "0x29EF2c83906b01dA3027247f2BCb006D95556D0E";
export const contractAddress = "0xEb41B00F4Fa3a9D46AF5B8d699ac6DF03894C1Bf";

export const calculateBarPercentage = (goal: number, raisedAmount: number) => {
  const percentage = Math.round((raisedAmount * 100) / goal);

  return percentage;
};

export const daysLeft = (deadline: bigint) => {
  const msPerDay = 86_400_000n; // 1000 * 60 * 60 * 24
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
// export const checkIfImage = (url, callback) => {
//   const img = new Image();
//   img.src = url;

//   if (img.complete) callback(true);

//   img.onload = () => callback(true);
//   img.onerror = () => callback(false);
// };
// src/utils/base64Utils.js

// export const daysLeft = (deadline: bigint) => {
//   // Convert BigInt deadline (seconds) to milliseconds
//   const deadlineMs = deadline * 1000n;

//   // Convert to JavaScript Date
//   const deadlineDate = new Date(Number(deadlineMs));

//   // Calculate difference in milliseconds
//   const difference = deadlineDate.getTime() - Date.now();

//   // Return 0 if deadline has passed
//   if (difference <= 0) return "0";

//   // Calculate remaining days (floor value)
//   const remainingDays = Math.floor(difference / (1000 * 3600 * 24));

//   return remainingDays.toString();
// };
