import { Route, Routes } from "react-router-dom";
import LayoutMenu from "./Components/Layout/Layout";
import Error404 from "./Module/ErrorPages/Error404";
import Error500 from "./Module/ErrorPages/Error500";
import Login from "./Login/Login";
import Worker from "./Worker/Worker";
import Salary from "./Salary/Salary";
import WorkingTimes from "./WorkingTimes/WorkingTimes";
import Prepayment from "./Prepayment/Prepayment";
import WorkerExpense from "./WorkerExpense/WorkerExpense";

const RoutesPage = () => {
    return (
        <>
            <Routes>
                <Route element={<LayoutMenu />}>
                    <Route index element={<Worker />} />
                    <Route path="Bosh-sahifa" element={<Worker />} />
                    <Route path="Ish-vaqtlari" element={<WorkingTimes />} />
                    <Route path="Ish-haqilari" element={<Salary />} />
                    <Route path="Avans" element={<Prepayment />} />
                    <Route path="Ishchilar-xarajatlari" element={<WorkerExpense />} />
                </Route>
                <Route path="login" element={<Login />} />
                <Route path="*" element={<Error404 />} />
                <Route path="server-error" element={<Error500 />} />
            </Routes>
        </>
    );
};

export default RoutesPage;
