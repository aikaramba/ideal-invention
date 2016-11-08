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
        todo: {
          id: '82734892sdf',
          text: 'eyyyyyy',
          completed: false,
          createdAt: 23784234
        }
      };
      var res = reducers.todosReducer(df([]), df(action));

      expect(res.length).toEqual(1);
      expect(res[0]).toEqual(action.todo);
    });
    it('should update todo', () => {
      var todos = [
        {
          id: uuid(),
          text: 'you can run around',
          completed: true,
          createdAt: moment().unix(),
          completedAt: moment().unix()
        },
        {
          id: uuid(),
          text: 'even put me down',
          completed: false,
          createdAt: moment().unix(),
          completedAt: undefined
        }
      ];

      var updates = {
        completed: false,
        completedAt: null
      };
      var action = {
        type: 'UPDATE_TODO',
        id: todos[0].id,
        updates
      };
      var res = reducers.todosReducer(df(todos), df(action));

      expect(res.length).toEqual(2);
      expect(res[0].completed).toEqual(updates.completed);
      expect(res[0].completedAt).toEqual(updates.completedAt);
      expect(res[0].text).toEqual(todos[0].text);
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
    it('should wipe existing todos on logout', () => {
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
        type: 'LOGOUT'
      };
      var res = reducers.todosReducer(df(todos), df(action));

      expect(res.length).toEqual(0);
    });
  });

  describe('authReducer', () => {
    it('should login', () => {
      const action = {
        type: 'LOGIN',
        uid: '123123asdasd'
      };
      const res = reducers.authReducer(df({}), df(action));

      expect(res.uid).toEqual(action.uid);
    });
    it('should logout', () => {
      const authData = {
        uid: '78d2dhU'
      };
      const action = {
        type: 'LOGOUT'
      };
      const res = reducers.authReducer(df(authData), df(action));

      expect(res.uid).toNotExist();
    });
  });
});
