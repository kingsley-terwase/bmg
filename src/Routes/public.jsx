import { Routes, Route } from "react-router-dom";
import {  HomePage, } from "../Pages/Public";
import PublicLayout from "../Layout/PublicLayout";

const PublicRoutes = () => {
    return (
        <PublicLayout>
            <Routes>
                <Route path="/">
                    <Route index element={<HomePage />} />
                    {/* <Route path="/sample" element={<Sample />} /> */}
                </Route>
            </Routes>
        </PublicLayout>
    );
};

export default PublicRoutes;
