import { combineReducers } from '@reduxjs/toolkit';
import productReducer from './product/reducer';
import userReducer from './authenticate/reducer';

const rootReducer = combineReducers({
  product: productReducer,
  user: userReducer,
});

export default rootReducer;