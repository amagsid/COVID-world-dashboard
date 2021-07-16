import React from 'react';
import { Line } from 'react-chartjs-2';
// import { Container } from 'react-bootstrap';
// import { Decimation } from 'chart.js';
// import DownsamplePlugin, { downsample } from 'chartjs-plugin-downsample';

function AreaChart({ labels, dataSet, title }) {
  return (
    <div>
      <h5 className='chart-title'> {title}</h5>
      <Line
        height={400}
        width={600}
        options={{
          downsample: {
            enabled: true,
            threshold: 10, // max number of points to display per dataset
          },
        }}
        data={{
          labels: labels,
          datasets: dataSet,
        }}
      />
    </div>
  );
}

export default AreaChart;
