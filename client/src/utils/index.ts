import abi from "./Crowdfund.json";
export const daysLeft = (deadline: any) => {
  const difference = new Date(deadline).getTime() - Date.now();
  const remainingDays = difference / (1000 * 3600 * 24);

  return remainingDays.toFixed(0);
};

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
