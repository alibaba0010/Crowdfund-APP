<p align="center">
  <a href="" rel="noopener">
 <img src="https://i.imgur.com/AZ2iWek.png" alt="Project logo"></a>
</p>
<h3 align="center">GoFundMe Smart Contract</h3>

<div align="center">

[![Hackathon](https://img.shields.io/badge/hackathon-name-orange.svg)](http://hackathon.url.com)
[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE.md)

</div>

---

<p align="center"> A decentralized crowdfunding platform built on Ethereum.
    <br> 
</p>

## 📝 Table of Contents

- [Problem Statement](#problem_statement)
- [Idea / Solution](#idea)
- [Dependencies / Limitations](#limitations)
- [Future Scope](#future_scope)
- [Setting up a local environment](#getting_started)
- [Usage](#usage)
- [Technology Stack](#tech_stack)
- [Contributing](../CONTRIBUTING.md)
- [Authors](#authors)
- [Acknowledgments](#acknowledgments)

## 🧐 Problem Statement <a name = "problem_statement"></a>

Crowdfunding platforms often involve intermediaries that take a percentage of the funds raised. This project aims to create a decentralized solution that allows users to create fundraising campaigns, receive donations, and withdraw funds without third-party involvement.

## 💡 Idea / Solution <a name = "idea"></a>

The GoFundMe Smart Contract enables users to:

- Create a fundraising campaign with a target amount and deadline.
- Donate directly to campaigns.
- Withdraw funds once the target is met.
- Claim refunds if the target is not reached before the deadline.
- View active and past campaigns transparently on the blockchain.

## ⛓️ Dependencies / Limitations <a name = "limitations"></a>

- Requires Ethereum and gas fees for transactions.
- Smart contracts are immutable; upgrades require deploying new contracts.
- Refunds are only possible if the campaign fails to reach its target.
- Funds cannot be withdrawn if the target is not met.

## 🚀 Future Scope <a name = "future_scope"></a>

- Implementing a governance system for campaign verification.
- Adding support for multiple cryptocurrencies.
- Integrating with Layer 2 solutions for reduced gas fees.
- Providing enhanced analytics for campaign performance tracking.

## 🏁 Getting Started <a name = "getting_started"></a>

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Hardhat](https://hardhat.org/)
- [MetaMask](https://metamask.io/)
- [Solidity](https://soliditylang.org/)

### Installing

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/gofundme-smart-contract.git
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Compile the contract:
   ```sh
   npx hardhat compile
   ```
4. Deploy the contract:
   ```sh
   npx hardhat run scripts/deploy.js --network goerli
   ```

## 🎈 Usage <a name="usage"></a>

- Deploy the smart contract on Ethereum.
- Create a campaign by calling `createCampaign`.
- Donate to a campaign using `donate`.
- Withdraw funds using `withdrawFunds` when the target is met.
- Claim a refund using `claimRefund` if the campaign fails.
- Retrieve campaign details using `getCampaignById`.

## ⛏️ Built With <a name = "tech_stack"></a>

- [Solidity](https://soliditylang.org/) - Smart Contract Language
- [Ethereum](https://ethereum.org/) - Blockchain Platform
- [Hardhat](https://hardhat.org/) - Development Environment

## ✍️ Authors <a name = "authors"></a>

- [@yourgithub](https://github.com/yourgithub) - Smart Contract Development

See also the list of [contributors](https://github.com/your-repo/gofundme-smart-contract/contributors)
who participated in this project.

## 🎉 Acknowledgments <a name = "acknowledgments"></a>

- Inspiration from existing crowdfunding platforms.
- Ethereum developer community.
- Solidity documentation.
