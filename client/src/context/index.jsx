import React, { useState, useContext, createContext } from 'react';

import { useAddress, useContract,useDisconnect, useWalletConnect, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

const StateContext = createContext();
export const StateContextProvider = ({ children }) => {
    const { contract } = useContract('0x1A21a807Bb7b3895dfa0706de8e6BD18144C5F74');

    const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');

    const address = useAddress();
    const connect = useMetamask();
    const multiWalletConnect = useWalletConnect();
    const disconnect = useDisconnect();

    const [theme, setTheme] = useState(false);
    const publishCampaign = async (form) => {
        try {
            const data = await createCampaign({args:[
                address,
                form.title,
                form.description,
                form.target,
                new Date(form.deadline).getTime(),
                form.image
            ]});
            console.log('contract call was successful', data);
        } catch (error) {
            console.log('error: ' + error.message);
        }
    }
    const getCampaigns = async ()=> {
        const campaigns = await contract.call('getCampaigns');
        const parsedCampaigns = campaigns.map((campaign,index) =>({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.utils.formatEther(campaign.target.toString()),
            deadline: campaign.deadline.toNumber(),
            amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
            image: campaign.image,
            pId: index
        }));
        return (parsedCampaigns);
    }

    const getUserCampaigns = async () => {
        const allcampaigns =await getCampaigns();
        const userCampaigns = allcampaigns.filter((campaign) => campaign.owner === address);
        return userCampaigns;
    }

    const donate = async (pId, amount) => {
        const data = await contract.call('donateToCampaign', [pId],{value: ethers.utils.parseEther(amount)});
        return data;
    }

    const getDonations = async (pId) => {
        const donations = await contract.call('getDonators', [pId]);
        const numberOfDonations = donations[0].length;

        const parsedDonations = [];

        for (let i = 0; i < numberOfDonations; i++) {
            parsedDonations.push({
                donator:donations[0][i],
                donation: ethers.utils.formatEther(donations[1][i].toString()),
            })
        }
        return parsedDonations;
    }
    return (
        <StateContext.Provider
            value={
                {
                    address,
                    contract,
                    theme,
                    setTheme,
                    connect,
                    multiWalletConnect,
                    disconnect,
                    createCampaign: publishCampaign,
                    getCampaigns,
                    getUserCampaigns,
                    donate,
                    getDonations
                }
            }
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);