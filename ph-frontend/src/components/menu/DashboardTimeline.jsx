import { useEffect, useState } from "react";
import { Text, Timeline, Box, Flex, Spinner } from "@chakra-ui/react";
import { FaBuilding } from "react-icons/fa";
import { getDashboardOverview } from "../../services/dashboardGeneralService";
import { useNavigate } from "react-router";
import { formatearFecha } from "../../utils/formatDateTime";

const DashboardTimeline = () => {
  const [overviewData, setOverviewData] = useState({
    obtenerSedesPendientes: [],
  });

  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOverviewData = async () => {
      try {
        const data = await getDashboardOverview();
        setOverviewData(data);
      } catch (err) {
        console.error("Error al cargar overview:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOverviewData();
  }, []);

  const { obtenerSedesPendientes } = overviewData;
  const sedesMostrar = obtenerSedesPendientes.slice(0, 3); // solo mostramos 3

  const handleClick = (sede, index) => {
    navigate(`/coord-general/gestion-sedes/${sede.id_sede}`, {
      state: {
        sedes: sedesMostrar,
        currentIndex: index,
      },
    });
  };

  return (
    <>
      {isLoading ? (
        <Flex w="full" h="20vh" align="center" justify="center">
          <Spinner size="xl" color="purple.500" />
        </Flex>
      ) : sedesMostrar.length > 0 ? (
        sedesMostrar.slice(0,3).map((solicitud, index) => (
          <Timeline.Root
            maxW="400px"
            key={`${solicitud.id_sede}-${solicitud.fecha_solicitud}`}
            cursor="pointer"
            onClick={() => handleClick(solicitud, index)}
            _hover={{
              bg: "gray.50",
              boxShadow: "md",
              borderRadius: "md",
              transition: "all 0.2s ease-in-out",
            }}
            p={2}
          >
            <Timeline.Item>
              <Timeline.Connector>
                <Timeline.Separator />
                <Timeline.Indicator>
                  <FaBuilding />
                </Timeline.Indicator>
              </Timeline.Connector>
              <Timeline.Content>
                <Timeline.Title>Solicitud Pendiente</Timeline.Title>
                <Timeline.Description>
                  {formatearFecha(solicitud.fecha_solicitud)}
                </Timeline.Description>
                <Text textStyle="sm">{solicitud.nombre_sede}</Text>
                <Text textStyle="sm">
                  Coordinadora: {solicitud.nombre_coord_sede}
                </Text>
              </Timeline.Content>
            </Timeline.Item>
          </Timeline.Root>
        ))
      ) : (
        <Flex w="full" h="10vh" align="center">
          <Box
            bg="white"
            p="8"
            borderRadius="xl"
            boxShadow="md"
            animation="pulse 2s infinite"
            textAlign="center"
          >
            <Text fontSize="xl" color="gray.500">
              No hay solicitudes pendientes. Relájate 😉
            </Text>
          </Box>
        </Flex>
      )}
    </>
  );
};

export default DashboardTimeline;