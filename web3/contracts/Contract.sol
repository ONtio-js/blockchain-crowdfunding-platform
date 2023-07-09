// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract MyContract {
   struct Campaign {
    address owner;
    string title;
    string description;
    string  image;
    uint256  target;
    uint256 deadline;
    uint256 amountCollected;
    address[] donators;
    uint256[] donations;
   }
   mapping (uint256 => Campaign) public Campaigns;
   uint256 public numberOfCampaigns = 0;

   function createCampaign(address _owner, string memory _title, string memory _description, uint256 _target, uint256 _deadline, string memory _image) public returns (uint256){
        Campaign storage campaign = Campaigns[numberOfCampaigns];
        require(campaign.deadline < block.timestamp, "deadline must be a date in future");
        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.image = _image;
        campaign.deadline = _deadline;
        campaign.target = _target;
        campaign.amountCollected = 0;
        numberOfCampaigns++;

        return numberOfCampaigns - 1;
   }
   function donateToCampaign(uint256 _id) public payable{
        uint256 amount = msg.value;
        Campaign storage campaign = Campaigns[_id];
        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);
        (bool sent,)  = payable(campaign.owner).call{value:amount}("");
        if(sent){
            campaign.amountCollected = campaign.amountCollected + amount;
        }
   }
   function getDonators(uint256 _id) view  public returns (address[] memory, uint256[] memory){
    return(Campaigns[_id].donators, Campaigns[_id].donations);
   }
   function getCampaigns()public view returns(Campaign[] memory){
    Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);
    
    for (uint i = 0; i < numberOfCampaigns; i++){
        Campaign storage item = Campaigns[i];
        allCampaigns[i] = item;
    }
    
    return allCampaigns;
   }
}