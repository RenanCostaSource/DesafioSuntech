import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Geocode from "react-geocode";

import Mapa from './Mapa'
import { saveResidencia } from '../store/fetchActions';
import { requestError } from '../store/ducks/requestError';

Geocode.setApiKey("AIzaSyBRx0vzhwFusq4BnyhWbhL4VnHmPH1XgfA");
Geocode.setLanguage("pt");
Geocode.setRegion("br");
const useStyles = makeStyles({
    defaultOutlined: {
        color: '#33C2C2',
        border: '1px solid #33C2C2',
    },
    default: {
        background: 'linear-gradient(45deg, #00598E 50%, #0895A6 99%)',
        color: 'white',
        float: 'right'
    },
    fields: {
        display: 'flex',
        flexDirection: 'column',
        width: 200
    },

});
export default function CriaCliente() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [errorRender, setErrorRender] = useState(false);
    const [request, setRequest] = useState(false);
    const [errors, setErrors] = useState({
        cep: false,
        numero: false,
        residentes: false
    });

    const [values, setValues] = React.useState({
        cep: '',
        numero: '',
        residentes: '',
        latitude: 0.0,
        longitude: 0.0
    });
    useEffect(() => {
        setValues(values);
    }, [errors]);
    //Checa se dados de latitude e longitude foram carregados antes de enviar a requisição
    useEffect(() => {
        if (values.latitude !== 0.0 && values.longitude !== 0.0 && request) {
            sendRequest()
        }

    }, [request, values.latitude, values.longitude]);

    const handleChange = (prop) => (event) => {
        if (prop === "cep") {
            event.target.value = event.target.value.slice(0, 8);
        }
        setValues({ ...values, [prop]: event.target.value });
    };

    const sendRequest = () => {
        var requisicao = {
            cep: parseInt(values.cep),
            numero: parseInt(values.numero),
            residentes: parseInt(values.residentes),
            latitude: parseFloat(values.latitude),
            longitude: parseFloat(values.longitude)
        }
        dispatch(saveResidencia(requisicao));
        setRequest(false);
        setValues({
            cep: '',
            numero: '',
            residentes: '',
            latitude: 0.0,
            longitude: 0.0
        })

    }
    const checkRequest = () => {
        var houveErros = false;
        var temperrors = errors;
        //verifica cada campo
        if (values.cep.length !== 8) {
            houveErros = true;
            temperrors.cep = true;
            dispatch(requestError('Cep inválido!'));
        } else {
            temperrors.cep = false;
        }
        if (values.numero.length === 0) {
            houveErros = true;
            temperrors.numero = true;
        } else {
            temperrors.numero = false;
        }
        if (values.residentes.length === 0) {
            houveErros = true;
            temperrors.residentes = true;
        } else {
            temperrors.residentes = false;
        }
        setErrors(temperrors);
        //força re-render do atributo de erro nos campos errados
        setErrorRender(!errorRender)
        if (houveErros) {
            dispatch(requestError('Preencha todas as informações!'));
        } else {
            setRequest(true);

        }
    }
    const getCoordinates = () => {
        Geocode.fromAddress(values.cep).then(
            response => {
                const { lat, lng } = response.results[0].geometry.location;
                setValues({ ...values, latitude: lat, longitude: lng });
                setErrors({ ...errors, cep: false });
            },
            error => {
                console.error(error);
                setErrors({ ...errors, cep: true });
                dispatch(requestError("CEP não encontrado"));
            }
        );
    }

    return (

        <form style={{ marginTop: '20px' }} noValidate autoComplete="off">
            <div  >

                {values.latitude !== 0.0 && values.longitude !== 0.0 ?
                    <Mapa zoom={16} center={{ lat: values.latitude, lng: values.longitude }} mapstyle={{ height: '20vh', width: '20vh', float: 'left' }} />
                    :
                    <Mapa zoom={16} center={{ lat: -23.5628302, lng: -46.6546177 }} mapstyle={{ height: '20vh', width: '20vh', float: 'left' }} />
                }

                <div className={classes.fields}>
                    <TextField
                        id="cep"
                        label="CEP"
                        style={{ margin: 8 }}
                        placeholder="CEP"
                        onChange={handleChange('cep')}
                        type="tel"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        value={values.cep}
                        error={errors.cep}
                        onBlur={getCoordinates}
                    />
                    <TextField
                        id="numero"
                        label="Número"
                        style={{ margin: 8 }}
                        placeholder="Número"
                        onChange={handleChange('numero')}
                        type="tel"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        value={values.numero}
                        error={errors.numero}

                    />

                    <TextField
                        id="residentes"
                        label="Número de Residentes"
                        style={{ margin: 8 }}
                        placeholder="Residentes"
                        onChange={handleChange('residentes')}
                        type="number"
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        value={values.residentes}
                        error={errors.residentes}

                    />

                </div>
            </div>
            <div>
                <Button
                    variant="contained"
                    className={classes.default}
                    onClick={checkRequest}
                >
                    Enviar
                        </Button>


            </div>
        </form>
    )
}