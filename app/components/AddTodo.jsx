import React from 'react';
import {connect} from 'react-redux';
import * as actions from 'actions';

export class AddTodo extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit (e) {
    e.preventDefault();
    let {dispatch} = this.props;
    let todoText = this.refs.todoText.value;

    if(todoText.length > 0){
      this.refs.todoText.value = '';
      dispatch(actions.startAddTodo(todoText))
    } else {
      this.refs.todoText.focus();
    }
  }
  render () {
    let {todos} = this.state;
    return(
      <div className="container__footer">
        <form onSubmit={this.handleSubmit}>
          <input type="text" className="" placeholder="What do you need to do?" ref="todoText"/>
          <button className="button expanded primary">Add Todo</button>
        </form>
      </div>
    );
  }
}

export default connect()(AddTodo);
