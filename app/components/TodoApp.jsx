var React = require('react');
var TodoList = require('TodoList');
var AddTodo = require('AddTodo');
var TodoSearch = require('TodoSearch');

var TodoApp = React.createClass({
  getInitialState: function(){
    return {
      todos:[
        {
          id: 0,
          text: 'Walk the dog'
        },
        {
          id: 1,
          text: 'Clean the yard'
        },
        {
          id: 2,
          text: 'Mow the lawn'
        },
        {
          id: 3,
          text: 'Send mails'
        }
      ],
      showCompleted: false,
      searchText: ''
    };
  },
  handleSearch: function(showCompleted, searchText){
    this.setState({
      showCompleted: showCompleted,
      searchText: searchText.toLowerCase()
    });
  },
  handleAddTodo: function(todoText){
    var newTodos = this.state.todos;
    var newTodo = {
      id: newTodos.length,
      text: todoText
    }
    newTodos.push(newTodo);
    this.setState({
      todos: newTodos
    });
  },
  render: function(){
    var {todos} = this.state;
    return(
      <div className="row">
        <div className="column small-centered medium-6 large-4">
          <h1 className="app-title">Todo App</h1>
          <TodoSearch onSearch={this.handleSearch}/>
          <TodoList todos={todos}/>
          <AddTodo onAddTodo={this.handleAddTodo}/>
        </div>
      </div>
    );
  }
});

module.exports = TodoApp;
