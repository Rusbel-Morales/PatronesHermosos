import { Flex, Text, Box, Icon, Badge, Button, ButtonGroup, Spacer, Center } from "@chakra-ui/react";
import React, { useEffect, useState} from "react";
import { RxArrowLeft, RxArrowRight } from "react-icons/rx";
import { LuClock10 } from "react-icons/lu";
import { GrGroup } from "react-icons/gr";
import { FaRegCalendarAlt, FaChartBar } from "react-icons/fa";
import AceptarModal from "../../components/modals/AceptarModal.jsx";
import RechazarModal from "../../components/modals/RechazarModal.jsx";
import {postAceptarSede, postRechazarSede} from "@/services/detalleSedeService.js";
import {useLocation, useParams, Link} from "react-router-dom";
import PDFPreviewer from "../../components/pdf_previewer/PDFPreviewer.jsx";
import {useNavigate} from "react-router";
import { obtenerPdf } from "../../services/obtenerPdf.js";
import { formatearFecha } from "../../utils/formatDateTime.js";
import { FaTable } from "react-icons/fa6";


const VistaDetalles = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sedes, setSedes] = useState([]);
  const { id } = useParams();
  const [estadoSede, setEstadoSede] = useState("pendiente");
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pdfUrl, setPdfUrl] = useState("");
  const [loadingPdf, setLoadingPdf] = useState(true);

  let bgColor;
  let textColor;
  
  if (estadoSede == "aceptado") {
    bgColor = "green.500";
    textColor = "white";
  } else if (estadoSede == "pendiente") {
    bgColor = "yellow.400";
    textColor = "black";
  } else {
    bgColor = "red.500";
    textColor = "white";
  }




const handleVolver = () => {
  if (location.state?.from) {
    navigate(location.state.from);
  } else {
    navigate("/coord-general/gestion-sedes"); // ruta por defecto
  }
};

const handleVolverdos = () => {
  if (location.state?.from) {
    navigate(location.state.from);
  } else {
    navigate("/coord-general/dashboard"); // ruta por defecto
  }
};

  const handleNext = () => {
    if (currentIndex < sedes.length - 1) {
      navigate(`/coord-general/gestion-sedes/${sedes[currentIndex + 1].id_sede}`, {
        state: { sedes, currentIndex: currentIndex + 1 }
      });
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      navigate(`/coord-general/gestion-sedes/${sedes[currentIndex - 1].id_sede}`, {
        state: { sedes, currentIndex: currentIndex - 1 }
      });
    }
  };

  useEffect(() => {
    const state = location.state;
  
    if (state && state.sedes && typeof state.currentIndex === "number") {
      setSedes(state.sedes);
      setCurrentIndex(state.currentIndex);
      setEstadoSede(state.sedes[state.currentIndex].estado);
      // Cargar el PDF cuando cambia la sede
      loadPdf(state.sedes[state.currentIndex].id_sede);
    }
  }, [location.state, id]);

  const loadPdf = async (sedeId) => {
    setLoadingPdf(true);
    try {
      const pdf = await obtenerPdf(sedeId);
      const blob = new Blob([pdf], { type: "application/pdf" }); 
      const pdfUrl = URL.createObjectURL(blob); 
      setPdfUrl(pdfUrl);
    } catch (error) {
      console.error("Error al obtener el PDF:", error);
      setPdfUrl("");
    } finally {
      setLoadingPdf(false);
    }
  };

  const handleAprobar = async () => {
    await postAceptarSede(id);
    setEstadoSede("aceptado");
  };

  const handleRechazar = async () => {
    await postRechazarSede(id);
    setEstadoSede("rechazado");
  };

  if (error) {
    return (
      <Flex minH="100vh" w="100vw" align="center" justify="center">
        <Text color="red.500">Error: {error}</Text>
      </Flex>
    );
  }

  if (Object.keys(sedes).length === 0) {
    return (
      <Flex minH="100vh" w="100vw" align="center" justify="center">
        <Text>No hay sedes registradas</Text>
      </Flex>
    );
  }

  return (
    <Flex 
      minH="100vh"
      w="100vw"
      align="center"
      justify="center"
      bg="purple.100"
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
          <Flex direction="row" gap={3}>

                      <Button
                        onClick={handleVolver}
                        leftIcon={<RxArrowLeft />}
                        variant="outline"
                        size="sm"
                        color="gray.600"
                        _hover={{ color: "black", transform: "scale(1.05)" }}
                        mb={4}
                        alignSelf="flex-start"
                      >
                       <FaTable /> Volver a tabla de sedes
                      </Button>

                      <Button
                        onClick={handleVolverdos}
                        leftIcon={<RxArrowLeft />}
                        variant="outline"
                        size="sm"
                        color="gray.600"
                        _hover={{ color: "black", transform: "scale(1.05)" }}
                        mb={2}
                        alignSelf="flex-start"
                      >
                        <FaChartBar /> Volver a Dashboard
                      </Button>
                    </Flex>


            <Text
              fontSize="2xl" 
              fontWeight="bold" 
              color="gray.800" 
              mb={4}
            >
              {sedes[currentIndex].nombre_sede}
            </Text>
            
            <Flex align="center" gap={3} mb={4}>
              <Badge
                borderRadius="full"
                px={3}
                py={1}
                fontSize="0.8em"
                textTransform="uppercase"
                bg={bgColor}
                color={textColor}
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
                  <Text fontWeight="medium">{formatearFecha(sedes[currentIndex].fecha_inicio)}</Text>
                </Box>
              </Flex>
              
              <Flex align="center" gap={3}>
                <Icon as={LuClock10} color="orange.500" boxSize={6} />
                <Box>
                  <Text fontSize="sm" color="gray.600">Solicitud enviada</Text>
                  <Text fontWeight="medium">{formatearFecha(sedes[currentIndex].fecha_solicitud)}</Text>
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
              <Text><strong>Nombre:</strong> {sedes[currentIndex].nombre_coord_sede}</Text>
              <Flex align="center" gap={2}>
                <strong>Correo:</strong>
                <Link href={`mailto:${sedes[currentIndex].correo_coord_sede}`} color="blue.600">
                  {sedes[currentIndex].correo_coord_sede}
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
              <GrGroup />
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
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              _hover={{
                boxShadow: "xl",
                transform: "scale(1.05)",
              }}
              _active={{
                transform: "scale(1)",
              }}
              transition="all 0.2s ease-in-out"
            >
              <RxArrowLeft /> Regresar 
            </Button>
            <Button 
              colorPalette="purple" 
              onClick={handleNext}
              disabled={currentIndex === sedes.length - 1}
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
              Siguiente <RxArrowRight />
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
          ) : pdfUrl ? (
            <PDFPreviewer 
              manualMode={true} 
              pdfUrl={pdfUrl}
            />
          ) : (
            <Box 
              flex={1}
              bg="white"
              borderRadius="md"
              border="2px dashed"
              borderColor="gray.300"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text color="gray.500">No hay documento PDF disponible</Text>
            </Box>
          )}
        </Box>
      </Flex>
    </Flex>
  );
};

export default VistaDetalles;