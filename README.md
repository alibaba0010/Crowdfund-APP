<p align="center">
  <a href="" rel="noopener">
 <img src="./images/image 1.png" alt="Project logo"></a>
</p>
<h3 align="center">CrowdFunding Platform</h3>

<div align="center">

[![Hackathon](https://img.shields.io/badge/hackathon-name-orange.svg)](https://crowdfund-app-rho.vercel.app/)
[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/alibaba0010/Crowdfund-APP.svg)](https://github.com/alibaba0010/Crowdfund-APP/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/alibaba0010/Crowdfund-APP.svg)](https://github.com/alibaba0010/Crowdfund-APP/pulls)
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

Traditional crowdfunding platforms face significant challenges with high transaction fees, lengthy processing times, and centralized control over funds, often charging creators 5-10% of their raised capital while adding administrative complexities. These intermediaries not only increase costs but also create potential security risks and limit campaign creators' autonomy over their funds.

This project addresses these inefficiencies by developing a decentralized crowdfunding platform that leverages blockchain technology to enable direct peer-to-peer transactions. By eliminating intermediaries, the solution aims to reduce costs, enhance transparency, and provide creators with immediate access to their funds while ensuring secure, traceable transactions through smart contracts.

## 💡 Idea / Solution <a name = "idea"></a>

The CrowdFunding Platform enables users to:

- Create a fundraising campaign with a target amount and deadline.
- Donate directly to campaigns.
- Withdraw funds once the target is met.
- Claim refunds if the target is not reached before the deadline.
- View active and past campaigns transparently on the blockchain.

## ⛓️ Dependencies / Limitations <a name = "limitations"></a>

- Platform requires Electroneum cryptocurrency and ETN for gas fees, creating cost barriers
- Smart contracts are immutable - changes require new deployments with associated costs
- Refund functionality limited to campaigns that don't reach targets
- Legal uncertainties in different regions

## 🚀 Future Scope <a name = "future_scope"></a>

- Implementing a governance system for campaign verification.
- Adding support for multiple cryptocurrencies.
- Integrating with Layer 2 solutions for reduced gas fees.
- Providing enhanced analytics for campaign performance tracking.
- Advanced funds monitoring and management

## 🏁 Getting Started <a name = "getting_started"></a>

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Hardhat](https://hardhat.org/)
- [MetaMask](https://metamask.io/)
- [Solidity](https://soliditylang.org/)
- [Electroneum Blockchain](http://testnet-scblockexplorer.electroneum.com/)

### Faucet and Electroneum Network Integration

Click the link below to get testnet faucet

-[Electroneum Faucet](https://faucet.electroneum.com/)

Add these network configurations to your wallet
Network Name: Ankr Electroneum Testnet

RPC URL: https://rpc.ankr.com/electroneum_testnet

Chain ID: 5201420

Currency Symbol: ETN

Block Explorer URL (Optional): https://blockexplorer.thesecurityteam.rocks/

### Installing

1. Clone the repository:
   ```sh
   git clone https://github.com/alibaba0010/Crowdfund-APP.git
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Compile the contract:
   ```sh
   truffle init
   truffle deploy --network electroneum
   ```
4. Deploy the contract:

   ```sh
   truffle run verify GoFundme --network electroneum

   or deploy manually on the electroneum blockchain under contract tab
   ```

## 🎈 Usage <a name="usage"></a>

- Deploy smart contract on Electroneum network with sufficient ETN
- Create campaign via createCampaign with goals and timeline
- Process donations through donate function
- Campaign creators withdraw funds using withdrawFunds after target met
- Failed campaign backers claim refunds via claimRefund
- Track campaign details using getCampaignById
- Manage reward distribution and campaign updates through dashboard

## ⛏️ Built With <a name = "tech_stack"></a>

- [Solidity](https://soliditylang.org/) - Smart Contract Language
- [Electroneum](http://testnet-scblockexplorer.electroneum.com/) - Electroneum Blockchain Platform
- [Hardhat](https://archive.trufflesuite.com/docs/truffle/) - Development Environment
- [Wagmi](https://wagmi.sh/) - Blockchain Contract Intregration Package

## ✍️ Authors <a name = "authors"></a>

- [@alibaba](https://github.com/alibaba0010) - Smart Contract Development

## 🎉 Acknowledgments <a name = "acknowledgments"></a>

- Inspiration from existing crowdfunding platforms.
- Electroneum developer community.
- Solidity documentation.
