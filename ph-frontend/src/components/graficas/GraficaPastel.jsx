import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import { Box, Heading } from "@chakra-ui/react";

// Registrar módulos necesarios
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ sedesEstado }) => {
  // Extrae datos para la gráfica:
  const pendientes = sedesEstado.find(item => item.estado === "pendiente")?.total_sedes || 0;
  const aceptadas = sedesEstado.find(item => item.estado === "aceptado")?.total_sedes || 0;

  const data = {
    labels: ["Aprobadas", "Pendientes"],
    datasets: [
      {
        label: "Sedes",
        data: [aceptadas, pendientes],
        backgroundColor: [
          "rgba(138, 43, 226, 0.6)", // morado
          "rgba(255, 99, 132, 0.6)", // rojo
        ],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
    layout: {
      padding: {
        bottom: 16, // añade espacio extra para etiquetas
      },
    },
    
  };

  return (
    <Box  bg="white"  borderRadius="md" boxShadow="md" h="40vh" w="50vh" p="4" overflow="hidden">
      <Heading size="md" mb="4" ml="2">Sedes Aprobadas/Pendientes</Heading>
      <Pie data={data} options={options} />
    </Box>
  );
};

export default PieChart;