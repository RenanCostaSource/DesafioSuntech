import { createAction, createReducer } from '@reduxjs/toolkit';

const INITIAL_STATE = [];

export const getresidencias = createAction('GET_RESIDENCIAS');

export default createReducer(INITIAL_STATE, {
    [getresidencias.type]: (state, action) => action.payload,

})