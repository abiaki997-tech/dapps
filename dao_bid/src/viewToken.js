
import React from "react";
import { BrowserRouter as Router,Routes as Switch, Route, Link } from 'react-router-dom';
import { ethers, Signer, utils } from "ethers";



import BidingJson from '../artifacts/contracts/DAO_Biding.sol/DAO_BIDING.json'

let BidContractAddress = '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9';


const ViewToken = ({data}) =>{

    const [token_Det,setToken_Det]= React.useState([])

   
    console.log(data,'***')


    let tokenID=data;

    let obj=[]

    React.useEffect(()=>{

        const gettokeniddetails = async(tokenID)=>{

            if (window.ethereum) {
    
                const provider = new ethers.providers.Web3Provider(window.ethereum)
    
                console.log(provider,'provider');
    
                const signer = provider.getSigner();
    
                console.log(signer, 'signer')
    
                // The Contract object
                const ContractObject = new ethers.Contract(BidContractAddress, BidingJson.abi, signer);
    
                console.log(ContractObject)
    
                try {
    
                    const data = await ContractObject.viewToken(tokenID);
    
                    console.log(data, 'data',(data.TokendID).toNumber(),'number',ethers.utils.formatEther(data.basecost),'ether');
    
                    console.log('successful')
    
                    // let obj=[{
                    //     TokendID:(data.TokendID).toNumber()
                    // }]

                    obj.push({
                        TokendID:1
                    })

                    // let obj=[(data.TokendID).toNumber()]
                    // console.log(obj,'object')

                    // setToken_Det([1])

                    
                    // console.log(token_Det,'tokendet')


                } catch (error) {
    
                    console.log(error, 'error')
                }
    
            }
    
        }

        gettokeniddetails(tokenID)
    
    },[tokenID])


    return(
    <div>
        <h4> Token Details </h4>

        {obj.length>0 && 
            obj.map((data,index)=>{
                <p>{data.TokendID}</p>
            })
        }

     </div>)
}



export default ViewToken