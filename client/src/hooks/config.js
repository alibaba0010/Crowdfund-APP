import { createConfig, http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { metaMask } from "wagmi/connectors";
export const config = createConfig({
  chains: [sepolia], // mainnet
  connectors: [metaMask()],
  transports: {
    //  [mainnet.id]: http('https://mainnet.example.com'),
    // [sepolia.id]: http("https://sepolia.example.com"),
    [sepolia.id]: http(),
  },
});
