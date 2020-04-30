import React from 'react';

import Content from '../Content/Content';

import { Line, Doughnut } from 'react-chartjs-2';
import stringHash from 'string-hash';

import './Stats.css';

function Stats(props) {

    const reducer = (groupedData, currentItem) => {
      const index = groupedData.findIndex(item => item.tyyppi === currentItem.tyyppi);
      if (index >= 0) {
        groupedData[index].summa = groupedData[index].summa + currentItem.summa;
      } else {
        groupedData.push({tyyppi: currentItem.tyyppi, summa: currentItem.summa});
      }
      return groupedData;
    }

    let groupedData = props.data.reduce(reducer, []);

    let doughnutData = {
      labels: groupedData.map(item => item.tyyppi),
      datasets :  [
        {
        data: groupedData.map(item => item.summa),
        backgroundColor: groupedData.map(item => "hsl(" + (stringHash(item.tyyppi) % 360) + ", 80%, 70%)")
        ,
        hoverBackgroundColor: groupedData.map(item => "hsl(" + (stringHash(item.tyyppi) % 360) + ", 80%, 45%)")
        }
      ]
    }

    let linedata = props.data.map( item => ({x: item.tankkauspaiva, y:item.summa}) );
    let linedata2 = props.data.map( item => ({x: item.tankkauspaiva, y:item.litraa}) );

    let data = {
      datasets: [
        {
          label: "tankkauskulut €",
          data: linedata,
          fill: false,
          backgroundColor: 'rgba(253,11,11,0.88)',
          borderColor: 'rgba(253,11,11,0.45)'
        },
        {
          label: "tankatut litrat",
          data: linedata2,
          fill: false,
          backgroundColor: 'rgba(11, 132, 253, 0.88)',
          borderColor: 'rgba(11, 132, 253, 0.45)'
        }
      ]
    }

    let options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            type: "time",
            time: {
              displayFormats: {
                day: 'D.M.Y',
                month: 'M.Y'
              }
            }
          }
        ]
      }
    }


    return (
      <Content>
        <div className ="stats">
          <h2>Tilastot</h2>
            <h3>Aikajanan tankkaukset</h3>
            <div className="stats__graph">
            <Line data={data} options={options} />
            </div>
            <h3>Tankatut polttoaineet</h3>
            <div className="stats__graph">
            <Doughnut data={doughnutData} />
            </div>
        </div>
      </Content>
    );
  }

export default Stats;