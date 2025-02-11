"use client";

import { useConnect } from "wagmi";
import { useDispatch } from "react-redux";
import { toggleWalletConnect } from "../actions/wallet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Wallet2, ChevronRight } from "lucide-react";
import Image from "next/image";

const WalletConnect = () => {
  const { connectors, connect, status } = useConnect();
  const dispatch = useDispatch();

  // List of supported wallet names and their configurations
  const supportedWallets = [
    {
      name: "Coinbase Wallet",
      icon: "/coinbase.svg", // Using external SVG for specific brand logos
      color: "rgb(0, 82, 255)",
      textColor: "white",
    },
    {
      name: "Brave Wallet",
      icon: "/brave.svg",
      color: "rgb(255, 80, 0)",
      textColor: "white",
    },
    {
      name: "MetaMask",
      icon: "/metamask.svg",
      color: "rgb(255, 163, 9)",
      textColor: "text-zinc-900",
    },
  ];

  // Filter connectors to only include supported wallets
  const filteredConnectors = connectors.filter((connector) =>
    supportedWallets.map((w) => w.name).includes(connector.name)
  );

  const handleClose = () => {
    dispatch(toggleWalletConnect());
  };

  // Handle successful connection
  if (status === "success") {
    handleClose();
  }

  return (
    <Dialog open onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet2 className="w-5 h-5" />
            Connect Wallet
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 pt-4">
          {filteredConnectors.map((connector) => {
            const walletConfig = supportedWallets.find(
              (w) => w.name === connector.name
            );
            if (!walletConfig) return null;

            return (
              <button
                key={connector.uid}
                onClick={() => connect({ connector })}
                variant="outline"
                className="w-full p-6 flex items-center justify-between group hover:border-primary transition-all"
                style={{
                  backgroundColor: "transparent",
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{
                      backgroundColor: walletConfig.color,
                    }}
                  >
                    {icon && (
                      <img
                        src={walletConfig.icon || "/placeholder.svg"}
                        alt={connector.name}
                        width={24}
                        height={24}
                        className={walletConfig.textColor}
                      />
                    )}
                  </div>
                  <span className="text-base font-medium">
                    {connector.name}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WalletConnect;
