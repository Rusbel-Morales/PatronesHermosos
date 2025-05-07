import {
  Button,
  Dialog,
  Field,
  Input,
  Portal,
  Select,
  Slider,
  Stack,
  Code,
  NumberInput,
  createListCollection,
  Flex,
  Box,
  Text,
  Icon,
  IconButton
} from "@chakra-ui/react";
import { useState } from "react";
import { FiBookOpen } from "react-icons/fi";
import { BsFillPeopleFill, BsPlus } from "react-icons/bs";
import { MdModeEdit, MdCheck, MdLanguage } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";

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

const CrearGrupoDialog = ({ onCrearGrupo }) => {
  const [grupos, setGrupos] = useState([
    { idioma: "", nivel: "", cupo: 7 }
  ]);

  const handleAgregarGrupo = () => {
    setGrupos([...grupos, { idioma: "", nivel: "", cupo: 7 }]);
  };

  const handleEliminarGrupo = (index) => {
    if (grupos.length <= 1) return;
    const nuevosGrupos = [...grupos];
    nuevosGrupos.splice(index, 1);
    setGrupos(nuevosGrupos);
  };

  const actualizarGrupo = (index, campo, valor) => {
    const nuevosGrupos = [...grupos];
    nuevosGrupos[index][campo] = valor;
    setGrupos(nuevosGrupos);
  };

  const handleGuardar = () => {
    // Filtrar solo los grupos completos
    const gruposCompletos = grupos.filter(
      grupo => grupo.idioma && grupo.nivel && grupo.cupo >= 5
    );
    
    if (gruposCompletos.length === 0) {
      alert("Debe crear al menos un grupo válido");
      return;
    }

    onCrearGrupo(gruposCompletos);


    

    
  };

  const todosCompletos = grupos.every(
    grupo => grupo.idioma && grupo.nivel && grupo.cupo >= 5
  );

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button 
          colorPalette="purple"
          variant="outline"
          _hover={{ color: "black", transform: "scale(1.05)" }}
        > 
          <FiPlus /> Agregar Grupos
        </Button> 
      </Dialog.Trigger>

      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content maxWidth="800px">
            <Dialog.Header>
              <Dialog.Title color={"purple"} fontSize={"2xl"}>
                Crear Grupos
              </Dialog.Title>
            </Dialog.Header>

            <Dialog.Body>
              <Stack spacing={8}>
                {grupos.map((grupo, index) => (
                  <Box 
                    key={index}
                    p={4}
                    borderWidth="1px"
                    borderRadius="lg"
                    position="relative"
                    boxShadow="md"  
                  >
                    {grupos.length > 1 && (
                      <Icon 
                        as={FaTrashAlt} 
                        boxSize={5} 
                        cursor="pointer" 
                        color="gray.500"
                        position="absolute"
                        top={4}
                        right={2}
                        _hover={{ color: "red.500" }}
                        onClick={() => handleEliminarGrupo(index)}
                      />
                    )}
                    
                    <Text fontWeight="bold" mb={4}>
                      Grupo {index + 1}
                    </Text>
                    
                    <Stack spacing={5}>
                      {/* Idioma */}
                      <Field.Root orientation="horizontal">
                        <Select.Root
                          collection={idiomas}
                          value={grupo.idioma}
                          onValueChange={(value) => 
                            actualizarGrupo(index, "idioma", value?.value || "")
                          }
                        >
                          <Select.HiddenSelect />
                          <Select.Label>
                            <Flex align="center" gap={1}>
                              <MdLanguage />
                              Idioma
                            </Flex>
                          </Select.Label>
                          <Select.Control flex="1">
                            <Select.Trigger>
                              <Select.ValueText placeholder="Selecciona idioma" />
                            </Select.Trigger>
                            <Select.IndicatorGroup>
                              <Select.Indicator />
                            </Select.IndicatorGroup>
                          </Select.Control>
                          <Portal>
                            <Select.Positioner>
                              <Select.Content zIndex="popover">
                                {idiomas.items.map((item) => (
                                  <Select.Item key={item.value} item={item}>
                                    {item.label}
                                    <Select.ItemIndicator />
                                  </Select.Item>
                                ))}
                              </Select.Content>
                            </Select.Positioner>
                          </Portal>
                        </Select.Root>
                      </Field.Root>

                      {/* Nivel */}
                      <Field.Root orientation="horizontal">
                        <Select.Root
                          collection={niveles}
                          value={grupo.nivel}
                          onValueChange={(value) => 
                            actualizarGrupo(index, "nivel", value?.value || "")
                          }
                          width="100%"
                        >
                          <Select.HiddenSelect />
                          <Select.Label>
                            <Flex align="center" gap={1}>
                              <FiBookOpen />
                              Nivel
                            </Flex>
                          </Select.Label>
                          <Select.Control flex="1">
                            <Select.Trigger>
                              <Select.ValueText placeholder="Selecciona nivel" />
                            </Select.Trigger>
                            <Select.IndicatorGroup>
                              <Select.Indicator />
                            </Select.IndicatorGroup>
                          </Select.Control>
                          <Portal>
                            <Select.Positioner>
                              <Select.Content zIndex="popover">
                                {niveles.items.map((Nivel) => (
                                  <Select.Item key={Nivel.value} item={Nivel}>
                                    {Nivel.label}
                                    <Select.ItemIndicator />
                                  </Select.Item>
                                ))}
                              </Select.Content>
                            </Select.Positioner>
                          </Portal>
                        </Select.Root>
                      </Field.Root>

                      {/* Cupo */}
                      <Field.Root>
                        <Field.Label>
                          <Flex align="center" gap={1}>
                            <BsFillPeopleFill />
                            Cupo
                          </Flex>
                        </Field.Label>

                        <NumberInput.Root
                          value={grupo.cupo}
                          onValueChange={(details) => 
                            actualizarGrupo(index, "cupo", details.value)
                          }
                          width="100%"
                          min={5}
                          max={40}
                        >
                          <NumberInput.Control />
                          <NumberInput.Input />
                        </NumberInput.Root>
                        <Field.HelperText>
                          El Grupo debe de ser de entre 5 a 40 personas
                        </Field.HelperText>
                      </Field.Root>
                    </Stack>
                  </Box>
                ))}

                <Button 
                  leftIcon={<BsPlus />}
                  onClick={handleAgregarGrupo}
                  variant="outline"
                  shadow={"md"}
                >
                  Agregar otro grupo
                </Button>
              </Stack>
            </Dialog.Body>

            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button
                  variant="outline"
                  _hover={{ color: "black", transform: "scale(1.05)" }}
                >
                  Cancelar
                </Button>
              </Dialog.ActionTrigger>
              <Dialog.ActionTrigger asChild>
                <Button
                  colorPalette="purple"
                  onClick={handleGuardar}
                  disabled={!todosCompletos}
                  _hover={{ color: "white", transform: "scale(1.05)" }}
                >
                  Crear Grupos ({grupos.length})
                </Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default CrearGrupoDialog;