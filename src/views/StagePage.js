import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const StagePage = ({ stageNumber, userAddress }) => {
    const [hasAccess, setHasAccess] = useState(false);
    const [answer, setAnswer] = useState('');

    // Sample puzzle descriptions for demonstration
    const puzzleDescriptions = {
        1: "Solve the ancient riddle of the Sphinx to proceed. 'What walks on four feet in the morning, two in the afternoon, and three at night?'",
        2: "Decrypt the following code to find your next clue: 'V2VsY29tZSB0byB0aGUgc2Vjb25kIHN0YWdlIS'",
        3: "Uncover the hidden message in this sequence of numbers: '14, 1, 20, 21, 18, 5, 8, 21, 14, 20'",
        // Add more descriptions as needed
    };

    useEffect(() => {
        const checkNFTOwnership = async () => {
            if (!userAddress) {
                console.log("No user address found.");
                return;
            }

            console.log("Checking NFT ownership for address:", userAddress);

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(
                "0x4f89Cd0CAE1e54D98db6a80150a824a533502EEa",
                ["function balanceOf(address owner) view returns (uint256)"],
                provider
            );

            try {
                const balance = await contract.balanceOf(userAddress);
                console.log(`NFT Balance for ${userAddress}:`, balance.toString());
                setHasAccess(balance.gt(0));
            } catch (error) {
                console.error("Error checking NFT balance for address:", userAddress, error);
                if (error.data) {
                    console.error("Error data:", error.data);
                }
            }
        };

        checkNFTOwnership();
    }, [userAddress]);

    const handleAnswerChange = (event) => {
        setAnswer(event.target.value);
    };

    const submitAnswer = () => {
        console.log(`Answer submitted for stage ${stageNumber}:`, answer);
        // Add logic here to handle the answer submission
    };

    if (!hasAccess) {
        return <p>You do not have access to this stage. Please ensure you hold the required NFT.</p>;
    }

    return (
        <div className="flex justify-center items-center h-screen bg-cool-gray-lightest">
            <div className="w-3/4 lg:w-1/2 bg-white p-8 rounded-lg shadow-lg text-center">
                <h2 className="text-3xl font-bold mb-6">Stage {stageNumber}</h2>
                <p className="text-lg mb-6">{puzzleDescriptions[stageNumber] || "Puzzle description not available."}</p>
                <div className="flex flex-col items-center">
                    <input
                        type="text"
                        value={answer}
                        onChange={handleAnswerChange}
                        className="w-full border-2 border-emerald-600 bg-white h-10 px-5 rounded-lg text-sm focus:outline-none mb-4"
                        placeholder="Enter your answer"
                    />
                    <button 
                        onClick={submitAnswer} 
                        className="w-1/2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Submit Answer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StagePage;
