import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';

class Statistics extends Component {

    render(){
        /* const data = {
            labels: [
            'Transportation',
            'Public Sector',
            'Financial Services',
            'Food & Staples',
            'Materials',
            'Real estate',
            'Consumer Services',
            'Health Care',
            'Professional Services',
            'Software Services'
        ],
        datasets: [{
            data: [2.5, 3.4,3.4,4.5,6.8,10.2,12.5,13.6,18.2,20.5],
            backgroundColor:[
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#8f6347',
            '#3c3c47',
            '#ee82ee',
            '#3c9247',
            '#3c35e1',
            '#c76002',
            '#eaa161'
            ]
        }]
        } */
        const option = {
            tooltips: {
              callbacks: {
                label: function(tooltipItem, data ) {
                  var dataset = data.datasets[tooltipItem.datasetIndex];
                  var currentValue = dataset.data[tooltipItem.index];
                  return currentValue + '%';
                },
                title: function(tooltipItem, data) {
                  return data.labels[tooltipItem[0].index];
                }
              }
            }
          }
          
        return(
            <div>
                <Doughnut  data={this.props.data}
                            width={100}
                            height={60}
                            options={option}/>
            </div>
        )
    }

}

export default Statistics; 