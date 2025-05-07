import { Card, Stack, Box, Text, Link, Button } from "@chakra-ui/react";
import { FaArrowUp } from "react-icons/fa";

const SedeFormPreview = ({ formData, fileURL, fileName, handleBackToForm }) => (
    <>
        <Card.Header bg="purple.700" color="white" p={6} borderRadius="md" mb={6}>
            <Card.Title fontWeight="bold" fontSize="3xl">Revisión de Datos</Card.Title>
        </Card.Header>

        <Card.Body bg="white" p={8} borderRadius="md" boxShadow="lg">
            <Stack spacing={6}>
                {/* Datos de la Coordinadora */}
                <Box borderBottom="2px solid" borderColor="gray.200" pb={4}>
                    <Text fontSize="lg" fontWeight="semibold" color="gray.700"><strong>Nombre de la Coordinadora:</strong> {formData.coordSede.nombre}</Text>
                    <Text fontSize="lg" color="gray.600"><strong>Correo:</strong> {formData.coordSede.correo}</Text>
                    <Text fontSize="lg" color="gray.600"><strong>Teléfono:</strong> {formData.coordSede.telefono}</Text>
                </Box>

                {/* Datos de la Sede */}
                <Box borderBottom="2px solid" borderColor="gray.200" pb={4}>
                    <Text fontSize="lg" fontWeight="semibold" color="gray.700"><strong>Nombre de la Sede:</strong> {formData.sede.nombre_sede}</Text>
                    <Text fontSize="lg" color="gray.600"><strong>Grupos a abrir:</strong> {formData.sede.num_grupos_sede}</Text>
                    <Text fontSize="lg" color="gray.600"><strong>Fecha de Inicio:</strong> {formData.sede.fecha_inicio}</Text>
                </Box>

                {/* Archivo Subido */}
                {fileURL && (
                    <Box mt={4} p={6} bg="gray.50" borderRadius="md" boxShadow="sm" border="1px solid" borderColor="gray.200">
                        <Text fontSize="lg" fontWeight="semibold" color="purple.600">
                            <strong>Convocatoria Subida:</strong>
                        </Text>
                        <Link
                            href={fileURL.toString()}  
                            target="_blank"
                            rel="noopener noreferrer"
                            color="purple.500"
                            fontSize="lg"
                            display="flex"
                            alignItems="center"
                            mt={2}
                            onClick={(e) => {
                                // Verificación adicional para URLs no válidas
                                if (!fileURL || typeof fileURL === 'object') {
                                    e.preventDefault();
                                    console.error("URL no válida");
                                }
                            }}
                        >
                            <FaArrowUp /> <Text ml={2}>Ver archivo: {fileName}</Text>
                        </Link>
                    </Box>
                )}
            </Stack>
        </Card.Body>

        <Card.Footer  
        display={{ base: "block", md: "flex" }} // Stack en móviles, flex en pantallas grandes
        justifyContent="space-between"
        mt={{ base: 4, md: 6 }} // Espaciado dinámico
        gap={2}
        > 
            <Button
                onClick={handleBackToForm}
                colorScheme="gray"
                size="sm"
                w={{ base: "full", md: "48%" }} // Ocupa todo el ancho en móviles
                variant="outline"
                _hover={{ bg: "gray.200" }}
                mb={{ base: 2, md: 0 }} // Espacio entre botones en móviles
            >
                Volver
            </Button>
            <Button
                type="submit"
                bg="purple.500"
                size="sm"
                w={{ base: "full", md: "48%" }} // Ocupa todo el ancho en móviles
            >
                <FaArrowUp /> Enviar Información
            </Button>
        </Card.Footer>
    </>
);

export default SedeFormPreview;