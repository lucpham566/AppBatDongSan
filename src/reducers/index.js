import { combineReducers } from 'redux';
import screen from './screen';
import auth from './auth';
import post from './post';
import account from './account';

const rootReducer = combineReducers({
    screen,
    post,
    account,
    auth
})

export default rootReducer;