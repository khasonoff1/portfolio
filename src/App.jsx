import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import AdminLayout from "./components/layout/AdminLayout";
import Layout from "./components/layout/LayoutHome/Layout";
import HomePage from "./pages/public/home";
import DashboardPage from "./pages/admin/dashboard";
import ExperiencesPage from "./pages/admin/experiences";
import SkillsPage from "./pages/admin/skills";
import PortfolioPage from "./pages/admin/portfolio";
import UsersPage from "./pages/admin/users";
import LoginRegisterPage from "./pages/public/login-register";
import NotFoundPage from "./pages/public/notFound";
import EducationPage from "./pages/admin/education";
import NotUsersPage from "./pages/admin/client-users";
import { authName } from "./redux/slices/auth";

function App() {
    const { isAuth, user } = useSelector((state) => state[authName]);

    return (
        <BrowserRouter>
            <Routes>
            <Route element={<Layout />}>


                <Route path="/" element={<HomePage />} />
            </Route>
                <Route path="login" element={<LoginRegisterPage />} />

                <Route element={isAuth && user?.role === "admin" ? <AdminLayout /> : <Navigate to={(isAuth && user?.role === "user") || user?.role === "client" ? "/" : "/loginRegister"} />}>
                    <Route path="dashboard" element={<DashboardPage />} />
                    <Route path="education" element={<EducationPage />} />
                    <Route path="experiences" element={<ExperiencesPage />} />
                    <Route path="skills" element={<SkillsPage />} />
                    <Route path="portfolio" element={<PortfolioPage />} />
                    <Route path="users" element={<UsersPage />} />
                    <Route path="users/:notClientUsers" element={<NotUsersPage />} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
