import React from 'react';
import { commafy } from 'lib/util';
import { useCoronavirusTracker } from 'hooks';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

function Dashboard({ date }) {
  const { data: stats = {} } = useCoronavirusTracker({
    api: 'all',
  });

  // console.log(date);

  return (
    <>
      <div className="tracker-stats">
        <Row>
          <Col className="mt-2 mr-0 mb-3 ml-0 tracker-stat col-styling " md={3}>
            <p className="tracker-stat-primary">
              <h6 className={'tracker-title last-updated'}>Last Updated at M/D/YYYY</h6>
              { date }
            </p>
          </Col>
          <Col className="m-1 mb-3 mt-2 mr-0 tracker-stat col-styling" md={3}>
            <p className="tracker-stat-primary">
              <h6 className={'tracker-title'}> Tests Taken</h6>
              { stats ? commafy( stats?.tests ) : '-' }
            </p>
            <p className="tracker-stat-secondary">
              { stats ? commafy( stats?.testsPerOneMillion ) : '-' }
              <span className={'per-1-mil'}>Per 1 Million</span>
            </p>
          </Col>

          <Col className="mb-3 ml-0 mt-2 tracker-stat col-styling ">
            <p className="tracker-stat-primary">
              <h6 className={'tracker-title'}>Cases</h6>
              { stats ? commafy( stats?.cases ) : '-' }
            </p>
            <p className="tracker-stat-secondary">
              { stats ? commafy( stats?.casesPerOneMillion ) : '-' }
              <span className={'per-1-mil'}>Per 1 Million</span>
            </p>
          </Col>

          <Col className="m-1 mt-2 mb-3 ml-0  tracker-stat col-styling" md={3}>
            <p className="tracker-stat-primary">
              <h6 className={'tracker-title'}>Deaths</h6>
              { stats ? commafy( stats?.deaths ) : '-' }
            </p>
            <p className="tracker-stat-secondary">
              { stats ? commafy( stats?.deathsPerOneMillion ) : '-' }
              <span className={'per-1-mil'}>Per 1 Million</span>
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

Dashboard.propTypes = {
  date: PropTypes.string,
};

export default Dashboard;
