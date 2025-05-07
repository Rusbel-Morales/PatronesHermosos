import {
  Drawer,
  Portal,
  Stack,
  Image,
  Button,
  CloseButton,
} from "@chakra-ui/react";
import {
  FaBars,
  FaUsers,
  FaUser,
  FaBuilding,
  FaChartBar,
  FaDownload,
  FaSignOutAlt
} from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router";
import logoMorado from "../../assets/logo-morado.png";
import CerrarSesionModal from "../modals/CerrarSesionModal";

const DashboardSedeMenu = () => {
  const [open, setOpen] = useState(false);
  const [confirmDialogSesion, setConfirmDialogSesion] = useState(false);
  const navigate = useNavigate();


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
                  <Button variant="ghost" colorPalette={"purple"} size="lg" onClick={() => navigate("/coord-sede/dashboard")}>
                    <FaChartBar /> Dashboard
                  </Button>
                  <Button variant="ghost" colorPalette={"purple"} size="lg" onClick={() => navigate("/coord-sede/gestion-sedes")}>
                    <FaBuilding /> Sede
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

              <Stack pr="2vw" align="flex-start">
                  <Button variant="ghost" size="md" colorPalette="black" onClick={handleClickSesion}>
                    <FaSignOutAlt/> Cerrar Sesión
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

    <CerrarSesionModal
      open={confirmDialogSesion}
      onClose={setConfirmDialogSesion}
      onConfirm={() => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("rol");
        localStorage.removeItem("id_sede");
        localStorage.removeItem("nombre_sede");
        localStorage.removeItem("fecha_inicio");
        console.log("🚪 Sesión cerrada");
        navigate("/administracion/login");
        // Aquí podrías usar toast, navigate, etc.
      }}
      />



    </>
  );
};

export default DashboardSedeMenu;