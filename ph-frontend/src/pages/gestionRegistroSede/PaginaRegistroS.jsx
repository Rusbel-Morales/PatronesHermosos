// RegistrarParticipante.jsx
// Página que muestra el formulario y lo conecta con el backend.
import { IconButton } from "@chakra-ui/react"
import { LuSearch } from "react-icons/lu"
import { useState } from "react";
import { Container } from "@chakra-ui/react"
import { Table } from "@chakra-ui/react"
import { Icon } from "@chakra-ui/react"
import { 
    MdArrowBack,
    MdCached,
    MdCircleNotifications,
    MdFilterAlt,
    MdOutlinePostAdd,
    MdPersonSearch,
    MdGroups2,
    MdInfoOutline,
    MdMenu
} from "react-icons/md"

// import FormularioParticipante from "../../features/participantes/FormularioParticipante";
// import { createParticipante } from "../../services/participanteService";
import {
    Heading,
    Flex,
    Image,
    Stack,
    Text,
    Progress,
    HStack,
    Box,
    Button, 
    ButtonGroup,
    Tag
} from "@chakra-ui/react";



import logoMorado from "../../assets/logo-morado.png";
import SuccessModal from "../../components/modals/SuccessModal";
import ErrorModal from "../../components/modals/ErrorModal";

const items = [
    { id: 1, nombre: "Pablo André", grupo: "4", email: "a01737438@tec.mx" },
    { id: 2, nombre: "Jonathan Gummie", grupo: "1", email: "a01737438@tec.mx" },
    { id: 3, nombre: "Dark Mush", grupo: "3", email: "a01737438@tec.mx" },
    { id: 4, nombre: "Jackson Storm", grupo: "2", email: "a01737438@tec.mx" },
    { id: 5, nombre: "Gabriel Cano", grupo: "4", email: "a01737438@tec.mx" },
    { id: 6, nombre: "Pablo San Andreas", grupo: "4", email: "a01737438@tec.mx" },
    { id: 7, nombre: "Jonathan quispe mamani choke", grupo: "1", email: "a01737438@tec.mx" },
    { id: 8, nombre: "El Mush", grupo: "3", email: "a01737438@tec.mx" },
    { id: 9, nombre: "Maicol Jackson", grupo: "2", email: "a01737438@tec.mx" },
    { id: 10, nombre: "Geraldo Cano", grupo: "4", email: "a01737438@tec.mx" },
  ]

const tag = [
    { id: 1, name: "Ejemplo 1"},
    { id: 2, name: "Ejemplo 2"},
    { id: 3, name: "Ejemplo 3"}
    
]

