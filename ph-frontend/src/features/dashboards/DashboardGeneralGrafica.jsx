import { useState } from "react";
import { useEffect } from "react";
import { Box, Heading, Flex, Stack, Text } from "@chakra-ui/react";
import PieChart from "../../components/graficas/GraficaPastel";
import BarChart from "../../components/graficas/GraficaBarra";


const DashboardGeneralGrafica = ({ sedesEstado, topSedes }) => {
    return (
    <Box bg="white" w="full" mt="5">
    <Stack pl="4" pt="5" gap="5" >
        <Heading size="2xl">Estadísticas del día:</Heading>
      <Flex  justify="center" gap="20" w="full">
      {sedesEstado.length > 0 ? (
        <PieChart sedesEstado={sedesEstado}/>
      ) : (
        <Box p="8" bg="white" borderRadius="xl" boxShadow="md" textAlign="center" minH="300px" display="flex" alignItems="center" justifyContent="center"> 
          <Text fontSize="xl" color="gray.500"> No hay datos de estados de sede 📊</Text>
        </Box>
      )}
      {topSedes.length > 0 ? (
        <BarChart topSedes={topSedes}/>
      ) : (
        <Box p="8" bg="white" borderRadius="xl" boxShadow="md" textAlign="center" minH="300px" display="flex" alignItems="center" justifyContent="center"> 
          <Text fontSize="xl" color="gray.500"> No hay datos del top de sedes 🏆</Text>
        </Box>
      )}
      </Flex>
      </Stack>
    </Box>
    );
  };
  
  export default DashboardGeneralGrafica;