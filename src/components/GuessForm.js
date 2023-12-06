import React, { useState } from 'react';
import Button from './Button';

const GuessForm = () => {
    const [guess, setGuess] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Guess submitted: ${guess}`);
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="text-center">
                <h3 className="text-2xl text-gray-200 mb-6">Make Your Guess</h3>
                <form onSubmit={handleSubmit} className="inline-block">
                    <input 
                        type="text"
                        className="px-4 py-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={guess} 
                        onChange={(e) => setGuess(e.target.value)} 
                        placeholder="Enter your guess"
                    />
                    <Button colorClass="bg-blue-600 hover:bg-blue-700" onClick={handleSubmit}>Submit Guess</Button>
                </form>
            </div>
        </div>
    );
};

export default GuessForm;
