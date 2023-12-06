import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './views/HomePage';
import StagePage from './views/StagePage';
import ArtistsPage from './views/ArtistsPage';
import LeaderboardPage from './views/LeaderboardPage'; // Importing the LeaderboardPage
import StageSelector from './components/StageSelector';
import WalletLoginButton from './components/WalletLoginButton';

const App = () => {
    const totalStages = 8;
    const [currentStage, setCurrentStage] = useState(3); // Example current stage
    const [userAddress, setUserAddress] = useState(''); // State to store user's Ethereum address

    return (
        <Router>
            <div className="bg-cool-gray-lightest min-h-screen">
                <Header setUserAddress={setUserAddress} />
                <Routes>
                    <Route path="/" element={<><HomePage /><StageSelector stages={Array(totalStages).fill(0)} currentStage={currentStage} /></>} />
                    {[...Array(totalStages).keys()].map(stageNum => (
                        <Route 
                            path={`/stage/${stageNum + 1}`} 
                            element={<StagePage 
                                        stageNumber={stageNum + 1}
                                        stageSummary={`Summary for Stage ${stageNum + 1}`}
                                        userAddress={userAddress}
                                     />} 
                            key={stageNum}
                        />
                    ))}
                    <Route path="/artists" element={<ArtistsPage />} />
                    <Route path="/leaderboard" element={<LeaderboardPage />} /> {/* Route for LeaderboardPage */}
                </Routes>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
