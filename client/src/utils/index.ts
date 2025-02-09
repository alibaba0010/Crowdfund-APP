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
