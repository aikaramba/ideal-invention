import firebase, {firebaseRef, githubProvider} from 'app/firebase/';
import moment from 'moment';

export const login = (uid) => {
  return {
    type: 'LOGIN',
    uid
  };
};

export const logout = () => {
  return {
    type: 'LOGOUT'
  }
};

export const setSearchText = (searchText) => {
  return {
    type: 'SET_SEARCH_TEXT',
    searchText
  };
};

export const addTodo = (todo) => {
  return {
    type: 'ADD_TODO',
    todo
  };
};

export const startAddTodos = () => {
  return (dispatch, getState) => {
    let uid = getState().auth.uid;
    let todosRef = firebaseRef.child(`users/${uid}/todos`);

    return todosRef.once('value').then((snapshot) => {
      let todos = snapshot.val() || {};
      let newTodos = [];

      Object.keys(todos).forEach((key) => {
        newTodos.push({
          id: key,
          ...todos[key]
        })
      });

      dispatch(addTodos(newTodos));
    });
  };
};

export const startAddTodo = (text) => {
  return (dispatch, getState) => {
    let todo = {
      text,
      completed: false,
      createdAt: moment().unix(),
      completedAt: null
    };
    let uid = getState().auth.uid;
    let todoRef = firebaseRef.child(`users/${uid}/todos`).push(todo);

      return todoRef.then(()=>{
        dispatch(addTodo({
          ...todo,
          id: todoRef.key
        }))
      },()=>{

      });
  };
};

export const addTodos = (todos) => {
  return {
    type: 'ADD_TODOS',
    todos
  };
};

export const toggleShowCompleted = (showCompleted) => {
  return {
    type: 'TOGGLE_SHOW_COMPLETED'
  };
};

export const updateTodo = (id, updates) => {
  return {
    type: 'UPDATE_TODO',
    id,
    updates
  };
};

export const startToggleTodo = (id, completed) => {
  return (dispatch, getState) => {
    let uid = getState().auth.uid;
    let todoRef = firebaseRef.child(`users/${uid}/todos/${id}`);
    let updates = {
       completed,
       completedAt: completed ? moment().unix() : null
    };

    return todoRef.update(updates).then(()=>{
      dispatch(updateTodo(id, updates));
    });
  };
};

export const startLogin = () => {
  return (dispatch, getState) => {
    return firebase.auth().signInWithPopup(githubProvider).then((result) => {
      //dispatch(login(result.user.uid));
      //console.log('Authenticated!', result);
      console.log('Authenticated!');
    }, (error) => {
      //dispatch(logout());
      console.log('Unable to authenticate!', error);
    });
  };
};

export const startLogout = () => {
  return (dispatch, getState) => {
    return firebase.auth().signOut().then(() => {
    //  dispatch(logout());
      console.log('Logged out!');
    });
  };
};
