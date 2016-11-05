var $ = require('jquery');

module.exports = {
  setTodos: function(todos) {
    if($.isArray(todos)){
      localStorage.setItem('todos', JSON.stringify(todos));
      return todos;
    }
  },
  getTodos: function(){
    var stringTodos = localStorage.getItem('todos');
    var todos = [];
    try {
      todos = JSON.parse(stringTodos);
    } catch(e) {
    } finally {
      stringTodos = null;
    }
    return $.isArray(todos) ? todos : [];
  },
  filterTodos: function(todos, showCompleted, searchText){
    var filteredTodos = todos;


    // filter by showcompleted
    filteredTodos = filteredTodos.filter((todo) => {
      return !todo.completed || showCompleted;
    });
    // filter by searchText
    if(searchText.length > 0)
    filteredTodos = filteredTodos.filter((todo) => {
      return todo.text.toLowerCase().includes(searchText.toLowerCase());
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
