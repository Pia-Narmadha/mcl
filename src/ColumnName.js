import React from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
class ColumnName extends React.Component{
    constructor(props){
        super(props)
        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false,
            columnName:props.namearr[0],
        };
        this.onclickHandler = props.onclickHandler;
        this.namearr = props.namearr;
        this.updateState = props.updateState;
    }
    toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }
    render(){
        let arr =[];
        let x = [];
        for(let i = 0;i<this.namearr.length-1;i++)
        {
            x[i] = i;
            arr.push(
                <DropdownItem key={i} onClick = {()=>{this.setState({columnName:this.namearr[i]});this.updateState(["chartInfo"],[x[i]])}}>
                    {this.namearr[i]}
                </DropdownItem>
                )
        }
        return (
            <div>
                <Dropdown  isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle  color="danger">
                <span className="dropDownTitle">Column: {this.state.columnName}</span>
                </DropdownToggle>
                <DropdownMenu modifiers={{
                                setMaxHeight: {
                                enabled: true,
                                order: 890,
                                fn: (data) => {
                                                return (
                                                    {...data,styles: {...data.styles,overflow: 'auto',maxHeight: "80vh",},}
                                                    );
                                            },
                                    },
                }} >
                {arr}
                </DropdownMenu>
            </Dropdown>
            </div>
        );
    }
}
/*const ColumnName  = function (props){
    let arr =[];
    let x = [];
    for(let i = 0;i<props.namearr.length-1;i++)
    {
        x[i] = i;
        arr.push(
            <button key={i} onClick = {()=>{console.log("column name",x[i]);props.updateState(["chartInfo"],[x[i]])}}>
                {props.namearr[i]}
            </button>
            )
    }
    return (
                <div>
                    {arr}
                </div>
        )
}
*/
export default ColumnName;