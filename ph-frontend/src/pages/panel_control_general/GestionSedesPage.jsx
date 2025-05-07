

import { IconButton } from "@chakra-ui/react"
import { Table } from "@chakra-ui/react"
import { Icon } from "@chakra-ui/react"
import MenuFiltro from "../../features/filtros/MenuFiltro.jsx";
import UserProfile from "../../features/user_profile/UserProfile.jsx";
import { useState } from "react";
import logoMorado from "../../assets/logo-morado.png";
import DashboardGeneralMenu from "../../components/menu/DashboardGeneralMenu.jsx";
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
import {TablaSedes} from "@/features/sedes/TablaSedes.jsx";

const GestionSedesPage = () => {
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
		<TablaSedes filtro={data} setData={setData}/>
	</>);

	const [buttonState, setButtonState] = useState(
		<Button top = "25%" colorPalette="purple"
			onClick={() => {cambioSolicitud(); updateValue("estado", "pendiente");}}
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
		setButtonState(
		<Button top = "25%" colorPalette="purple" animation = "slide-from-right-full 100ms"
			onClick={() => {cambioRegistrados();
				updateValue("estado", "Cualquiera")
			}}
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
		setButtonState(
			<Button top = "25%" colorPalette="purple" animation = "slide-from-left-full 100ms"
				onClick={() => {cambioSolicitud(); updateValue("estado", "pendiente");}}
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
			
			

			<Stack w="full" maxW="100vw" px={0}>

				<Flex gap="0px" align="start" p={1}>
					{/*<Box width="5%" height={100} p={4} borderRadius="md">
						<IconButton size= "xl" top = "15%" colorPalette="purple">
							<MdArrowBack />
						</IconButton>
					</Box>*/}
					<DashboardGeneralMenu/>
					<Box height={100} p={4} borderRadius="md">
						<Text textStyle="4xl" style={{ fontSize: '3vw' }}>{titulo}</Text></Box>
						
					<Box height={100} p={4} borderRadius="md">
						{buttonState}
						
					</Box>
					<Box height={100} p={7} ml="24vw">
					<UserProfile />
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

				
					
					{dataEntries.some(([_, value]) => value && value !== "" && value !== "Cualquiera" && value !== "Default") && (
						<Flex gap="0px" align="start">
						<Box height={100} width="1%" p={4} borderRadius="md"></Box>
						<Box background="white" height={50} width="40%" p={4} borderRadius="md">
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
					)}
					
				

				{/*tabla*/}
				<TablaSedes filtro={data} setData={setData}/>

				
			</Stack>
		</Box>
	);
};

export default GestionSedesPage;