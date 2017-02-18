import CreateTodo from './create-todo';
import ExportJson from './exportJson';
import header from './data/header';
import React, {Component} from 'react';
import Search from './search';
import Data from './data/tableData.js';
import TableData from './tableData';
import TodoList  from './todos-list.js';
import TodosListItem  from './todos-list-item.js';

const headers = header;
const data    = Data;


class App extends Component{
         constructor(props){
         super(props);
         this.state = {
         data, descending :false, edit : null,
         headers, _preSearchData:null, search : false,
         sortby :null, 
                      }
         
                }
        render(){
        let edit = this.state.edit;
        const border = { border : '1px solid black' };
        let data = this.state.data.map((row, index) =>{
        return(
               <TableData key={index}  cell={row} rowind={index} edit={edit} save={this.save.bind(this)} />
              )
          }) 
       var headers = this.state.headers.map( (item, index) =>{
           if(this.state.sortby === index){
               item += this.state.descending ? ' \u2191' : ' \u2193'
              }               
           if(this.state.search){
               return (
                   <td  key={index} ><input type='text' onChange={this.searchData.bind(this)} data-idx = {index} /></td>
                   );
                }
               return (
                <th  key={index} >{item}</th>
                );
       }
       )     
         
        return(
        <div>
         <Search search = {this.state.search} data={this.state.data} toggleSearch={this.toggleSearch.bind(this)} headers = {this.state.headers}/>
          <ExportJson exportJson = {this.exportJson.bind(this)}/>
            <table>
              <thead style = {border} onClick={this.sort.bind(this)}>
                 <tr>
                 {headers}
                 </tr>
              </thead>
                 <tbody onDoubleClick = {this._showEditor.bind(this)}>
                   {data}
                 </tbody>
            </table>
        </div>
        )
    }
        save(cell){

        data[this.state.edit.row][this.state.edit.cell] = cell;
        this.setState({
        edit: null, // done editing
        data: data,
});

    }
    exportJson(ev, format){
        var headers = format === 'json'? JSON.stringify(this.state.headers) :
                         this.state.headers.reduce((result, cell, index)=>{
                         return result
                         + '"'+ cell.replace(/"/g, '""') + '"' + (index < this.state.headers.length - 1 ? ',' : '') ;},'')
    var contents = format === 'json'? JSON.stringify(this.state.data): 
                          this.state.data.reduce(function(result, row) {
                          return result + "\n"
                          + row.reduce(function(rowresult, cell, idx) {
                          return rowresult
                          + '"'+ cell.replace(/"/g, '""') + '"'+ (idx < row.length - 1 ? ',' : '');}, '')
                          }, '')
    
                          
                        
    var URL = window.URL || window.webkitURL;
    var blob = new Blob([headers,contents], {type: 'text/' + format});
    ev.target.href = URL.createObjectURL(blob);
    ev.target.download = 'data.' + format;

    }
    searchData(e){
           e.preventDefault();
            var needle = e.target.value.toLowerCase();
            if(!needle){
                this.setState({data : this._preSearchData})
                return;
            }
            var idx = e.target.dataset.idx;
            var searchData = this._preSearchData.filter(function(row){
                return row[idx].toString().toLowerCase().indexOf(needle) > -1;
            });
            this.setState({data : searchData})
    }
    toggleSearch(){
        if (this.state.search) {
         this.setState({
            data: this._preSearchData,
            search: false,
 });
            this._preSearchData = null;
 } else {
 this._preSearchData = this.state.data;
 this.setState({
 search: true,
 });
 }

    }
    _showEditor(e){
        this.setState({
            edit:{
               row: parseInt(e.target.dataset.row, 10),
               cell: e.target.cellIndex,

            }
        })
     



    }

     sort(e){
          var column = e.target.cellIndex;
          var data = this.state.data.slice();
          var descending = this.state.sortby === column && !this.state.descending;
          data.sort(function(a, b) {
              return descending ? (a[column] < b[column] ? 1 : -1) : (a[column] > b[column] ? 1 : -1);
          });
          this.setState({
          data: data,
          sortby : column,
          descending : descending
});

     }

    toggleTask(task){
      var foundTodo;
       todos.some((todo)=>{
           if(todo.task === task){
               foundTodo = todo;
               return true;
           }
      })
      foundTodo.isCompleted = !foundTodo.isCompleted;
      this.setState({todos : this.state.todos})
    }
    createTask(task){
        this.state.todos.push({
            task,
            isCompleted : false
        })
        this.setState({todos:this.state.todos} )
    }

   



}

export default App;


