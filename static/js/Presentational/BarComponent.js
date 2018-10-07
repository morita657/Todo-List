import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';

const BarComponent = (props)=><Bar data={props.chartData} options={props.chartOptions}  width={300} height={50} style={{width:'100%'}}/>;
export default BarComponent;