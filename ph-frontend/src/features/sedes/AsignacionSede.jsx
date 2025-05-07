import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { FaEdit, FaPlus } from "react-icons/fa";
import { getAsignacionSedeOverview } from "../../services/asignacionSedeService";
import { getAsignacionGruposOverview } from "../../services/asignacionGruposService";
import { Box, Text, Stack, Card, Heading, Flex, SimpleGrid,Icon, IconButton, Portal, Select, createListCollection, Field, NumberInput  } from "@chakra-ui/react";
import { Alert } from "@chakra-ui/react"

function DraggableParticipante({ id, nombre, grupo, idioma, nivel, rol }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });

  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
  };

  return (
    <Box
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      bg="purple.300"
      borderRadius="md"
      cursor="grab"
      textAlign="center"
    >
            {nombre}
            {rol !== "mentora" && idioma && nivel ? ` (${idioma} / ${nivel})` : ""}
    </Box>
  );
}

function DroppableCard({ id, title, cupo, idioma, nivel, cupo_actual, participante, isEditing, cupo_max, onActualizarGrupo }) {
  const { isOver, setNodeRef } = useDroppable({ id });
  const [selectedIdioma, setSelectedIdioma] = useState(idioma || "");
  const [selectedNivel, setSelectedNivel] = useState(nivel || "");
  const [selectedCupo, setSelectedCupo] = useState(cupo_max || 0);

  console.log(
    'Participantes en grupo 182:',
    participante.filter(p => p.grupo === 'grupo-182')
  )

  const frameworks = createListCollection({
    items: [
      { label: "Español", value: "Español" },
      { label: "Inglés", value: "Inglés" },
    ],
  })

  const niveles = createListCollection({
    items: [
      { label: "Básico", value: "Básico" },
      { label: "Avanzado", value: "Avanzado" },
    ],
  })
  

  return (
    <Card.Root ref={setNodeRef} size="lg" bg={isOver ? "green.200" : "gray.100"} border="2px dashed gray">
      <Card.Header>
        <Flex justifyContent="space-between" alignItems="center">
        <Heading size="md">{title}</Heading>
        <Text>{cupo}</Text>
        </Flex>

        {isEditing && (
          <Flex gap="2vh">
            <Select.Root collection={frameworks} size="sm" width="140px" value={selectedIdioma} onValueChange={(item) => {
              setSelectedIdioma(item.value);
              const idGrupoNumerico = parseInt(id.replace("grupo-", ""));
              onActualizarGrupo(idGrupoNumerico, { idioma: item.value });
            }}>
              <Select.HiddenSelect />
              <Select.Label>Idioma</Select.Label>
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText>
                    {selectedIdioma}
                  </Select.ValueText>
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </Select.Control>
              <Portal>
                <Select.Positioner>
                  <Select.Content>
                    {frameworks.items.map((framework) => (
                      <Select.Item item={framework} key={framework.value}>
                        {framework.label}
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Portal>
            </Select.Root>

            <Select.Root collection={niveles} size="sm" width="160px" value={selectedNivel}
              onValueChange={(item) => {
                setSelectedNivel(item.value);
                const idGrupoNumerico = parseInt(id.replace("grupo-", ""));
                onActualizarGrupo(idGrupoNumerico, { nivel: item.value });
              }}>
              <Select.HiddenSelect />
              <Select.Label>Nivel</Select.Label>
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText>
                    {selectedNivel}
                  </Select.ValueText>
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </Select.Control>
              <Portal>
                <Select.Positioner>
                  <Select.Content>
                    {niveles.items.map((nivel) => (
                      <Select.Item item={nivel} key={nivel.value}>
                        {nivel.label}
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Portal>
            </Select.Root>

            <Field.Root>
              <Field.Label>Cupo</Field.Label>
              <NumberInput.Root defaultValue={cupo_max} width="60px" value={selectedCupo}
                onValueChange={({ valueAsNumber }) => {
                  setSelectedCupo(valueAsNumber);
                  const idGrupoNumerico = parseInt(id.replace("grupo-", ""));
                  onActualizarGrupo(idGrupoNumerico, { cupo_max: valueAsNumber });
                }}>
                <NumberInput.Control />
                <NumberInput.Input />
              </NumberInput.Root>
              <Field.HelperText>5-25</Field.HelperText>
            </Field.Root>
          </Flex>
        )}
      </Card.Header>
      <Card.Body>
      {participante.map((p) => (
                <DraggableParticipante key={p.id} id={p.id} nombre={p.nombre} grupo={p.grupo} idioma={p.idioma} nivel={p.nivel} rol={p.rol} />
      ))}
      </Card.Body>
    </Card.Root>
  );
}

function DroppableZonaLibre({ id, participante }) {
  const { isOver, setNodeRef } = useDroppable({ id });
  console.log("Participante sin grupo:", participante.filter((p) => !p.grupo));
  return (
    <Box
      ref={setNodeRef}
      bg={isOver ? "blue.100" : ""}
      border="2px dashed blue.400"
      shadow="lg"
      minH="200px"
      borderRadius="md"
    >
      <Heading size="sm" mb="4" textAlign="center">
        Participantes Pendientes Por Asignar
      </Heading>

      <Stack ml="1vw" mr="1vw">
        {participante.map((p) => (
          <DraggableParticipante key={p.id} id={p.id} nombre={p.nombre} grupo={p.grupo} idioma={p.idioma} nivel={p.nivel} rol={p.rol} />
        ))}
      </Stack>
    </Box>
  );
}

const AsignacionSede = forwardRef(({ onGuardarCambiosRef, onParticipanteChange, rol }, ref) => {
  const [grupos, setGrupos] = useState([]);
  const [participante, setParticipante] = useState([]); // SOLO AQUÍ
  const [isEditing, setIsEditing] = useState(false);       // SOLO AQUÍ
  const [droppedZone, setDroppedZone] = useState(null);
  const [errorCupo, setErrorCupo] = useState(false);
  console.log("⤷ AsignacionSede render con rol prop:", rol);

  useEffect(() => {
    const cargarGruposDesdeLocalStorage = () => {
      const datosLocales = localStorage.getItem("asignacion_sede_grupos");
      if (datosLocales) {
        try {
          const gruposGuardados = JSON.parse(datosLocales);
          setGrupos(gruposGuardados);
          return true;
        } catch (error) {
          console.error("Error al parsear los grupos desde localStorage:", error);
        }
      }
      return false;
    };

    const fetchGrupos = async () => {
      const cargadoLocal = cargarGruposDesdeLocalStorage();
      if (cargadoLocal) return;
      try {
          // Desestructuramos para obtener solo el array de grupos
          const { grupos: gruposArray } = await getAsignacionSedeOverview();
            setGrupos(gruposArray);
      } catch (error) {
        console.error("Error al cargar los grupos:", error);
      }
    };
    fetchGrupos();
  }, []);

  const handleGuardarCambios = async () => {
    console.log("Guardando payload en LocalStorage...");
    // Construir array de grupos con 'inscritos'
    const gruposPayload = grupos.map((g) => {
      const grupoIdStr = `grupo-${g.id_grupo}`;
      const inscritos = {
        participante: [],
        instructora: [],
        facilitadora: [],
        staff: [],
        mentora: [],
      };
      // Asignados al grupo
      const asignados = participante.filter((p) => p.grupo === grupoIdStr);
      for (const p of asignados) {
        const nombreLimpio = p.nombre
        .replace(/[\p{Emoji_Presentation}\p{Emoji}\uFE0F\u200D\u200B]/gu, "")
        .trim();
        const idNum = parseInt(p.id.replace(/\D/g, ""), 10);
        if (p.id.startsWith("p-")) {
          inscritos.participante.push({
            id_participante: idNum,
            nombre: nombreLimpio,
            idioma: g.idioma,
            nivel: g.nivel,
          });
        } else if (p.rol === "instructora") {
          inscritos.instructora.push({ id_personal: idNum, nombre: nombreLimpio,idioma: g.idioma,
            nivel: g.nivel, });
        } else if (p.rol === "facilitadora") {
          inscritos.facilitadora.push({ id_personal: idNum, nombre: nombreLimpio, idioma: g.idioma,
            nivel: g.nivel, });
        } else if (p.rol === "staff") {
          inscritos.staff.push({ id_personal: idNum, nombre: nombreLimpio, idioma: g.idioma,
            nivel: g.nivel, });
        } else if (p.rol === "mentora") {
          inscritos.mentora.push({ id_mentora: idNum, nombre: nombreLimpio });
        }
      }

      return {
        id_grupo: g.id_grupo,
        idioma: g.idioma,
        nivel: g.nivel,
        cupo_max: g.cupo_max,
        inscritos,
      };
    });
    
    // Construir objeto de usuarios sin grupo
    const usuariosSinGrupo = {
      participante: participante
        .filter((p) => !p.grupo && p.id.startsWith("p-"))
        .map((p) => ({
          id_participante: parseInt(p.id.replace(/\D/g, ""), 10),
          nombre: p.nombre.replace(/[\p{Emoji_Presentation}\p{Emoji}\uFE0F\u200D]/gu, "").trim(),
          idioma: p.idioma,
          nivel: p.nivel,
        })),
      instructora: participante
        .filter((p) => !p.grupo && p.rol === "instructora")
        .map((p) => ({
          id_personal: parseInt(p.id.replace(/\D/g, ""), 10),
          nombre: p.nombre.replace(/[\p{Emoji_Presentation}\p{Emoji}\uFE0F]/gu, "").trim(),
          idioma: p.idioma,
          nivel: p.nivel,
        })),
      facilitadora: participante
        .filter((p) => !p.grupo && p.rol === "facilitadora")
        .map((p) => ({
          id_personal: parseInt(p.id.replace(/\D/g, ""), 10),
          nombre: p.nombre.replace(/[\p{Emoji_Presentation}\p{Emoji}\uFE0F]/gu, "").trim(),
          idioma: p.idioma,
          nivel: p.nivel,
        })),
      staff: participante
        .filter((p) => !p.grupo && p.rol === "staff")
        .map((p) => ({
          id_personal: parseInt(p.id.replace(/\D/g, ""), 10),
          nombre: p.nombre.replace(/[\p{Emoji_Presentation}\p{Emoji}\uFE0F]/gu, "").trim(),
          idioma: p.idioma,
          nivel: p.nivel,
        })),
      mentora: participante
        .filter((p) => !p.grupo && p.rol === "mentora")
        .map((p) => ({
          id_mentora: parseInt(p.id.replace(/\D/g, ""), 10),
          nombre: p.nombre.replace(/[\p{Emoji_Presentation}\p{Emoji}\uFE0F]/gu, "").trim(),
        })),
    };

    // Guardar payload completo en LocalStorage
    const payload = { grupos: gruposPayload, usuariosSinGrupo };
    localStorage.setItem("asignacion_sede_payload", JSON.stringify(payload));

    // Simular retardo para feedback de UI
    return new Promise((res) => setTimeout(res, 500));
    // Aquí podrías hacer el POST/PUT al backend.
  };

  useEffect(() => {
    if (onGuardarCambiosRef) {
      onGuardarCambiosRef.current = handleGuardarCambios;
    }
  }, [onGuardarCambiosRef, grupos]);

  useEffect(() => {
    if (onParticipanteChange) {
      onParticipanteChange(participante);
    }
  }, [participante]);

  // Al montar, cargar los datos de la sede (grupos) usando getAsignacionSedeOverview
  useEffect(() => {
    const fetchInitialAsignacion = async () => {
      try {
        const response = await getAsignacionSedeOverview();
        console.log("Raw getAsignacionSedeOverview response:", response);
        // Support both direct payload and axios-like { data } shape
        const payload = response.data ?? response;
        console.log("⤷ payload completo:", payload);
        console.log("   usuariosSinGrupo keys:", Object.keys(payload.usuariosSinGrupo || {}));
        console.log("   usuariosSinGrupo objeto:", payload.usuariosSinGrupo);
        console.log("   grupos array:", payload.grupos);
        console.log("¿Incluye facilitadora?:", "facilitadora" in payload.usuariosSinGrupo);
console.log("¿Incluye instructora?:", "instructora" in payload.usuariosSinGrupo);
        const rawGroups = payload.grupos || [];
        const gruposBackend = rawGroups.map((grupo) => ({
          ...grupo,
          staff: grupo.inscritos?.staff ?? [],
          instructora: grupo.inscritos?.instructora ?? [],
          facilitadora: grupo.inscritos?.facilitadora ?? [],
          participante: grupo.inscritos?.participante ?? [],
          mentora: grupo.inscritos?.mentora ?? [],
        }));

        // participantesSinGrupo y usuariosSinGrupo vienen en payload.usuariosSinGrupo
        const participanteSinGrupo = payload.usuariosSinGrupo?.participante || [];
        // Mapear roles desde usuariosSinGrupo
        const usuariosSinGrupo = payload.usuariosSinGrupo || {};
                // Utilizar los arrays directamente del payload sin mapear rol_preferencia
                const staffSinGrupo = payload.usuariosSinGrupo?.staff || [];
                const instructoraSinGrupo = payload.usuariosSinGrupo?.instructora || [];
                const facilitadoraSinGrupo = payload.usuariosSinGrupo?.facilitadora || [];
                const mentoraSinGrupo = payload.usuariosSinGrupo?.mentora || [];
  
        // Participantes asignados a grupos
        let participanteEnGrupos = [];
        let participanteLibres = [];
        const rolLower = rol.toLowerCase();

        if (rolLower === "participante") {
          participanteEnGrupos = gruposBackend.flatMap((grupo) =>
            (grupo.participante || []).map((p) => ({
              id: `p-${p.id_participante}`,
              nombre: `🙋‍♀️ ${p.nombre}`,
              grupo: `grupo-${grupo.id_grupo}`,
              idioma: grupo.idioma,
              nivel: grupo.nivel,
            }))
          );

          console.log("Usuarios sin grupo (instructora):", instructoraSinGrupo);
          console.log("Usuarios sin grupo (facilitadora):", facilitadoraSinGrupo);

          participanteLibres = (participanteSinGrupo ?? []).map((p) => ({
            id: `p-${p.id_participante}`,
            nombre: `🙋‍♀️ ${p.nombre}`,
            grupo: null,
            idioma: p.idioma,
            nivel: p.nivel,
          }));
        } else {
          participanteEnGrupos = gruposBackend.flatMap((grupo) => {
            const personas = grupo[rolLower];
          
            if (!personas) return [];
          
            // Si es un array (como facilitadoras o participantes)
            if (Array.isArray(personas)) {
              return personas.map((persona) => ({
                id: `s-${persona.id_personal || persona.id_participante || persona.id_mentora}`,
                nombre: `👩‍💼 ${persona.nombre}`,
                grupo: `grupo-${grupo.id_grupo}`,
                idioma: grupo.idioma,
                nivel: grupo.nivel,
                rol: rol,
              }));
            }
          
            // Si es un solo objeto (como mentora o staff)
            return [{
              id: `s-${personas.id_personal || personas.id_mentora}`,
              nombre: `👩‍💼 ${personas.nombre}`,
              grupo: `grupo-${grupo.id_grupo}`,
              idioma: personas.idioma,
              nivel: personas.nivel,
              rol: rol,
            }];
          });

          // Elegimos el array correcto según el rol
          let libres = [];
          if (rolLower === "staff"){
            libres = staffSinGrupo.map((p) => ({
              id: `s-${p.id_personal}`,
              nombre: `👩‍💼 ${p.nombre}`,
              grupo: null,
              idioma: p.idioma,
              nivel: p.nivel,
              rol: "staff",
            }));

          } else if (rolLower === "instructora") {
            libres = instructoraSinGrupo.map((p) => ({
              id: `s-${p.id_personal}`,
              nombre: `👩‍💼 ${p.nombre}`,
              grupo: null,
              idioma: p.idioma,
              nivel: p.nivel,
              rol: "instructora",
            }));
          } else if (rolLower === "facilitadora") {
            libres = facilitadoraSinGrupo.map((p) => ({
              id: `s-${p.id_personal}`,
              nombre: `👩‍💼 ${p.nombre}`,
              grupo: null,
              idioma: p.idioma,
              nivel: p.nivel,
              rol: "facilitadora",
            }));
          } else if (rolLower === "mentora") {
            libres = mentoraSinGrupo.map((p) => ({
              id: `s-${p.id_mentora}`,
              nombre: `👩‍💼 ${p.nombre}`,
              grupo: null,
              rol: "mentora",
            }));

          }

          participanteLibres = libres;
        }
  
        setParticipante([...participanteEnGrupos, ...participanteLibres]);
       
          
        const nuevosGrupos = gruposBackend.map((grupo) => {
          const count = [...participanteEnGrupos, ...participanteLibres].filter(
            (p) => p.grupo === `grupo-${grupo.id_grupo}`
          ).length;
          return { ...grupo, cupo_actual: count };
        });
        setGrupos(nuevosGrupos);
      } catch (error) {
        console.error("Error al cargar participantes:", error);
      }
    };
  
    fetchInitialAsignacion();
  }, [rol]);

    // Extraer la asignación automática y exponerla vía ref
    const handleAutoAssign = async () => {
      try {
        const response = await getAsignacionGruposOverview();
        const payload = response.data ?? response;
        // participantesSinGrupo y personalSinGrupo ya vienen procesados por el servicio
        const participanteSinGrupo = payload.participanteSinGrupo;
        const personalSinGrupo = payload.personalSinGrupo;
        const gruposBackend = payload.grupos;
  
        // Copia aquí la lógica de mapeo de participantesEnGrupos y participantesLibres
        // tal cual estaba en el fetchParticipantes original, usando gruposBackend,
        // participantesSinGrupo y personalSinGrupo.
        let participanteEnGrupos = [];
        let participanteLibres = [];
        if (rol.toLowerCase() === "participante") {
          participanteEnGrupos = gruposBackend.flatMap((grupo) =>
            (grupo.participante || []).map((p) => ({
              id: `p-${p.id_participante}`,
              nombre: `🙋‍♀️ ${p.nombre}`,
              grupo: `grupo-${grupo.id_grupo}`,
              idioma: grupo.idioma,
              nivel: grupo.nivel,
            }))
          );
          participanteLibres = (participanteSinGrupo ?? []).map((p) => ({
            id: `p-${p.id_participante}`,
            nombre: `🙋‍♀️ ${p.nombre}`,
            grupo: null,
            idioma: p.idioma,
            nivel: p.nivel,
          }));
        } else {
          participanteEnGrupos = gruposBackend.flatMap((grupo) => {
            const personas = grupo[rolLower];
            if (!personas) return [];
            if (Array.isArray(personas)) {
              return personas.map((persona) => ({
                id: `s-${persona.id_personal || persona.id_participante || persona.id_mentora}`,
                nombre: `👩‍💼 ${persona.nombre}`,
                grupo: `grupo-${grupo.id_grupo}`,
                idioma: grupo.idioma,
                nivel: grupo.nivel,
                rol: rol,
              }));
            }
            return [{
              id: `s-${personas.id_personal || personas.id_mentora}`,
              nombre: `👩‍💼 ${personas.nombre}`,
              grupo: `grupo-${grupo.id_grupo}`,
            }];
          });
          let libres = (personalSinGrupo ?? [])
          .filter((p) => p.rol?.toLowerCase() === rol.toLowerCase())
            .map((p) => ({
              id: `s-${p.id_personal || p.id_mentora}`,
              nombre: `👩‍💼 ${p.nombre}`,
              grupo: null,
            }));
          
          participanteLibres = libres;
        }
        setParticipante([...participanteEnGrupos, ...participanteLibres]);
        const nuevosGrupos = gruposBackend.map((grupo) => {
          const count = [...participanteEnGrupos, ...participanteLibres].filter(
            (p) => p.grupo === `grupo-${grupo.id_grupo}`
          ).length;
          return { ...grupo, cupo_actual: count };
        });
        setGrupos(nuevosGrupos);
      } catch (error) {
        if (error.response?.status === 409) {
          throw new Error("No hay suficientes cupos disponibles.");
        }
        throw error;
      }
    };
    useImperativeHandle(ref, () => ({ handleAutoAssign }));
  

  const handleDragEnd = (event) => {
    const { active, over } = event;
    console.log('handleDragEnd:', active.id, 'dropped over', over?.id);
    if (!over) return;
  
    const newGroupId = over.id === "zona-libre" ? null : over.id;
  
    const updatedParticipante = participante.map((p) => {
      if (p.id !== active.id) return p;
      // Si cae en “zona libre”, sólo quita el grupo
      if (newGroupId === null) {
      return { ...p, grupo: null };
      }
      // Si cae en un grupo, actualiza grupo, idioma y nivel (salvo mentora)
      const grupoObj = grupos.find((g) => `grupo-${g.id_grupo}` === newGroupId);
      return {
        ...p,
        grupo: newGroupId,
        ...(p.rol?.toLowerCase() === "mentora"
          ? {}
          : {
              idioma: grupoObj.idioma,
              nivel: grupoObj.nivel,
            }),
      };
    });
  
    // Validar cupo solo si NO es zona libre
    if (newGroupId !== null) {
      const grupo = grupos.find((g) => `grupo-${g.id_grupo}` === newGroupId);
      const participanteEnGrupo = updatedParticipante.filter((p) => p.grupo === newGroupId);
  
      if (grupo && participanteEnGrupo.length > grupo.cupo_max) {
        setErrorCupo(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => setErrorCupo(false), 5000);
        return;
      }
    }
  
    // Actualizar participantes
    setParticipante(updatedParticipante);
    console.log('Updated participantes for group', newGroupId, ':',
      updatedParticipante.filter(p => p.grupo === newGroupId)
    );
  
    // Actualizar cupo actual de cada grupo con base en la nueva lista de participantes
    setGrupos((prevGrupos) =>
      prevGrupos.map((g) => {
        const idGrupoStr = `grupo-${g.id_grupo}`;
        const cantidad = updatedParticipante.filter((p) => p.grupo === idGrupoStr).length;
        return { ...g, cupo_actual: cantidad };
      })
    );

    // Auto-advance to next step if no pending participants
    const pendientes = updatedParticipante.filter((p) => !p.grupo);
    if (pendientes.length === 0 && typeof window.setStepOnEdit === "function") {
      window.setStepOnEdit();
    }
  };
  

  const handleActualizarGrupo = (idGrupo, nuevosValores) => {
    setGrupos((prevGrupos) =>
      prevGrupos.map((grupo) =>
        grupo.id_grupo === idGrupo ? { ...grupo, ...nuevosValores } : grupo
      )
    );
    if (typeof window.setStepOnEdit === "function") {
      window.setStepOnEdit();
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {errorCupo && (
        <Alert.Root status="error" variant="solid" mb="4">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Cupo máximo alcanzado</Alert.Title>
            <Alert.Description>
              No puedes agregar más participantes a este grupo.
            </Alert.Description>
          </Alert.Content>
        </Alert.Root>
      )}
      <SimpleGrid columns={2} columnGap="10vh" rowGap="">
        {grupos.length === 0 ? (
          <Stack justify="center" align="center" w="100%" minH="60vh" ml="25vw" gap="2vh">
            <Heading size="2xl" color="purple.600" textAlign="center">
              Aún no hay grupos creados
            </Heading>
            <Text fontSize="xl" color="gray.600" textAlign="center">
              Para generarlos, presiona el botón
            </Text>
            <IconButton
              borderRadius="full"
              size="lg"
              colorPalette="purple"
              label="Crear Grupos"
              onClick={() => {
                console.log("Aquí dispararías crear grupos...");
                // Aquí puedes disparar la lógica para generar nuevos grupos
              }}
            >
              <FaPlus />
            </IconButton>
          </Stack>
        ) : (
          <>
            <Stack>
              {grupos.map((grupo) => (
                <DroppableCard
                  key={grupo.id_grupo}
                  id={`grupo-${grupo.id_grupo}`}
                  title={`${grupo.idioma} - ${grupo.nivel}`}
                  cupo={`Cupo (${grupo.cupo_actual}/${grupo.cupo_max})`}
                  idioma={grupo.idioma}
                  nivel={grupo.nivel}
                  cupo_max={grupo.cupo_max}
                  participante={participante.filter((p) => p.grupo === `grupo-${grupo.id_grupo}`)}
                  isEditing={isEditing}
                  onActualizarGrupo={handleActualizarGrupo} 
                />
              ))}
            </Stack>

            <DroppableZonaLibre
              id="zona-libre"
              participante={participante.filter((p) => p.grupo === null || p.grupo === undefined)}
            />

            <Flex gap="2vh" mt="2vh" mb="2vh">
              <IconButton borderRadius="full" size="lg" colorPalette="purple" onClick={() => {
                console.log("Crear nuevo grupo individual...");
                // Aquí podrías disparar la creación manual de un grupo
              }}>
                <Icon as={FaPlus} color="white" />
              </IconButton>

              <IconButton borderRadius="full" size="lg" colorPalette="purple" onClick={() => setIsEditing(!isEditing)}>
                <Icon as={FaEdit} color="white" />
              </IconButton>
            </Flex>
          </>
        )}
      </SimpleGrid>
    </DndContext>
  );
});

export default AsignacionSede;


