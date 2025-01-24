import { createContext, useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";

const StateContext = createContext();

const StateContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [wallet, setWallet] = useState("");

  // const connectWallet = async () => {
  //   const metamaskProvider = injectedProvider("io.metamask");
  //   // console.log("Connecting wallet: ", metamaskProvider);
  //   if (!metamaskProvider) {
  //     alert("Please install the metamsk extension");
  //     return;
  //   }

  //   const metamaskWallet = createWallet("io.metamask");

  //   const account = await metamaskWallet.connect({
  //     client,
  //   });
  //   setWallet(account.address);
  //   return account;
  // };
  // useEffect(() => {
  //   connectWallet();
  // }, []);

  const contextValue = {
    loading,
    address: wallet,
    // createCampaign: publishCampaign,
  };

  return (
    <StateContext.Provider value={contextValue}>
      {children}
    </StateContext.Provider>
  );
};

StateContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StateContextProvider;

export const useStateContext = () => useContext(StateContext);

// const publishCampaign = (form) => {
//   setLoading(true);
//   try {
//     if (!wallet) {
//       throw new Error("No wallet connected");
//     }

//     const transaction = prepareContractCall({
//       contract,
//       method: "createCampaign",
//       params: [
//         form.target,
//         new Date(form.deadline).getTime(),
//         form.title,
//         form.description,
//       ],
//     });
//     sendTransaction(transaction);

//     console.log("Campaign created successfully:", transaction);
//     return transaction;
//   } catch (error) {
//     console.error("Failed to publish campaign:", error);
//     throw error;
//   } finally {
//     setLoading(false);
//   }
// };
