import React, {Component} from 'react';
class ExportJson extends Component{
      render(){
      return(
            
              <button><a href="data.json" onClick ={this.export.bind(this)}>Export Json</a></button>
            
        )
        
    }

    export(e){
        
        this.props.exportJson(e, 'csv');
        
    }



}

export default ExportJson;


