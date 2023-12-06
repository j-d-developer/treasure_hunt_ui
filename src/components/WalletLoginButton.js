import React, { useState } from 'react';
import { ethers } from 'ethers';

const WalletLoginButton = ({ setUserAddress }) => {
    const [userAddress, setUserAddressLocal] = useState('');

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                const signer = provider.getSigner();
                const address = await signer.getAddress();
                setUserAddress(address); // Update address in App.js
                setUserAddressLocal(address); // Update local state
            } catch (error) {
                console.error("Error connecting to MetaMask", error);
                setUserAddress('');
                setUserAddressLocal('');
            }
        } else {
            console.error("MetaMask is not installed");
            setUserAddress('');
            setUserAddressLocal('');
        }
    };

    const displayAddress = () => {
        return `${userAddress.substring(0, 6)}...${userAddress.substring(userAddress.length - 4)}`;
    };

    return (
        <div>
            {!userAddress ? (
                <button onClick={connectWallet} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                    Connect Wallet
                </button>
            ) : (
                <p className="text-white">
                    Connected: {displayAddress()}
                </p>
            )}
        </div>
    );
};

export default WalletLoginButton;
