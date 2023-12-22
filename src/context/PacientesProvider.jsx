import {createContext, useState, useEffect} from "react";
import clienteAxios from "../config/axios.jsx";

const PacientesContext = createContext();
export const PacientesProvider = ({children}) => {
    const [pacientes, setPacientes] = useState([]);

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
                console.log(data);
                setPacientes(data);

            } catch (e) {
                console.log(e)
            }
        }
        obtenerPacientes();
    }, []);

    const guardarPaciente = async (paciente) => {
        try {
            const token = localStorage.getItem("token");
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const data = await clienteAxios.post("/pacientes",
                paciente, config);
            const {createdAt, updateAt, __v, ...pacienteAlmacenado} = data
            setPacientes([pacienteAlmacenado, ...pacientes]);
        } catch (e) {
            console.log(e.response.data.msg);
        }
    }

    return (
        <PacientesContext.Provider
            value={{
                pacientes,
                guardarPaciente
            }}>
            {children}
        </PacientesContext.Provider>
    )
}


export default PacientesContext;