var React = require('react');
var TodoList = require('TodoList');
var AddTodo = require('AddTodo');
var TodoSearch = require('TodoSearch');

var uuid = require('node-uuid');

var TodoApp = React.createClass({
  getInitialState: function(){
    return {
      todos:[
        {
          id: uuid(),
          text: 'Walk the dog',
          completed: false
        },
        {
          id: uuid(),
          text: 'Clean the yard',
          completed: true
        },
        {
          id: uuid(),
          text: 'Mow the lawn',
          completed: true
        },
        {
          id: uuid(),
          text: 'Send mails',
          completed: false
        }
      ],
      showCompleted: false,
      searchText: ''
    };
  },
  handleToggle: function(id){
    var updatedTodos = this.state.todos.map(item => {
      if(item.id === id)
        item.completed = !item.completed;
      return item;
    });
    this.setState({
      todos: updatedTodos
    });
  },
  handleSearch: function(showCompleted, searchText){
    this.setState({
      showCompleted: showCompleted,
      searchText: searchText.toLowerCase()
    });
  },
  handleAddTodo: function(text){
    this.setState({
      todos: [...this.state.todos,
        {
          id: uuid(),
          text: text,
          completed: false
        }
      ]
    });
  },
  render: function(){
    var {todos} = this.state;
    return(
      <div className="row">
        <div className="column small-centered medium-6 large-4">
          <h1 className="app-title">Todo App</h1>
          <TodoSearch onSearch={this.handleSearch}/>
          <TodoList todos={todos} onToggle={this.handleToggle}/>
          <AddTodo onAddTodo={this.handleAddTodo}/>
        </div>
      </div>
    );
  }
});

module.exports = TodoApp;
