import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { t2iReducer } from './Reducers/t2iReducer';

const rootReducer = combineReducers({ t2i: t2iReducer });

export const store = configureStore({
  reducer: rootReducer,
});
