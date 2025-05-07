"use client"
import { useEffect, useState } from "react";
import {
  Heading, Flex, Stack, Box, Text, Card, Button, Circle, Float,
  useDisclosure, Portal, CloseButton
} from "@chakra-ui/react";
import { Dialog } from "@chakra-ui/react";
import { LuBell, LuPlus } from "react-icons/lu";
import DashboardSedeMenu from "../../components/menu/DashboardSedeMenu.jsx";
import DashboardSedeTimeline from "../../components/menu/DashboardSedeTimeline.jsx";
import DashboardSedeGrafica from "../../features/dashboard_general/DashboardSedeGrafica.jsx";
import { getDashboardSedeOverview } from "../../services/dashboardSedeService.js";
import { obtenerFechaActual } from "../../utils/obtenerFechaActual.js";
import UserProfile from "../../features/user_profile/UserProfile.jsx";
import MentoraForm from "../../features/mentoras/Formulario.mentora.jsx";

const DashboardGeneralPage = () => {
  const [overviewData, setOverviewData] = useState({
    staff: {
      aceptados: 0,
      pendientes: 0
    },
    instructoras: {
      aceptadas: 0,
      pendientes: 0
    },
    facilitadoras: {
      aceptadas: 0,
      pendientes: 0
    },
    participantes: {
      aceptadas: 0,
      pendientes: 0
    },
    totalPersonalRol: {
      total_instructoras: 0,
      total_facilitadoras: 0,
      total_staffs: 0,
      total_mentoras: 0
    },
    participantesPorEstado: {
      total_aceptadas: 0,
      total_pendientes: 0
    },
    numSolicitudes: {
      participantes: 0,
      personal: 0
    }
  });

  
  const [mostrarTimeline, setMostrarTimeline] = useState(false);
  const nombreSede = localStorage.getItem("nombre_sede") || "tu sede";
  const idSede = localStorage.getItem("id_sede");

  const fetchOverviewData = async () => {
    try {
      const data = await getDashboardSedeOverview();

      const estadoUsuarios = data.usuariosEstadoRol || {};
      const participantes = data.participantesPorEstado || {};
      const totalPersonalRol = data.totalPersonalRol || {};
      const participantesPorEstado = data.participantesPorEstado || {};
      const numSolicitudes = data.numSolicitudes || {};
      const participantesPendientes = data.participantesPendientes || [];
      const personalPendiente = data.personalPendiente || [];

      setOverviewData({
        staff: {
          aceptados: estadoUsuarios.staff?.aceptados || 0,
          pendientes: estadoUsuarios.staff?.pendientes || 0,
        },
        instructoras: {
          aceptadas: estadoUsuarios.instructoras?.aceptadas || 0,
          pendientes: estadoUsuarios.instructoras?.pendientes || 0,
        },
        facilitadoras: {
          aceptadas: estadoUsuarios.facilitadoras?.aceptadas || 0,
          pendientes: estadoUsuarios.facilitadoras?.pendientes || 0,
        },
        participantes: {
          aceptadas: participantes.total_aceptadas || 0,
          pendientes: participantes.total_pendientes || 0,
        },
        totalPersonalRol: {
          total_instructoras: totalPersonalRol.total_instructoras || 0,
          total_facilitadoras: totalPersonalRol.total_facilitadoras || 0,
          total_staffs: totalPersonalRol.total_staffs || 0,
          total_mentoras: totalPersonalRol.total_mentoras || 0
        },
        participantesPorEstado: {
          total_aceptadas: participantesPorEstado.total_aceptadas || 0,
          total_pendientes: participantesPorEstado.total_pendientes || 0,
        },
        numSolicitudes: {
          participantes: numSolicitudes.participantes || 0,
          personal: numSolicitudes.personal || 0
        },
        participantesPendientes: participantesPendientes,
        personalPendiente: personalPendiente
      });
    } catch (err) {
      console.error("Error al cargar overview:", err);
    }
  };

  useEffect(() => {
    fetchOverviewData();
  }, []);

  const { staff, instructoras, facilitadoras, participantes, participantesPorEstado, numSolicitudes, participantesPendientes, personalPendiente } = overviewData;
  const totalAceptadasEstado = participantesPorEstado.total_aceptadas;
  const totalPendientesEstado = participantesPorEstado.total_pendientes;
  const numeroSolicitudes = numSolicitudes.participantes + numSolicitudes.personal;

  const usuariosPorEstado = [
    {
      estado: "aceptado",
      total_sedes:
        staff.aceptados +
        instructoras.aceptadas +
        facilitadoras.aceptadas +
        participantes.aceptadas
    },
    {
      estado: "pendiente",
      total_sedes:
        staff.pendientes +
        instructoras.pendientes +
        facilitadoras.pendientes
    }
  ];

  const totalAprobadas = usuariosPorEstado.find(e => e.estado === "aceptado")?.total_sedes || 0;
  const totalPendientes = usuariosPorEstado.find(e => e.estado === "pendiente")?.total_sedes || 0;

  return (
    <Box bg="purple.100" w="full">
      <Stack w="full">
        <Flex gap="1" justify="flex-start">   
          <Box ml="1vw" mr="1vw" mt="1vh">
            <DashboardSedeMenu />
          </Box>
          <Stack gap="6">
            <Flex mt="2vh" gap="15vw" align="center" justify="space-between">
              <Text fontSize="4vh" fontWeight="bold" >
                Bienvenida Coordinadora de Sede {nombreSede}
              </Text>
              <Flex gap="1" align="center">
                
                <Box position="relative">
                  <Button variant="ghost" mr="1vh" colorPalette="white" size="xl" onClick={() => setMostrarTimeline((prev) => !prev)}>
                    <LuBell />
                  </Button>
                  {participantesPendientes?.length > 0 || personalPendiente?.length > 0 ? (
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
                        {Math.min(
                          (participantesPendientes?.length || 0) + (personalPendiente?.length || 0),
                          5
                        )} 
                      </Circle>
                    </Float>
                  ) : null} 
                </Box>
                <UserProfile />
              </Flex>
            </Flex>

            {mostrarTimeline && <DashboardSedeTimeline />}

            <Text fontSize="3vh">Todo bajo control. Aquí tienes un vistazo rápido de tu sede.</Text>
            <Text fontSize="2vh" color="gray.700">{obtenerFechaActual()}</Text>
          </Stack>
        </Flex>

        <Flex w="100vw"  flexWrap="wrap" justify="center" gap= "7vh" py="3" pr="4vw" pl="4vw">
          <Card.Root w="30vw"  borderRadius="xl" boxShadow="md">
            <Card.Header alignItems="center">
              <Flex align="space-between" gap="5">
                <Text fontSize="3vh" display="flex" fontWeight="bold"> Participantes Pendientes</Text>
                <Box bg="purple.200" borderRadius="full" boxShadow="md" w="4vw" h="4vh" fontSize="3vh" alignItems="center" display="flex" justifyContent="center">
                  <Text>⏳</Text>
                </Box>
              </Flex>
            </Card.Header>
            <Card.Body color="fg.muted" alignItems="center">
              <Flex gap="4">
                <Text fontSize="3vh" fontWeight="extrabold" color="purple.700">{totalPendientesEstado}</Text>
              </Flex>
            </Card.Body>
          </Card.Root>

          <Card.Root w="30vw"  borderRadius="xl" boxShadow="md">
            <Card.Header alignItems="center">
            <Flex align="space-between" gap="5">
                <Text fontSize="3vh" display="flex" fontWeight="bold"> Participantes Aprobadas</Text>
                <Box bg="purple.200" borderRadius="full" boxShadow="md" w="4vw" h="4vh" fontSize="3vh" alignItems="center" display="flex" justifyContent="center">
                  <Text>✓</Text>
                </Box>
              </Flex>
            </Card.Header>
            <Card.Body color="fg.muted" alignItems="center">
              <Flex gap="4">
                <Text fontSize="3vh" fontWeight="extrabold" color="purple.700">{totalAceptadasEstado}</Text>
              </Flex>
            </Card.Body>
          </Card.Root>

          <Card.Root w="30vw"  borderRadius="xl" boxShadow="md">
            <Card.Header alignItems="center">
            <Flex align="space-between" gap="5">
                <Text fontSize="3vh" display="flex" fontWeight="bold">Colaboradoras Pendientes</Text>
                <Box bg="purple.200" borderRadius="full" boxShadow="md" w="4vw" h="4vh" fontSize="3vh" alignItems="center" display="flex" justifyContent="center">
                  <Text>⏳</Text>
                </Box>
              </Flex>
            </Card.Header>
            <Card.Body color="fg.muted" alignItems="center">
              <Flex gap="4">
                <Text fontSize="3vh" fontWeight="extrabold" color="purple.700">{totalPendientes}</Text>
              </Flex>
            </Card.Body>
          </Card.Root>

          <Card.Root w="30vw"  borderRadius="xl" boxShadow="md">
            <Card.Header alignItems="center">
            <Flex align="space-between" gap="5">
                <Text fontSize="3vh" display="flex"  fontWeight="bold"> Solicitudes Nuevas</Text>
                <Box bg="purple.200" borderRadius="full" boxShadow="md" w="4vw" h="4vh" fontSize="3vh" alignItems="center" display="flex" justifyContent="center">
                  <Text>🔔</Text>
                </Box>
              </Flex>
            </Card.Header>
            <Card.Body color="fg.muted" alignItems="center">
              <Flex gap="4">
                <Text fontSize="3vh" fontWeight="extrabold" color="purple.700">{numeroSolicitudes}</Text>
              </Flex>
            </Card.Body>
          </Card.Root>
        </Flex>
        <DashboardSedeGrafica usuariosPorRol={overviewData} personalPorRol={overviewData.totalPersonalRol} />
      </Stack>
    </Box>
  );
};


export default DashboardGeneralPage;