import React from 'react'

class FileDownload extends React.Component{
    constructor(props){
        super(props)
            this.state = {
                data:props.dataForCSV,
                uri :"no",
            };
            
    }
    componentDidMount(){
        let x = this.downloadCSV();
        this.setState({uri:x});
    }
    convertArrayOfObjectsToCSV(args) {  
        var result, ctr, keys, columnDelimiter, lineDelimiter, data;

        data = args.data || null;
        if (data == null || !data.length) {
            return null;
        }

        columnDelimiter = args.columnDelimiter || ',';
        lineDelimiter = args.lineDelimiter || '\n';

        keys = Object.keys(data[0]);

        result = '';
        result += keys.join(columnDelimiter);
        result += lineDelimiter;

        data.forEach(function(item) {
            ctr = 0;
            item.forEach(function(key) {
                if (ctr > 0) result += columnDelimiter;

                result += item[key];
                ctr++;
            });
            result += lineDelimiter;
        });
        return result;
    }
    convertArrayIntoCSV(){
        var result, lineDelimiter, data;

        data = this.state.data || null;
        if (data === null || !data.length) {
            return null;
        }
        lineDelimiter = '\n';

        result = '';

        for(let i=0;i<data.length;i++)
        {
                result += data[i];
                result += lineDelimiter;
        };
        return result;
    }
    downloadCSV(){
        var data;
        var csv = this.convertArrayIntoCSV()//this.convertArrayOfObjectsToCSV(this.state.data);
        if (csv == null) return;

        //filename = 'export.csv';

        if (!csv.match(/^data:text\/csv/i)) {
            csv = 'data:text/csv;charset=utf-8,' + csv;
        }
        data = encodeURI(csv);
        /*link = document.createElement('a');
        link.setAttribute('href', data);
        link.setAttribute('download', filename);
        link.click();
        */
        return data;
    }
    render(){
        return(
            <div>
                <a href={this.state.uri} download ={"exports.csv"}> Download CSV </a>
            </div>
        )
    }
}
export default FileDownload;
/*var encodedUri = encodeURI(csvContent);
var link = document.createElement("a");
link.setAttribute("href", encodedUri);
link.setAttribute("download", "my_data.csv");
link.innerHTML= "Click Here to download";
document.body.appendChild(link); // Required for FF

link.click();*/