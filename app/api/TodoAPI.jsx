const $ = require('jquery');

module.exports = {
  filterTodos: function(todos, showCompleted, searchText){
    let filteredTodos = todos;

    // filter by showcompleted
    filteredTodos = filteredTodos.filter((todo) => {
      return !todo.completed || showCompleted;
    });
    // filter by searchText
    if(searchText.length > 0)
    filteredTodos = filteredTodos.filter((todo) => {
      let text = todo.text.toLowerCase();
      return text.includes(searchText.toLowerCase());
    });
    // sort todos with non-completed first
    filteredTodos.sort((a, b) => {
      if(!a.completed && b.completed) return -1;
      if(a.completed && !b.completed) return 1;
      return 0;
    });
    return filteredTodos;
  }
};
