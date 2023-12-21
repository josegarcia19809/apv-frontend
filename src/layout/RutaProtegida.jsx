import {Outlet, Navigate} from "react-router-dom";
import useAuth from "../hooks/useAuth.jsx";

const RutaProtegida = () => {
    const {auth, cargando} = useAuth();
    console.log(auth);
    console.log(cargando);
    if(cargando){
        return "CArgando...";
    }
    return (
        <>
            <h1>Ruta protegida</h1>
            {auth?._id ? <Outlet/> : <Navigate to="/"/>}
        </>
    );
};

export default RutaProtegida;