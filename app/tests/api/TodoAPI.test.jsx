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

  describe('setTodos', () => {
    it('should set valid todos array', () => {
      var id = uuid();
      var todos = [{
        id: id,
        test: 'test all files',
        completed: false
      }];
      TodoAPI.setTodos(todos);

      var actualTodos = JSON.parse(localStorage.getItem('todos'));

      expect(actualTodos).toEqual(todos);
    });
    it('should set invalid todos array', () => {
      var badTodos = {a: 'b'};
      TodoAPI.setTodos(badTodos);

      expect(localStorage.getItem('todos')).toBe(null);
    });
  });
  describe('getTodos', () => {
    it('should return empty array for bad localstorage data', () => {
      var actualTodos = TodoAPI.getTodos();
      expect(actualTodos).toEqual([]);
    });
    it('should return todo if valid array in localstorage', () => {
      var id = uuid();
      var todos = [{
        id: id,
        test: 'test all files',
        completed: false
      }];
      localStorage.setItem('todos', JSON.stringify(todos));

      var actualTodos = TodoAPI.getTodos();
      expect(actualTodos).toEqual(todos);
    });
  });
});
