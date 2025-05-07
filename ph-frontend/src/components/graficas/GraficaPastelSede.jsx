import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import { Box, Heading, Flex } from "@chakra-ui/react";
import SelectRol from "./SelectRol.jsx";
import { useState, useEffect } from "react";
import { roles } from "../../utils/roles.jsx";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieSedeChart = ({ usuariosPorRol }) => {
  const [rolSeleccionado, setRolSeleccionado] = useState("participantes");
  const [rolLimpio, setRolLimpio] = useState("participantes"); // nuevo estado interno

  // Corrige rol si llega en forma de array
  useEffect(() => {
    if (Array.isArray(rolSeleccionado)) {
      setRolLimpio(rolSeleccionado[0]);
    } else {
      setRolLimpio(rolSeleccionado);
    }
  }, [rolSeleccionado]);

  const rolLabel = roles.find((r) => r.value === rolLimpio)?.label || rolLimpio;

  console.log("Rol seleccionado:", rolLimpio);
  console.log("Data del rol:", usuariosPorRol[rolLimpio]);

  const rolesConDatos = Object.entries(usuariosPorRol)
    .filter(([rol, datos]) => {
      const aceptadas = rol === "staff" ? datos.aceptados || 0 : datos.aceptadas || 0;
      return aceptadas > 0 || datos.pendientes > 0;
    })
    .map(([rol]) => rol);

  const dataRol = usuariosPorRol[rolLimpio] || {};
  const aceptadas = rolLimpio === "staff" ? dataRol.aceptados || 0 : dataRol.aceptadas || 0;
  const pendientes = dataRol.pendientes || 0;

  console.log("Data para gráfica:", { aceptadas, pendientes });

  const data = {
    labels: ["Aprobadas", "Pendientes"],
    datasets: [
      {
        label: "Usuarios",
        data: [aceptadas, pendientes],
        backgroundColor: [
          "rgba(138, 43, 226, 0.6)",
          "rgba(255, 99, 132, 0.6)",
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
      legend: { position: "bottom" },
    },
    layout: { padding: { bottom: 16 } },
  };

  return (
    <Box bg="white" borderRadius="md" boxShadow="md" h="40vh" w="50vh" p="4" overflow="hidden">
      <Flex align="center" justify="space-between">
        <Heading size="4vh" textTransform="capitalize" mr="60%">
          {rolLabel}
        </Heading>
        <Box minW="2.5rem" ml="auto">
          <SelectRol value={rolLimpio} onChange={setRolSeleccionado} rolesConDatos={rolesConDatos} />
        </Box>
      </Flex>
      {(aceptadas > 0 || pendientes > 0) ? (
        <Pie data={data} options={options} />
      ) : (
        <Flex height="30vh" align="center" justify="center">
          <Heading size="md" color="gray.500">
            No hay datos para este rol
          </Heading>
        </Flex>
      )}
    </Box>
  );
};

export default PieSedeChart;