import React from 'react';
import { faShieldVirus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = () => {
  return (
    <header>
      <div className={'header-container'}>
        <FontAwesomeIcon icon={faShieldVirus} className="fas fa-shield-virus fa-fw"></FontAwesomeIcon>

        <h1>Real-time COVID-19 Worldwide Dashboard</h1>
      </div>
    </header>
  );
};

export default Header;
