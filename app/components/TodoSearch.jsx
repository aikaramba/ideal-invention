var React = require('react');

var TodoSearch = React.createClass({
  handleSearch: function(){
    var showCompleted = this.refs.showCompleted.checked;
    var searchText = this.refs.searchText.value;

    this.props.onSearch(showCompleted, searchText);
  },
  render: function() {
    return(
      <div className="container__header">
        <div>
          <input type="search" onChange={this.handleSearch} className="" placeholder="What do you need to do?" ref="searchText" />
        </div>
        <div>
          <label>
            <input type="checkbox" onChange={this.handleSearch} className="" ref="showCompleted" />
            Show completed todos
          </label>
        </div>
      </div>
    );
  }
});

module.exports = TodoSearch;
