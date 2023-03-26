const redux = require('redux');
const reduxLogger = require('redux-logger');
const thunkMiddleware = require('redux-thunk')
const axios = require('axios');
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger();

const middlewares = [];
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

// state initilization

const InitialState = {
    loading:true,
    data: [],
    error: ''
 }

//  actions

const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

// actions creators 

const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    }
};

const fetchUsersSuccess = (users) => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
};

const fetchUsersFailure = (error) => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error
    }
};

// reducers 

const reducer = (state = InitialState, action) => {
    switch(action.type) {
        case FETCH_USERS_REQUEST: 
        return {
            ...state,
            loading: true
        }
        case FETCH_USERS_SUCCESS :
        return {
            loading: false,
            data : action.payload,
            error: ''
        }
        case FETCH_USERS_FAILURE : 
        return {
            loading: false,
            data: [],
            error: action.payload
        }
    }
}

// api calling

const fetchUsers = () => {
    return function(dispatch) {
        dispatch(fetchUsersRequest)
        axios.get('https://jsonplaceholder.typicode.com/posts').then(response => {
            const data = response.data;
            dispatch(fetchUsersSuccess(data))
        }).catch(error => {
            dispatch(fetchUsersFailure(error))
        })
    }
}

const store = createStore(reducer, applyMiddleware(...middlewares, thunkMiddleware));
store.dispatch(fetchUsers);