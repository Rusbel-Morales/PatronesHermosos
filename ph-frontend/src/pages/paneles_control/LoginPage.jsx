import React from "react";
import { Box } from "@chakra-ui/react"; // Asegúrate de instalar Chakra UI
import estudiantesImage from "../../assets/estudiantes.jpg";
import InicioSesion from "../../features/inicio_sesion/InicioSesion.jsx";

const Pag_inicio = () => {
  return (
    <Box
      w="100vw"
      h="100vh"
      bgImage={`url(${estudiantesImage})`}
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      bgAttachment="fixed"
      display="flex"
      alignItems="center"
      justifyContent="center"
      color="white"
      position="relative"
    >
      <Box
        position="absolute"
        top="0"
        left="0"
        w="100%"
        h="100%"
        
        opacity="0.5"
      ></Box>

      
      <Box position="relative" zIndex="10" >
        <InicioSesion/>
      </Box>
    </Box>
  );
};

export default Pag_inicio;
