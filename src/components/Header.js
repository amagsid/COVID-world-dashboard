import React from 'react';
import { FaGithub } from 'react-icons/fa';

import Container from 'components/Container';

const Header = () => {
  return (
    <header>
      <Container type="content">
        <h1>COVID-19 Worldwide Dashboard</h1>
        <ul>
          <li>
            <a href="">
              <FaGithub /> Github
            </a>
          </li>
        </ul>
      </Container>
    </header>
  );
};

export default Header;
