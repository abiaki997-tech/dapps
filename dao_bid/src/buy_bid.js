
import React from "react";
import { BrowserRouter as Router, Routes as Switch, Route, Link } from 'react-router-dom';
import { ethers, Signer, utils } from "ethers";



import BidingJson from '../artifacts/contracts/DAO_Biding.sol/DAO_BIDING.json'
import ViewToken from "./viewToken";

let BidContractAddress = '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9';


const Buy_Bid = () => {

    // let listtoken=[];

    const [listtoken, setlisttoken] = React.useState([]);

    const [viewlist,setviewlist] =  React.useState([]);

    React.useEffect(async () => {

        console.log('load token list')

        if (window.ethereum) {

            const provider = new ethers.providers.Web3Provider(window.ethereum)

            console.log(provider, 'provider');


            // The Contract object
            const ContractObject = new ethers.Contract(BidContractAddress, BidingJson.abi, provider);

            console.log(ContractObject)

            try {

                const data = await ContractObject.listoftokens();

                console.log(data, 'data');

                for (let i = 0; i < data.length; i++) {

                    let tokenID = data[i].toNumber();

                    console.log("tokenID", tokenID);

                    setlisttoken(currentArray => [...currentArray, tokenID])

                }


                console.log(listtoken, 'list')



            } catch (error) {

                console.log(error, 'error')
            }

        }
    }, []);

    let lol=[];


    function d(){
        return new Promise((resolve, reject) => {
            (async()=>{
                if (window.ethereum) {
    
                    const provider = new ethers.providers.Web3Provider(window.ethereum)
        
                    console.log(provider, 'provider');
        
                    const signer = provider.getSigner();
        
                    console.log(signer, 'signer')
        
                    // The Contract object
                    const ContractObject = new ethers.Contract(BidContractAddress, BidingJson.abi, signer);
        
                    console.log(ContractObject)
        
                    try {
        
                        for(let i=0;i<listtoken.length;i++){
        
                            const data = await ContractObject.viewToken(listtoken[i]);
        
                            console.log(data, 'data', (data.TokendID).toNumber(), 'number', ethers.utils.formatEther(data.basecost), 'ether');
            
                            console.log('successful')
    
    
                            lol.push([{
                                name:"a"
                            }])
    
                            console.log(lol,'lol')
                            
    
                          
                        }
    
                        resolve()
    
                    } catch (error) {
        
                        console.log(error, 'error')
                    }
        
                }
            })()
        })
    }
    const ViewTokenDetails = async() => {

       await d()

       console.log(lol,'*******a')

       (()=>{
        setviewlist(e=>[...e,lol]) 
       })()

    //    console.log(viewlist)

        
    }

    


           

    return (
        <div>
            <h3> Buy Bid</h3>

            {/*  
      {
        listtoken.length>0 && listtoken.map((data,index)=>{

            return(
                <div>
                  <span key={index}>Token {data} 

                  <ViewToken data={data}/>

                  </span>
                </div>
            )
        })}

    */}

            {listtoken.length > 0 && ViewTokenDetails()}

            <br />
            <button><Link to="/"> Back</Link></button>
        </div>)
}



export default Buy_Bid