import React from 'react';
import { useCoronavirusTracker } from 'hooks';
import { Container, Row } from 'react-bootstrap';

function CasesDeathsByCountry() {
  const { data: countries = [], loading } = useCoronavirusTracker({
    api: 'countries',
  });

  const hasCountries = Array.isArray( countries ) && countries.length > 0;

  let countriesByDeathRate;
  if ( hasCountries ) {
    countriesByDeathRate = countries.sort(( a, b ) => ( a.deaths < b.deaths ? 1 : -1 ));
  }

  return (
    <Container className="scroll">
      <h6>
        <span>cases </span> and <span>deaths </span> by
        <span> country/region </span>
      </h6>

      { hasCountries &&
        !loading &&
        countriesByDeathRate.map(( e ) => {
          return (
            <Container key={e.countryInfo._id}>
              <Row> { e.country } </Row>
            </Container>
          );
        }) }
    </Container>
  );
}

export default CasesDeathsByCountry;
