import { useEffect } from "react";
import { IconButton } from "@chakra-ui/react"
import { Table } from "@chakra-ui/react"
import { LuBell, LuPlus } from "react-icons/lu";
import { motion } from "framer-motion";
import { Icon, Dialog } from "@chakra-ui/react"
import MenuFiltro from "../../features/filtros/MenuFiltro.jsx";
import MenuFiltroColaborador from "../../features/filtros/MenuFiltroColaborador.jsx";
import MenuFiltroParticipante from "../../features/filtros/MenuFiltroParticipante.jsx";
import UserProfile from "../../features/user_profile/UserProfile.jsx";
import { useState } from "react";
import logoMorado from "../../assets/logo-morado.png";
import DashboardSedeMenu from "../../components/menu/DashboardSedeMenu.jsx";
import { FaBell } from "react-icons/fa";
import MentoraForm from "../../features/mentoras/Formulario.mentora.jsx";
import { modifyPdf } from "../../utils/createDipliomaSede.js";
import {
	MdArrowBack,
	MdCached,
	MdCircleNotifications,
	MdFilterAlt,
	MdOutlinePostAdd,
	MdPersonSearch,
	MdGroups2,
	MdInfoOutline,
	MdMenu,
	MdBusinessCenter,
	MdOutlineCategory,
	MdCheck,
	MdClose
} from "react-icons/md"

import {
	Heading,
	Portal,
	CloseButton,
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
	Link,
	SegmentGroup,
	Input,
	Field,
	useBreakpointValue
} from "@chakra-ui/react";
import { TablaGrupos } from "@/features/tablasCordSede/TablaGrupos.jsx";
import { TablaParticipantes } from "@/features/tablasCordSede/TablaParticipantes.jsx";
import { TablaColaborador } from "@/features/tablasCordSede/TablaColaborador.jsx";

const MotionIcon = motion(Icon);

const idSede = localStorage.getItem("id_sede");
const sedeName = localStorage.getItem("nombre_sede");
const fecha = localStorage.getItem("fecha_inicio");

