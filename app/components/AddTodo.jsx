var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');

export var AddTodo = React.createClass({
  getInitialState : function () {
    return {

    };
  },
  handleSubmit: function(e){
    e.preventDefault();
    var {dispatch} = this.props;
    var todoText = this.refs.todoText.value;

    if(todoText.length > 0){
      this.refs.todoText.value = '';
      dispatch(actions.addTodo(todoText))
    } else {
      this.refs.todoText.focus();
    }
  },
  render: function() {
    var {todos} = this.state;
    return(
      <div className="container__footer">
        <form onSubmit={this.handleSubmit}>
          <input type="text" className="" placeholder="What do you need to do?" ref="todoText"/>
          <button className="button expanded primary">Add Todo</button>
        </form>
      </div>
    );
  }
});

export default connect()(AddTodo);
