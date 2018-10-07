import React, { Component } from 'react';
import BarComponent from '../Presentational/BarComponent';
import TodoStore from '../stores/TodoStore';
import axios from "axios";

export default class ChartContainer extends Component {
    constructor(props){
        super(props);
        this.state={
            labels:[],
            data:[]
        }
    }

    componentWillMount() {
        axios("http://localhost:5000/").then(res=>{
                const dataSet={};
                TodoStore.getAll().forEach(name=>{
                    if(dataSet.hasOwnProperty(name.user)){
                        dataSet[name.user] += 1;
                    }
                    else{
                        dataSet[name.user] = 1;
                    }
                });
                const labels = [], data=[];
                for(let name in dataSet){
                    labels.push(name);
                    data.push(dataSet[name]);
                }
                this.setState({ labels });
                this.setState({ data });
            });
    }

    makeDataSets(){
        const chartData = {
            labels: this.state.labels,
            datasets: [
                {
                    label: "Users' tasks amounts",
                    fillColor: "rgba(151,187,205,0.5)",
                    strokeColor: "rgba(151,187,205,0.8)",
                    highlightFill: "rgba(151,187,205,0.75)",
                    highlightStroke: "rgba(151,187,205,1)",
                    data: this.state.data
                }
            ]
        };

        const chartOptions = {

            //Boolean - Whether grid lines are shown across the chart
            scaleShowGridLines : true,

            //String - Colour of the grid lines
            scaleGridLineColor : "rgba(0,0,0,.0)",

            //Number - Width of the grid lines
            scaleGridLineWidth : 1,

            //Boolean - Whether to show horizontal lines (except X axis)
            scaleShowHorizontalLines: true,

            //Boolean - Whether to show vertical lines (except Y axis)
            scaleShowVerticalLines: true,

            //Boolean - If there is a stroke on each bar
            barShowStroke : true,

            //Number - Pixel width of the bar stroke
            barStrokeWidth : 1,

            //Number - Spacing between each of the X value sets
            barValueSpacing : 1,

            //Number - Spacing between data sets within X values
            barDatasetSpacing : 1,
            scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero: true,
                    min: 0
                  }    
                }]
              }
        }
        return {chartData, chartOptions};
    }

    render(){
        return(<div style={{display:'flex',width:'70%'}}>
            <BarComponent chartData={this.makeDataSets()['chartData']} chartOptions={this.makeDataSets()['chartOptions']} height={250}/>
        </div>);
    }
}