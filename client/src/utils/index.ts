import abi from "./Crowdfund.json";
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
export const contractABI = abi.abi;
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
