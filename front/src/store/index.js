import { configureStore } from '@reduxjs/toolkit';
import residencias from './ducks/residencias';
import requestError from './ducks/requestError';
export default configureStore({
    reducer: {
        residencias,
        requestError

    }
});