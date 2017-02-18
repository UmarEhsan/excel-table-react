import React, {Component} from 'react';
class Search extends Component{
    
      render(){
          var headers = this.props.headers.map( (item, index) =>{
           console.log(this)
      
               return (
                   <tr>
                   <td  key={index} ><input type='text' data-idx = {index}/></td>
                   </tr>
                
                );
       }
       ) 
      return(
            {headers},
            <button onClick={this.search.bind(this)}>Search</button>
            )
        }

        search(event){
           event.preventDefault();
           this.props.toggleSearch();
        }
}

export default Search;


