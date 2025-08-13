const { ethers } = require("hardhat")
const hre = require("hardhat") // Declare hre variable

async function main() {
  console.log("Deploying DeFi Will contracts to Avalanche...")

  // Get the deployer account
  const [deployer] = await ethers.getSigners()
  console.log("Deploying contracts with account:", deployer.address)
  console.log("Account balance:", (await deployer.getBalance()).toString())

  // Deploy WillFactory
  const WillFactory = await ethers.getContractFactory("WillFactory")
  const willFactory = await WillFactory.deploy()
  await willFactory.deployed()

  console.log("WillFactory deployed to:", willFactory.address)

  // Deploy a sample DefiWill contract
  const DefiWill = await ethers.getContractFactory("DefiWill")
  const defiWill = await DefiWill.deploy()
  await defiWill.deployed()

  console.log("DefiWill template deployed to:", defiWill.address)

  // Save deployment addresses
  const deploymentInfo = {
    network: hre.network.name,
    willFactory: willFactory.address,
    defiWillTemplate: defiWill.address,
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
  }

  console.log("Deployment completed:", deploymentInfo)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
