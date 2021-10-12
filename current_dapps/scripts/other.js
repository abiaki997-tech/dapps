// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
    // Hardhat always runs the compile task when running scripts with its command
    // line interface.
    //
    // If this script is run directly using `node` you may want to call compile
    // manually to make sure everything is compiled
    // await hre.run('compile');

    // We get the contract to deploy

      // const accounts = await ethers.provider.listAccounts();

      // console.log(accounts,'accounts')
      // const [owner,] = await ethers.getSigners()
      // console.log(owner.address)
      const MultiSignature = await hre.ethers.getContractFactory("MultipleSignatureWallet");
    //   let accounts=["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266","0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    //     ,"0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"]
    // accounts[0],accounts[1],accounts[2]
      const multsignFinal = await MultiSignature.deploy(["0x90F79bf6EB2c4f870365E785982E1f101E93b906","0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc","0x976EA74026E726554dB657fA54763abd0C3a0aa9"],2);

    // var ethers = require('ethers');
    // const url = "http://127.0.0.1:8545";

    // const provider = new ethers.providers.JsonRpcProvider(url);
    // const signer = provider.getSigner();

    // let abi = require('../src/artifacts/contracts/MultiSignature.sol/MultipleSignatureWallet.json').abi;
    // let bytecode = require('../src/artifacts/contracts/MultiSignature.sol/MultipleSignatureWallet.json').bytecode;
    // const factory = new ethers.ContractFactory(abi, bytecode, signer);
    // const contract = await factory.deploy([0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266, 0x70997970C51812dc3A010C7d01b50e0d17dc79C8,
    //     , 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC]);
    // console.log('contract address', contract.address);

    await multsignFinal.deployed();
    // await contract.deployTransaction.wait();

    // contract address 

    console.log("Multisignature deployed to:", multsignFinal.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
