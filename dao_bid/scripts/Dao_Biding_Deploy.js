
const hre = require('hardhat');

async function main() {

  const DAO_BIDING = await hre.ethers.getContractFactory("DAO_BIDING");
  const dao_biding = await DAO_BIDING.deploy(60);

  await dao_biding.deployed();

  console.log("dao_biding deployed to:", dao_biding.address);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
