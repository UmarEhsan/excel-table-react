import React, {Component} from 'react';
class TableData extends Component{

render(){
        var data = this.props.cell.map((item, index) =>{
            if(this.props.edit && this.props.edit.row === this.props.rowind  && this.props.edit.cell === index){
                return(
                    <td key={index}>
                    <form onSubmit={this.handleCreate.bind(this)}>
                    <input type="text" data-row={this.props.rowind}  defaultValue ={ item} ref="createInput" />
                     </form>
                    </td>
                )
            }
            return(
                <td key={index} data-row={this.props.rowind}>{item}</td>
            )
        })
        return(
             <tr>{data}</tr>
              )
        }
        handleCreate(e){
        e.preventDefault();
        this.props.save(this.refs.createInput.value);
        }
}
export default TableData;


