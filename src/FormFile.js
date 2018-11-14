import React from 'react';

const FormFile = function (props){
    return(
        <div className="container">
            <form onSubmit={()=>{props.onSubmitHandler()}}>
                <input ref={(ref) => { this.attachedFile = ref; }} type="file" accept=".csv"/>
                <input type = "submit"/>
            </form>
        </div>
    );
}