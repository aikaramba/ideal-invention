const React = require('react');
const ReactDOM = require('react-dom');
const expect = require('expect');
const $ = require('jQuery');
const TestUtils = require('react-addons-test-utils');

import * as actions from 'actions';

import {AddTodo} from 'AddTodo';

describe('AddTodo', () => {
  it('should exist', () => {
    expect(AddTodo).toExist();
  });
  it('should dispatch ADD_TODO when valid todo text', () => {
    let todoText  = 'Test text';
    let action = actions.startAddTodo(todoText);
    let spy = expect.createSpy();
    let addTodo = TestUtils.renderIntoDocument(<AddTodo dispatch={spy}/>);
    let $el = $(ReactDOM.findDOMNode(addTodo));

    addTodo.refs.todoText.value = todoText;
    TestUtils.Simulate.submit($el.find('form')[0]);
    expect(spy).toHaveBeenCalledWith(action);
  });

  it('should not dispatch ADD_TODO if no text was entered', () => {
    let todoText = '';
    let spy = expect.createSpy();
    let addTodo = TestUtils.renderIntoDocument(<AddTodo dispatch={spy}/>);
    let $el = $(ReactDOM.findDOMNode(addTodo));

    addTodo.refs.todoText.value = todoText;
    TestUtils.Simulate.submit($el.find('form')[0]);
    expect(spy).toNotHaveBeenCalled();
  });
});
