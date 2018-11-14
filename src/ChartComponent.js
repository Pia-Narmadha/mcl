import React from 'react';
import {Scatter} from 'react-chartjs-2';

const Chart = function(props) {
  let chartColors = ["rgba(275,192,192,1)","rgba(75,192,192,1)","rgba(75,92,192,1)","rgba(175,92,192,1)",'rgba(75,192,92,1)','rgba(75,192,192,1)','rgba(175,92,92,1)','rgba(75,92,92,1)']
  let commonChartOptions = {
                  
                  fill: true,
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                  pointHoverBorderColor: 'rgba(220,220,220,1)',
                  pointHoverBorderWidth: 2,
                  pointRadius: 3,
                  pointHitRadius: 10,
                  showLines: true,
                };
  
      let datasets = [];
      for(let i = 0;i<props.chartData.length;i++)
      {
        datasets[i] = {
                    ...commonChartOptions,
                    label:props.label[i],
                    backgroundColor:chartColors[i%chartColors.length],
                    pointBorderColor:chartColors[i%chartColors.length],
                    pointBackgroundColor:chartColors[i%chartColors.length],
                    data: props.chartData[i]
                  }
      }
      let data = {
        labels: ['Scatter'],
        datasets:datasets,
      };
		return (
      <div>
              <Scatter data={data} showLines={true}/>
      </div>
		);
}

/*class Charts extends Component {
  constructor(props){
    super(props)
    this.state = {
      data : {
              labels: ['Scatter'],
              datasets: [
                {
                  label: 'My First dataset',
                  fill: false,
                  backgroundColor: 'rgba(75,192,192,0.4)',
                  pointBorderColor: 'rgba(75,192,192,1)',
                  pointBackgroundColor: '#fff',
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                  pointHoverBorderColor: 'rgba(220,220,220,1)',
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                  showLines: true,
                  data: props.data
                }
              ]
            }
      } 
  }
 
	render() {	
		return (
		<div>
            <Scatter data={this.state.data} showLines={true} options={{
        maintainAspectRatio: false,showLines: true,
    }}/>
		</div>
		);
	}
}
*/

export default Chart;