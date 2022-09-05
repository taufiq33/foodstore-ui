import {
  combineReducers, legacy_createStore as createStore, applyMiddleware, compose,
} from 'redux';
import thunk from 'redux-thunk';

import authReducer from '../features/Auth/reducer';
import productsReducer from '../features/Products/reducer';

// eslint-disable-next-line no-underscore-dangle
const composerEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducers = combineReducers({
  auth: authReducer,
  products: productsReducer,
});

const store = createStore(rootReducers, composerEnhancer(applyMiddleware(thunk)));

export default store;
