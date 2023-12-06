import React from 'react';
import { Link } from 'react-router-dom';
import WalletLoginButton from './WalletLoginButton';

const Header = ({ setUserAddress }) => {
    return (
        <header className="bg-emerald-800 text-white py-4 shadow-md">
            <div className="container mx-auto px-4 md:px-12 flex justify-between items-center">
                <div className="flex items-center">
                    <h1 className="text-2xl font-bold mr-6"><Link to="/">Online Treasure Hunt</Link></h1>
                    <nav>
                        <ul className="flex">
                            <li className="mr-4"><Link to="/overview">Overview</Link></li>
                            <li className="mr-4"><Link to="/rules">Rules</Link></li>
                            <li className="mr-4"><Link to="/artists">Artists</Link></li>
                            <li className="mr-4"><Link to="/leaderboard">Leaderboard</Link></li>
                            <li className="mr-4"><Link to="/faq">FAQ</Link></li>
                            <li className="mr-4"><Link to="/contact">Contact</Link></li>
                            <li className="mr-4"><Link to="/community">Community</Link></li>
                            <li><Link to="/past-hunts">Past Hunts</Link></li>
                        </ul>
                    </nav>
                </div>
                <WalletLoginButton setUserAddress={setUserAddress} />
            </div>
        </header>
    );
};

export default Header;
