import { useEffect, useState } from "react";
import { Text, Timeline, Box, Flex, Spinner } from "@chakra-ui/react";
import { FaUserCircle } from "react-icons/fa";
import { getDashboardSedeOverview } from "../../services/dashboardSedeService";
import { useNavigate } from "react-router";
import { formatearFecha } from "../../utils/formatDateTime";

const DashboardSedeTimeline = () => {
  const [overviewData, setOverviewData] = useState({
    participantesPendientes: [],
    personalPendiente: [],
  });

  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOverviewData = async () => {
      try {
        const data = await getDashboardSedeOverview();
        setOverviewData(data);
      } catch (err) {
        console.error("Error al cargar overview:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOverviewData();
  }, []);

  const { participantesPendientes, personalPendiente } = overviewData;
  const solicitudesPendientes = [...participantesPendientes, ...personalPendiente].slice(0, 5);

  const handleClick = (item, index) => {
    const idColaborador = item.id_participante || item.id_personal;
  
    if (!idColaborador) {
      console.error("No se pudo determinar el ID del colaborador.");
      return;
    }
  
    navigate(`/coord-sede/gestion-colaboradores/${idColaborador}`, {
      state: {
        colaboradores: solicitudesPendientes,
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
        ) : solicitudesPendientes.length > 0 ? (
            solicitudesPendientes.map((item, index) => (
          <Timeline.Root
            maxW="400px"
            key={`${item.id_participante || item.id_personal}-${item.fecha_solicitud}`}
            cursor="pointer"
            onClick={() => handleClick(item, index)}
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
                  <FaUserCircle />
                </Timeline.Indicator>
              </Timeline.Connector>
              <Timeline.Content>
                <Timeline.Title>Solicitud Pendiente</Timeline.Title>
                <Timeline.Description>
                  {formatearFecha(item.fecha_solicitud)}
                </Timeline.Description>
                <Text textStyle="sm">{item.sede?.nombre_sede}</Text>
                <Text textStyle="sm">Nombre: {item.nombre}</Text>
                <Text textStyle="sm">Fecha de Solicitud: {item.fecha_formulario}</Text>
                <Text textStyle="sm">Rol: {item.rol_preferencia || "Participante"}</Text>
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

export default DashboardSedeTimeline;