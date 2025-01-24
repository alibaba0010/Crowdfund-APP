/** @type import('hardhat/config').HardhatUserConfig */
require("dotenv").config(); //all the key value pairs are being made available due to this lib

module.exports = {
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    sepolia: {
      // url: "https:",
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_KEY}`,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  solidity: {
    version: "0.8.11",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  mocha: {
    timeout: 40000,
  },
};

// fe796efbae96f46e0e90018cbabdc4ffd9534544327511fa8870b8697f930f62
// 0x1cFb81D4767A217f0B629F391bd1FEAa4d72e3d5
