import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import PostDetail from "./components/PostDetail/PostDetail.jsx";
import { Navbar } from "./components/Navbar/Navbar.jsx";
import AuthForm from "./components/Auth/AuthForm.jsx";
import AdminPanel from "./components/AdminPanel/AdminPanel.jsx";
import AdminRoute from "./components/AdminRoute.jsx";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/post/:id" element={<PostDetail />} />
                <Route path="/login" element={<AuthForm mode="login" />} />
                <Route path="/register" element={<AuthForm mode="register" />} />
                 <Route path="/admin" element={
                                                <AdminRoute> 
                                                    <AdminPanel />
                                                </AdminRoute>
                                               }
                                                    />
                <Route path="*" element={<Navigate to="/" replace />} />
               
            </Routes>
        </BrowserRouter>
    );
}

export default App;
