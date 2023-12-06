import React from 'react';
import Button from './Button';

const TokenBurner = () => {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="text-center">
                <Button colorClass="bg-red-600 hover:bg-red-700">Burn Tokens</Button>
                <p className="mt-4 text-gray-300">Burn tokens to make your guesses in the treasure hunt.</p>
            </div>
        </div>
    );
};

export default TokenBurner;
