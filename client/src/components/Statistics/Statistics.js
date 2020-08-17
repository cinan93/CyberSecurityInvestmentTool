import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';

class Statistics extends Component {

    render(){
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