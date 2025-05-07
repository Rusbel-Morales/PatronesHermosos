import { useState } from "react";
import { useEffect } from "react";
import { Box, Heading, Flex, Stack, Text } from "@chakra-ui/react";
import PieChart from "../../components/graficas/GraficaPastel";
import BarChart from "../../components/graficas/GraficaBarra";


const DashboardGeneralGrafica = ({ sedesEstado, topSedes }) => {
    return (
    <Box bg="white" w="full" mt="2vh" pb="2vh">
      <Heading size="2xl" pl="4vw">Estadísticas del día:</Heading>
    <Stack  pt="2vh" gap="5" >
        
      <Flex  justify="center" gap="20" w="full">
      {sedesEstado.length > 0 ? (
        <PieChart sedesEstado={sedesEstado}/>
      ) : (
        <Box p="8" bg="white" borderRadius="xl" boxShadow="md" textAlign="center" h="40vh" w="50vh" display="flex" alignItems="center" justifyContent="center"> 
          <Text fontSize="xl" color="gray.500"> No hay Datos de Sede 📊</Text>
        </Box>
      )}
      {topSedes.length > 0 ? (
        <BarChart topSedes={topSedes}/>
      ) : (
        <Box p="8" bg="white" borderRadius="xl" boxShadow="md" textAlign="center" h="40vh" w="50vh" display="flex" alignItems="center" justifyContent="center"> 
          <Text fontSize="xl" color="gray.500"> No hay Datos del Top de Sedes 🏆</Text>
        </Box>
      )}
      </Flex>
      </Stack>
    </Box>
    );
  };
  
  export default DashboardGeneralGrafica;