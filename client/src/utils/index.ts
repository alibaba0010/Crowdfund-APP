import abi from "./Crowdfund.json";
import axios from "axios";
export const contractABI = abi.abi;
export const contractAddress = "0x278e7D5f487D6559faf54066793aa622E81427f3";
// export const contractAddress = "0xd509662722AdF6613d58252259Ef559632951A83";
interface CalculateBarPercentageParams {
  goal: number;
  raisedAmount: number;
}

export const calculateBarPercentage = ({
  goal,
  raisedAmount,
}: CalculateBarPercentageParams): number => {
  const percentage = Math.round((raisedAmount * 100) / goal);

  return percentage;
};

// export const checkIfImage = (url, callback) => {
//   const img = new Image();
//   img.src = url;

//   if (img.complete) callback(true);

//   img.onload = () => callback(true);
//   img.onerror = () => callback(false);
// };
export const activeChain = "sepolia";
export const clientId = import.meta.env.VITE_HELLO;
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
export const shortenAddress = (address: string) => {
  return address.slice(0, 6) + "..." + address.slice(-4);
};

interface UploadToPinataResponse {
  IpfsHash: string;
}

export const uploadToPinata = async (
  file: any
): Promise<UploadToPinataResponse> => {
  console.log("File", import.meta.env.VITE_WC_PINATA_JWT);
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
  console.log("Response", response);
  return response.data;
};
