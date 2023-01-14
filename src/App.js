import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { AxiosInterceptor, Map } from "./Api/Axios";
import { DataProvider } from "./Context/DataContext";
import useToken from "./Hook/UseToken";
import Login from "./Login/Login";
import RoutesPage from "./RoutesPage";

function App() {
    const { token } = useToken();
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            return navigate("/login", { replace: true });
        }
    }, []);

    return (
        <>
            {token ? (
                <DataProvider>
                    <AxiosInterceptor>
                            <RoutesPage />
                    </AxiosInterceptor>
                </DataProvider>
            ) : null}
            {token ? null : (
                <Routes>
                    <Route path="/login" element={<Login />} />
                </Routes>
            )}
        </>
    );
}

export default App;
