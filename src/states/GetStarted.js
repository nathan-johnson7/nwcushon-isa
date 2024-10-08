
import React, { useState } from 'react';
import Fund from './Fund'; 
import "./GetStarted.css";

const GetStarted = ({ setCurrentPage }) => {
  const [currentPage, setCurrentPageInternal] = useState('getStarted');

  const handleFund = () => {
    setCurrentPageInternal('fund');
  };

  //though dropdown is useful as prevents page looking cramped as more options are added
  //I used this styling instead as similiar to existing website for Workplace Pension design
  //Could be changed out for selector when more fund/ISA types are implemented

  //disabled button with styling makes it easy to add the functionality in the future
  const renderPage = () => {
    switch (currentPage) {
      case 'fund':
        return <Fund />;
      default:
        return (
          <div className="get-started-container">
            <h2>Which Fund is Best Suited to Your Needs?</h2>
            <div className="isa-options">
              <button className="isa-option-button" onClick={handleFund}>
                Equity Fund <span> &gt; </span>
              </button>
              <button className="isa-option-button" disabled>    
                Bond Fund
              </button>
              <button className="isa-option-button" disabled>
                Index Fund
              </button>
              <button className="isa-option-button" disabled>
                Balanced fund
              </button>
            </div>
          </div>
        );
    }
  };

  return <div>{renderPage()}</div>;
};

export default GetStarted;
