"use client"
import { useEffect, useState } from "react";
import {Box, Text, Breadcrumb, Portal, Menu, Stack, Flex, SimpleGrid, Button, Spinner, Steps, ButtonGroup} from "@chakra-ui/react";
import { LuChevronDown } from "react-icons/lu"
import { useRef } from "react";
import { FaRegSave, FaCheck } from "react-icons/fa";
import { MdAutoMode } from "react-icons/md";
import UserProfile from "../../features/user_profile/UserProfile.jsx";
import { toaster, Toaster } from "@/components/ui/toaster";
import { IoReload } from "react-icons/io5";
import AsignacionSede from "../../features/sedes/AsignacionSede.jsx";
import { getAsignacionGruposOverview } from "../../services/asignacionGruposService";
import DashboardSedeMenu from "../../components/menu/DashboardSedeMenu.jsx";
import { actualizarAsignacionGrupos } from "../../services/actualizarAsignacionGrupos.js";

const BreadcrumbMenuItem = (props) => {
    const { children, items, onSelect } = props;
    return (
      <Breadcrumb.Item>
        <Menu.Root>
          <Menu.Trigger asChild>{children}</Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                {items.map((item) => (
                  <Menu.Item key={item.value} value={item.value} onSelect={() => onSelect(item.value)}>
                    {item.label}
                  </Menu.Item>
                ))}
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </Breadcrumb.Item>
    );
  };

  const steps = [
    {
      title: "Paso 1",
      content: "Paso 1 Edita",
      description: "Edita los grupos y las asignaciones",
    },
    {
      title: "Paso 2",
      content: "Paso 2 Guarda",
      description: "Guarda los cambios",
    },
    {
      title: "Paso 3",
      content: "Paso 3 confirma",
      description: "Confirma los cambios",
    },
  ]

