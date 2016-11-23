import React from 'react';
import {connect} from 'react-redux';
import * as actions from 'actions';

export class TodoSearch extends React.Component {
  render () {
    let {dispatch, showCompleted, searchText} = this.props;
    return (
      <div className="container__header">
        <div>
          <input type="search" onChange={() => {
              let searchText = this.refs.searchText.value;
              dispatch(actions.setSearchText(searchText));
            }} value={searchText} placeholder="Search todos" ref="searchText" />
        </div>
        <div>
          <label>
            <input type="checkbox" onChange={() => {
                dispatch(actions.toggleShowCompleted());
            }} checked={showCompleted} ref="showCompleted" />
            Show completed todos
          </label>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => {
    return {
      //adding stuff from state to props
      showCompleted: state.showCompleted,
      searchText: state.searchText
    }
  }
)(TodoSearch);
