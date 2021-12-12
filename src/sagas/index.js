import { all } from 'redux-saga/effects';

import auth from './auth';
import post from './post';
import account from './account';

function* rootSaga() {
    yield all([
        auth(),
        account(),
        post(),

    ])
}

export default rootSaga;