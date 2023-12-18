import {useContext} from 'react';
import AuthContext from "../context/AuthProvider.jsx";

const UseAuth = () => {
    return useContext(AuthContext);
};

export default UseAuth;