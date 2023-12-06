import React from 'react';

const Button = ({ children, colorClass, onClick }) => {
    return (
        <button 
            onClick={onClick}
            className={`${colorClass} text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out hover:shadow-lg`}>
            {children}
        </button>
    );
};

export default Button;
