

const hre = require('hardhat');


async function main() {

    const FilesHash = await hre.ethers.getContractFactory("FilesHash");
    const fileupload = await FilesHash.deploy();
  
    await fileupload.deployed();
  
  
    console.log("fileupload deployed to:", fileupload.address);
  }
  

  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  