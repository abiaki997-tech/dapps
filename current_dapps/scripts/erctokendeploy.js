
const hre = require("hardhat");

async function main() {

  const TICKETTOKEN = await hre.ethers.getContractFactory("TICKETTOKEN");
  const tokengenerator = await TICKETTOKEN.deploy("MASTER","VIJAY");

  await tokengenerator.deployed();
//   0x5FbDB2315678afecb367f032d93F642f64180aa3
  // contract address 

  console.log("TICKETTOKEN deployed to:", tokengenerator.address);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
