import type React from "react";
import { useEffect } from "react";
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
  const supportedWallets = ["MetaMask", "Brave Wallet", "Coinbase Wallet"];

  // Filter connectors to only include supported wallets
  const filteredConnectors = connectors.filter((connector) =>
    supportedWallets.includes(connector.name)
  );

  // Map connector names to their respective icons
  const getWalletIcon = (connectorName: string) => {
    switch (connectorName) {
      case "MetaMask":
        return metamask;
      case "Brave Wallet":
        return brave;
      case "Coinbase Wallet":
        return coinbase;
      default:
        return ""; // Fallback for unknown connectors
    }
  };

  // Close the wallet component when the overlay (screen) is clicked
  const handleClose = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) {
      showWalletConnect();
    }
  };
  useEffect(() => {
    if (status === "success") {
      showWalletConnect();
    }
  }, [status]); // Removed showWalletConnect from dependencies
  return (
    <div
      id="screen"
      className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center"
      onClick={handleClose}
    >
      <div className="bg-white rounded-2xl shadow-lg p-8 w-96 max-w-[90%]">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-extrabold">Connect Wallet</h2>
          <button
            onClick={showWalletConnect}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          {filteredConnectors.map((connector) => {
            const icon = getWalletIcon(connector.name);
            return (
              <button
                key={connector.uid}
                onClick={() => connect({ connector })}
                className="w-full flex items-center p-4 rounded-lg border-2 border-gray-200 hover:bg-gray-50 transition duration-200 cursor-pointer"
              >
                {icon && (
                  <img
                    src={icon || "/placeholder.svg"}
                    alt={connector.name}
                    className="w-10 h-10 mr-4"
                  />
                )}
                <span className="text-lg font-bold">{connector.name}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 text-center text-sm font-medium text-gray-500">
          By connecting your wallet, you agree to our
          <br />
          <span className="space-x-1">
            <a href="#" className="text-blue-600 hover:underline font-bold">
              Terms of Service
            </a>
            <span>and</span>
            <a href="#" className="text-blue-600 hover:underline font-bold">
              Privacy Policy
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default WalletConnect;
