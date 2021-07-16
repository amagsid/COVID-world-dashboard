import React from 'react';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';
// import { Container } from 'react-bootstrap';
// import { Decimation } from 'chart.js';
// import DownsamplePlugin, { downsample } from 'chartjs-plugin-downsample';

function AreaChart({ labels, dataSet, title }) {
  return (
    <div>
      <h5 className="chart-title"> { title }</h5>
      <Line
        height={300}
        width={500}
        options={{
          responsive: true,
        }}
        data={{
          labels: labels,
          datasets: dataSet,
        }}
      />
    </div>
  );
}

AreaChart.propTypes = {
  labels: PropTypes.array,
  dataSet: PropTypes.array,
  title: PropTypes.string,
};

export default AreaChart;
