// import { http, createConfig } from "wagmi";
// import { electroneum, electroneumTestnet } from "wagmi/chains";
// import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";

// export const config = createConfig({
//   chains: [electroneumTestnet, electroneum],
//   connectors: [
//     injected(),
//     coinbaseWallet(),
//     walletConnect({ projectId: import.meta.env.VITE_WC_PROJECT_ID }),
//   ],
//   transports: {
//     [electroneum.id]: http(),
//     [electroneumTestnet.id]: http("https://rpc.ankr.com/electroneum_testnet"),
//   },
// });

// declare module "wagmi" {
//   interface Register {
//     config: typeof config;
//   }
// }
import { http, createConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
    injected(),
    coinbaseWallet(),
    walletConnect({ projectId: import.meta.env.VITE_WC_PROJECT_ID }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
