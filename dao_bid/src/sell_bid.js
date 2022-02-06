import React from "react";
import { useState } from "react";
import { ethers, Signer, utils } from "ethers";
import { BrowserRouter as Router, Routes as Switch, Route, Link } from 'react-router-dom';


import { client } from './ipfs';

import BidingJson from '../artifacts/contracts/DAO_Biding.sol/DAO_BIDING.json'

// let BidContractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

let BidContractAddress = '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9';




function Sell_Bid() {

    const [fileUrl, setFileUrl] = useState();

    const [name, setname] = useState();

    const [price, setprice] = useState();

    // window.onload = () => {
    //     console.log('DApp is loaded')

    //     if (window.ethereum) {

    //       let ethereum = window.ethereum;

    //       // accounts changed alert - fixed account variable 
    //       ethereum.on('accountsChanged', handleAccountsChanged);


    //       // bind current account
    //       ethereum.request({ method: 'eth_accounts' })
    //         .then(handleAccountsChanged)
    //         .catch(e => console.log(e, 'error'))



    //     } else {
    //       console.log('please install metamask')
    //     }
    //   }

    //   let accounts;

    //   function handleAccountsChanged(new_account) {

    //     console.log(new_account, 'account changed')

    //     // accounts=new_account



    //     // new account assigned global varibale

    //     if (new_account.length === 0) {

    //       // MetaMask is locked or the user has not connected any accounts
    //       console.log('Please connect to MetaMask.');

    //     } else if (accounts !== new_account) {

    //       accounts = new_account;

    //     } else {
    //       console.log('do other')
    //     }


    //   }  

    const changeHandler = async (event) => {

        console.log(event.target.files[0])

        let file = event.target.files[0];

        console.log(file)

        const added = await client.add(file);

        console.log(added, ': added')

        console.log(added.cid, ': cid')


        // infura in prod
        const url = `https://ipfs.infura.io/ipfs/${added.path}`;

        setFileUrl(added.path)

        //locally

        // const url=`http://127.0.0.1:8081/ipfs/${added.path}`;

        console.log(url, ": url")


    };

    const handleSell = async () => {

        console.log(name, 'name', fileUrl, 'fileurl', price, 'price')

        if (!name || !fileUrl || !price) {
            console.log('Mandtory Fields Missing')
            return
        }

        if (window.ethereum) {

            const provider = new ethers.providers.Web3Provider(window.ethereum)

            console.log(provider,'provider');

            const signer = provider.getSigner();

            console.log(signer, 'signer')

            // The Contract object
            const ContractObject = new ethers.Contract(BidContractAddress, BidingJson.abi, signer);

            console.log(ContractObject)

            try {

                // const data = await ContractObject.name();

                // console.log(data, 'data');

                let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

                console.log(accounts, 'accounts')


                const data = await ContractObject.uploadasset(accounts[0], price, name, fileUrl);

                console.log(data, 'data');

                console.log('successful')

                

            } catch (error) {

                console.log(error, 'error')
            }

        }

        setname('');
        setFileUrl('');
    }



    return (
        <div>
            {/* <h1>Hi I am Sell Bid</h1> */}

            <h1>Sell Bid</h1>

            <span>Name </span>
            <input onChange={e => setname(e.target.value)} placeholder="Enter A Name of Asset" />
            <br />
            <span>Upload Asset </span>
            <input type="file" name="fileupload" onChange={changeHandler} />
            <br />

            <span>Price </span>
            <input onChange={e => setprice(e.target.value)} placeholder="Enter A Cost" />
            <br />

            <button onClick={handleSell}>Sell</button>


            <br />
            <h3></h3>
            <button><Link to="/"> Back</Link></button>
        </div>

    )
}





export default Sell_Bid