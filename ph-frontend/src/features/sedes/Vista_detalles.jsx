import { Flex, Text, Box, Link, Icon, Badge, Button, ButtonGroup, Spacer, Center } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { RxArrowLeft, RxArrowRight } from "react-icons/rx";
import { LuClock10 } from "react-icons/lu";
import { GrGroup } from "react-icons/gr";
import { FaRegCalendarAlt } from "react-icons/fa";
import AceptarModal from "../../components/modals/AceptarModal.jsx";
import RechazarModal from "../../components/modals/RechazarModal.jsx";
import { getSedesDetalles } from "../../services/vistaDetallesSede.js";
import { obtenerPdf } from "../../services/obtenerPdf.js";
import PDFPreviewer from "../../components/pdfpreview/PDFPreviewer";
import { useParams } from "react-router";


const VistaDetalles = () => {
  const { id } = useParams(); 
  const [estadoSede, setEstadoSede] = useState("pendiente");
  const [sedeActual, setSedeActual] = useState(0);
  const [sedes, setSedes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingPdf, setLoadingPdf] = useState(true);
  const [error, setError] = useState(null);
  const [pdfUrl, setPdfUrl] = useState("");

  const colorEstado = {
    aprobada: "green",
    pendiente: "yellow",
    rechazada: "red"
  };

  useEffect(() => {
    // Función que obtiene los detalles de las sedes
    const fetchSedes = async () => {
      try {
        const data = await getSedesDetalles(id);
        setSedes(data);  // Almacenamos los detalles de las sedes
        if (data.length > 0) {
          // Suponiendo que el primer objeto en el arreglo tiene la propiedad 'convocatoria_url'
          setPdfUrl(data[0].sede.convocatoria_url || "");
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error("Error al cargar sedes:", err);
      }
    };
  
    // Función que obtiene el PDF
    const pdfData = async () => {
      // setLoadingPdf(true);
      try {
        const pdf = await obtenerPdf(id);
        const blob = new Blob([pdf], { type: "application/pdf" }); 
        const pdfUrl = URL.createObjectURL(blob); 
        console.log("URL del PDF:", pdfUrl);
        setPdfUrl(pdfUrl);
        setLoadingPdf(false);
      } catch (error) {
        console.error("Error al obtener el PDF:", error);
      }
    };
  
    // Llamamos a las funciones dentro de useEffect
    fetchSedes();
    pdfData();
  }, []);

  const handleAprobar = () => setEstadoSede("aprobada");
  const handleRechazar = () => setEstadoSede("rechazada");

  // Actualizar PDF cuando cambia la sede actual
  useEffect(() => {
    if (sedes.length > 0 && sedes[sedeActual]) {
      setPdfUrl(sedes[sedeActual].sede.convocatoria_url || "");
    }
  }, [sedeActual, sedes]);

  if (loading) {
    return (
      <Flex minH="100vh" w="100vw" align="center" justify="center">
        <Text>Cargando información de sedes...</Text>
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex minH="100vh" w="100vw" align="center" justify="center">
        <Text color="red.500">Error: {error}</Text>
      </Flex>
    );
  }

  if (sedes.length === 0) {
    return (
      <Flex minH="100vh" w="100vw" align="center" justify="center">
        <Text>No hay sedes registradas</Text>
      </Flex>
    );
  }

  const currentSede = sedes[sedeActual];

  return (
    <Flex 
      minH="100vh"
      w="100vw"
      align="center"
      justify="center"
      bg="gray.50"
      p={3}
    >
      <Flex
        w="full"
        maxW="70vw"
        minH="50vh"
        direction={{ base: "column", md: "row" }}
        bg="white"
        borderRadius="xl"
        boxShadow="lg"
        overflow="hidden"
      >
        {/* Sección Izquierda */}
        <Flex direction="column" flex={1} p={8} gap={6}>
          <Box>
            <Text 
              fontSize="2xl" 
              fontWeight="bold" 
              color="gray.800" 
              mb={4}
            >
              {currentSede.sede.nombre_sede}
            </Text>
            
            <Flex align="center" gap={3} mb={4}>
              <Badge 
                colorPalette={colorEstado[estadoSede]}
                borderRadius="full"
                px={3}
                py={1}
                fontSize="0.8em"
                textTransform="uppercase"
                color={"black"}
              >
                {estadoSede}
              </Badge>
              
              {estadoSede === "pendiente" && (
                <ButtonGroup size="sm" spacing={3}>
                  <AceptarModal onAceptar={handleAprobar} />
                  <RechazarModal onRechazar={handleRechazar} />
                </ButtonGroup>
              )}
            </Flex>
            
            <Flex direction="column" gap={4} mt={4}>
              <Flex align="center" gap={3}>
                <Icon as={FaRegCalendarAlt} color="blue.500" boxSize={5} />
                <Box>
                  <Text fontSize="sm" color="gray.600">Fecha de inicio</Text>
                  <Text fontWeight="medium">{currentSede.sede.fecha_inicio}</Text>
                </Box>
              </Flex>
              
              <Flex align="center" gap={3}>
                <Icon as={LuClock10} color="orange.500" boxSize={6} />
                <Box>
                  <Text fontSize="sm" color="gray.600">Solicitud enviada</Text>
                  <Text fontWeight="medium">{currentSede.sede.fecha_solicitud}</Text>
                </Box>
              </Flex>
            </Flex>
          </Box>

          {/* Tarjeta Coordinadora */}
          <Box 
            border="1px solid"
            borderColor="gray.200"
            borderRadius="lg"
            p={6}
            bg="gray.50"
          >
            <Text 
              fontSize="lg" 
              fontWeight="bold" 
              mb={4} 
              color="gray.800"
            >
              Coordinadora de sede
            </Text>
            
            <Flex direction="column" gap={3}>
              <Text><strong>Nombre:</strong> {currentSede.nombre}</Text>
              <Flex align="center" gap={2}>
                <strong>Correo:</strong>
                <Link href={`mailto:${currentSede.correo}`} color="blue.600"> 
                  {currentSede.correo}
                </Link>
              </Flex>
            </Flex>
          </Box>

          {/* Botón Comunidad */}
          <Center>
            <Button
              colorPalette="purple"
              variant="solid"
              w="10vw"
              borderRadius="md"
              boxShadow="lg"
              _hover={{
                bg: "purple.600",
                boxShadow: "xl",
                transform: "scale(1.05)",
              }}
              _active={{
                bg: "purple.700",
                transform: "scale(1)",
              }}
              transition="all 0.2s ease-in-out"
            >
              Comunidad
              <Icon as={GrGroup} ml={2} />
            </Button>
          </Center>
          
          <Spacer />
          
          {/* Botones de navegación */}
          <Flex justify="space-between" w="full" mt={4}>
            <Button 
              bg="transparent"
              border="1px solid" 
              borderColor="gray.300"  
              color="black"
              onClick={() => setSedeActual(prev => Math.max(0, prev - 1))}
              isDisabled={sedeActual === 0}
              _hover={{
                boxShadow: "xl",
                transform: "scale(1.05)",
              }}
              _active={{
                transform: "scale(1)",
              }}
              transition="all 0.2s ease-in-out"
            >
              <Icon as={RxArrowLeft} mr={2} /> Regresar 
            </Button>
            <Button 
              colorPalette="purple" 
              onClick={() => setSedeActual(prev => Math.min(sedes.length - 1, prev + 1))}
              isDisabled={sedeActual === sedes.length - 1}
              _hover={{
                bg: "purple.600",
                boxShadow: "xl",
                transform: "scale(1.05)",  
              }}
              _active={{
                bg: "purple.700",
                transform: "scale(1)",
              }}
              transition="all 0.2s ease-in-out"
            >
              Siguiente <Icon as={RxArrowRight} ml={2} />
            </Button>
          </Flex>
        </Flex>

        {/* Sección Derecha - PDF */}
        <Box 
          flex={1}
          bg="gray.100"
          p={8}
          display="flex"
          flexDirection="column"
        >
          <Text fontSize="xl" fontWeight="bold" mb={6} color="gray.800">
            Convocatoria
          </Text>
          {loadingPdf ? (
            <Text>Cargando PDF...</Text>
      ) : (
        pdfUrl ? (
          <PDFPreviewer 
            manualMode={true} 
            pdfUrl={pdfUrl}
          />
        ) : (
          <Text>No se pudo cargar el PDF.</Text>
        )
      )}
 
        </Box>
      </Flex>
    </Flex>
  );
};

export default VistaDetalles;