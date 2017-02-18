import React, {Component} from 'react';
import TodosListHeader from './todos-list-header.js';
import TodosListItem from './todos-list-item.js';
import CreateTodo from './create-todo';
class TodosList extends Component{
render(){
        var items = this.props.todos.map( (item, index) =>{
            return(
               <TodosListItem key={index} {...item} {...this.props}/>
                );
             });
   
         return(
             <table>
             <TodosListHeader/>
             <tbody>
             {items}
             </tbody>
             </table>
               )
            }
}
export default TodosList;


