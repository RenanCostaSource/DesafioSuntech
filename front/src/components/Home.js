import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { requestError } from '../store/ducks/requestError';
import LogoIcon from '../assets/logo-header.svg';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Mapa from './Mapa';
import CadastroResidencia from './CadastroResidencia'
import { getResidencias } from '../store/fetchActions';
import '../styles/Home/index.css';
import '../styles/global.css';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function indice(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,

    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        marginRight: '5px',
        height: '100%',
        minWidth: 80,
    },
    tab: {
        width: '100%',

    },
    tab_overflow: {
        height: '100%',
        overflowY: "scroll"
    }
}));
export default function GeneratorHome() {

    const [value, setValue] = React.useState(0);
    const dispatch = useDispatch();
    const [openMessage, setOpenMessage] = useState(false);
    const [openError, setOpenError] = useState(false);
    const requestErrorMessage = useSelector(state => state.requestError);
    const residencias = useSelector(state => state.residencias);
    const [heatpos, setHeatpos] = useState([])
    const [errorMessage, setErrorMessage] = useState('');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const classes = useStyles();
    useEffect(() => {
        dispatch(getResidencias());
    }, [])
    useEffect(() => {
        if (requestErrorMessage == 200) {

            setOpenMessage(true);
            return;
        }
        if (requestErrorMessage.length !== 0) {
            setErrorMessage(requestErrorMessage);
            setOpenError(true);
        }

    }, [requestErrorMessage]);
    useEffect(() => {
        var newheat = []
        residencias.map((residencia) => {
            newheat.push({
                lat: residencia.latitude,
                lng: residencia.longitude,
                weight: residencia.residentes
            });
        });
        setHeatpos(newheat);
    }, [residencias]);
    const handleCloseMessage = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenMessage(false);
        dispatch(requestError(""));
    };
    const handleCloseError = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenError(false);
        setErrorMessage('');
        dispatch(requestError(""));
    };
    return (
        <div style={{ height: '100%' }}>
            <nav className="navbar">
                <div className="navcontainer">
                    <img src={LogoIcon} alt="logo-icon" style={{ width: '170px', height: '39px' }} />
                    <span className="content__tabs__text">Desafio SunTech - Renan Paiva Oliveira Costa</span>
                </div>

            </nav>
            <div className="containerMessages">
                <div className="content">
                    <div className="content__header">
                        <div className={classes.root}>
                            <AppBar position="static">
                                <Tabs value={value} onChange={handleChange} aria-label="graph tabs" centered>
                                    <Tab label={<span className="content__tabs__text">Mapa de Residências</span>} {...indice(0)} />
                                    <Tab label={<span className="content__tabs__text">Cadastrar Nova Residência</span>} {...indice(1)} />
                                </Tabs>
                            </AppBar>

                            <TabPanel value={value} index={0} className={classes.tab_overflow}>
                                <Mapa zoom={4} center={{ lat: -10.2415, lng: -52.3721 }} heatmap={heatpos} mapstyle={{ height: '70vh', width: '100%' }} />
                            </TabPanel>
                            <TabPanel value={value} index={1} className={classes.tab_overflow}>
                                <CadastroResidencia />
                            </TabPanel>
                        </div>
                    </div>
                </div>
            </div>
            <Snackbar open={openMessage} autoHideDuration={3000} onClose={handleCloseMessage} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleCloseMessage} severity="success">
                    Ação executada com sucesso!
        </Alert>
            </Snackbar>
            <Snackbar open={openError} autoHideDuration={3000} onClose={handleCloseError} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleCloseError} severity="error">
                    {errorMessage}
                </Alert>
            </Snackbar>
        </div>
    );
}