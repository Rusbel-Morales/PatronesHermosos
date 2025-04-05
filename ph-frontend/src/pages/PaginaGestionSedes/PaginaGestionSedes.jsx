

import { IconButton } from "@chakra-ui/react"
import { Table } from "@chakra-ui/react"
import { Icon } from "@chakra-ui/react"
import MenuFiltro from "../../features/Filter/MenuFiltro";
import UserLogo from "../../features/UserLogo/UserLogo";
/*import { useDataState } from "../../features/Filter/MenuFiltro";*/
import { useState } from "react";
import logoMorado from "../../assets/logo-morado.png";
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
	Tag,
	Link
} from "@chakra-ui/react";
import {TablaSedes} from "@/features/TablaSedes/TablaSedes.jsx";

const items = [
	{ id: 1, campus: "PUE", cord: "Paola Gimenez", grupo: 4, estudiantes: 200, estado: "Activo", fecha: "12/12/2002", email: "a0173737@tec.mx"},
	{ id: 2, campus: "PUE", cord: "Paola Gimenez", grupo: 4, estudiantes: 200, estado: "Activo", fecha: "12/12/2002", email: "a0173737@tec.mx"},
	{ id: 3, campus: "PUE", cord: "Paola Gimenez", grupo: 4, estudiantes: 200, estado: "Activo", fecha: "12/12/2002", email: "a0173737@tec.mx"},
	{ id: 4, campus: "PUE", cord: "Paola Gimenez", grupo: 4, estudiantes: 200, estado: "Activo", fecha: "12/12/2002", email: "a0173737@tec.mx"},
	{ id: 5, campus: "PUE", cord: "Paola Gimenez", grupo: 4, estudiantes: 200, estado: "Activo", fecha: "12/12/2002", email: "a0173737@tec.mx"},
	{ id: 6, campus: "PUE", cord: "Paola Gimenez", grupo: 4, estudiantes: 200, estado: "Activo", fecha: "12/12/2002", email: "a0173737@tec.mx"},
	{ id: 7, campus: "PUE", cord: "Paola Gimenez", grupo: 4, estudiantes: 200, estado: "Activo", fecha: "12/12/2002", email: "a0173737@tec.mx"},
]

const tag = [
	{ id: 1, name: "Ejemplo 1"},
	{ id: 2, name: "Ejemplo 2"},
	{ id: 3, name: "Ejemplo 3"}

]


const PaginaGestionSedes = () => {
	/*const [data, setData] = useDataState();

	const actualizarDatos = () => {
		setData(useDataState());
	};*/

	const [data, setData] = useState({
		orden: "Default",
		sede: "",
		nombre: "",
		grupos: "",
		estudiantes: "",
		estado: "Cualquiera",
		fecha: "",
	});

	const updateValue = (key, value) => {
		setData((prevData) => ({
		  ...prevData,
		  [key]: value,
		}));
	};

	const dataEntries = Object.entries(data); 

	const [titulo, setTitulo] = useState(
		"Tabla de sedes registradas");

	const [tabla, setTabla] = useState(
	<>
		<TablaSedes filtro={data}/>
	</>);

	const [buttonState, setButtonState] = useState(
		<Button top = "25%" colorPalette="purple"
			onClick={() => cambioSolicitud()}
		>
			<Icon size="xl">
				<MdCached />
			</Icon>
			<Text textStyle="lg">Ver solicitudes</Text>
			<Icon size="xl" color="green.400">
				<MdCircleNotifications />
			</Icon>
		</Button>
	);

	const cambioSolicitud = () => {
		setTitulo("Tabla de solicitudes");
		setTabla(
			<>
				<p>jaja esto es otrotkojsokjfokaenofnoani</p>
			</>
		);
		setButtonState(
		<Button top = "25%" colorPalette="purple" animation = "slide-from-right-full 100ms"
			onClick={() => cambioRegistrados()}
		>
			{" "}
			<Icon size="2xl" animation= "spin 600ms">
				<MdCached />
			</Icon>
			<Text textStyle="lg">Ver registrados</Text>
		</Button>
		)
	};

	const cambioRegistrados = () => {
		setTitulo("Tabla de sedes registradas");
		setTabla(
			<>
				<TablaSedes filtro={data}/>
			</>
		);
		setButtonState(
			<Button top = "25%" colorPalette="purple" animation = "slide-from-left-full 100ms"
				onClick={() => cambioSolicitud()}
			>
				<Icon size="xl" animation= "spin 600ms">
					<MdCached />
				</Icon>
				<Text textStyle="lg">Ver solicitudes</Text>
				<Icon size="xl" color="green.400" animation= "fade-in 400ms">
					<MdCircleNotifications />
				</Icon>
			</Button>
		)
	};

	return (
		<Box bg="purple.100" minH="100vh" w="full">
			
			<UserLogo />

			<Stack w="full" maxW="100vw" px={0}>

				<Flex gap="0px" align="start">
					<Box width="5%" height={100} p={4} borderRadius="md">
						<IconButton size= "xl" top = "15%" colorPalette="purple">
							<MdArrowBack />
						</IconButton>
					</Box>
					<Box height={100} p={4} borderRadius="md">
						<Text textStyle="4xl" style={{ fontSize: '3vw' }}>{titulo}</Text></Box>
					<Box height={100} p={4} borderRadius="md">
						{buttonState}
					</Box>
				</Flex>

				<Flex gap="0px" align="start">
					<Box height={50} p={4} borderRadius="md">
						{/*<Button top = "15%" colorPalette="purple">
							<Icon size="xl">
								<MdFilterAlt />
							</Icon>
							<Text textStyle="2xl">Filtrar</Text>
						</Button>*/}

						<MenuFiltro setData={setData} data={data} />
						
					</Box>
					<Box height={50} p={4} borderRadius="md">
						<Button top = "15%" colorPalette="purple">
							<Icon size="xl">
								<MdOutlinePostAdd />
							</Icon>
							<Text textStyle="lg">Generar diplomas</Text>
						</Button>
					</Box>
				</Flex>

				<Flex gap="0px" align="start">
					<Box height={100} width="1%" p={4} borderRadius="md"></Box>
					<Box background="white" height={100} width="40%" p={4} borderRadius="md">
						<HStack style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
							{/*x.map((x) => (
								<Tag.Root size= "lg">
									<Tag.Label>{x.name}</Tag.Label>
									<Tag.EndElement>
										<Tag.CloseTrigger />
									</Tag.EndElement>
								</Tag.Root>
							))*/}

							{dataEntries.map(([key, value]) =>
							value && value !== "" && value != "Cualquiera" && value != "Default" ? (  // Verifica que el valor no sea una cadena vacía
								<Tag.Root size="lg" key={key} style={{ flexShrink: 0 }}>
								<Tag.Label>{`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`}</Tag.Label>
								<Tag.EndElement>
									<Tag.CloseTrigger onClick={() => updateValue(key, "")}/>
								</Tag.EndElement>
								</Tag.Root>
							) : null
							)}
						</HStack>
					</Box>
				</Flex>

				{tabla}

				
			</Stack>
		</Box>
	);
};

export default PaginaGestionSedes;