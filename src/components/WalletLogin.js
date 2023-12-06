import React from 'react';
import Button from './Button';

const WalletLogin = () => {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="text-center">
                <Button colorClass="bg-green-700 hover:bg-green-800">Login with Wallet</Button>
                <p className="mt-4 text-gray-300">Connect your wallet to participate in the treasure hunt.</p>
            </div>
        </div>
    );
};

export default WalletLogin;
