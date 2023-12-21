import {Outlet, Navigate} from "react-router-dom";
import useAuth from "../hooks/useAuth.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

const RutaProtegida = () => {

    const {auth, cargando} = useAuth();
    console.log(auth);
    console.log(cargando);
    if (cargando) {
        return "CArgando...";
    }
    return (
        <>
            <Header/>
            {auth?._id ? <Outlet/> : <Navigate to="/"/>}
            <Footer/>
        </>
    )
};

export default RutaProtegida;