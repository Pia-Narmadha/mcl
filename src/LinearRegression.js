import React, { Component } from 'react';
import './LinearRegression.css';
import Chart from './ChartComponent.js';
import FileHandler from './FileHandler.js';
import ColumnName from './ColumnName.js'
import {convertArrayIntoObject, makeChartDataFromTwoArray, stateUpdateLooper} from './HelperFunctions.js';
import FileDownload from './FileDownload.js'

class LinearRegression extends Component {
  constructor(props){
    super(props);
    this.state = {
                    inputFile:{},
                    testFile:{},
                    columnNames:[],
                    inputData:[],
                    inputChartData:[],
                    outputChartData:[],
                    chartInfo:{ xIndex:0,yIndex:0},
                    regressionType:1,
                    
                    score:0,
                    predictedValues:[],
                    chartColors:[],
                    outputStatus:false,
                    getInputFile:true,
                    displayChart:false,
                    callApi:false,
                };
    this.updateState = this.updateState.bind(this);
  }
  updateState(nameArr,valueArr){
    let newState = this.stateUpdateLooper(this.state,nameArr,valueArr);
    this.setState({...newState});
  }
  stateUpdateLooper(oldState,nameArr,valueArr){
    let state = {};
    for(let i=0;i<nameArr.length;i++)
      {
        let name =nameArr[i];
        let value = valueArr[i];
        switch(name){
        case "inputFile":
          state = {...state,inputFile:Object.assign({},value)}
          break;
        case "testFile":
          state = {...state,testFile:{...value}};
          break;
        case "columnNames":
          state = {...state,columnNames:[...value]};
          break;
        case "inputData":
          let yindex = value[0].length - 1;
          let tempChartDatas = convertArrayIntoObject(value,0,yindex)
          console.log(value)
          state = {...state,inputData:[...value],chartInfo:{xIndex:0,yIndex:yindex},inputChartData:tempChartDatas,callApi:true};
          break;
        case "chartInfo":
          let tempChartData = convertArrayIntoObject(oldState.inputData,value,oldState.chartInfo.yIndex)
          if(oldState.outputStatus)
          {
            let tempOutputChartData = makeChartDataFromTwoArray(oldState.inputData,value,oldState.predictedValues)
            state = {...state,inputChartData:tempChartData,chartInfo:{xIndex:value,yIndex:oldState.chartInfo.yIndex},outputChartData:[...tempOutputChartData]};
          }
          else
          {
            state = {...state,inputChartData:tempChartData,chartInfo:{xIndex:value,yIndex:oldState.chartInfo.yIndex}};
          }
          break;
        case "inputChartData":
          state = {...state,inputChartData:[...value]};
          break;
        case "regressionType":
          state = {...state,regressionType:value};
          break;
        case "score":
          state = {...state,score:value};
          break;
        case "predictedValues":
          //let tempInputChartData = convertArrayIntoObject(oldState.inputData,oldState.chartInfo.xIndex,oldState.chartInfo.yIndex)
          let tempOutputChartData = makeChartDataFromTwoArray(oldState.inputData,oldState.chartInfo.xIndex,value)
          state = {...state,predictedValues:[...value],outputChartData:[...tempOutputChartData]};
          break;
        case "chartColors":
          state = {...state,chartColors:[...value]};
          break;
        case "displayChart":
          state = {...state,displayChart:value};
          break;
        case "getInputFile":
          state = {...state,getInputFile:value};
          break;
        case "callApi":
          state = {...state,callApi:value};
          break;
        case "outputStatus":
          state = {...state,outputStatus:value};
          break;
        default:
          console.log("deafult case executed")
          break;
      }
    }
    return state;
  }
  render() {
    let arr = [];
    if(this.state.getInputFile){
      arr.push(<FileHandler key="File input" updateState={this.updateState}/>);
    }
    if(this.state.displayChart){
      let tempChartData = []
      let label =[]
      if(this.state.outputStatus){
        label = ["Input","Predicted"]
        tempChartData = [this.state.inputChartData,this.state.outputChartData]
      }
      else
      {
        label = ["Input"];
        tempChartData = [[this.state.inputChartData]]
      }
      arr.push(<Chart key="chart" label={label} updateState={this.updateState} chartData={tempChartData} />);
      arr.push(<ColumnName key= "column chooser"namearr={this.state.columnNames} updateState={this.updateState} />)
    }
    if(this.state.outputStatus){
      //arr.push(<ExecuteAlgorithm key="ExecuteAlgorithm" name = "Regression" apiEndPoint="/linearregression" file ={this.state.inputFile} />);
      arr.push(<FileDownload key="fileDownload" dataForCSV={this.state.predictedValues}/>)
    }
    return (
      <div className="LinearRegression">
        <header> <h1> Linear / Polynomial Regression </h1> </header>
          {arr}
      </div>
    );
  }
}


export default LinearRegression;
