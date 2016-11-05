var React = require('react');

var AddTodo = React.createClass({
  getInitialState: function(){
    return {
    }
  },
  handleSubmit: function(e){
    e.preventDefault();
    var newTodo = this.refs.todoText.value;
    if(newTodo.length > 0){
      this.props.onAddTodo(newTodo)
      this.refs.todoText.value = '';
    } else {
      this.refs.todoText.focus();
    }
  },
  render: function() {
    var {todos} = this.state;
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" className="" placeholder="What do you need to do?" ref="todoText"/>
          <button className="button expanded primary">Add Todo</button>
        </form>
      </div>
    );
  }
});

module.exports = AddTodo;
