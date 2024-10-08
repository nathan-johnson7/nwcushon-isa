//tried to create similiar styling to existing website (images,colours,etc.)

//used states for simple interactive website, but in larger instance other methods
//may be more practical for better security/scalability
import React, { useState } from 'react';
import './App.css';
import image from './images/Background.svg';
import MenuBar from './components/MenuBar';
import Login from './states/Login';
import FindOutMore from './states/FindOutMore';
import GetStarted from './states/GetStarted';

//acts as home page
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'getStarted':
        return <GetStarted setCurrentPage={setCurrentPage} />;
      case 'findOutMore':
        return <FindOutMore setCurrentPage={setCurrentPage} />;
      case 'login':
        return <Login setCurrentPage={setCurrentPage} />;
      default:
        return (
          <div className="content">
            <h1>Welcome to Natwest Cushon's New Personal Stocks and Shares ISAs</h1>
            <img src={image} alt="Pension Image" className="pension-image" />
            <div className="button-container">
              <button className="app-button" onClick={() => setCurrentPage('findOutMore')}>
                &#8592; Find Out More
              </button>
              <button className="app-button" onClick={() => setCurrentPage('login')}>
                Get Started Today! &#8594;
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div>
      <header className="header">
        <MenuBar setCurrentPage={setCurrentPage} />
      </header>
      {renderPage()}
    </div>
  );
};

export default App;


//future enhancements:
//more advanced login/signup setup (same as existing website)
//implementation for extra fund types in future - can add type to db and keep track
//when adding money would make use of various payment methods in actual practice
//header/footer same as website