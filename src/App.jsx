import {BrowserRouter, Routes, Route} from "react-router-dom";
import AuthLayout from "./layout/AuthLayout.jsx";
import Login from "./paginas/Login.jsx";

function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<AuthLayout/>}>
                        <Route index element={<Login/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
