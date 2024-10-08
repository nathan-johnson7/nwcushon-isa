//takes back to App state but would go to Cushon home in practice
//would also be same design as existing header on website
import React from 'react';
import homeIcon from '../images/Home.png'; 

const MenuBar = ({ setCurrentPage }) => {
    return (
        <div className="menu-bar">
            <button className="home-button" onClick={() => setCurrentPage('home')}>
                Home <img src={homeIcon} alt="Home Icon" className="home-icon" /> 
            </button>
        </div>
    );
};

export default MenuBar;



