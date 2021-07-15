import React from 'react';
import { commafy } from 'lib/util';
import { useCoronavirusTracker } from 'hooks';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { Row, Col } from 'react-bootstrap';

function Dashboard() {
  const { data: stats = {} } = useCoronavirusTracker({
    api: 'all',
  });

  // const element = <FontAwesomeIcon icon={faCoffee} />;

  return (
    <>
      <div className="tracker-stats">
        <Row>
          <Col className="mt-2 mr-1 mb-3 ml-0 tracker-stat col-styling" md={3}>
            <p className="tracker-stat-primary">
              <strong>Total Tests</strong>
              { stats ? commafy( stats?.tests ) : '-' }
            </p>
            <p className="tracker-stat-secondary">
              { stats ? commafy( stats?.testsPerOneMillion ) : '-' }
              <span>Per 1 Million</span>
            </p>
          </Col>
          <Col className="mt-2 mr-1 mb-3 ml-0 tracker-stat col-styling" md={3}>
            <p className="tracker-stat-primary">
              <strong>Total Tests</strong>
              { stats ? commafy( stats?.tests ) : '-' }
            </p>
            <p className="tracker-stat-secondary">
              { stats ? commafy( stats?.testsPerOneMillion ) : '-' }
              <span>Per 1 Million</span>
            </p>
          </Col>

          <Col className=" mt-2 mr-1 mb-3 ml-0 tracker-stat col-styling ">
            <p className="tracker-stat-primary">
              { stats ? commafy( stats?.cases ) : '-' }
              <strong>Total Cases</strong>
            </p>
            <p className="tracker-stat-secondary">
              { stats ? commafy( stats?.casesPerOneMillion ) : '-' }
              <span>Per 1 Million</span>
            </p>
          </Col>

          <Col className=" mt-2 mr-0 mb-3 ml-0 tracker-stat col-styling" md={3}>
            <p className="tracker-stat-primary">
              { stats ? commafy( stats?.deaths ) : '-' }
              <strong>Total Deaths</strong>
            </p>
            <p className="tracker-stat-secondary">
              { stats ? commafy( stats?.deathsPerOneMillion ) : '-' }
              <span>Per 1 Million</span>
            </p>
          </Col>
        </Row>

        { /* <Collapsible trigger={element}> */ }

        { /* <Row>
          <Col className='tracker-stat'>
            <p className='tracker-stat-primary'>
              {stats ? commafy(stats?.active) : '-'}
              <strong>Active</strong>
            </p>
          </Col>

          <Col className='tracker-stat'>
            <p className='tracker-stat-primary'>
              {stats ? commafy(stats?.critical) : '-'}
              <strong>Critical</strong>
            </p>
          </Col>
          <Col className='tracker-stat'>
            <p className='tracker-stat-primary'>
              {stats ? commafy(stats?.recovered) : '-'}
              <strong>Recovered</strong>
            </p>
          </Col>
        </Row> */ }

        { /* </Collapsible> */ }
      </div>
    </>
  );
}

export default Dashboard;
