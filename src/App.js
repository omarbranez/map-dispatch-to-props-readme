import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';

import { addTodo } from './actions/todos'
class App extends Component {

  state = {
    todo: ''
  }
  
  // addTodo = () => { // now lives in actions/todos.js
  //   return({
  //     type: 'ADD_TODO',
  //     todo: this.state.todo
  //   })
  // }

  handleOnChange = event => {
    this.setState({
      todo: event.target.value
    });
  }

  // handleOnSubmit = event => {
  //   event.preventDefault();
  //   console.log("Todo being added: ", this.state.todo);
  //   // this.props.dispatch({ type: 'ADD_TODO', todo: this.state.todo })
  //   // this.props.dispatch(this.addTodo()); //refactoring previous line
  //   this.props.dispatch(addTodo(this.state.todo)) // call addtodo from actions folder module
  //   this.setState({ todo: '' });
  // }

  handleOnSubmit = event => {
    event.preventDefault()
    console.log("Todo being added: ", this.state.todo)
    this.props.addTodo(this.state.todo)
    this.setState({ todo: ''})
  }

  render() {
    const renderTodos = () => this.props.todos.map(todo => <li key={todo}>{todo}</li>);
    return (
      <div className="App">
      <form onSubmit={(event) => this.handleOnSubmit(event)}>
        <input
          type="text"
          onChange={(event) => this.handleOnChange(event)}
          id="todos"
          placeholder="add todo" 
          value={this.state.todo}/>
        <input type="submit" />
      </form>
      <h2>Todos:</h2>
        <ol>{renderTodos()}</ol>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    todos: state.todos
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addTodo: (todo) => {
      dispatch(addTodo(todo))
    }
  }
}

// export default connect(mapStateToProps, mapDispatchToProps)(App); //dispatch in second argument of connect
export default connect(mapStateToProps, { addTodo })(App) 
// since addTodo has the same name as the addTodo action creator (key value pair), we just pass it in once

// can be combined further
//export default connect(state => ({ todos: state.todos }), { addTodo })(App)
// still passing in a function as the first argument