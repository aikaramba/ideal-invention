const expect = require('expect');
const actions = require('actions');
const uuid = require('node-uuid');

import firebase, {firebaseRef} from 'app/firebase/';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const createMockStore = configureMockStore([thunk]);

describe('Actions', () => {
  it('sould exist', () => {
    expect(actions).toExist();
  });
  it('should generate SET_SEARCH_TEXT action', () => {
    let action = {
      type: 'SET_SEARCH_TEXT',
      searchText: 'Some search text'
    };
    let res = actions.setSearchText(action.searchText);

    expect(res).toEqual(action);
  });
  it('should generate ADD_TODO action', () => {
    let action = {
      type: 'ADD_TODO',
      todo: {
        test: 'some Text 2 CHECK',
        completed: false,
        createdAt: 0
      }
    };
    let res = actions.addTodo(action.todo);

    expect(res).toEqual(action);
  });

  it('should generate ADD_TODOS action', () => {
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
    let res = actions.addTodos(todos);

    expect(res).toEqual(action);
  });
  it('should generate TOGGLE_SHOW_COMPLETED action', () => {
    let action = {
      type: 'TOGGLE_SHOW_COMPLETED'
    };
    let res = actions.toggleShowCompleted();

    expect(res).toEqual(action);
  });
  it('should generate update todo action', () => {
    let action = {
      type: 'UPDATE_TODO',
      id: '123123',
      updates: {completed: false}
    };
    let res = actions.updateTodo(action.id, action.updates);

    expect(res).toEqual(action);
  });

  describe('Tests with firebase todos', () => {
    let testTodoRef;
    let uid;
    let todosRef;

    beforeEach((done) => {
      let credential = firebase.auth.GithubAuthProvider.credential(process.env.GITHUB_ACCESS_TOKEN);

      firebase.auth().signInWithCredential(credential).then((user) => {
        uid = user.uid;
        return todosRef = firebaseRef.child(`users/${uid}/todos`);
      }).then(() => {
        testTodoRef = todosRef.push();

        return  testTodoRef.set({
          test: 'Something todo',
          completed: false,
          createdAt: 9278971894
        });
      })
      .then(() => done())
      .catch(done);
    });

    afterEach((done) => {
      todosRef.remove().then(() => done());
    });

    it('should toggle todo and dispatch UPDATE_TODO action', (done) => {
      const store = createMockStore({auth: {uid}});
      const action = actions.startToggleTodo(testTodoRef.key, true);

      store.dispatch(action).then(()=>{
        const mockActions = store.getActions();

        expect(mockActions[0]).toInclude({
          type: 'UPDATE_TODO',
          id: testTodoRef.key
        });
        expect(mockActions[0].updates).toInclude({
          completed: true
        });

        expect(mockActions[0].updates.completedAt).toExist();
        done();
      }, done)
    });

    it('should create todo and dispatch ADD_TODO', (done) => {
      const store = createMockStore({auth: {uid}});
      const todoText = 'my todo item';

      store.dispatch(actions.startAddTodo(todoText)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toInclude({
          type: 'ADD_TODO'
        });
        expect(actions[0].todo).toInclude({
          text: todoText
        });
        done();
      }).catch(done);
    });
/*
    it('should get back one preset todo on startAddTodos action', (done) => {
      const store = createMockStore({auth: {uid}});
      const action = actions.startAddTodos();

      store.dispatch(action).then(() => {
        const mockActions = store.getActions();
        const mockState = store.getState();

        expect(mockActions[0].type).toEqual('ADD_TODOS');
        expect(mockActions[0].todos.length).toEqual(1);
        expect(mockActions[0].todos[0].text).toEqual('Something todo');
        done();
      }, done);
    });
*/
  });

  it('should generate LOGIN action', () => {
    let action = {
      type: 'LOGIN',
      uid: '123123asdasd'
    };
    let res = actions.login(action.uid);

    expect(res).toEqual(action);
  });
  it('should generate LOGOUT action', () => {
    let action = {
      type: 'LOGOUT'
    };
    let res = actions.logout();

    expect(res).toEqual(action);
  });
});
