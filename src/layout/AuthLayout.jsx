import {Outlet} from "react-router-dom";

const AuthLayout = () => {
    return (
        <>
            <h1>Desde auth layout</h1>
            <Outlet></Outlet>
        </>
    );
}

export default AuthLayout;