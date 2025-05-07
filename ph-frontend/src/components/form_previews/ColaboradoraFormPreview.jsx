import { Card, Stack, Box, Text, Link, Button } from "@chakra-ui/react";
import { FaArrowUp } from "react-icons/fa";

const ColaboradoraFormPreview = ({ formData, fileURL, fileName, handleBackToForm }) => (
    <>
        {/* Vista previa */}
        <Card.Header bg="purple.700" color="white" p={6} borderRadius="md" mb={6}>
            <Card.Title fontWeight="bold" fontSize="3xl">Revisión de Datos</Card.Title>
        </Card.Header>
        <Card.Body bg="white" p={8} borderRadius="md" boxShadow="lg">
            <Stack spacing={6}>
                {/* Datos del Personal */}
                <Box borderBottom="2px solid" borderColor="gray.200" pb={4}>
                    <Text fontSize="lg" fontWeight="semibold" color="gray.700">
                        <strong>Nombre del Personal:</strong> {formData.personal.nombre}
                    </Text>
                    <Text fontSize="lg" color="gray.600">
                        <strong>Correo:</strong> {formData.personal.correo}
                    </Text>
                    <Text fontSize="lg" color="gray.600">
                        <strong>Campus de Origen:</strong> {formData.personal.universidad_origen}
                    </Text>
                    <Text fontSize="lg" color="gray.600">
                        <strong>Carrera:</strong> {formData.personal.carrera}
                    </Text>
                </Box>

                {/* Datos de Participación */}
                <Box borderBottom="2px solid" borderColor="gray.200" pb={4}>
                    <Text fontSize="lg" fontWeight="semibold" color="gray.700">
                        <strong>Sede de Participación:</strong> {formData.sede.nombre_sede}
                    </Text>
                    <Text fontSize="lg" color="gray.600">
                        <strong>Idioma de Preferencia:</strong> {formData.personal.idioma_preferencia}
                    </Text>
                    <Text fontSize="lg" color="gray.600">
                        <strong>Nivel de Preferencia:</strong> {formData.personal.nivel_preferencia}
                    </Text>
                    <Text fontSize="lg" color="gray.600">
                        <strong>Rol de Preferencia:</strong> {formData.personal.rol_preferencia}
                    </Text>
                </Box>

                {/* Archivo Subido */}
                {fileURL && (
                    <Box mt={4} p={6} bg="gray.50" borderRadius="md" boxShadow="sm" border="1px solid" borderColor="gray.200">
                        <Text fontSize="lg" fontWeight="semibold" color="purple.600">
                            <strong>Archivo Subido:</strong>
                        </Text>
                        <Link href={fileURL} isExternal color="purple.500" fontSize="lg" display="flex" alignItems="center" mt={2}>
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
                w={{ base: "full", md: "48%" }}
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

export default ColaboradoraFormPreview;