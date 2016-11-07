var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');

export var TodoSearch = React.createClass({
  render: function() {
    var {dispatch, showCompleted, searchText} = this.props;
    return(
      <div className="container__header">
        <div>
          <input type="search" onChange={() => {
              var searchText = this.refs.searchText.value;
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
});

export default connect(
  (state) => {
    return { //adding stuff srom state to props
      showCompleted: state.showCompleted,
      searchText: state.searchText
    }
  }
)(TodoSearch);
