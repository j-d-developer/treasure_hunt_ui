import React from 'react';
import { useNavigate } from 'react-router-dom';

const StageSelector = ({ stages, currentStage }) => {
    let navigate = useNavigate();

    const navigateToStage = (stageNum) => {
        if (stageNum <= currentStage) {
            navigate(`/stage/${stageNum}`);
        }
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stages.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => navigateToStage(index + 1)}
                        className={`text-lg font-semibold py-8 px-6 rounded-lg shadow-md transition duration-300 
                                    ${index < currentStage ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-gray-400 text-gray-200'}`}
                        disabled={index >= currentStage}
                    >
                        Stage {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default StageSelector;
