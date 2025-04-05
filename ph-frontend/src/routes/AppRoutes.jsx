// AppRoutes.jsx
// Este archivo contiene las rutas de la aplicación utilizando React Router.

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "../pages/NotFound";
import RegisterSede from "../pages/sedes/RegistrarSede";
import RegistrarParticipante from "../pages/participantes/RegistrarParticipante";
import RegistrarColaboradora from "../pages/colaboradoras/RegistrarColaboradora.jsx";
import PaginaGestionSedes from "../pages/PaginaGestionSedes/PaginaGestionSedes.jsx";
import Pag_inicio from "../pages/login/Pag_incio";
import DashboardGeneral from "../pages/dashboards/dashboardGeneral";
import Vista_detalles from "../features/sedes/Vista_detalles";

// import ProtectedRoute from "./ProtectedRoute";
import {AuthProvider, useAuth} from "@/contexts/AuthContext.jsx";

const AppRoutes = () => {
	const { token } = useAuth() || {};

	return (
			<Router>
				<Routes>
					{/* Rutas de formularios */}
					<Route path="/registros/sedes" element={<RegisterSede />} />
					<Route path="/registros/participantes" element={<RegistrarParticipante />} />
					<Route path="/registros/colaboradoras" element={<RegistrarColaboradora />} />

					{/* Rutas de panel de control de coordinadora general */}
					<Route path="/coord-general/login" element={<Pag_inicio />} />
					<Route path="/coord-general/dashboard" element={token ? <DashboardGeneral /> : <Navigate to="/coord-general/login" replace />} />
					<Route path="/coord-general/gestion-sedes" element={token ? <PaginaGestionSedes /> : <Navigate to="/coord-general/login" replace />} />
					<Route path="/sedes/:id/detalles" element={<Vista_detalles />} />

					{/* 404 Route */}
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Router>

	);
};

export default AppRoutes;