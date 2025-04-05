import {Box, Button, Flex, Icon, IconButton, Table, Text} from "@chakra-ui/react";
import {MdPictureAsPdf, MdMenu, MdPersonSearch} from "react-icons/md";
import {useEffect, useState} from "react";
import {getSedes} from "@/services/tablaSedesService.js";
import {formatDateTime} from "@/utils/formatDateTime.js";

/*const sedes = [
	{ id_sede: 1, nombre_sede: "PUE", nombre_coord_sede: "Paola Gimenez", correo_coord_sede: "A01737438@tec.mx", total_grupos: "14",
		total_participantes: "70", estado: "Abierto", fecha_solicitud: "12/12/2003"},
	{ id_sede: 2, nombre_sede: "GDA", nombre_coord_sede: "Paola Hernandez", correo_coord_sede: "A01737438@tec.mx", total_grupos: "7",
		total_participantes: "100", estado: "Abierto", fecha_solicitud: "12/12/2003"},
	{ id_sede: 3, nombre_sede: "PUE", nombre_coord_sede: "El Mush", correo_coord_sede: "A01737438@tec.mx", total_grupos: "4",
		total_participantes: "140", estado: "Cerrado", fecha_solicitud: "12/12/2003"},
	{ id_sede: 4, nombre_sede: "GDA", nombre_coord_sede: "Jonathan Soltri", correo_coord_sede: "A01737438@tec.mx", total_grupos: "5",
		total_participantes: "80", estado: "Abierto", fecha_solicitud: "12/12/2003"},
	{ id_sede: 5, nombre_sede: "PUE", nombre_coord_sede: "Gadiro Rusbel", correo_coord_sede: "A01737438@tec.mx", total_grupos: "7",
		total_participantes: "70", estado: "Cerrado", fecha_solicitud: "12/12/2003"},
	{ id_sede: 6, nombre_sede: "PUE", nombre_coord_sede: "Kevin Hernandez", correo_coord_sede: "A01737438@tec.mx", total_grupos: "4",
		total_participantes: "70", estado: "Abierto", fecha_solicitud: "12/12/2003"},
	{ id_sede: 7, nombre_sede: "MTY", nombre_coord_sede: "Pablo Quispe", correo_coord_sede: "A01737438@tec.mx", total_grupos: "1",
		total_participantes: "20", estado: "Abierto", fecha_solicitud: "12/12/2003"},
]*/



export const TablaSedes = ({filtro}) => {
	
	const [sedes, setSedes] = useState([]);

	useEffect(() => {
		getSedes()
			.then(sedes => setSedes(sedes))

	}, [])
	

	const sortSedes = (sedes) => {
		const orden = filtro.orden[0] || "Default";;

		console.log({orden});
		return sedes.sort((a, b) => {
		  switch (orden) {
			case "Sede":
			  return a.nombre_sede.localeCompare(b.nombre_sede);
			case "Nombre":
				return a.nombre_coord_sede.localeCompare(b.nombre_coord_sede);
			case "Fecha":
			  return new Date(a.fecha_solicitud) - new Date(b.fecha_solicitud);
			case "Estado":
			  return a.estado.localeCompare(b.estado);
			case "Estudiantes":
			  return a.total_participantes - b.total_participantes;
			case "Grupos":
			  return a.total_grupos - b.total_grupos;
			default:
			  return 0; // Si no hay un orden especificado, no se realiza ninguna acción
		  }
		});
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
				
				<Text textStyle="2xl" paddingLeft="2%">Lista de sedes:</Text>
			</Flex>
			<Table.ScrollArea borderWidth="1px" rounded="md" height="350px" paddingLeft="2%" paddingRight="2%">
				<Table.Root size="sm" showColumnBorder stickyHeader>
					<Table.Header>
						<Table.Row bg="bg.subtle">
							<Table.ColumnHeader>Sede</Table.ColumnHeader>
							<Table.ColumnHeader>Coordinadora de Sede</Table.ColumnHeader>
							<Table.ColumnHeader>Email</Table.ColumnHeader>
							{/*<Table.ColumnHeader>Grupos</Table.ColumnHeader>
							<Table.ColumnHeader>Nro. de estudiantes</Table.ColumnHeader>*/}
							<Table.ColumnHeader>Estado</Table.ColumnHeader>
							<Table.ColumnHeader>Fecha Solicitud</Table.ColumnHeader>

							<Table.ColumnHeader >Detalles</Table.ColumnHeader>
						</Table.Row>
					</Table.Header>
					<Table.Body>
					{sortSedes(
						sedes.filter((sede) => {
							return (
							(filtro.sede === "" || sede.nombre_sede?.toLowerCase().includes(filtro.sede.toLowerCase())) &&
							(filtro.nombre === "" || sede.nombre_coord_sede?.toLowerCase().includes(filtro.nombre.toLowerCase())) &&
							(filtro.grupos === "" || sede.total_grupos?.toString().includes(filtro.grupos)) &&
							(filtro.estudiantes === "" || sede.total_participantes?.toString().includes(filtro.estudiantes)) &&
							(filtro.estado.toString() === "Cualquiera" || filtro.estado.toString() === "" || sede.estado === filtro.estado.toString()) &&
							(filtro.fecha === "" || formatDateTime(sede.fecha_solicitud)?.includes(filtro.fecha))
							);
						})
						).map((sede) => (
						<Table.Row key={sede.id_sede}>
							<Table.Cell>{sede.nombre_sede}</Table.Cell> {/* campus */}
							<Table.Cell>{sede.nombre_coord_sede}</Table.Cell> {/* cord */}
							<Table.Cell>{sede.correo_coord_sede}</Table.Cell> {/* email */}
							{/* <Table.Cell>{sede.total_grupos}</Table.Cell> {/ grupo /}
							<Table.Cell>{sede.total_participantes}</Table.Cell> {/* estudiantes */}
							<Table.Cell>{sede.estado}</Table.Cell>
							<Table.Cell>{formatDateTime(sede.fecha_solicitud)}</Table.Cell> {/* fecha */}
							<Table.Cell>
							<IconButton size="md" colorPalette="purple">
								<MdPictureAsPdf />
								
							</IconButton>
							{" "}
							<IconButton size="md" colorPalette="purple">
								<MdMenu />
							</IconButton>
							</Table.Cell>
						</Table.Row>
						))}
					</Table.Body>
				</Table.Root>
			</Table.ScrollArea>
		</>
	)
}