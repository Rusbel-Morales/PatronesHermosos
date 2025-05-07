"use client";

import {
  Portal,
  Select,
  Stack,
  createListCollection,
  NumberInput,
  Field,
  Flex, 
  Text, 
  Icon, 
  Box
} from "@chakra-ui/react";
import { MdModeEdit, MdCheck, MdLanguage } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import { motion } from "framer-motion";
import { FiBookOpen } from "react-icons/fi";
import { BsFillPeopleFill } from "react-icons/bs";

const idiomas = createListCollection({
  items: [
    { label: "Inglés", value: "ingles" },
    { label: "Español", value: "espanol" },
  ],
});

const niveles = createListCollection({
  items: [
    { label: "Básico", value: "basico" },
    { label: "Avanzado", value: "avanzado" },
  ],
});

export const CrearGrupo = ({ 
  nombreInicial, 
  idiomaInicial, 
  nivelInicial, 
  cupoInicial, 
  onEliminar, 
  onGuardar 
}) => {
  const MotionIcon = motion.div;
  const [cupo, setCupo] = useState(cupoInicial);
  const [selectedIdioma, setSelectedIdioma] = useState(idiomaInicial || "");
  const [selectedNivel, setSelectedNivel] = useState(nivelInicial || "");
  const [isEditing, setIsEditing] = useState(false);

  const handleGuardar = () => {
    if (onGuardar) {
      onGuardar({
        idioma: selectedIdioma,
        nivel: selectedNivel,
        cupo: cupo
      });
    }
    setIsEditing(false);
  };

  return (
    <Stack 
      justifyContent="center" 
      alignItems="center" 
      pt={5} 
      spacing={6}
      width="100%"
      maxWidth="60vw"
      margin="0 auto"
    >
      {/* Encabezado del grupo */}
      <Flex 
        width="100%"
        align="center" 
        justify="space-between"
        bg="purple.700"
        p={6}
        borderRadius="lg"
        boxShadow="md"
      >
        <Text fontSize="xl" fontWeight="bold" color="white">
          {nombreInicial}
        </Text>
        <Flex gap={4} align="center">
          {isEditing ? (
            <MotionIcon
              key="check"
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 180, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ display: "inline-block", cursor: "pointer" }}
              onClick={handleGuardar}
            >
              <MdCheck size={20} color="white" />
            </MotionIcon>
          ) : (
            <MotionIcon
              key="edit"
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 180, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ display: "inline-block", cursor: "pointer" }}
              onClick={() => setIsEditing(true)}
            >
              <MdModeEdit size={20} color="white" />
            </MotionIcon>
          )}

          <Icon 
            as={FaTrashAlt} 
            boxSize={5} 
            cursor="pointer" 
            color="white"
            _hover={{ color: "red.200" }}
            onClick={onEliminar}
          />
        </Flex>
      </Flex>

      {/* Contenedor de campos del formulario */}
      <Box 
        width="100%"
        bg="white"
        p={8}
        borderRadius="lg"
        boxShadow="md"
        borderWidth="1px"
        borderColor="gray.100"
      >
        <Stack spacing={6}>
          {/* Campo de Idioma */}
          <Flex align="center" width="100%">
            <Flex align="center" width="160px" flexShrink={0}>
              <Icon as={MdLanguage} color="purple.500" boxSize={5} mr={2} />
              <Text fontSize="lg" fontWeight="medium" color="gray.700">
                Idioma
              </Text>
            </Flex>
            
            <Box flex="1" ml={4}>
              <Select.Root 
                collection={idiomas}
                value={selectedIdioma}
                onValueChange={(value) => setSelectedIdioma(value?.value)}
                disabled={!isEditing}
              >
                <Select.Control width="100%">
                  <Select.Trigger 
                    bg="white" 
                    borderColor="gray.300" 
                    _hover={{ borderColor: "purple.300" }}
                    height="42px"
                    px={4}
                    width="100%"
                  >
                    <Select.ValueText placeholder="Selecciona idioma" />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    <Select.Indicator color="purple.500" />
                  </Select.IndicatorGroup>
                </Select.Control>
                <Portal>
                  <Select.Positioner>
                    <Select.Content 
                      bg="white" 
                      boxShadow="xl" 
                      borderRadius="md"
                      borderWidth="1px"
                      borderColor="purple.100"
                    >
                      {idiomas.items.map((item) => (
                        <Select.Item 
                          item={item} 
                          key={item.value}
                          _hover={{ bg: "purple.50" }}
                          _selected={{ bg: "purple.100" }}
                        >
                          {item.label}
                          <Select.ItemIndicator color="purple.500" />
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Positioner>
                </Portal>
              </Select.Root>
            </Box>
          </Flex>

          {/* Campo de Nivel */}
          <Flex align="center" width="100%">
            <Flex align="center" width="160px" flexShrink={0}>
              <Icon as={FiBookOpen} color="purple.500" boxSize={5} mr={2} />
              <Text fontSize="lg" fontWeight="medium" color="gray.700">
                Nivel
              </Text>
            </Flex>
            <Box flex="1" ml={4}>
              <Select.Root 
                collection={niveles}
                value={selectedNivel}
                onValueChange={(value) => setSelectedNivel(value?.value)}
                disabled={!isEditing}
              >
                <Select.Control width="100%">
                  <Select.Trigger 
                    bg="white" 
                    borderColor="gray.300" 
                    _hover={{ borderColor: "purple.300" }}
                    height="42px"
                    px={4}
                    width="100%"
                  >
                    <Select.ValueText placeholder="Selecciona nivel" />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    <Select.Indicator color="purple.500" />
                  </Select.IndicatorGroup>
                </Select.Control>
                <Portal>
                  <Select.Positioner>
                    <Select.Content 
                      bg="white" 
                      boxShadow="xl" 
                      borderRadius="md"
                      borderWidth="1px"
                      borderColor="purple.100"
                    >
                      {niveles.items.map((item) => (
                        <Select.Item 
                          item={item} 
                          key={item.value}
                          _hover={{ bg: "purple.50" }}
                          _selected={{ bg: "purple.100" }}
                        >
                          {item.label}
                          <Select.ItemIndicator color="purple.500" />
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Positioner>
                </Portal>
              </Select.Root>
            </Box>
          </Flex>

          {/* Campo de Cupo */}
          <Flex align="center" width="100%">
            <Flex align="center" width="160px" flexShrink={0}>
              <Icon as={BsFillPeopleFill} color="purple.500" boxSize={5} mr={2} />
              <Text fontSize="lg" fontWeight="medium" color="gray.700">
                Cupo
              </Text>
            </Flex>
            <Box flex={1} ml={4}>
              <Field.Root>
                <NumberInput.Root 
                  disabled={!isEditing}
                  value={cupo} 
                  onValueChange={(details) => setCupo(details.value)}
                  width="100%" 
                  min={5} 
                  max={40}
                >
                  <NumberInput.Control 
                    borderColor="gray.300"
                    _hover={{ borderColor: "purple.300" }}
                  />
                  <NumberInput.Input />
                </NumberInput.Root>
                <Field.HelperText color="gray.500">
                  El grupo debe tener entre 5 y 40 personas
                </Field.HelperText>
              </Field.Root>
            </Box>
          </Flex>
        </Stack>
      </Box>
    </Stack>
  );
};

export default CrearGrupo;