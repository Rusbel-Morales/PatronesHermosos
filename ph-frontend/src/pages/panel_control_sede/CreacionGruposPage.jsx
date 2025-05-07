"use client";
import { useState } from "react";
import { 
  Box, 
  Stack, 
  Flex, 
  Text,   
  Button 
} from "@chakra-ui/react";
import DashboardSedeMenu from "../../components/menu/DashboardSedeMenu.jsx";
import CrearGrupo from "../../components/grupo/CrearGrupo.jsx";
import CrearGrupoDialog from "./Cuestionario.jsx"; 
import { registrarGrupos } from "../../services/crearGrupoService.js";
import { FiPlus, FiUpload, FiInbox } from "react-icons/fi";

const CreacionGruposPage = () => {
  const [nombreSede] = useState(localStorage.getItem("nombre_sede") || "tu sede");
  const [grupos, setGrupos] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);

  // Función para eliminar grupo
  const eliminarGrupo = (id) => {
    setGrupos(grupos.filter((grupo) => grupo.id !== id));
  };



  // Función para actualizar un grupo existente
  const actualizarGrupo = (id, datosActualizados) => {
    setGrupos((prevGrupos) =>
      prevGrupos.map((grupo) =>
        grupo.id === id ? { ...grupo, ...datosActualizados } : grupo
      )
    );
  };

  // Función para agregar grupos desde el diálogo
  const agregarGruposDesdeDialog = (nuevosGrupos) => {
    const gruposConId = nuevosGrupos.map(grupo => ({
      id: Date.now() + Math.random(),
      ...grupo
    }));
    setGrupos(prevGrupos => [...prevGrupos, ...gruposConId]);
  };

  // Función para normalizar solo los valores de idioma y nivel
  const normalizarValores = (grupos) => {
    const idiomaMap = {
      espanol: "Español",
      ingles: "Inglés"
    };
  
    const nivelMap = {
      basico: "Básico",
      intermedio: "Intermedio",
      avanzado: "Avanzado"
    };
  
    // Normalizamos solo los valores de idioma y nivel
    return grupos.map(({ idioma, nivel, cupo, ...resto }) => ({
      ...resto,
      idioma: idiomaMap[idioma] || idioma,
      nivel: nivelMap[nivel] || nivel,
      cupo_max: parseInt(cupo, 10)  
    }));
  };

  // Función para enviar los grupos al backend
  const handleEnviarGrupos = async () => {
    if (grupos.length === 0) {
      setError("No hay grupos que registrar.");
      setMensaje("");
      return;
    }
  
    try {
      setEnviando(true);
      setError("");
      setMensaje("");
  
      // Normalizamos los valores de idioma y nivel
      const gruposNormalizados = normalizarValores(grupos);
  
      const response = await registrarGrupos(gruposNormalizados);
  
      // Si la respuesta es exitosa, se muestra el mensaje de éxito.
      if (response && response.message === "Grupos registrados con éxito") {
        setMensaje("Grupos registrados con éxito.");
        setGrupos([]); // Limpiar los grupos después de registrarlos.
      }
  
    } catch (e) {
      // Si ocurrió un error, se maneja y se muestra un mensaje de error.
      setError("Ocurrió un error al registrar los grupos.");
    } finally {
      setEnviando(false);
    }
  };


  return (
    <Box bg="purple.100" w="full" minH="100vh">
      <Stack w="full">
        {/* Encabezado mejorado */}
        <Flex 
          gap="1" 
          justify="flex-start" 
          shadow="md" 
          p={4} 
          alignItems="center"
          color="white"
        >   
          <Box paddingBlockEnd={3} paddingRight={3}>
            <DashboardSedeMenu color="white" />
          </Box>
          <Text color="black" fontSize="4xl" fontWeight="bold">
            Gestión de grupos
          </Text>
        </Flex>

        {/* Barra de herramientas mejorada */}
        <Flex 
          justify="space-between"
          align="center" 
          p={4} 
          bg="white" 
          mx={4} 
          mt={4} 
          borderRadius="lg" 
          boxShadow="sm"
          gap={4}
          borderWidth="1px"
          borderColor="gray.100"
        >
          <CrearGrupoDialog 
            onCrearGrupo={agregarGruposDesdeDialog} 
            trigger={
              <Button 
                colorPalette="purple" 
                _hover={{ transform: "scale(1.05)" }}
              >
                <FiPlus /> Agregar Grupos
              </Button>
            }
          />
          
          <Button 
            colorPalette="purple"
            onClick={handleEnviarGrupos}
            Loading={enviando}
            loadingText="Enviando..."
            rightIcon={!enviando && <FiUpload />}
            _hover={{ transform: "scale(1.05)" }}
            boxShadow="md"
          >
            <FiUpload /> Registrar Grupos
          </Button>
        </Flex>

        {/* Mensajes de éxito o error */}
        {(mensaje || error) && (
          <Box 
            px={4}
            py={2}
            bg={mensaje ? "green.50" : "red.50"}
            borderRadius="md"
            borderLeftWidth="4px"
            borderColor={mensaje ? "green.500" : "red.500"}
            mx={4}
            mt={2}
          >
            <Text 
              color={mensaje ? "green.800" : "red.800"}
              fontWeight="medium"
            >
              {mensaje || error}
            </Text>
          </Box>
        )}

        {/* Contenedor de grupos */}
        <Stack spacing={8} p={4}>
          {grupos.length > 0 ? (
            grupos.map((grupo, index) => (
              <CrearGrupo 
                key={grupo.id}
                nombreInicial={`Grupo ${index + 1}`} 
                idiomaInicial={grupo.idioma}
                nivelInicial={grupo.nivel}
                cupoInicial={grupo.cupo}
                onEliminar={() => eliminarGrupo(grupo.id)}
                onGuardar={(datosActualizados) => actualizarGrupo(grupo.id, datosActualizados)} 
              />
            ))
          ) : (
            <Flex 
              justify="center" 
              align="center" 
              bg="white" 
              p={8} 
              borderRadius="lg" 
              boxShadow="sm"
              flexDirection="column"
              gap={4}
              borderWidth="1px"
              borderColor="gray.200"
            >
              <FiInbox size={32} color="#718096" />
              <Text color="gray.500" fontSize="lg">
                No hay grupos creados aún
              </Text>
            </Flex>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default CreacionGruposPage;
