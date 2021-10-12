import React, { useState } from 'react';
import { ethers, Signer, utils } from "ethers";


import { client } from './ipfsconfig';

import FileUploadHashJSON from './artifacts/contracts/FileUploadHash.sol/FilesHash.json'

function Fileupload() {

    // contractaddress
    let FileuploadAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

    const [fileUrl, setFileUrl] = useState()

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

    const sendHashToEthereum = async () => {

        if(fileUrl){
            if (window.ethereum) {

                const provider = new ethers.providers.Web3Provider(window.ethereum);
    
                const signer = provider.getSigner();
    
                console.log(signer, 'signer***')
    
                let fileuploadObject = new ethers.Contract(FileuploadAddress, FileUploadHashJSON.abi, signer);
    
                try {
                    let sendHashUploaded = await fileuploadObject.sendHash(fileUrl);
    
                    console.log(sendHashUploaded, 'sendHashUploaded');
    
                } catch (error) {
    
                    console.log(error, 'error')
                }
            }
        }else{
            console.log('file not uploaded')
        }


    }


    const getHashEthereum = async()=>{
        
        if (window.ethereum) {

            const provider = new ethers.providers.Web3Provider(window.ethereum);


            let fileuploadObject = new ethers.Contract(FileuploadAddress, FileUploadHashJSON.abi, provider);

            try {
                let getHash = await fileuploadObject.getHash();

                console.log(getHash, 'getHash');

            } catch (error) {

                console.log(error, 'error')
            }
        }
    }


    return (
        <div>
            <h1>File upload component</h1>

            <input type="file" name="fileupload" onChange={changeHandler} />

            <button onClick={sendHashToEthereum}>SendHash</button>
            <button onClick={getHashEthereum}> Get Hash</button>


        </div>
    )
}

export default Fileupload;