import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import AreaChart from '../components/charts/AreaChart';
// import BarChart from '../components/charts/BarChart';
import axios from 'axios';

function ChartsWrapper() {
  const [data, setData] = useState({});
  // const [summaryData, setSummaryData] = useState({});

  async function getData() {
    try {
      const response = await axios.get( 'https://disease.sh/v3/covid-19/historical/all?lastdays=30' );

      // setSummaryData(summaryResponse.data.Global);
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

  let labels;
  let casesStats;
  let deathsStats;
  let recoveredStats;

  if ( cases ) {
    labels = Object.keys( cases );
    casesStats = Object.values( cases );
    recoveredStats = Object.values( recovered );
    deathsStats = Object.values( deaths );
  }

  const casesRecoveredChartTitle = (
    <h6>
      Cases and Recovered Numbers <strong>in the last 30 days</strong>
    </h6>
  );
  const deathsChartTitle = (
    <h6>
      Deaths <strong>in the last 30 days</strong>{ ' ' }
    </h6>
  );

  // const SummaryTitle = <h6>Summary of stats </h6>;

  const casesRecoveredDataSets = [
    {
      label: 'recovered',
      data: recoveredStats,
      backgroundColor: ['rgba(225, 225, 225, 0.4)'],
      borderColor: ['white'],
      borderWidth: 1,
      fill: true,
    },

    {
      label: 'cases',
      data: casesStats,
      backgroundColor: ['rgba(0, 0, 46, 0.3)'],
      borderColor: [' rgba(32, 70, 197)'],
      borderWidth: 1,
      fill: true,
      opacity: 0,
    },
  ];

  const deathsDataSets = [
    {
      label: 'deaths',
      data: deathsStats,
      backgroundColor: ['rgba(170, 0, 46, 0.3)'],
      borderColor: ['rgba(245, 49, 14)'],
      borderWidth: 1,
      fill: true,
      opacity: 0,
    },
  ];

  return (
    <>
      <div className="pt-5">
        <Row className="p-1 pt-4">
          <AreaChart
            title={casesRecoveredChartTitle}
            labels={labels}
            dataSet={casesRecoveredDataSets}
            toggleNotification={true}
          />
        </Row>
      </div>
      <div className="pt-3">
        <Row className="p-1 pt-4">
          <AreaChart title={deathsChartTitle} labels={labels} dataSet={deathsDataSets} />
        </Row>
      </div>
      { /* <Row className='p-1 pt-4'>
        <line />
        <AreaChart2
          response={summaryData}
          // title={SummaryTitle}
          // labels={labels}
          // dataSet={deathsDataSets}
        />
      </Row> */ }
    </>
  );
}

export default ChartsWrapper;
