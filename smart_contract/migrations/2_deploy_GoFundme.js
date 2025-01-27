const GoFundme = artifacts.require("GoFundme");

module.exports = async function (deployer) {
  await deployer.deploy(GoFundme);
  const contractInstance = await GoFundme.deployed();
  console.log("Contract deployed at", contractInstance.address);
};
