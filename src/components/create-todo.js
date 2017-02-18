import React, {Component} from 'react';
class CreateTodo extends Component{
      render(){
      return(
            <form onSubmit={this.handleCreate.bind(this)}>
              <input type="text" placeholder="WHAT DO T NEED TO DO?" ref="createInput"/>
              <button>Create todo</button>
            </form>
        )
        
    }

    handleCreate(e){
        e.preventDefault();
        this.props.createTask(this.refs.createInput.value);
        this.refs.createInput.value = "";
    }



}

export default CreateTodo;


