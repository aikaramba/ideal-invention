import React from 'react';
import {connect} from 'react-redux';
import Todo from 'Todo';
import TodoAPI from 'TodoAPI';

export class TodoList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }
  render () {
    let {todos, showCompleted, searchText} = this.props;

    let renderTodos = () => {
      let filteredTodos = TodoAPI.filterTodos(todos, showCompleted, searchText);

      if(filteredTodos.length === 0){
        return (
          <p className="container__message">Nothing to do</p>
        );
      }

      return filteredTodos.map((todo) => {
        return (
          <Todo key={todo.id} {...todo}/>
        );
      });
    };

    return(
      <div>
        {renderTodos()}
      </div>
    );
  }
}

export default connect(
  (state) => {
    return state;
  }
)(TodoList);
