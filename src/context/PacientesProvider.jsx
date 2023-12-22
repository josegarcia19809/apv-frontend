import {createContext, useState, useEffect} from "react";
import clienteAxios from "../config/axios.jsx";

const PacientesContext = createContext();
export const PacientesProvider = ({children}) => {
    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState({});

    useEffect(() => {
        const obtenerPacientes = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) return;
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const {data} = await clienteAxios("/pacientes", config);
                setPacientes(data);

            } catch (e) {
                console.log(e)
            }
        }
        obtenerPacientes();
    }, [pacientes]);

    const guardarPaciente = async (paciente) => {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        if (paciente.id) {
            // Actualizando registro
            try {
                const data = await clienteAxios.put(`/pacientes/${paciente.id}`,
                    paciente, config);
                const pacienteActualizado = pacientes.map(
                    pacienteState => pacienteState._id === data._id ? data : pacienteState)
                setPacientes(pacienteActualizado);
            } catch (e) {
                console.log(e.response.data.msg);
            }
        } else {
            // Nuevo registro
            try {

                const data = await clienteAxios.post("/pacientes",
                    paciente, config);
                const {createdAt, updateAt, __v, ...pacienteAlmacenado} = data
                setPacientes([pacienteAlmacenado, ...pacientes]);
            } catch (e) {
                console.log(e.response.data.msg);
            }
        }

    }

    const setEdicion = (paciente) => {
        setPaciente(paciente);

    }

    return (
        <PacientesContext.Provider
            value={{
                pacientes,
                guardarPaciente,
                setEdicion,
                paciente
            }}>
            {children}
        </PacientesContext.Provider>
    )
}


export default PacientesContext;