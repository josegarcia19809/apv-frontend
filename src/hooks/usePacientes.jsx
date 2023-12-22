import {useContext} from 'react';
import PacientesContext, {PacientesProvider} from "../context/PacientesProvider.jsx";

const UsePacientes = () => {
    return useContext(PacientesContext);
};

export default UsePacientes;