const AsignacionSedePage = () => {
  const sedeId = Number(localStorage.getItem("id_sede"));
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [guardado, setGuardado] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [rolSeleccionado, setRolSeleccionado] = useState("participante");
  useEffect(() => {
    console.log("→ rolSeleccionado cambió a:", rolSeleccionado);
  }, [rolSeleccionado]);
  const [participante, setParticipante] = useState([]);
  const guardarCambiosRef = useRef(null);
  const autoAssignRef = useRef(null);

  useEffect(() => {
    window.setStepOnEdit = () => {
      setActiveStep(1); // Avanza al paso de "Guardar"
    };
    return () => delete window.setStepOnEdit;
  }, []);

  return (
    <Box bg="purple.100" minH="100vh" w="100%">
    <Stack ml="1vw" mr="1vw" gap="3vh">
        <Flex>
            <Box mr="1vw">
            <DashboardSedeMenu/>
            </Box>
        <Flex flex="1" align="center" justify="space-between">
        <Text fontSize="4vh" fontWeight="bold" mt="1vh">Asignación de Grupo</Text>
        <Box mt="2vh">
            <UserProfile/>
        </Box>
        </Flex>
        </Flex>

        <Text fontSize="3vh">Revisa, ajusta y confirma las asignaciones de tu sede.</Text>

        <Breadcrumb.Root>
        <Breadcrumb.List gap="4">
            <Breadcrumb.Item>
            <Breadcrumb.Link href="#">Asignación</Breadcrumb.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator>/</Breadcrumb.Separator>
            <BreadcrumbMenuItem
            items={[
                { label: "Participantes", value: "participante" },
                { label: "Mentora", value: "mentora" },
                { label: "Facilitadora", value: "facilitadora" },
                { label: "Staff", value: "staff" },
                { label: "Instructora", value: "instructora" },
            ]}
            onSelect={(value) => setRolSeleccionado(value.toLowerCase())}
            >
            <Breadcrumb.Link as="button">
            <Flex align="center" onClick={() => {}}>
                  {rolSeleccionado.charAt(0).toUpperCase() + rolSeleccionado.slice(1)}
                  <LuChevronDown />
                </Flex>
            </Breadcrumb.Link>
            </BreadcrumbMenuItem>
        </Breadcrumb.List>
        </Breadcrumb.Root>

        <Steps.Root colorPalette="purple" defaultStep={0} count={steps.length}  step={activeStep} onStepChange={({setp}) => setActiveStep(step)}>
          <Steps.List>
            {steps.map((step, index) => (
              <Steps.Item key={index} index={index} title={step.title}>
                <Steps.Indicator />
                <Box>
                  <Steps.Title>{step.title}</Steps.Title>
                  <Steps.Description>{step.description}</Steps.Description>
                </Box>
                <Steps.Separator />
              </Steps.Item>
            ))}
          </Steps.List>

          {steps.map((step, index) => (
            <Steps.Content key={index} index={index}>
              {step.content}
            </Steps.Content>
          ))}
          <Steps.CompletedContent>Felicidades has creado tus grupos!</Steps.CompletedContent>
      </Steps.Root>


        <SimpleGrid columns={3} columnGap="2" rowGap="4" mb="2vh">
        <Button colorPalette="purple" variant="solid" onClick={async () => {
          setIsAutoSaving(true);
          const promise = (async () => {
            try {
              if (autoAssignRef.current) {
                await autoAssignRef.current.handleAutoAssign();
              }
              return new Promise((resolve) =>
                setTimeout(() => {
                  setActiveStep(1);
                  setGuardado(true);
                  resolve();
                }, 1000)
              );
            } catch (error) {
              throw error; // Propaga el error al toaster
            } finally {
              setIsAutoSaving(false); // Asegura detener spinner siempre
            }
          })();

            toaster.promise(promise, {
              loading: {
                title: "Asignando automáticamente...",
                description: "Estamos organizando los grupos, por favor espera.",
              },
              success: {
                title: "Asignación completada",
                description: "La asignación automática fue exitosa.",
              },
              error: {
                title: "Error en la asignación",
                description: "No se cuenta con suficiente personal.",
              },
            });

            await promise;
          }}>
              {isAutoSaving ? (
              <>
                <Spinner size="sm" mr={2} />
                Guardando...
              </>
            ) : (
              <>
                <Toaster />
                <MdAutoMode />
                &nbsp;Asignación Automática
              </>
            )}
          </Button>
          <Button colorPalette="purple" variant="solid" onClick={async () => {
            setIsSaving(true);
            if (guardarCambiosRef.current) {
              await guardarCambiosRef.current();
            }
            setTimeout(() => {
              setIsSaving(false);
              setActiveStep(2); // Avanza al paso de "Confirmar"
              setGuardado(true);
            }, 1000);
          }}>
              {isSaving ? (
              <>
                <Spinner size="sm" mr={2} />
                Guardando...
              </>
            ) : (
              <>
                <FaRegSave />
                &nbsp;Guardar
              </>
            )}
          </Button>
          <Button
          colorPalette="green"
          variant="solid"
          disabled={!guardado}
          onClick={async () => {
            console.log("Confirm click - retrieving payload from localStorage");
            const raw = localStorage.getItem("asignacion_sede_payload");
            console.log("Raw payload:", raw);
            if (!raw) {
              toaster.create({ title: "No hay Cambios por confirmar", type: "info" });
              return;
            }

            const { grupos, usuariosSinGrupo } = JSON.parse(raw);

            const promise = new Promise((resolve, reject) => {
              actualizarAsignacionGrupos(sedeId, grupos, usuariosSinGrupo)
                .then((res) => {
                  console.log("[page] API respondió correctamente:", res);
                  // Simula un retardo de 3 segundos antes de resolver
                  setTimeout(() => {
                    localStorage.removeItem("asignacion_sede_payload");
                    resolve(res);
                  }, 2000); // ← Aquí defines la duración
                })
                .catch((err) => reject(err));
            });

            toaster.promise(promise, {
              loading: {
                title: "Confirmando cambios...",
                description: "Por favor espera mientras se actualiza los grupos y la asignación.",
              },
              success: {
                title: "Cambios confirmados",
                description: "La asignación y los grupos fue actualizada exitosamente.",
              },
              error: {
                title: "Error al confirmar",
                description: "No se pudieron confirmar los cambios.",
              },
            });


            try {
              await promise;
              setActiveStep(3);
            } catch (error) {
              console.error("Error al confirmar cambios:", error);
              console.log("Respuesta del backend:", error.response?.data);
            }
          }}
        >
          <Toaster />
          <FaCheck /> Confirmar
        </Button>
        </SimpleGrid>
        
        <AsignacionSede
          ref={autoAssignRef}
          onGuardarCambiosRef={guardarCambiosRef}
          onParticipanteChange={setParticipante}
          rol={rolSeleccionado}
        />
    </Stack>
    </Box>
  );
};

export default AsignacionSedePage;