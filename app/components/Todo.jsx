var React = require('react');
var moment = require('moment');
var {connect} = require('react-redux');
var actions = require('actions');

export var Todo = React.createClass({
  render: function(){
    var {id, text, completed, createdAt, completedAt, dispatch} = this.props;
    var todoClassName = 'todo' + (completed ? ' todo-completed' : '' );
    var renderDate = () => {
       var message = completed ? 'Completed ' : 'Created ';
       var timestamp = completed ? completedAt : createdAt;
       var time = moment.unix(timestamp).format('HH:mm - D.MM.YYYY');
       return message + time;
    };
    return(
      <div className={todoClassName} onClick={()=>{
          dispatch(actions.toggleTodo(id))
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
});

export default connect()(Todo);
