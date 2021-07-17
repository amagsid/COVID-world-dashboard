import React from 'react';

import Container from 'components/Container';

const Footer = () => {
  return (
    <footer>
      <Container>
        <p>
          <span> Created by Ahmad Magdy </span> - data sourced from
          <a href="https://disease.sh" target="_blank" rel="noreferrer">
            https://disease.sh
          </a>
          and
          <a href="https://coronavirus.jhu.edu/" target="_blank" rel="noreferrer">
            John Hopkins University
          </a>
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
