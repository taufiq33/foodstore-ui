import {
  combineReducers, legacy_createStore as createStore, applyMiddleware, compose,
} from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../features/Auth/reducer';

// eslint-disable-next-line no-underscore-dangle
const composerEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;

const rootReducers = combineReducers({
  auth: authReducer,
});

const store = createStore(rootReducers, composerEnhancer(applyMiddleware(thunk)));

export default store;