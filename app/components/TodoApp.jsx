var React = require('react');
var uuid = require('node-uuid');

var TodoList = require('TodoList');
var AddTodo = require('AddTodo');
var TodoSearch = require('TodoSearch');
var TodoAPI = require('TodoAPI');

var TodoApp = React.createClass({
  getInitialState: function(){
    return {
      todos: TodoAPI.getTodos(),
      showCompleted: false,
      searchText: ''
    };
  },
  componentDidUpdate: function(){
    TodoAPI.setTodos(this.state.todos);
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
  // TodoAPI.setTodos(this.state.todos);
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
