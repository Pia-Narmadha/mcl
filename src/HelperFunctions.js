export function processData(csv) {
    /*
    Process the csv file and returns an array of arrays containing where each inner array is a row.
     */
        var allTextLines = csv.split(/\r\n|\n/);
        var lines = [];
        for (var i=0; i<allTextLines.length; i++) {
            var data = allTextLines[i].split(',');
                var tarr = [];
                for (var j=0; j<data.length; j++) {
                    tarr.push(parseInt(data[j]));
                }
                lines.push(tarr);
        }
      return(lines);
    }
export function errorHandler(evt) {
      if(evt.target.error.name === "NotReadableError") {
          alert("File is in incorrect format !");
      }
    }
export function convertArrayIntoObject(arr,xIndex,yIndex){
    let output =[]
    for(let i=0;i<arr.length;i++){
        let innerArr = arr[i]
        let temp = {
            x:innerArr[xIndex],
            y:innerArr[yIndex]
        }
        output.push(temp)
    }
    console.log("processed the lines");
    console.log(output)
    return output;
}
export function makeChartDataFromTwoArray(xArr,xIndex,yArr){
    let output =[]
    for(let i=0;i<xArr.length;i++){
        let innerArr = xArr[i]
        let temp = {
            x:innerArr[xIndex],
            y:yArr[i]
        }
        output.push(temp)
    }
    console.log(output)
    return output;
}