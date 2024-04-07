import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { t2iReducer } from './Reducers/t2iReducer';
import { i2iReducer } from './Reducers/i2iReducer';

const rootReducer = combineReducers({ t2i: t2iReducer, i2i: i2iReducer });

export const store = configureStore({
  reducer: rootReducer,
});
