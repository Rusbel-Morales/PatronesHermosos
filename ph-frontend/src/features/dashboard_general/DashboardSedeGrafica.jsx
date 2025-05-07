import { Box, Heading, Flex, Stack, Text } from "@chakra-ui/react";
import PieSedeChart from "../../components/graficas/GraficaPastelSede";
import BarChart from "../../components/graficas/GraficaBarraSede";


const DashboardSedeGrafica = ({ usuariosPorRol, personalPorRol }) => {
    return (
    <Box bg="white" w="full" mt="2vh" pb="2vh">
      <Heading size="2xl" pl="4vw">Estadísticas del día:</Heading>
    <Stack  pt="2vh" gap="5" >
        
      <Flex  justify="center" gap="20" w="full">
      {usuariosPorRol &&
      Object.values(usuariosPorRol).some(rol => rol?.aceptadas > 0 || rol?.aceptados > 0 || rol?.pendientes > 0) ? (
        <PieSedeChart usuariosPorRol={usuariosPorRol} />
      ) : (
        <Box p="8" bg="white" borderRadius="xl" boxShadow="md" textAlign="center" h="40vh" w="50vh" display="flex" alignItems="center" justifyContent="center"> 
         <Text fontSize="xl" color="gray.500"> No hay Datos de Sede 📊</Text>
        </Box>
      )}
      {Object.values(personalPorRol).some(val => val > 0) ? (
        <BarChart personalPorRol={personalPorRol} />
      ) : (
        <Box p="8" bg="white" borderRadius="xl" boxShadow="md" textAlign="center" h="40vh" w="50vh" display="flex" alignItems="center" justifyContent="center"> 
          <Text fontSize="xl" color="gray.500"> No hay Datos del Personal por Rol 👥</Text>
        </Box>
      )}
      </Flex>
      </Stack>
    </Box>
    );
  };
  
  export default DashboardSedeGrafica;