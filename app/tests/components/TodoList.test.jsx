const React = require('react');
const ReactDOM = require('react-dom');
const {Provider} = require('react-redux');
const expect = require('expect');
const $ = require('jQuery');
const TestUtils = require('react-addons-test-utils');

const uuid = require('node-uuid');
const moment = require('moment');

import {configure} from 'configureStore';
import ConnectedTodoList, {TodoList} from 'TodoList';
import ConnectedTodo, {Todo} from 'Todo';

describe('TodoList', () => {
  it('should exist', () => {
    expect(TodoList).toExist();
  });

  it('should render 1 todo component for each todo item', () => {
    let todos = [
      {
        id: uuid(),
        text: 'Do something',
        completed: false,
        completedAt: undefined,
        createdAt: moment().unix()
      },
      {
        id: uuid(),
        text: 'Check mail',
        completed: true,
        completedAt: moment().unix(),
        createdAt: moment().unix()
      }
    ];
    let store = configure({
      todos,
      showCompleted: true,
      searchText: '',
      auth: {}
    });
    let provider = TestUtils.renderIntoDocument(
      <Provider store={store}>
        <ConnectedTodoList/>
      </Provider>
    );
    let todoList = TestUtils.scryRenderedComponentsWithType(provider, ConnectedTodoList)[0];
    let todosComponents = TestUtils.scryRenderedComponentsWithType(todoList, ConnectedTodo);

    expect(todosComponents.length).toBe(todos.length);
  });
  it('should render empty message is there is nothing to show', () => {
    let todos = [];
    let todoList = TestUtils.renderIntoDocument(<TodoList todos={todos} showCompleted={true} searchText={''}/>);
    let $el = $(ReactDOM.findDOMNode(todoList));

    expect($el.find('.container__message').length).toBe(1);
  });
});
