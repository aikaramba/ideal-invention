const expect = require('expect');
const df = require('deep-freeze-strict');
const moment = require('moment');
const uuid = require('node-uuid');

const reducers = require('reducers');

describe('Reducers', () => {
  it('should exist', () => {
    expect(reducers).toExist();
  });
  describe('searchTextReducer', () => {
    it('should set searchText', () => {
      let action = {
        type: 'SET_SEARCH_TEXT',
        searchText: 'test Something 42'
      };
      let res = reducers.searchTextReducer(df(''), df(action));

      expect(res).toEqual(action.searchText);
    });
    it('should toggle showCompleted', () => {
      let action = {
        type: 'TOGGLE_SHOW_COMPLETED'
      };
      let res = reducers.showCompletedReducer(df(false), df(action));

      expect(res).toEqual(true);
    });
  });
  describe('todosReducer', () => {
    it('should add new todo', () => {
      let action = {
        type: 'ADD_TODO',
        todo: {
          id: '82734892sdf',
          text: 'eyyyyyy',
          completed: false,
          createdAt: 23784234
        }
      };
      let res = reducers.todosReducer(df([]), df(action));

      expect(res.length).toEqual(1);
      expect(res[0]).toEqual(action.todo);
    });
    it('should update todo', () => {
      let todos = [
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

      let updates = {
        completed: false,
        completedAt: null
      };
      let action = {
        type: 'UPDATE_TODO',
        id: todos[0].id,
        updates
      };
      let res = reducers.todosReducer(df(todos), df(action));

      expect(res.length).toEqual(2);
      expect(res[0].completed).toEqual(updates.completed);
      expect(res[0].completedAt).toEqual(updates.completedAt);
      expect(res[0].text).toEqual(todos[0].text);
    });
    it('should add existing todos', () => {
      let todos = [
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
      let action = {
        type: 'ADD_TODOS',
        todos
      };
      let res = reducers.todosReducer(df([]), df(action));

      expect(res.length).toEqual(2);
      expect(res[0]).toEqual(todos[0]);
    });
    it('should wipe existing todos on logout', () => {
      let todos = [
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
      let action = {
        type: 'LOGOUT'
      };
      let res = reducers.todosReducer(df(todos), df(action));

      expect(res.length).toEqual(0);
    });
  });

  describe('authReducer', () => {
    it('should login', () => {
      let action = {
        type: 'LOGIN',
        uid: '123123asdasd'
      };
      let res = reducers.authReducer(df({}), df(action));

      expect(res.uid).toEqual(action.uid);
    });
    it('should logout', () => {
      let authData = {
        uid: '78d2dhU'
      };
      let action = {
        type: 'LOGOUT'
      };
      let res = reducers.authReducer(df(authData), df(action));

      expect(res.uid).toNotExist();
    });
  });
});
