import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools as compose } from 'redux-devtools-extension';
import rootReducer from './logic/reducer';

const middlewares = [thunk];

const store = createStore(rootReducer, compose(applyMiddleware(...middlewares)));

export default store;
