import { combineReducers } from 'redux';
import dataReducer from './dataReducer';

const allReducers = combineReducers({
    data: dataReducer
});

export default allReducers;