// AppRoutes.jsx
// Este archivo contiene las rutas de la aplicación utilizando React Router.

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NotFoundPage from "../pages/common/NotFoundPage.jsx";
import RegistrarSedePage from "../pages/registros/RegistrarSedePage.jsx";
import RegistrarParticipantePage from "../pages/registros/RegistrarParticipantePage.jsx";
import RegistrarColaboradoraPage from "../pages/registros/RegistrarColaboradoraPage.jsx";
import GestionSedesPage from "../pages/panel_control_general/GestionSedesPage.jsx";
import GestionGruposPage from "../pages/panel_control_sede/GestionGruposPage.jsx";
import Pag_inicio from "../pages/paneles_control/LoginPage.jsx";
import DashboardGeneralPage from "../pages/panel_control_general/DashboardGeneralPage.jsx";
import DashboardSedePage from "../pages/panel_control_sede/DashboardSedePage.jsx";
import Vista_detalles from "../features/sedes/DetallesSedeView.jsx";
import VistaColaboradoresDetalles from "../features/colaboradoras/DetallesColaboradoresView.jsx";
import MentoraForm from "../features/mentoras/Formulario.mentora.jsx";
import CrearGrupo from "../components/grupo/CrearGrupo.jsx";
import RegistrarGrupoPage from "../pages/panel_control_sede/CreacionGruposPage.jsx";
import Cuestionario from "../pages/panel_control_sede/Cuestionario.jsx";


// import ProtectedRoute from "./ProtectedRoute";
import {useAuth} from "@/contexts/AuthContext.jsx";
import {useEffect, useState} from "react";
import AsignacionSedePage from "../pages/panel_control_sede/AsignacionSedePage.jsx";

const AppRoutes = () => {
	const { token, setToken, setUsername } = useAuth() || {};
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const storedToken = localStorage.getItem("token");
		const storedUsername = localStorage.getItem("username");
		if (storedToken) {
			setToken(storedToken);
		}
		if (storedUsername) {
			setUsername(storedUsername);
		}
		setLoading(false);
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	

	return (
			<Router>
				<Routes>
					{/* Rutas de formularios */}
					<Route path="/registros/sedes" element={<RegistrarSedePage />} />
					<Route path="/registros/participantes" element={<RegistrarParticipantePage />} />
					<Route path="/registros/colaboradoras" element={<RegistrarColaboradoraPage />} />
					<Route path="/registros/menotra" element={<MentoraForm />} />

					{/* Rutas de panel de control de coordinadora general */}
					<Route path="/administracion/login" element={<Pag_inicio />} />
					<Route path="/coord-general/dashboard" element={token ? <DashboardGeneralPage /> : <Navigate to="/administracion/login" replace />} />
					<Route path="/coord-general/gestion-sedes" element={token ? <GestionSedesPage /> : <Navigate to="/administracion/login" replace />} />
					<Route path="/coord-general/gestion-sedes/:id" element={<Vista_detalles /> } />

					{/* Rutas de panel de control de coordinadora de sede */}
					<Route path="/coord-sede/dashboard" element={ token ? <DashboardSedePage /> : <Navigate to="/administracion/login" replace />} />

					{/* Rutas de panel de control de coordinadora de sede */}
					<Route path="/coord-sede/gestion-sedes" element={<GestionGruposPage />} />
					<Route path="/coord-sede/gestion-colaboradores/:id" element={<VistaColaboradoresDetalles /> } />
					<Route path="/coord-sede/asignacion" element={<AsignacionSedePage /> } />  
					<Route path="/coord-sede/crear-grupos" element={<CrearGrupo />} />

					<Route path="/coord-sede/crear-grupos-page" element={<RegistrarGrupoPage />} />
					<Route path="/coord-sede/crear-grupos-page-cuestionario" element={<Cuestionario />} />

					{/* 404 Route */}
					<Route path="*" element={<NotFoundPage />} />


					
				</Routes>
			</Router>
	);
};

export default AppRoutes;