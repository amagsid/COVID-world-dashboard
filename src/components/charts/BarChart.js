import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import axios from 'axios';

function BarChart() {
  const [summaryData, setSummaryData] = useState( null );
  const [loading, setloading] = useState( true );

  async function getData() {
    try {
      const summaryResponse = await axios.get( 'https://api.covid19api.com/summary' );
      setSummaryData( summaryResponse.data.Global );
    } catch ( e ) {
      console.error( `Failed to fetch countries: ${e.message}`, e );
      return;
    }
  }

  useEffect(() => {
    getData();
    setloading( false );
  }, []);

  let summaryKeys;
  let summaryStats;

  if ( summaryData ) {
    summaryKeys = Object.keys( summaryData );
    summaryStats = Object.values( summaryData );
    summaryKeys.pop();
    summaryStats.pop();
  }

  return (
    <div>
      <h5 className="chart-title"> hello?</h5>
      { loading ? <p>loading</p> : <Bar data={{ labels: ['1', '2', '2'], datasets: ['1', '2', '2'] }} /> }
    </div>
  );
}

BarChart.propTypes = {
  labels: PropTypes.array,
  dataSet: PropTypes.array,
  title: PropTypes.string,
};

export default BarChart;
