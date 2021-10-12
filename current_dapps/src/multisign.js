import React from "react";
import { useState } from "react";
import { ethers, Signer, utils } from "ethers";


import MultisignJson from '../src/artifacts/contracts/MultiSignature.sol/MultipleSignatureWallet.json';

// contract address

// let MultisignAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

let MultisignAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

// 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512

function Multisign() {


    let [EtherAmount, setEtherAmount] = useState();

    let [sendAddress, setSendAddress] = useState();

    let [tx_id, set_tx_id] = useState()

    let checkBalanceAddress = async () => {
        console.log('check balance address');

        if (window.ethereum) {

            const provider = new ethers.providers.Web3Provider(window.ethereum);

            const MultisignObject = new ethers.Contract(MultisignAddress, MultisignJson.abi, provider)

            console.log(MultisignObject)

            try {

                const data = await MultisignObject.getEachAddressBalance()

                console.log(data, 'data');

                let ethbalance = ethers.utils.formatEther(data._hex);

                console.log(ethbalance, 'ethbalance')

            } catch (error) {

                console.log(error, 'error')
            }
        }
    }

    let walletBalance = async () => {

        console.log('wallet balance')

        if (window.ethereum) {

            let provider = new ethers.providers.Web3Provider(window.ethereum);


            const MultisignObject = new ethers.Contract(MultisignAddress, MultisignJson.abi, provider)

            console.log(MultisignObject)

            try {
                let balance = await MultisignObject.walletBalance();

                console.log(balance, 'balance');

                let ethbalance = ethers.utils.formatEther(balance._hex);

                console.log(ethbalance, 'ethbalance')


            } catch (e) {
                console.log(e)
            }
        }
    }

    let depositFund = async () => {

        console.log('deposit funds')

        if (window.ethereum) {

            const provider = new ethers.providers.Web3Provider(window.ethereum);

            let signer = provider.getSigner();

            // Send 1 ether to an ens name.

            // const tx = signer.sendTransaction({
            //     to: MultisignAddress,
            //     value: ethers.utils.parseEther("1.0")
            // });

            // (await tx).wait()

            // console.log(tx,'tx')

            // let data = await tx.wait()

            // console.log(data,'data')

            let overrides = {
                // To convert Ether to Wei:
                value: ethers.utils.parseEther(EtherAmount)     // ether in this case MUST be a string
            };

            let MultisignObject = new ethers.Contract(MultisignAddress, MultisignJson.abi, signer);

            try {
                let depositAmount = await MultisignObject.depositEther(overrides)

                console.log(depositAmount, 'depositAmount')

                console.log('event listing');


                MultisignObject.on('DepositFunds',(_senderAddress,value)=>{
                    console.log('event listiend');

                    console.log(_senderAddress,'address');

                    console.log(ethers.utils.formatEther(value),'amount')
                })


            } catch (error) {
                console.log(error, 'error')
            }

        }

    }

    let WithDraw = async () => {
        console.log(sendAddress, EtherAmount, 'etheramount')


        if (window.ethereum) {

            const provider = new ethers.providers.Web3Provider(window.ethereum);

            let signer = provider.getSigner();

            let MultisignObject = new ethers.Contract(MultisignAddress, MultisignJson.abi, signer);

            try {

                ethers.utils.getAddress(sendAddress)

                console.log(ethers.utils.parseEther(EtherAmount), 'ether')

                let eth = ethers.utils.parseEther(EtherAmount);

                console.log(eth)

                // setEtherAmount(ethers.utils.parseEther(EtherAmount)) 
                // ethers.utils.get

                let depositAmount = await MultisignObject.withDraw(sendAddress, eth)

                console.log(depositAmount, 'depositAmount');


                // MultisignObject.on('')


            } catch (error) {
                console.log(error, 'error')
            }

        }
    }

    let pendingTranscation = async () => {

        console.log('deposit funds')

        if (window.ethereum) {

            const provider = new ethers.providers.Web3Provider(window.ethereum);

            let signer = provider.getSigner();

            // Send 1 ether to an ens name.

            let MultisignObject = new ethers.Contract(MultisignAddress, MultisignJson.abi, signer);

            try {
                let pendingTranscation = await MultisignObject.getPendingTranscationList()

                console.log(pendingTranscation, 'pendingTranscation')

                for (let i = 0; i < pendingTranscation.length; i++) {


                    //    console.log(pendingTranscation[i].toNumber(),'index')

                    let transcation_ID = pendingTranscation[i].toNumber();

                    console.log("transcation_ID", transcation_ID)

                }


            } catch (error) {
                console.log(error, 'error')
            }

        }

    }


    let transcationDetails = async () => {

        console.log('transcationDetails')

        if (window.ethereum) {

            const provider = new ethers.providers.Web3Provider(window.ethereum);

            let signer = provider.getSigner();

            let MultisignObject = new ethers.Contract(MultisignAddress, MultisignJson.abi, signer);

            try {
                let transcationDetails = await MultisignObject.transcationDetails(tx_id)

                console.log(transcationDetails, 'transcationDetails');


                let requested = transcationDetails.from;
                let to = transcationDetails.to;
                let excuted = transcationDetails.executed;
                let signedSignatures = transcationDetails.signedSignatured;
                let valueAmount = ethers.utils.formatEther(transcationDetails.value);
                let numConfirmations = (transcationDetails.numConfirmations).toNumber();

                console.log("requested", requested);
                console.log("to", to);
                console.log('excuted', excuted);
                console.log("signedsign", signedSignatures);
                console.log("valueAmount", valueAmount);
                console.log("no of confirmations", numConfirmations)
                // console.log(excuted,"excuted")


            } catch (error) {

                console.log(error, 'error')

            }

        }

    }

    let signedTranscation = async () => {

        console.log('deposit funds')

        if (window.ethereum) {

            const provider = new ethers.providers.Web3Provider(window.ethereum);

            let signer = provider.getSigner();

            let MultisignObject = new ethers.Contract(MultisignAddress, MultisignJson.abi, signer);

            try {
                let signedTranscation = await MultisignObject.signedTransaction(tx_id)

                console.log(signedTranscation, 'signedTranscation')


            } catch (error) {
                console.log(error, 'error')
            }

        }

    }

    return (
        <div>
            <div>
                <button onClick={checkBalanceAddress}> Check Balance Specific Address</button>
            </div>

            <div>
                <button onClick={walletBalance}>Wallet Balance</button>
            </div>

            <div>
                <input onChange={e => setEtherAmount(e.target.value)} placeholder="Send Ether" />
                <button onClick={depositFund}>Deposit Amount</button>
            </div>


            <div>
                <input onChange={e => setEtherAmount(e.target.value)} placeholder="AMOUNT ENTER" />
                <input onChange={e => setSendAddress(e.target.value)} placeholder="With Draw Address" />

                <button onClick={WithDraw}>With Draw</button>
            </div>


            <div>
                <button onClick={pendingTranscation}>Pending Transcation</button>
            </div>

            <div>
                <input onChange={e => set_tx_id(e.target.value)} placeholder="TX_ID" />
                <button onClick={transcationDetails}>Transcation Details</button>
            </div>

            <div>
              <input onChange={e => set_tx_id(e.target.value)} placeholder="TX_ID" />
              <button onClick={signedTranscation}>Signed Transcation</button>
            </div>



        </div>
    )
}

export default Multisign;
