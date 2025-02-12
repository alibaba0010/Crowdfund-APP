import React, { useEffect } from "react";
import { useConnect } from "wagmi";
import { brave, coinbase, metamask } from "../assets";
import { useDispatch } from "react-redux";
import { toggleWalletConnect } from "../actions/wallet";

const WalletConnect = () => {
  const { connectors, connect, status } = useConnect();
  const dispatch = useDispatch();
  const showWalletConnect = () => {
    dispatch(toggleWalletConnect());
  };
  // List of supported wallet names
  const supportedWallets = [
    {
      name: "Coinbase Wallet",
      icon: coinbase,
      color: "rgb(0, 82, 255)",
      textColor: "white",
    },
    {
      name: "Brave Wallet",
      icon: brave,
      color: "rgb(255, 80, 0)",
      textColor: "white",
    },
    {
      name: "MetaMask",
      icon: metamask,
      color: "rgb(255, 163, 9)",
      textColor: "text-zinc-900",
    },
  ];

  // Filter connectors to only include supported wallets
  const filteredConnectors = connectors.filter((connector) =>
    supportedWallets.map((w) => w.name).includes(connector.name)
  );

  // Close the wallet component when the overlay (screen) is clicked
  const handleClose = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) {
      dispatch(toggleWalletConnect());
    }
  };
  useEffect(() => {
    if (status === "success") {
      showWalletConnect();
    }
  }, [status]);
  return (
    <div
      id="screen"
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={handleClose}
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Connect Wallet</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>

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
                    {walletConfig && (
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
      </div>
    </div>
  );
};

export default WalletConnect;
