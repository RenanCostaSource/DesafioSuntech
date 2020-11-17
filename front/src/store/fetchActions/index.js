import api from '../../services/api';
import { requestError } from '../ducks/requestError'
import { getresidencias } from '../ducks/residencias';


export const getResidencias = () => {
    return (dispatch) => {

        api.get("/residencia")
            .then((res) => {

                dispatch(getresidencias(res.data));
            })
            .catch((error) => {
                dispatch(requestError(error.message));
                alert(error);


            });
    }
}

export const saveResidencia = (data) => {
    return (dispatch) => {

        api.post("/residencia", data)
            .then((res) => {
                dispatch(requestError(200));
                dispatch(getResidencias());
            })
            .catch((error) => {
                dispatch(requestError(error.message));



            });
    }
}


