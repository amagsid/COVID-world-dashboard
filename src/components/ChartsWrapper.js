import React, { useEffect, useState } from 'react';
import { Row, Container } from 'react-bootstrap';
import AreaChart from '../components/charts/AreaChart';
import axios from 'axios';

function ChartsWrapper() {
  const [data, setData] = useState({});

  async function getData() {
    try {
      const response = await axios.get( 'https://disease.sh/v3/covid-19/historical/all?lastdays=30' );
      setData( response.data );
    } catch ( e ) {
      console.log( `Failed to fetch countries: ${e.message}`, e );
      return;
    }
  }
  useEffect(() => {
    getData();
  }, []);

  const { cases, deaths, recovered } = data;
  console.log( cases, deaths, recovered );

  return (
    <Container>
      <Row>
        <AreaChart />
      </Row>
      <Row></Row>
      <Row></Row>
    </Container>
  );
}

export default ChartsWrapper;
