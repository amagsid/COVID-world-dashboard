import React from 'react';

const Header = () => {
  return (
    <header>
      { /* <Container>
        <Row>
          <Col> */ }
      <div className={'header-container'}>
        <i className="fas fa-shield-virus fa-fw"></i>
        { /* </Col>
          <Col> */ }
        <h1>COVID-19 Worldwide Dashboard</h1>
      </div>
      { /* </Col>
        </Row> */ }
      { /* </Container> */ }

      { /* <ul>
          <li>
            <a href=''>
              <FaGithub /> Github
            </a>
          </li>
        </ul> */ }
    </header>
  );
};

export default Header;