const GestionGruposPage = () => {

	const [isDialogOpen, setIsDialogOpen] = useState(false);
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
		escolaridad: "Cualquiera",
		grado: "Cualquiera"
	});

	const [dataColab, setDataColab] = useState({
		orden: "Default",
		sede: "",
		nombre: "",
		grupos: "",
		estudiantes: "",
		estado: "Cualquiera",
		fecha: "",
		rol: "Cualquiera"
	});

	const updateValue = (key, value) => {
		setData((prevData) => ({
			...prevData,
			[key]: value,
		}));
	};

	const updateValueColab = (key, value) => {
		setDataColab((prevData) => ({
		  ...prevData,
		  [key]: value,
		}));
	};

	const dataEntries = Object.entries(data); 
	const dataEntries2 = Object.entries(dataColab); 

	console.log(data);


	const [titulo, setTitulo] = useState("Tabla de grupos creados");

	const [generatePDF, setGeneratePDF] = useState(false);

	const [list, setList] = useState([]);

	const [listColab, setListColab] = useState([]);

	const [tabla, setTabla] = useState(
		<>
			<TablaGrupos filtro={data} setData={setData} />
		</>);

	const [buttonState, setButtonState] = useState(
		<Flex
			justify="center"
			align="center"
			height="6.5vh"
		>
			<Button
				variant={"solid"}
				colorPalette="purple"
				minW={{ base: "4vw", sm: "auto" }}
				size={{ base: "md", sm: "md" }}
				height={{ base: "3vw", sm: "3.5vw" }}
				onClick={() => { cambioSolicitud(); updateValue("estado", "pendiente"); }}
			>
				<Icon size={{ base: "md", sm: "xl" }}>
					<MdCached />
				</Icon>
				<Text textStyle={{ base: "md", sm: "md" }} display={{ base: "none", sm: "block" }}>Ver solicitudes</Text>



			</Button>
			<Flex justify="center" align="center" height="10vh" p={4}>
				<MotionIcon
					as={FaBell}
					boxSize={{ base: "5vw", sm: "2.5vw" }}
					color="yellow.600"
					animate={{
						rotate: [0, -15, 15, -15, 0], // Movimiento de campaneo
					}}
					transition={{
						duration: 1.5,
						repeat: Infinity,
						repeatType: "loop",
					}}
				/>
			</Flex>
		</Flex>
	);

	const cambioSolicitud = () => {
		setTitulo("Tabla de solicitudes");
		setButtonState(
			<Flex
				justify="center"
				align="center"
				height="5vh"
			>
				<Button
					top="25%"
					colorPalette="purple"
					animation="slide-from-right-full 100ms"
					minW={{ base: "4vw", sm: "auto" }}
					size={{ base: "md", sm: "md" }}
					height={{ base: "40vw", sm: "3.5vw" }}
					onClick={() => {
						cambioRegistrados();
						updateValue("estado", "Cualquiera")
					}}
				>
					{" "}
					<Icon size={{ base: "md", sm: "2xl" }} animation="spin 600ms">
						<MdCached />
					</Icon>
					<Text textStyle={{ base: "md", sm: "md" }} display={{ base: "none", sm: "block" }}>Ver registrados</Text>
				</Button>
			</Flex>
		)
	};

	const cambioRegistrados = () => {
		setTitulo("Tabla de grupos creados");
		setButtonState(
			<Flex
				justify="center"
				align="center"
				height="5vh"
			>
				<Button
					top="25%"
					colorPalette="purple"

					minW={{ base: "4vw", sm: "auto" }}
					size={{ base: "md", sm: "md" }}
					height={{ base: "3vw", sm: "3.5vw" }}
					onClick={() => { cambioSolicitud(); updateValue("estado", "pendiente"); }}
					alignContent={"center"}
				>
					<Icon size={{ base: "md", sm: "xl" }} animation="spin 600ms">
						<MdCached />
					</Icon>
					<Text textStyle={{ base: "md", sm: "md" }} display={{ base: "none", sm: "block" }}>Ver solicitudes</Text>

				</Button>

				<Flex justify="center" align="center" height="10vh" p={4}>
					<MotionIcon
						as={FaBell}
						boxSize={{ base: "5vw", sm: "2.5w" }} // Campana más grande
						color="yellow.600"
						animate={{
							rotate: [0, -15, 15, -15, 0], // Movimiento de campaneo
						}}
						transition={{
							duration: 1.5,
							repeat: Infinity,
							repeatType: "loop",
						}}
					/>
				</Flex>
			</Flex>
		)
	};

	const [vistaActual, setVistaActual] = useState("tablePart");

	// Breakpoint values for responsive design
	const headingSize = useBreakpointValue({ base: "xl", md: "2xl", lg: "4xl" });
	const buttonSize = useBreakpointValue({ base: "sm", md: "md" });
	const flexDirection = useBreakpointValue({ base: "column", md: "row" });
	const contentWidth = useBreakpointValue({ base: "100%", md: "90%" });
	const buttonHeight = useBreakpointValue({ base: "3.5vh", md: "5.5vh" });
	const searchWidth = useBreakpointValue({ base: "100%", md: "80%" });
	const dialogMaxWidth = useBreakpointValue({ base: "95vw", md: "70vw", lg: "50vw" });

	return (
		<Box bg="purple.100" minH="100vh" w="full" py={4} px={3}>

			<Stack w="full" maxW="100vw" px={0}>

				<Flex gap="6px" align={{ base: "center", md: "start" }}
					flexDirection={{ base: "column", md: "row" }}
					p={1}>
					<DashboardSedeMenu />
					<Box height={{ base: "auto", md: 100 }} p={{ base: 2, md: 4 }} borderRadius="md" width={{ base: "full", md: "auto" }}>
						<Heading size={headingSize} fontWeight="bold" textAlign={{ base: "center", md: "left" }}>
							{titulo}</Heading>
					</Box>

					<Box height={{ base: "auto", md: 100 }} p={{ base: 2, md: 4 }} borderRadius="md" width={{ base: "full", md: "auto" }}>
						{buttonState}
					</Box>
					<Box height={{ base: "auto", md: 100 }} p={{ base: 2, md: 4 }} ml={{ base: 0, md: "auto" }} width={{ base: "full", md: "auto" }}>
						<UserProfile />
					</Box>
				</Flex>

				<Box bg="white" w={{ base: "95%", md: "97%" }} p={{ base: 2, md: 4 }} color="black" borderRadius="lg" mx="auto">
					<Flex gap="0px" align="start" alignItems="stretch" flexDirection={{ base: "column", md: "row" }}>
						<Box width={{ base: "100%", md: "90%" }} p={{ base: 2, md: 4 }} borderRadius="md" bg="purple.100">
							<HStack style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
								<Field.Root width={searchWidth} invalid>
									{vistaActual === "table" && (
										<Input
											placeholder="Buscar por nombre de sede"
											value={data.sede}
											height={buttonHeight}
											css={{ "--error-color": "purple" }}
											onChange={(e) => {
												updateValue("sede", e.currentTarget.value);
											}}
										/>
									)}
									{vistaActual === "tablePart" && (
										<Input
											placeholder="Buscar por nombre de persona"
											height={buttonHeight}
											value={data.nombre}
											css={{ "--error-color": "purple" }}
											onChange={(e) => {
												updateValue("nombre", e.currentTarget.value);
											}}
										/>
									)}
									{vistaActual === "tableColab" && (
										<Input
											placeholder="Buscar por nombre de persona"
											height={buttonHeight}
											value={dataColab.nombre}
											css={{ "--error-color": "purple" }}
											onChange={(e) => {
												updateValueColab("nombre", e.currentTarget.value);
											}}
										/>
									)}
								</Field.Root>


								{vistaActual === "table" && (
									<MenuFiltro setData={setData} data={data} />
								)}
								{vistaActual === "tablePart" && (
									<MenuFiltroParticipante setData={setData} data={data} />
								)}
								{vistaActual === "tableColab" && (
									<MenuFiltroColaborador setData={setDataColab} data={dataColab} />
								)}
							</HStack>

						</Box>
						<Flex paddingLeft={{ base: 0, md: "1%" }}
							paddingTop={{ base: 2, md: 0 }}
							borderRadius="md"
							align="center"
							gap={2}
							width={{ base: "100%", md: "auto" }}
							justifyContent={{ base: "center", md: "flex-start" }}>

							<Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
								<Dialog.Trigger asChild>
									<Button
										leftIcon={<LuPlus />}
										colorPalette="purple"
										minW={{ base: "80px", sm: "auto" }}
										height={buttonHeight}
										px={{ base: 2, md: 4 }}
										size={buttonSize}
										fontSize={{ base: "sm", md: "md" }}
									>
										<Text display={{ base: "none", sm: "block" }}>Registrar Mentora</Text>

									</Button>
								</Dialog.Trigger>
								<Portal>
									<Dialog.Backdrop bg="blackAlpha.300" />
									<Dialog.Positioner>
										<Dialog.Content
											id="mentora-dialog-content"
											bg="transparent"
											boxShadow="none"
											border="none"
											maxW={dialogMaxWidth}
											mx="auto"
											maxH={{ base: "90vh", md: "80vh" }}
											overflowY="auto"
										>
											<Dialog.Header bg="transparent" border="none" p={0}>

												<CloseButton
													size="md"
													bg="purple.100"
													color="purple.700"
													borderRadius="full"
													position="absolute"
													top={{ base: "5vh", md: "9.5vh" }}
													right={{ base: "3vw", md: "1.5vw" }}
													aria-label="Cerrar"
													onClick={() => setIsDialogOpen(false)}
													zIndex={1}
												/>

											</Dialog.Header>
											<Dialog.Body p={0}>
												<MentoraForm
													idSede={idSede}
													onSuccess={() => {
														setTimeout(() => setIsDialogOpen(false), 150)
													}}
												/>
											</Dialog.Body>
										</Dialog.Content>
									</Dialog.Positioner>
								</Portal>
							</Dialog.Root>

					{generatePDF ? (
						<Stack>
							<Button colorPalette="green"
								height={buttonHeight}
								px={{ base: 2, md: 4 }}
								size={buttonSize}
								minW={{ base: "80px", sm: "auto" }}
								fontSize={{ base: "sm", md: "md" }} 
								onClick={() => {
									if (vistaActual === "tablePart") {
										modifyPdf(list, sedeName, fecha, true);
									  } else if (vistaActual === "tableColab") {
										modifyPdf(listColab, sedeName, fecha, false);
									  };
									  setGeneratePDF(false);
									}}>
								<Icon size="xl">
									<MdCheck />
									</Icon>
								<Text  >Descargar</Text>
							</Button>
							<Button colorPalette="red"
								height={buttonHeight}
								px={{ base: 2, md: 4 }}
								size={buttonSize}
								minW={{ base: "80px", sm: "auto" }}
								fontSize={{ base: "sm", md: "md" }}  
								onClick={() => {setGeneratePDF(false);}}>
								<Icon size="xl">
									<MdClose />
									</Icon>
								<Text  >Cancelar</Text>
							</Button>
						</Stack>
					) : (
						<Button colorPalette="green"
							height={buttonHeight}
							px={{ base: 2, md: 4 }}
							size={buttonSize}
							minW={{ base: "80px", sm: "auto" }}
							fontSize={{ base: "sm", md: "md" }} 
							onClick={() => {setGeneratePDF(true);}}>
							<Icon size="xl">
								<MdOutlinePostAdd />
								</Icon>
							<Text  >Generar diplomas</Text>
						</Button>
					)}

				
				</Flex>
				</Flex>

					<Box height={30} width="1%" p={1} borderRadius="md"></Box>


					<HStack style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
						<SegmentGroup.Root
							size={{ base: "md", md: "lg" }}
							value={vistaActual}
							onValueChange={(e) => {
								setVistaActual(e.value)
							}}

						>
							<SegmentGroup.Indicator />
							<SegmentGroup.Items

								items={[
									/*
									{
										value: "table",
										label: (
											<HStack>
												<MdOutlineCategory animation="spin 600ms" />
												<Text display={{ base: "none", sm: "block" }}>Grupos</Text>
											</HStack>
										),
									},*/
									{
										value: "tablePart",
										label: (
											<HStack>
												<MdGroups2 />
												<Text display={{ base: "none", sm: "block" }}>Participantes</Text>
											</HStack>
										),
									},
									{
										value: "tableColab",
										label: (
											<HStack>
												<MdBusinessCenter />
												<Text display={{ base: "none", sm: "block" }}>Colaboradoras</Text>
											</HStack>
										),
									},
								]}
							/>
						</SegmentGroup.Root>

						{vistaActual === "tablePart" && (
        <>{dataEntries.some(([_, value]) => value && value !== "" && value !== "Cualquiera" && value !== "Default") && (
						
			<Flex gap="0px" align="start"  width={{ base: "100%", md: "auto" }}>
			<Box height={30} width="100%" p={0} borderRadius="md">
			<HStack style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
			<Text textStyle="md" color="purple.600">Filtros activos:</Text>
				{dataEntries.map(([key, value]) =>
				value && value !== "" && value != "Cualquiera" && value != "Default" ? (  // Verifica que el valor no sea una cadena vacía
					<Tag.Root size="lg" key={key} style={{ flexShrink: 0 }}>
					<Tag.Label>{`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`}</Tag.Label>
					<Tag.EndElement>
						<Tag.CloseTrigger onClick={() => {if (key === "nombre") {
							updateValue(key, "");
						} else {
							updateValue(key, "Cualquiera");
						}}}/>
					</Tag.EndElement>
					</Tag.Root>
				) : null
				)}
			</HStack>
			</Box>
			</Flex>
		)}</>
		
      )} {/*Deberia recibir datapart*/}
      {vistaActual === "tableColab" && (
         <>{dataEntries2.some(([_, value]) => value && value !== "" && value !== "Cualquiera" && value !== "Default") && (
						
			<Flex gap="0px" align="start"  width={{ base: "100%", md: "auto" }}>
			<Box height={30} width="100%" p={0} borderRadius="md">
			<HStack style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
			<Text textStyle="md" color="purple.600">Filtros activos:</Text>
				{dataEntries2.map(([key, value]) =>
				value && value != "" && value != "Cualquiera" && value != "Default" ? (  // Verifica que el valor no sea una cadena vacía
					<Tag.Root size="lg" key={key} style={{ flexShrink: 0 }}>
					<Tag.Label>{`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`}</Tag.Label>
					<Tag.EndElement>
						<Tag.CloseTrigger onClick={() => updateValueColab(key, "")}/>
					</Tag.EndElement>
					</Tag.Root>
				) : null
				)}
			</HStack>
			</Box>
			</Flex>
		)}</>
      )}
	  

					</HStack>



      {/* Condición para renderizar componente */}
      {vistaActual === "table" && (
        <TablaGrupos filtro={data} setData={setData} />
      )}
      {vistaActual === "tablePart" && (
        <TablaParticipantes filtro={data} setData={setData} GenPdf={generatePDF}  list={list} setList={setList}/>
      )} {/*Deberia recibir datapart*/}
      {vistaActual === "tableColab" && (
        <TablaColaborador filtro={dataColab} setData={setDataColab} GenPdf={generatePDF}  list={listColab} setList={setListColab}/>
      )}
    

				</Box>
			</Stack>
		</Box>
	);
};

export default GestionGruposPage;