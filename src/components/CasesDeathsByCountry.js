import React from 'react';
import { useCoronavirusTracker } from 'hooks';
import { Row } from 'react-bootstrap';

function CasesDeathsByCountry() {
  const { data: countries = [], loading } = useCoronavirusTracker({
    api: 'countries',
  });

  const hasCountries = Array.isArray( countries ) && countries.length > 0;

  let countriesByDeathRate;
  if ( hasCountries ) {
    countriesByDeathRate = countries.sort(( a, b ) => ( a.deaths < b.deaths ? 1 : -1 ));
  }

  console.log( countriesByDeathRate );

  return (
    <>
      <div className="scroll cases-deaths">
        <Row>
          { ' ' }
          <h6 className="grey cases-deaths-title">
            <span className="white"> Cases </span> and
            <span className="red"> Deaths </span> by Country/Region/Sovereignty
          </h6>
        </Row>

        { hasCountries &&
          !loading &&
          countriesByDeathRate.map(( e ) => {
            if ( e.country !== 'Diamond Princess' ) {
              return (
                <div className="country-stat-container">
                  <div className="padding-left">
                    <Row key={e.countryInfo._id}>
                      <h5>
                        { e.cases } <span className="grey"> | </span> <span className="red"> { e.deaths } </span>
                      </h5>
                    </Row>
                    <Row>
                      <h5 className={'country'}>
                        <span className={'grey'}> { e.country } </span>
                      </h5>
                    </Row>
                  </div>
                </div>
              );
            }
          }) }
      </div>
    </>
  );
}

export default CasesDeathsByCountry;
