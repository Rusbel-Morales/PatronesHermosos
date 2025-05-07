// DashboardGeneralPage.jsx
// Página que muestra el dashboard(coordinadora General) y lo conecta con el backend.

"use client"
import { useEffect, useState } from "react";
import { Heading, Flex, Stack, Box, Text, Card, Button, Circle, Float } from "@chakra-ui/react";
import { FaBuilding } from "react-icons/fa";
import { LuBell } from "react-icons/lu"
import DashboardGeneralMenu from "../../components/menu/DashboardGeneralMenu.jsx";
import DashboardTimeline from "../../components/menu/DashboardTimeline.jsx";
import DashboardGeneralGrafica from "../../features/dashboard_general/DashboardGeneralGrafica.jsx";
import { getDashboardOverview } from "../../services/dashboardGeneralService.js";
import { obtenerFechaActual } from "../../utils/obtenerFechaActual.js";
import UserProfile from "../../features/user_profile/UserProfile.jsx";

const DashboardGeneralPage = () => {
  const [overviewData, setOverviewData] = useState({
    obtenerSedesPendientes: [],
    obtenerSedesEstado: [],
    obtenerTopSedes: [],
    numeroSolicitudesSedes: 0,
  });

  useEffect(() => {
    const fetchOverviewData = async () => {
      try {
        const data = await getDashboardOverview();
        setOverviewData(data);
      } catch (err) {
        console.error("Error al cargar overview:", err);
      }
    };

    fetchOverviewData();
  }, []);

  const { obtenerSedesPendientes, obtenerSedesEstado, obtenerTopSedes, numeroSolicitudesSedes } = overviewData;
  const [mostrarTimeline, setMostrarTimeline] = useState(false);
  const totalSedes = obtenerSedesEstado.reduce((acc, curr) => acc + curr.total_sedes, 0);
  const totalAprobadas = obtenerSedesEstado.find(item => item.estado === "aceptado")?.total_sedes || 0;
  const totalPendientes = obtenerSedesEstado.find(item => item.estado === "pendiente")?.total_sedes || 0;
  // Función para formatear la fecha
  const formatearFecha = (fecha) => {
    const [year, month, day] = fecha.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <Box bg="purple.100"  w="full">
      <Stack w="full" >
        <Flex gap="1" justify="flex-start">   
          <Box ml="1vw" mr="1vw" mt="1vh">
          <DashboardGeneralMenu />
          </Box>
          <Stack gap="6">
            <Flex mt="2vh" gap="35vw" align="center" justify="space-between">
            <Text fontSize="4vh" fontWeight="bold" >
              Bienvenida Coordinadora General
            </Text>
            <Flex gap="1" align="center">

            <Box position="relative">
            <Button variant="ghost" mr="1vh" colorPalette="white" size="xl" onClick={() => setMostrarTimeline((prev) => !prev)}>
              <LuBell />
            </Button>
            {obtenerSedesPendientes.length > 0 && (
            <Float>
              <Circle
                size="5"
                bg="red.500"
                color="white"
                fontSize="sm"
                position="absolute"
                top="-1"
                right="0"
              >
                {Math.min(obtenerSedesPendientes.length, 3)}
              </Circle>
            </Float>
            )}
            </Box>
            <UserProfile />
            </Flex>
            </Flex>

            {mostrarTimeline && (
            <DashboardTimeline />
            )}

            <Text fontSize="3vh">Todo bajo control  Aquí tienes un vistazo rápido de cómo va todo hoy.</Text>
            <Text fontSize="2vh" color="gray.700">{obtenerFechaActual()}</Text>
          </Stack>
        </Flex>
        
      <Flex w="100vw"  flexWrap="wrap" justify="center" gap= "7vh" py="3" pr="4vw" pl="4vw">
        <Card.Root w="30vw" borderRadius="xl" boxShadow="md">
          <Card.Header alignItems="center">
            <Flex align="space-between" gap="5">
              <Text fontSize="3vh" display="flex" fontWeight="bold"> Sedes Totales</Text>
              <Box bg="purple.200" borderRadius="full" boxShadow="md" w="4vw" h="4vh" fontSize="3vh" alignItems="center" display="flex" justifyContent="center">
                <Text>🏢</Text>
              </Box>
              </Flex>
              </Card.Header>
              <Card.Body color="fg.muted"  alignItems="center">
                <Flex gap="4">
                  <Text Text fontSize="3vh" fontWeight="extrabold" color="purple.700">{totalSedes}</Text>
                </Flex>
              </Card.Body>
            </Card.Root>
          
            <Card.Root w="30vw" borderRadius="xl" boxShadow="md">
              <Card.Header alignItems="center">
                <Flex align="space-between" gap="5">
                  <Text fontSize="3vh" display="flex" fontWeight="bold"> Sedes Aprobadas</Text>
                  <Box bg="purple.200" borderRadius="full" boxShadow="md" w="4vw" h="4vh" fontSize="3vh" alignItems="center" display="flex" justifyContent="center">
                    <Text>✓</Text>
                  </Box>
                </Flex>
              </Card.Header>
              <Card.Body color="fg.muted"  alignItems="center">
                <Flex gap="4">
                  <Text fontSize="3vh" fontWeight="extrabold" color="purple.700">{totalAprobadas}</Text>
                </Flex>
              </Card.Body>
            </Card.Root>

            <Card.Root w="30vw"  borderRadius="xl" boxShadow="md">
              <Card.Header alignItems="center">
                <Flex align="space-between" gap="5">
                  <Text fontSize="3vh" display="flex" fontWeight="bold"> Sedes Pendientes</Text>
                  <Box bg="purple.200" borderRadius="full" boxShadow="md" w="4vw" h="4vh" fontSize="3vh" alignItems="center" display="flex" justifyContent="center">
                    <Text>⏳</Text>
                  </Box>
                </Flex>
              </Card.Header>
              <Card.Body color="fg.muted"  alignItems="center">
                <Flex gap="4">
                  <Text fontSize="3vh" fontWeight="extrabold" color="purple.700">{totalPendientes}</Text>
                </Flex>
              </Card.Body>
            </Card.Root>

            <Card.Root w="30vw" borderRadius="xl" boxShadow="md">
              <Card.Header alignItems="center">
                <Flex align="space-between" gap="5">
                  <Text fontSize="3vh" display="flex"  fontWeight="bold"> Solicitudes Nuevas</Text>
                  <Box bg="purple.200" borderRadius="full" boxShadow="md" w="4vw" h="4vh" fontSize="3vh" alignItems="center" display="flex" justifyContent="center">
                    <Text>🔔</Text>
                  </Box>
                </Flex>
              </Card.Header>
              <Card.Body color="fg.muted"  alignItems="center">
                <Flex gap="4">
                  <Text fontSize="3vh" fontWeight="extrabold" color="purple.700">{numeroSolicitudesSedes}</Text>
                </Flex>
              </Card.Body>
            </Card.Root>
          </Flex>
          <DashboardGeneralGrafica sedesEstado={obtenerSedesEstado} topSedes={obtenerTopSedes}/>
      </Stack>
      </Box>
  );
};

export default DashboardGeneralPage;