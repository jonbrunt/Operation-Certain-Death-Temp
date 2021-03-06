import axios from 'axios'; // lightweight HTTP client import

export const ADDING_NOTE = 'ADD_NOTE';
export const ADDED_NOTE = 'ADDED_NOTE';
export const DELETING_NOTE = 'DELETING_NOTE';
export const DELETED_NOTE = 'DELETE_NOTE';
export const ERROR = 'ERROR';
export const GETTING_NOTES = 'GETTING_NOTES';
export const GOT_NOTES = 'GOT_NOTES';
export const LOGGING_IN = 'LOGGING_IN';
export const LOGGED_IN = 'LOGGED_IN';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const NEWEST_SORT = 'NEWEST_SORT';
export const OLDEST_SORT = 'OLDEST_SORT';
export const SHOW_NOTES = 'SHOW_NOTES';
export const SIGNING_UP = 'SIGN_UP';
export const TITLE_SORT = 'TITLE_SORT';
export const TOGGLE_DELETE = 'TOGGLE_DELETE';
export const UPDATING_NOTE = 'UPDATING_NOTE';
export const UPDATED_NOTE = 'UPDATED_NOTE';
export const UPDATE_SEARCH = 'UPDATE_SEARCH';
export const USER_CREATED = 'USER_CREATED';

const URL = 'https://aqueous-beyond-16440.herokuapp.com';

export const addNote = (data, history) => {
  const config = {
    headers: {
      Authorization: localStorage.getItem('notesToken'),
    }
  };
  const {
    title, body, created, stamp
  } = data;
  const note = axios.post(`${URL}/newnote`, {
    title, body, created, stamp,
  }, config);
  return (dispatch) => {
    dispatch({ type: ADDING_NOTE });
    note
      .then(({ newNote }) => {
        dispatch({ type: ADDED_NOTE, payload: newNote });
        history.push('/');
      })
      .catch((err) => {
        dispatch({ type: ERROR, payload: err });
      });
  };
};

export const deleteNote = (data, history) => {
  const config = {
    headers: {
      Authorization: localStorage.getItem('notesToken'),
      id: data.id,
    },
  };
  const note = axios.delete(`${URL}/deletenote`, config);
  return (dispatch) => {
    dispatch({ type: DELETING_NOTE });
    note
      .then((deletedNote) => {
        dispatch({ type: DELETED_NOTE, payload: deletedNote });
      })
      .catch((err) => {
        dispatch({ type: ERROR, payload: err });
      });
    history.push('/list');
  };
};

export const error = () => ({
  type: ERROR,
});

export const getNotes = (data) => {
  const config = {
    headers: {
      Authorization: localStorage.getItem('notesToken'),
    }
  };
  const notes = axios.get(`${URL}/getnotes`, config);
  return (dispatch) => {
    dispatch({ type: GETTING_NOTES });
    notes
      .then((userNotes) => {
        dispatch({ type: GOT_NOTES, payload: userNotes.data.notes });
      })
      .catch((err) => {
        dispatch({ type: ERROR, payload: err });
      });
  };
};

export const login = (data, history) => {
  const user = axios.post(`${URL}/login`, {
    email: data.email,
    password: data.password,
  });
  return (dispatch) => {
    dispatch({ type: LOGGING_IN });
    user
      .then((res) => {
        localStorage.setItem('notesToken', res.data.token);
        dispatch({ type: LOGGED_IN, payload: res.data.token });
        history.push('/list');
      })
      .catch((err) => {
        dispatch({ type: ERROR, payload: err });
        alert('There was a user error while logging in, please try again');
      });
  };
};

export const logout = (history) => {
  return (dispatch) => {
    dispatch({ type: LOGOUT });
    localStorage.removeItem('notesToken');
    history.push('/');
  };
};

export const newestSort = () => ({
  type: NEWEST_SORT,
});

export const oldestSort = () => ({
  type: OLDEST_SORT,
});

export const showNotes = () => ({
  type: SHOW_NOTES,
});

export const signup = (data) => {
  const user = axios.post(`${URL}/register`, {
    email: data.email,
    password: data.password,
  });
  return (dispatch) => {
    dispatch({ type: SIGNING_UP });
    user
      .then(({ newUser }) => {
        dispatch({ type: USER_CREATED, payload: newUser });
        alert('You are registered. Please login below.');
      })
      .catch((err) => {
        dispatch({ type: ERROR, payload: err });
        alert('The email already exists, try another email');
      });
  };
};

export const titleSort = () => ({
  type: TITLE_SORT,
});

export const toggleDelete = () => ({
  type: TOGGLE_DELETE,
});

export const updateNote = (data, history) => {
  const config = {
    headers: {
      Authorization: localStorage.getItem('notesToken'),
    }
  };
  const {
    title, body, id
  } = data;
  const note = axios.put(`${URL}/updatenote`, {
    title, body, id,
  }, config);
  return (dispatch) => {
    dispatch({ type: UPDATING_NOTE });
    note
      .then((updatedNote) => {
        dispatch({ type: UPDATED_NOTE, payload: updatedNote });
      })
      .catch((err) => {
        dispatch({ type: ERROR, payload: err });
      });
    history.push(`/fullnote/${id}`);
  };
};

export const updateSearch = data => ({
  type: UPDATE_SEARCH,
  input: data.input,
});

export const userCreated = () => ({
  type: USER_CREATED,
});
