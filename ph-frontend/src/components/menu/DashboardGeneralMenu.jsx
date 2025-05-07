import {
  Drawer,
  Portal,
  Stack,
  Image,
  Button,
  CloseButton,
  Dialog  
} from "@chakra-ui/react";
import {
  FaBars,
  FaUsers,
  FaUser,
  FaBuilding,
  FaChartBar,
  FaTrash,
  FaDownload,
  FaSignOutAlt
} from "react-icons/fa";
import { useState } from "react";
import { HiCog } from "react-icons/hi";
import { useNavigate } from "react-router";
import logoMorado from "../../assets/logo-morado.png";
import BorrarDatosModal from "../../components/modals/BorrarDatosModal";
import CerrarSesionModal from "../modals/CerrarSesionModal";

const DashboardGeneralMenu = () => {
  const [open, setOpen] = useState(false);
  const [confirmDialogDelete, setConfirmDialogDelete] = useState(false);
  const [confirmDialogSesion, setConfirmDialogSesion] = useState(false);
  const navigate = useNavigate();

  const handleDeleteConfirmed = () => {
    setConfirmDialog(false);
    console.log("💥 Datos eliminados");
    // Aquí podrías usar un toast o trigger de backend
  };

  const handleClickBorrar = () => {
    setOpen(false);
    setTimeout(() => {
      setConfirmDialogDelete(true);
    }, 300); // asegurarte que el Drawer cierre antes de abrir el Dialog
  };

  const handleClickSesion = () => {
    setOpen(false);
    setTimeout(() => {
      setConfirmDialogSesion(true);
    }, 300); // asegurarte que el Drawer cierre antes de abrir el Dialog
  };


  return (
    <>
      {/* Drawer */}
      <Drawer.Root open={open} onOpenChange={(e) => setOpen(e.open)}  placement="start">
        <Drawer.Trigger asChild>
          <Button variant="outline" size="sm" mt={5} borderColor="purple.200">
            <FaBars />
          </Button>
        </Drawer.Trigger>
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content bg="purple.200" maxW="250px">
              <Drawer.Header>
                <Drawer.Title>Panel de Control</Drawer.Title>
              </Drawer.Header>
              <Drawer.Body>
                <Stack gap="5" align="flex-start">
                  <Image src={logoMorado} alt="Patrones Hermosos" boxSize={["80px", "100px"]} objectFit="cover" ml="9"/>
                  <Button variant="ghost" colorPalette={"purple"} size="lg" onClick={() => navigate("/coord-general/dashboard")}>
                    <FaChartBar /> Dashboard
                  </Button>
                  <Button variant="ghost" colorPalette={"purple"} size="lg" onClick={() => navigate("/coord-general/gestion-sedes")}>
                    <FaBuilding /> Sedes
                  </Button>
                  <Button variant="ghost" colorPalette={"purple"} size="lg">
                    <FaUsers /> Participantes
                  </Button>
                  <Button variant="ghost" colorPalette={"purple"} size="lg">
                    <FaUser /> Colaboradores
                  </Button>
                </Stack>
              </Drawer.Body>
              <Drawer.Footer>

              <Stack gap="4" pr="5" align="flex-start">
                  <Button variant="ghost" size="md" colorPalette="black" onClick={handleClickSesion}>
                    <FaSignOutAlt/> Cerrar Sesión
                  </Button>
                  <Button variant="ghost" size="md" colorPalette="black">
                    <FaDownload /> Crear Estadísticas
                  </Button>
                  <Button
                  variant="ghost"
                  size="md"
                  colorPalette="red"
                  onClick={handleClickBorrar}
                >
                  <FaTrash /> Borrar Datos
                </Button>
                </Stack>
                
              </Drawer.Footer>
              <Drawer.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Drawer.CloseTrigger>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>

      <BorrarDatosModal
      open={confirmDialogDelete}
      onClose={setConfirmDialogDelete}
      onConfirm={handleDeleteConfirmed}
      />

    <CerrarSesionModal
      open={confirmDialogSesion}
      onClose={setConfirmDialogSesion}
      onConfirm={() => {
        localStorage.removeItem("rol");
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        console.log("🚪 Sesión cerrada");
        navigate("/administracion/login");
        // Aquí podrías usar toast, navigate, etc.
      }}
      />



    </>
  );
};

export default DashboardGeneralMenu;