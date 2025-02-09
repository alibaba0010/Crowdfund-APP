import { http, createConfig } from "wagmi";
import { electroneum, electroneumTestnet } from "wagmi/chains";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";

export const config = createConfig({
  chains: [electroneumTestnet, electroneum],
  connectors: [
    injected(),
    coinbaseWallet(),
    walletConnect({ projectId: import.meta.env.VITE_WC_PROJECT_ID }),
  ],
  transports: {
    [electroneumTestnet.id]: http(),
    [electroneum.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
