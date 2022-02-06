

// SPDX-License-Identifier: MIT OR Apache-2.0
pragma solidity ^ 0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract DAO_BIDING is ERC721URIStorage {

	uint set_biddingTime;
	uint auctionEndTime;

    // pushed Allbids
    uint[] private Allbids;


    // detail of each Token
    struct BidDetails {
        string Name;
        uint TokendID;
        address Seller;
        address Buyer;
        uint basecost;
        uint finalcost;
        bool compelted_bid;  
    }

    // bid  object
    mapping (uint => BidDetails) private _bids;
    

	uint l;

	//  mapping token id with timestamp ex: { 1  : 10 AM}
	mapping(uint => uint) private map_tokenid_timestamp;

	//  tokenid <-> address highest bidder
	//  mapping(uint => address ) private map_tokenid_highestbidder;

	//  tokenid <-> addresss ->value(amount) highest bidder
	mapping(uint => mapping(address => uint)) private map_tokenid_highestbidder;

	//  tokenid <-> true/false auctionEnd
	mapping(uint => bool) private map_tokenid_auctionEnd;

	// tokenid->address,basecost 
	mapping(uint => address) private map_tokenid_selleraddress;

	// tokenid-> basecost  
	mapping(uint => uint) private map_tokenid_basecost;

	constructor(uint _biddingTime) ERC721("DAOBIDING", "BID") {
		set_biddingTime = _biddingTime;
		// l = set_biddingTime + block.timestamp;
	}

	using Counters
	for Counters.Counter;
	Counters.Counter private _tokenIds;

	// * owner of the token *
	// file upload ipfs hash store in a contract . link a token of that particular link 
	// token <-> link
	// set the price of that token

	// json:{
	// name:'DOCUMENT OF HOUSE',
	// basecost:20 usd
	// link:ipfs-link
	// }
	function uploadasset(address seller, uint basecost,string calldata name, string memory uri) external returns(uint) {

		_tokenIds.increment();

		uint256 newID = _tokenIds.current();

		_safeMint(seller, newID);

		_setTokenURI(newID, uri);

		// address used for transfer function
		map_tokenid_selleraddress[newID] = seller;

		// check validation basecost
		map_tokenid_basecost[newID] = basecost;

		map_tokenid_auctionEnd[newID] = false;

	    BidDetails storage t = _bids[newID];
        
        t.Name = name;
        t.TokendID = newID;
        t.Seller=seller;
		t.basecost=basecost;
		t.compelted_bid=false;

		
        Allbids.push(newID);

		return newID;

	}

	// * Buy a nft token *
	// List of tokens will be displayed
	// Biding the token ,higher will be biding ,set of time will be get a token
	// token will be shifted
	// history of biding

	function bidingToken(uint tokenID, uint amount, address buyer) external payable {

		// 
		// require(map_tokenid_auctionEnd[tokenID] == true, "AuctionEnded");

		// get_time
		uint get_time = map_tokenid_timestamp[tokenID];
		uint get_basecost = map_tokenid_basecost[tokenID];
		uint get_latestbid_amount = map_tokenid_highestbidder[tokenID][buyer];

		// compare_time 


		if (get_time <= 0) {
			map_tokenid_timestamp[tokenID] = block.timestamp + set_biddingTime;
		} else {
			if (block.timestamp > get_time) {
				revert("AuctionEnd Time Finish");
			}
		}

		//   
		require(get_basecost < amount, "Less than BaseCost");

		//  
		require(get_latestbid_amount < amount, "Not Bid High Enough");


		map_tokenid_highestbidder[tokenID][buyer] = amount;
	}


	

	function withdraw(uint tokenID, address buyer) public payable {

		// get_time
		uint get_time = map_tokenid_timestamp[tokenID];

		// compare_time 
		require(get_time < block.timestamp, "AuctionEnd Time Not Ended");

		map_tokenid_auctionEnd[tokenID] = true;

		uint get_amount = map_tokenid_highestbidder[tokenID][buyer];

		address get_Seller = map_tokenid_selleraddress[tokenID];


		if(address(get_Seller).balance < get_amount){
			revert("not enough balance");
		}

        uint etherValue = get_amount /(1 ether);

        // error -not working
		payable(get_Seller).transfer(etherValue);

		BidDetails storage t = _bids[tokenID];

        t.Buyer=buyer;

        t.finalcost=get_amount;

		t.compelted_bid=true;

		_transfer(get_Seller, buyer, tokenID);

		// return get_amount;
	}


	function listoftokens() public view returns (uint [] memory){
        
		return Allbids;
	}

    function viewToken(uint tokenID) public view 
	returns(
		string memory Name,
        uint TokendID,
        address Seller,
        address Buyer,
        uint basecost,
        uint finalcost,
        bool compelted_bid
		){

		BidDetails storage t = _bids[tokenID];

		return 	(
		t.Name,t.TokendID,
        t.Seller,
        t.Buyer,t.basecost,t.finalcost,t.compelted_bid
		);

	}
	




}