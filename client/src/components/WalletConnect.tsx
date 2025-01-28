import React, { useEffect } from "react";
import { useConnect } from "wagmi";
import { brave, coinbase, metamask } from "../assets";

interface WalletConnectProps {
  onClose?: () => void;
  setIsWalletConnectOpen: (value: boolean) => void;
}

const WalletConnect: React.FC<WalletConnectProps> = ({
  onClose,
  setIsWalletConnectOpen,
}) => {
  const { connectors, connect, status, error } = useConnect();

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
  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsWalletConnectOpen(false);
      if (onClose) onClose(); // Call the onClose prop if provided
    }
  };
  useEffect(() => {
    if (status === "success") {
      setIsWalletConnectOpen(false);
    }
  }, [status, setIsWalletConnectOpen]);
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
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>

        <div className="space-y-4">
          {filteredConnectors.map((connector) => {
            const icon = getWalletIcon(connector.name);
            return (
              <button
                key={connector.uid}
                onClick={() => connect({ connector })}
                className="w-full flex items-center p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition duration-200"
              >
                {icon && (
                  <img
                    src={icon}
                    alt={connector.name}
                    className="w-8 h-8 mr-4"
                  />
                )}
                <span className="text-lg font-medium">{connector.name}</span>
              </button>
            );
          })}
        </div>

        {/* Display error message if there's an error */}
        {error && (
          <div className="mt-4 text-center text-red-500">
            {error.message.includes("already pending for origin")
              ? "A wallet request is already pending. Please check your wallet."
              : error.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletConnect;
