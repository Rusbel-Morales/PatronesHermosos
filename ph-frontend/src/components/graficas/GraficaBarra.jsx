import { Box, Heading, Spinner, Flex } from "@chakra-ui/react";
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

const BarChart = ({ topSedes }) => {
  console.log("Datos recibidos en topSedes:", topSedes);
  const data = {
    labels: topSedes.map((sede) => sede.nombre_sede),
    datasets: [
      {
        label: "Participantes Registrados",
        data: topSedes.map((sede) => sede.total_participantes),
        backgroundColor: "rgba(138, 43, 226, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <Box w="lg" bg="white" borderRadius="md" boxShadow="md">
      <Heading size="md" mb="8" ml="2">Top 5 Sedes Con Más Participantes</Heading>
      <Bar data={data} options={options} />
    </Box>
  );
};

export default BarChart;