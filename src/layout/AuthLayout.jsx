import {Outlet} from "react-router-dom";

const AuthLayout = () => {
    return (
        <>
            <h1>Administración de pacientes de veterinaria</h1>
            <Outlet />

        </>
    );
}

export default AuthLayout;