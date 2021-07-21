import React from 'react';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';

function AreaChart({ labels, dataSet, title, toggleNotification }) {
  return (
    <div>
      <h5 className="chart-title"> { title }</h5>
      { toggleNotification ? (
        <h6
          className={'toggle'}
          style={
            ({ color: 'grey' },
            { textAlign: 'center' },
            { fontSize: '0.75rem' },
            { fontStyle: 'oblique' },
            { letterSpacing: '1px' })
          }
        >
          Tip: toggle legend buttons to isolate data
        </h6>
      ) : null }
      <Line
        height={300}
        width={500}
        options={
          ({
            responsive: true,
          },
          {
            elements: {
              point: {
                radius: 3,
              },
            },
          },
          {
            decimation: {
              enabled: true,
              algorithm: 'lttb',
            },
          },
          {
            scales: {
              yAxes: [
                {
                  ticks: {
                    suggestedMax: 20,
                  },
                },
              ],
            },
          })
        }
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
  toggleNotification: PropTypes.bool,
};

export default AreaChart;
