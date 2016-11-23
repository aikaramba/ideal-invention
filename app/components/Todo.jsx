import React from 'react';
import {connect} from 'react-redux';
import * as actions from 'actions';

const moment = require('moment');

export class Todo extends React.Component {
  render () {
    let {id, text, completed, createdAt, completedAt, dispatch} = this.props;
    let todoClassName = 'todo' + (completed ? ' todo-completed' : '' );
    let renderDate = () => {
       let message = completed ? 'Completed ' : 'Created ';
       let timestamp = completed ? completedAt : createdAt;
       let time = moment.unix(timestamp).format('HH:mm - D.MM.YYYY');
       return message + time;
    };
    return (
      <div className={todoClassName} onClick={()=>{
          dispatch(actions.startToggleTodo(id, !completed));
        }}>
        <div>
          <input type="checkbox" className="checkbox" checked={completed} onChange={(e)=>{}}/>
        </div>
        <div>
          <p>{text}</p>
          <p className="todo__subtext">{renderDate()}</p>
        </div>
      </div>
    );
  }
}

export default connect()(Todo);
