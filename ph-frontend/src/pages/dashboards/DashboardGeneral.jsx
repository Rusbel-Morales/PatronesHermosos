// DashboardGeneral.jsx
// Página que muestra el dashboard(coordinadora General) y lo conecta con el backend.
"use client"
import { useEffect, useState } from "react";
import { Heading, Flex, Stack, Box, Text, Card } from "@chakra-ui/react";
import { FaBuilding } from "react-icons/fa";
import DashboardGeneralMenu from "../../components/menu/DashboardGeneralMenu";
import DashboardGeneralGrafica from "../../features/dashboards/DashboardGeneralGrafica";
import { getDashboardOverview } from "../../services/dashboardGeneralService";
import { obtenerFechaActual } from "../../utils/obtenerFechaActual";

const DashboardGeneral = () => {
  const [overviewData, setOverviewData] = useState({
    obtenerSedesPendientes: [],
    obtenerSedesEstado: [],
    obtenerTopSedes: []
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

  const { obtenerSedesPendientes, obtenerSedesEstado, obtenerTopSedes } = overviewData;
  // Función para formatear la fecha
  const formatearFecha = (fecha) => {
    const [year, month, day] = fecha.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <Box bg="purple.100"  w="full">
      <Stack w="full" >
        <Flex gap="1" justify="flex-start">   
          <Box ml="1" mr="1">
          <DashboardGeneralMenu />
          </Box>
          <Stack gap="6">
            <Heading size="4xl" fontWeight="bold" mt={4}>
              Bienvenida Coordinadora General
            </Heading>
            <Text textStyle="2xl">Todo bajo control  Aquí tienes un vistazo rápido de cómo va todo hoy.</Text>
            <Text fontSize="md" color="gray.700">{obtenerFechaActual()}</Text>
          </Stack>
        </Flex>

          <Flex gap="4"  pl="4" pr="4" pt="10" w="full">
          {obtenerSedesPendientes.length > 0 ? (
          obtenerSedesPendientes.slice(0, 3).map((solicitud, index) => (
            <Card.Root key={`${solicitud.nombre_sede}-${solicitud.fecha_solicitud}`} maxW="full" flex="1" overflow="hidden">
              <Card.Header alignItems="center">
                  <Heading size="2xl" display="flex" gap={2}> Solicitud Pendiente <FaBuilding /> </Heading>
              </Card.Header>
              <Card.Body color="fg.muted"  alignItems="center">
                <Flex gap="4">
                  <Text fontSize="lg">{solicitud.nombre_sede}</Text>
                  <Text fontSize="lg">{formatearFecha(solicitud.fecha_solicitud)}</Text>
                  {/* Sede Puebla <FaBuilding /> */}
                </Flex>
                <Text fontSize="lg">Coordinadora: {solicitud.nombre_coord_sede}</Text>
                </Card.Body>
            </Card.Root>
          ))
          ):(
            <Flex
              w="full" h="20vh" align="center" justify="center">
            <Box bg="white" p="8" borderRadius="xl" boxShadow="md" animation="pulse 2s infinite" textAlign="center" >
            <Text fontSize="xl" color="gray.500">
              No hay solicitudes pendientes. Relájate 😉
            </Text>
            </Box>
            </Flex>
          )}
          </Flex>
          <DashboardGeneralGrafica sedesEstado={obtenerSedesEstado} topSedes={obtenerTopSedes}/>
          </Stack>
    </Box>
  );
};

export default DashboardGeneral;