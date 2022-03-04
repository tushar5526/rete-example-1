import { createStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

const enhancers = [];
const composedEnhancers = composeWithDevTools(...enhancers);

const INITIAL_AUTH = {
  user: null,
  isLoggedIn: false
};

function authReducer(state = INITIAL_AUTH, action) {
  return state;
}

// Define the Reducers that will always be present in the application
const staticReducers = {
  auth: authReducer
};

// Configure the store

const store = createStore(createReducer(), {}, composedEnhancers);
store.asyncReducers = {};

// Add a dictionary to keep track of the registered async reducers

// Create an inject reducer function
// This function adds the async reducer, and creates a new combined reducer
store.injectReducer = (key, asyncReducer) => {
  store.asyncReducers[key] = asyncReducer;
  store.replaceReducer(createReducer(store.asyncReducers));
  console.log("inject redudcer", store.getState());
};

// Return the modified store
export default store;

function createReducer(asyncReducers) {
  return combineReducers({
    ...staticReducers,
    ...asyncReducers
  });
}
