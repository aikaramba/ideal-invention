var React = require('react');
var moment = require('moment');

var Todo = React.createClass({
  render: function(){
    var {id, text, completed, createdAt, completedAt} = this.props;
    var renderDate = () => {
       var message = completed ? 'Completed ' : 'Created ';
       var timestamp = completed ? completedAt : createdAt;
       var time = moment.unix(timestamp).format('HH:mm - D.MM.YYYY');
       return message + time;
    };
    return(
      <div onClick={()=>{
          this.props.onToggle(id);
        }}>
        <input type="checkbox" className="checkbox" checked={completed} onChange={(e)=>{}}/>
        <p>{text}</p>
        <p>{renderDate()}</p>
      </div>
    );
  }
});

module.exports = Todo;
