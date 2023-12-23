import {useState, useEffect, createContext} from "react";
import clienteAxios from "../config/axios.jsx";

const AuthContext = createContext();
const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({});
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setCargando(false);
                return;
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                const {data} = await clienteAxios("/veterinarios/perfil",
                    config);
                setAuth(data);
            } catch (e) {
                console.log(e.response.data.msg);
                setAuth({});
            }
            setCargando(false);
        }
        autenticarUsuario();
    }, []);

    const cerrarSesion = () => {
      localStorage.removeItem("token");
      setAuth({});
    }

    const actualizarPerfil = (datos) => {
        console.log(datos);
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesion,
                actualizarPerfil
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext;