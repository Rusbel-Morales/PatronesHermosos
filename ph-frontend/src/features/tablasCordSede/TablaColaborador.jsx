import {Box, Button, Flex, Icon, IconButton, Table, Text, Status, Checkbox, Field} from "@chakra-ui/react";
import {MdPictureAsPdf, MdMenu, MdPersonSearch, MdEmail, MdEject, MdCalendarMonth} from "react-icons/md";
import {useEffect, useState} from "react";
import {getColaborador} from "@/services/colabService.js";
import {formatDateTime} from "@/utils/formatDateTime.js";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom"

export const TablaColaborador = ({filtro, setData, GenPdf, list, setList}) => {
	const navigate = useNavigate(); 
	const [part, setPart] = useState([]);
	const idSede = localStorage.getItem('id_sede');
	
	console.log(list)
	const handleSelectSede = (sedeId) => {
		setCurSede(sedeId);
	}

	useEffect(() => {
		getColaborador(idSede)
			.then(part => setPart(part))

	}, [])

	console.log(part);

	const updateValue = (key, value) => {
		setData((prevData) => ({
		  ...prevData,
		  [key]: value,
		}));
	  };

	  const handleVerDetalles = (personal) => {
		const idPersonal = personal.id_personal;
		
		if (!idPersonal) {
		  console.error("No se encontró id_participante para navegar");
		  return;
		}
	  
		navigate(`/coord-sede/gestion-colaboradores/${idPersonal}`, {
		  state: {
			personal,  // ← solo mandamos *un* participante
		  },
		});
	  };

	const sortSedes = (sedes) => {
		const orden = filtro.orden[0] || "Default";;
		return sedes.sort((a, b) => {
		  switch (orden) {
			case "Nombre":
				return a.nombre.localeCompare(b.nombre);
			case "Rol":
				return a.rol_preferencia.localeCompare(b.rol_preferencia);
			case "Escolaridad":
			  return a.escolaridad.localeCompare(b.escolaridad);
			case "Edad":
			  return a.edad - b.edad;
			case "Grado":
			  return a.grado - b.grado;
			case "Estado":
			  return a.estado.localeCompare(b.estado);
			default:
			  return 0; // Si no hay un orden especificado, no se realiza ninguna acción
		  }
		});
	  };

	  // Primero extraes toda la lógica en una función aparte
		const filtrarSedes = () => {
			if (part.length > 0) {
				const filteredList = sortSedes(
					part.filter((sede) => {
						return (
							(filtro.nombre === "" || sede.nombre?.toLowerCase().includes(filtro.nombre.toLowerCase())) &&
							(filtro.grupos === "" || sede.total_grupos?.toString().includes(filtro.grupos)) &&
							(sede.estado === "aceptado") &&
							(filtro.fecha === "" || formatDateTime(sede.fecha_inicio)?.includes(filtro.fecha)) &&
							(filtro.rol.toString() === "Cualquiera" || filtro.rol.toString() === "" || sede.rol_preferencia  === filtro.rol.toString())
						);
					})
				);
				setList(filteredList);
			}
		};
	  
		// Ahora tu useEffect simplemente llama a esa función una vez al inicio:
		useEffect(() => {
			filtrarSedes();
		}, [part, GenPdf, filtro]);
	  
		// Y también puedes llamarla manualmente desde donde quieras, por ejemplo:
		const handleButtonClick = () => {
			filtrarSedes();
		};

	return(
		<>
			<Flex gap="0px" align="start">
				
				{/*<Box height={50} p={4} borderRadius="md">
					<Button top = "15%" bg="purple.500">
						<Icon size="xl">
							<MdPersonSearch />
						</Icon>
						<Text textStyle="lg">Lista de sedes</Text>
					</Button>
					</Box>
					</Flex>
					<Flex gap="0px" align="center">*/}
				
				
			</Flex>
			<Table.ScrollArea borderWidth="1px" rounded="md" height="400px">
				<Table.Root size="sm" showColumnBorder stickyHeader>
					<Table.Header>
						<Table.Row bg="bg.subtle">
							<Table.ColumnHeader textAlign="center" onClick={() => updateValue("orden", ["Estado"])}>
								<Button top = "15%" variant="ghost"><MdEject/>Estado</Button>
							</Table.ColumnHeader>
							<Table.ColumnHeader onClick={() => updateValue("orden", ["Nombre"])}>
								<Button top = "15%" variant="ghost"><MdEject/>Nombre</Button>
							</Table.ColumnHeader>
							<Table.ColumnHeader >Correo</Table.ColumnHeader>
							<Table.ColumnHeader onClick={() => updateValue("orden", ["Rol"])}>
								<Button top = "15%" variant="ghost"><MdEject/>Rol</Button>
							</Table.ColumnHeader>
							{/*<Table.ColumnHeader>Grupos</Table.ColumnHeader>
							<Table.ColumnHeader>Nro. de estudiantes</Table.ColumnHeader>*/}
							<Table.ColumnHeader textAlign="center" onClick={() => updateValue("orden", ["Fecha"])}>
								<Button top = "15%" variant="ghost"><MdEject/>Fecha</Button>
							</Table.ColumnHeader>

							<Table.ColumnHeader ></Table.ColumnHeader>
						</Table.Row>
					</Table.Header>
					<Table.Body>
					{sortSedes(
						part.filter((sede) => {
							return (
							(filtro.nombre === "" || sede.nombre?.toLowerCase().includes(filtro.nombre.toLowerCase())) &&
							(filtro.grupos === "" || sede.total_grupos?.toString().includes(filtro.grupos)) &&
							(filtro.estado.toString() === "Cualquiera" || filtro.estado.toString() === "" || sede.estado === filtro.estado.toString()) &&
							(filtro.fecha === "" || formatDateTime(sede.fecha_inicio)?.includes(filtro.fecha)) &&
							(filtro.rol.toString() === "Cualquiera" || filtro.rol.toString() === "" || sede.rol_preferencia  === filtro.rol.toString())
							);
						})
						).map((person, index) => (
						<Table.Row key={person.id_personal}>
							<Table.Cell textAlign="center">
								<Status.Root colorPalette={person.estado === "aceptado" ? "green" :
										person.estado === "rechazado" ? "red" :
										person.estado === "pendiente" ? "yellow" :
										"purple"} size="xl">
									<Status.Indicator />
								</Status.Root>
							</Table.Cell>
							<Table.Cell>{person.nombre}</Table.Cell> {/* campus */}
							<Table.Cell><Flex align="center" justify="start" gap={2}
								onClick={() => {
									window.open(
										'https://outlook.office.com/mail/deeplink/compose?to=' + person.correo,
										'Mensaje de Patrones Hermosos',
										'width=600,height=600,noopener,noreferrer'
									);
									}}
									style={{ cursor: 'pointer' }}
									>
									<Icon as={MdEmail} color="purple.500" boxSize={5} />
									<Text textDecoration='underline'>{person.correo}</Text>
								</Flex></Table.Cell>
							<Table.Cell>
							{person.rol_preferencia}
							</Table.Cell> {/* email */}
							{/* <Table.Cell>{sede.total_grupos}</Table.Cell> {/ grupo /}
							<Table.Cell>{sede.total_participantes}</Table.Cell> {/* estudiantes */}
							<Table.Cell textAlign="center">
								<Flex align="center" justify="center" gap={2}>
									<Icon as={MdCalendarMonth} color="purple.500" boxSize={5} />
									{formatDateTime(person.fecha_formulario)}
								</Flex>
							</Table.Cell> {/* fecha */}
							<Table.Cell textAlign="center">
								{/*
							<IconButton size="md" colorPalette="purple">
								<MdPictureAsPdf />
								
							</IconButton>*/}
							{GenPdf ? (
								<Box width="70%" p={2} borderRadius="md" _hover={{ bg: "purple.100" }}>
									<Checkbox.Root
										defaultChecked
										variant={"solid"}
										colorPalette={"purple"}
										size={"lg"}

										onCheckedChange={({ checked }) => {
											if (checked) {
												// AGREGAR a list si no está
												setList(prevList => {
													if (!prevList.some(p => p.id_personal === person.id_personal)) {
													return [...prevList, person];
													}
													return prevList;
												});
												} else {
												// REMOVER de list
												setList(prevList => prevList.filter(p => p.id_personal !== person.id_personal));
												}
												
										}}
										>
										<Checkbox.HiddenInput />
										<Checkbox.Control />
										<Checkbox.Label>Generar Diploma</Checkbox.Label>
									</Checkbox.Root>
								</Box>
							) : (
							<Button size="md" colorPalette="purple" onClick={() => handleVerDetalles(person)}>
								<MdMenu />
								<Text textStyle="md">Ver detalles</Text>
							</Button>
							)}
							</Table.Cell>
						</Table.Row>
						))}
					</Table.Body>
				</Table.Root>
			</Table.ScrollArea>
		</>
	)
}