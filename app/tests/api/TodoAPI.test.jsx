var expect = require('expect');
var TodoAPI = require('TodoAPI');
var uuid = require('node-uuid');

describe('TodoAPI', () => {
  beforeEach(() => {
    localStorage.removeItem('todos');
  });
  it('should exist', ()=>{
    expect(TodoAPI).toExist();
  });

  describe('filterTodos', () => {
    var todos = [{
      id: uuid(),
      text: 'Some text here',
      completed: true
    },{
      id: uuid(),
      text: 'Other text here',
      completed: false
    },{
      id: uuid(),
      text: 'Some text here',
      completed: true
    }];

    it('should return all items if showCompleted is true', () => {
      var filteredTodos = TodoAPI.filterTodos(todos, true, '');
      expect(filteredTodos.length).toBe(3);
    });

    it('should return all items if showCompleted is false', () => {
      var filteredTodos = TodoAPI.filterTodos(todos, false, '');
      expect(filteredTodos.length).toBe(1);
    });

    it('should sort by completed status', () => {
      var filteredTodos = TodoAPI.filterTodos(todos, true, '');
      expect(filteredTodos[0].completed).toBe(false);
    });

    it('should return all items if searchText is empty', () => {
      var filteredTodos = TodoAPI.filterTodos(todos, true, '');
      expect(filteredTodos.length).toBe(3);
    });
    it('should return only matched items if searchText is entered', () => {
      var filteredTodos = TodoAPI.filterTodos(todos, true, 'sOmE Text he');
      expect(filteredTodos.length).toBe(2);
    });

  });
});
