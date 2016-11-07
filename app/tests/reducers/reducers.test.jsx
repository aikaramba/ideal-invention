var expect = require('expect');
var df = require('deep-freeze-strict');
var moment = require('moment');
var uuid = require('node-uuid');

var reducers = require('reducers');

describe('Reducers', () => {
  it('should exist', () => {
    expect(reducers).toExist();
  });
  describe('searchTextReducer', () => {
    it('should set searchText', () => {
      var action = {
        type: 'SET_SEARCH_TEXT',
        searchText: 'test Something 42'
      };
      var res = reducers.searchTextReducer(df(''), df(action));

      expect(res).toEqual(action.searchText);
    });
    it('should toggle showCompleted', () => {
      var action = {
        type: 'TOGGLE_SHOW_COMPLETED'
      };
      var res = reducers.showCompletedReducer(df(false), df(action));

      expect(res).toEqual(true);
    });
  });
  describe('todosReducer', () => {
    it('should add new todo', () => {
      var action = {
        type: 'ADD_TODO',
        text: 'Call HER?'
      };
      var res = reducers.todosReducer(df([]), df(action));

      expect(res.length).toEqual(1);
      expect(res[0].text).toEqual(action.text);
    });
    it('should toggle todo', () => {
      var todos = [
        {
          id: uuid(),
          text: 'you can run around',
          completed: false,
          createdAt: moment().unix(),
          completedAt: undefined
        },
        {
          id: uuid(),
          text: 'even put me down',
          completed: true,
          createdAt: moment().unix(),
          completedAt: moment().unix()
        }
      ];
      var action = {
        type: 'TOGGLE_TODO',
        id: todos[0].id
      };
      var res = reducers.todosReducer(df(todos), df(action));

      expect(res.length).toEqual(2);
      expect(res[0].completed).toEqual(!todos[0].completed);
      expect(res[0].completedAt).toNotEqual(undefined);
    });
    it('should add existing todos', () => {
      var todos = [
        {
          id: 11,
          text: 'some Text 2 CHECK',
          completed: false,
          completedAt: undefined,
          createdAt: 2131
        },
        {
          id: 23,
          text: 'Bang bang',
          completed: true,
          completedAt: 123123,
          createdAt: 123
        }
      ];
      var action = {
        type: 'ADD_TODOS',
        todos
      };
      var res = reducers.todosReducer(df([]), df(action));

      expect(res.length).toEqual(2);
      expect(res[0]).toEqual(todos[0]);
    });
  });
});
