import React from 'react';
import axios from 'axios'
class FileHandler extends React.Component{
    constructor(props){
        super(props);
        this.state = {data:[]};
        this.updateState = props.updateState.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }
    submitHandler(ev) {
        ev.preventDefault();
        console.log("request sent")
        const data = new FormData();
        data.append('file', this.uploadInput.files[0]);
        this.updateState(["inputFile"],[Object.assign({},this.uploadInput.files[0])])
        axios.post('/lg', data)
        .then((response) => {
            console.log(response)
            let colName =response.data.columns
            this.updateState(["inputData","columnNames","displayChart"],[response.data.data,colName,true])
            axios.post('/linearregression',data)
                .then((response)=>{
                        console.log("Executed algorithm")
                        console.log(response);
                        this.updateState(["predictedValues","score","outputStatus"],[response.data.prediction,response.data.score,true])
                    }
            )
        .catch((err)=>{console.log(err)}
        )
        })
        .catch(function (error) {
            console.log(error);
        });

        
    }
    render(){
        return(
             <div className="container">
                <form onSubmit={this.submitHandler}>
                    <input className="form-control"  ref={(ref) => { this.uploadInput = ref; }} type="file" accept=".csv"/>
                    <input type = "submit" value ="process"/>
                </form>
            </div>
        )
    }
}
export default FileHandler;