const PaginaRegistroS = () => {
    /*
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);
    const [isErrorOpen, setIsErrorOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [progress, setProgress] = useState(0);

    const handleSubmit = async (formData) => {
        try {
            await createParticipante(formData);
            setMessage("Participante registrado con éxito. Revisa tu correo para la confirmación.");
            setIsSuccessOpen(true);
        } catch (error) {
            setMessage("Error al registrar al participante.");
            setIsErrorOpen(true);
        }
    };*/

    return (
        <Box bg="gray.200" minH="100vh" w="full">
            <Stack w="full" maxW="100vw" px={0}>

                <Flex gap="0px" align="start">
                    <Box width="5%" height={100} p={4} borderRadius="md">
                        <IconButton size= "xl" top = "15%" colorPalette="purple">
                            <MdArrowBack />
                        </IconButton>
                    </Box>
                    <Box height={100} p={4} borderRadius="md">
                        <Text textStyle="5xl" style={{ fontSize: '3vw' }}>Tabla de participantes registrados</Text></Box>
                    <Box height={100} p={4} borderRadius="md">
                        <Button top = "25%" colorPalette="purple">
                            <Icon size="xl">
                                <MdCached />
                            </Icon>
                            <Text textStyle="2xl">Ver solicitudes</Text>
                            <Icon size="xl" color="green.400">
                                <MdCircleNotifications />
                            </Icon>
                        </Button>
                    </Box>
                </Flex>

                <Flex gap="0px" align="start">
                    <Box height={50} p={4} borderRadius="md">
                        <Button top = "15%" colorPalette="purple">
                            <Icon size="xl">
                                <MdFilterAlt />
                            </Icon>
                            <Text textStyle="2xl">Filtrar</Text>
                        </Button>
                    </Box>
                    <Box height={50} p={4} borderRadius="md">
                        <Button top = "15%" colorPalette="purple">
                            <Icon size="xl">
                                <MdOutlinePostAdd />
                            </Icon>
                            <Text textStyle="2xl">Generar diplomas</Text>
                        </Button>
                    </Box>
                </Flex>

                <Flex gap="0px" align="start">
                    <Box height={100} width="1%" p={4} borderRadius="md"></Box>
                    <Box background="white" height={100} width="40%" p={4} borderRadius="md">
                    <HStack>
                        {tag.map((tag) => (
                            <Tag.Root size= "lg">
                                <Tag.Label>{tag.name}</Tag.Label>
                                <Tag.EndElement>
                                    <Tag.CloseTrigger />
                                </Tag.EndElement>
                            </Tag.Root>
                        ))}
                        {/* 
                        <Tag.Root size= "lg">
                            <Tag.Label>Ejemplo 1</Tag.Label>
                            <Tag.EndElement>
                                <Tag.CloseTrigger />
                            </Tag.EndElement>
                        </Tag.Root>
                        <Tag.Root size= "lg">
                            <Tag.Label>Ejemplo 2</Tag.Label>
                            <Tag.EndElement>
                                <Tag.CloseTrigger />
                            </Tag.EndElement>
                        </Tag.Root>
                        <Tag.Root size= "lg">
                            <Tag.Label>Ejemplo 3</Tag.Label>
                            <Tag.EndElement>
                                <Tag.CloseTrigger />
                            </Tag.EndElement>
                        </Tag.Root>*/}
                    </HStack>    
                    </Box>   
                </Flex>

                <Flex gap="0px" align="start">
                    <Box height={50} p={4} borderRadius="md">
                        <Button top = "15%" bg="purple.600">
                            <Icon size="xl">
                                <MdPersonSearch />
                            </Icon>
                            <Text textStyle="2xl">Participantes</Text>
                        </Button>
                    </Box>
                    <Box height={50} p={4} borderRadius="md">
                        <Button top = "15%" bg="gray.500">
                            <Icon size="xl">
                                <MdGroups2 />
                            </Icon>
                            <Text textStyle="2xl">Grupos</Text>
                        </Button>
                    </Box>
                </Flex>
                <Table.ScrollArea borderWidth="1px" rounded="md" height="350px">
                    <Table.Root size="sm" showColumnBorder stickyHeader>
                        <Table.Header>
                            <Table.Row bg="bg.subtle">
                                <Table.ColumnHeader>Nombre</Table.ColumnHeader>
                                <Table.ColumnHeader textAlign="center">Grupo</Table.ColumnHeader>
                                <Table.ColumnHeader textAlign="end">Email</Table.ColumnHeader>
                                <Table.ColumnHeader >Detalles</Table.ColumnHeader>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {items.map((item) => (
                            <Table.Row key={item.id}>
                                <Table.Cell>{item.nombre}</Table.Cell>
                                <Table.Cell textAlign="center">{item.grupo}</Table.Cell>
                                <Table.Cell textAlign="end">{item.email}</Table.Cell>
                                <Table.Cell> 
                            
                                    <IconButton size= "md" colorPalette="purple">
                                        <MdInfoOutline/>
                                    </IconButton>
                                       
                                    <IconButton size= "md" colorPalette="purple">
                                        <MdMenu/>
                                    </IconButton>
                                </Table.Cell>
                            </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Root>
                </Table.ScrollArea>
            </Stack>
        </Box>
    );
};

export default PaginaRegistroS;