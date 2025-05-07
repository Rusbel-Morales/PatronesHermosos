import { Box, Heading} from "@chakra-ui/react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const BarChart = ({ personalPorRol }) => {
  console.log("Datos recibidos en personalPorRol:", personalPorRol);
  const data = {
    labels: ["Instructoras", "Facilitadoras", "Staffs", "Mentoras"],
    datasets: [
      {
        label: "Total por Rol",
        data: [
          personalPorRol.total_instructoras,
          personalPorRol.total_facilitadoras,
          personalPorRol.total_staffs,
          personalPorRol.total_mentoras,
        ],
        backgroundColor: "rgba(138, 43, 226, 0.6)",
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
        bottom: 18, // añade espacio extra para etiquetas
      },
    },
  };

  return (
    <Box h="40vh" w="50vh" bg="white" borderRadius="md" boxShadow="md" overflow="hidden">
      <Heading size="md" mb="8" ml="2">Total de Colaboradoras en Sede</Heading>
      <Bar data={data} options={options} />
    </Box>
  );
};

export default BarChart;