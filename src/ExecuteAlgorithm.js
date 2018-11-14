import React from 'react';
import axios from 'axios';
class ExecuteAlgorithm extends React.Component{
    /*
    props needed:
    ->name: name of the button
    ->apiEndPoint: API end point to be called when button is clicked
    ->updateState: reference to the parents update state method to update the state of the parent

    Output:
     it updates the following the state in parent
    ->predicted values
    ->score
    */
    constructor(props)
    {
        super(props);
        this.state = {
                name:props.name,
                apiEndPoint:props.apiEndPoint,
                file:props.file,
            }
        this.updateState = props.updateState;
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        const data = new FormData();
        data.append('file', this.state.file);
        axios.post(this.state.apiEndPoint,data)
        .then((response)=>{
                console.log("Executed algorithm")
                console.log(response);
                this.updateState(["predictedValues","score"],[response.data.prediction,response.data.score])
            }
        )
        .catch((err)=>{console.log(err)}
        )
    }
    
    render(){
        return(
            <button onClick={this.handleClick}> 
                {
                    this.state.name
                }
            </button>
        )
    }
}
export default ExecuteAlgorithm;