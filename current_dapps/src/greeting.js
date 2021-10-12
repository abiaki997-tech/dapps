import React from "react";
import { useState } from "react";
import { ethers ,utils} from "ethers";


import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json';

0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
// contract address
const greeterAddress = `0x5FbDB2315678afecb367f032d93F642f64180aa3`;

function App() {

  const [greeting, setGreeting] = useState();

  window.onload = () => {
    console.log('DApp is loaded')
  
    if (window.ethereum) {
  
      let ethereum = window.ethereum;
  
      // accounts changed alert - fixed account variable 
      ethereum.on('accountsChanged', handleAccountsChanged);
  
  
      // bind current account
      ethereum.request({ method: 'eth_accounts' })
        .then(handleAccountsChanged)
        .catch(e => console.log(e, 'error'))
  
  
  
    } else {
      console.log('please install metamask')
    }
  }

  let accounts;

  

  async function handleConnectWallet() {

    console.log(window.ethereum)

    if (window.ethereum) {

      try {

        // premissioned to connect to metamask
        accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

        console.log(accounts, 'accounts')

      } catch (error) {

        console.log(error)

      }
    }

  }


  const checkEthBalance = async () => {

    if (window.ethereum) {
      try {

        // get balance of current account
        let balance = await window.ethereum.request({ method: 'eth_getBalance', params: [accounts[0]] });

        console.log(balance, 'balance')

        let ethBalance = ethers.utils.formatEther(balance)

        console.log(ethBalance,'ethbalance')



      } catch (error) {

        console.log(error)

      }
    }

  }


  function handleAccountsChanged(new_account) {

    console.log(new_account, 'account changed')

    // accounts=new_account



    // new account assigned global varibale

    if (new_account.length === 0) {

      // MetaMask is locked or the user has not connected any accounts
      console.log('Please connect to MetaMask.');

    } else if (accounts !== new_account) {

      accounts = new_account;

    } else {
      console.log('do other')
    }


  }

  const sendTranscation = async () => {

    if (window.ethereum) {

      try {

        let params = [{
          from: accounts[0],//current account variable
          to: "0x8eD3DEbb578c820b3420c069435ba52cb4A1FB64",
          gas: Number(21000).toString(16),
          gasPrice: Number(2500000).toString(16),
          value: Number(1000000000000000000).toString(16),


        }]

        // send transcation
        let sendTranscationResult = await window.ethereum.request({ method: 'eth_sendTransaction', params })

        console.log(sendTranscationResult, 'Transcationid')

      } catch (error) {

        console.log(error, 'err')
      }


    }
  }

  const fetchGreeting = async () => {

    if (window.ethereum) {

      const provider = new ethers.providers.Web3Provider(window.ethereum)

      // The Contract object
      const ContractObject = new ethers.Contract(greeterAddress, Greeter.abi, provider);

      console.log(ContractObject)

      try {

        const data = await ContractObject.greet();

        console.log(data, 'data');

      } catch (error) {

        console.log(error, 'error')
      }

    }
  }


  const sendGreeting = async () => {

    if (window.ethereum) {

      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const provider = new ethers.providers.Web3Provider(window.ethereum);

      console.log(provider, 'provider')

      const signer = provider.getSigner();

      console.log(signer, 'signer')

      // let message="Hi!"

      // let signature = await signer.signMessage(message, signer);

      //The Contract object
      const ContractObject = new ethers.Contract(greeterAddress, Greeter.abi, signer);

      console.log(ContractObject)

      //estimateGas of transcation
      const estimateTranscation = await ContractObject.estimateGas.setGreeting(greeting)

      console.log(estimateTranscation.toString())

      //transcation 
      const transcation = await ContractObject.setGreeting(greeting)

      let data = await transcation.wait()

      console.log('done',data,'hash', data.transactionHash)
      // let params=[]
      let  data2 = await window.ethereum.request({ method: 'eth_getTransactionByHash', params:[data.transactionHash] });

   
      console.log(data2,'data2')

    }
  }

  const simpleSignature = async () => {

    if (window.ethereum) {

      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const provider = new ethers.providers.Web3Provider(window.ethereum);

      console.log(provider, 'provider')

      const signer = provider.getSigner();

      console.log(signer, 'signer')

      let message = "Abhilash become Blockchain developer";

      let signature = await signer.signMessage(message, signer);

      console.log(signature, 'signature')

      let accounts = ethers.utils.verifyMessage(message, signature);

      console.log(accounts, 'as', accounts[0])

      if (accounts.toLowerCase() == accounts[0].toLowerCase()) {

        console.log('same address')

      } else {

        console.log('not same address')

      }
    }
  }




  return (


    <div>
      <h1>Hello Smart Contract !</h1>
      <button onClick={handleConnectWallet}>connect wallet</button>
      <button onClick={checkEthBalance}>get Balance</button>
      <button onClick={sendTranscation}>send Ether</button>
      <button onClick={fetchGreeting}>check  fetching</button>
      <button onClick={sendGreeting}>set Greeting</button>

      <input onChange={e => setGreeting(e.target.value)} placeholder="set greeting" />

      <button onClick={simpleSignature}>Sign Transcation</button>
    </div>
  );
}

export default App;