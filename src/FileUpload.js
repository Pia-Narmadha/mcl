import React,{Component} from 'react'
class FileUpload extends Component {

   constructor(props) {
    super(props);
      this.state = {
        uploadStatus: false
      }
    this.handleUpload = this.handleUpload.bind(this);
  }


  handleUpload(ev) {
    ev.preventDefault();
    console.log("request sent")
    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);
    
    axios.post('http://localhost:5000/linearregression', data)
      .then(function (response) {
         //

          console.log(response)
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    return(
      <div className="container">
        <form onSubmit={this.handleUpload}>
          <div className="form-group">
            <input className="form-control"  ref={(ref) => { this.uploadInput = ref; }} type="file" accept=".csv"/>
          </div>

          <input type = "submit"/>

        </form>
        <Chart />
      </div>
    )
  }
}