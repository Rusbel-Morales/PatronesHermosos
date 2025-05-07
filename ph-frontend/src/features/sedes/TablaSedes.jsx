import {Box, Button, Flex, Icon, IconButton, Table, Text, Status} from "@chakra-ui/react";
import {MdPictureAsPdf, MdMenu, MdPersonSearch, MdEmail, MdEject} from "react-icons/md";
import {useEffect, useState} from "react";
import {getSedes} from "@/services/tablaSedesService.js";
import {formatDateTime} from "@/utils/formatDateTime.js";
import {Link} from "react-router-dom";

export const TablaSedes = ({filtro, setData}) => {
	const [sedes, setSedes] = useState([]);
	const [curSede, setCurSede] = useState(null);

	const handleSelectSede = (sedeId) => {
		setCurSede(sedeId);
	}

	useEffect(() => {
		getSedes()
			.then(sedes => setSedes(sedes))

	}, [])

	const updateValue = (key, value) => {
		setData((prevData) => ({
		  ...prevData,
		  [key]: value,
		}));
	  };

	const sortSedes = (sedes) => {
		const orden = filtro.orden[0] || "Default";;
		return sedes.sort((a, b) => {
		  switch (orden) {
			case "Sede":
			  return a.nombre_sede.localeCompare(b.nombre_sede);
			case "Nombre":
				return a.nombre_coord_sede.localeCompare(b.nombre_coord_sede);
			case "Fecha":
			  return new Date(a.fecha_inicio) - new Date(b.fecha_inicio);
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
							<Table.ColumnHeader textAlign="center" onClick={() => updateValue("orden", ["Estado"])}>
								<Button top = "15%" variant="ghost"><MdEject/>Estado</Button>
							</Table.ColumnHeader>
							<Table.ColumnHeader onClick={() => updateValue("orden", ["Sede"])}>
								<Button top = "15%" variant="ghost"><MdEject/>Sede</Button>
							</Table.ColumnHeader>
							<Table.ColumnHeader onClick={() => updateValue("orden", ["Nombre"])}>
								<Button top = "15%" variant="ghost"><MdEject/>Coordinadora de Sede</Button>
							</Table.ColumnHeader>
							<Table.ColumnHeader>Email</Table.ColumnHeader>
							{/*<Table.ColumnHeader>Grupos</Table.ColumnHeader>
							<Table.ColumnHeader>Nro. de estudiantes</Table.ColumnHeader>*/}
							<Table.ColumnHeader textAlign="center" onClick={() => updateValue("orden", ["Fecha"])}>
								<Button top = "15%" variant="ghost"><MdEject/>Fecha Inicio</Button>
							</Table.ColumnHeader>

							<Table.ColumnHeader ></Table.ColumnHeader>
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
							(filtro.fecha === "" || formatDateTime(sede.fecha_inicio)?.includes(filtro.fecha))
							);
						})
						).map((sede, index) => (
						<Table.Row key={sede.id_sede}>
							<Table.Cell textAlign="center">
								<Status.Root colorPalette={sede.estado === "aceptado" ? "green" :
										sede.estado === "rechazado" ? "red" :
										sede.estado === "pendiente" ? "yellow" :
										"purple"} size="xl">
									<Status.Indicator />
								</Status.Root>
							</Table.Cell>
							<Table.Cell>{sede.nombre_sede}</Table.Cell> {/* campus */}
							<Table.Cell>{sede.nombre_coord_sede}</Table.Cell> {/* cord */}
							<Table.Cell>{sede.correo_coord_sede}</Table.Cell> {/* email */}
							{/* <Table.Cell>{sede.total_grupos}</Table.Cell> {/ grupo /}
							<Table.Cell>{sede.total_participantes}</Table.Cell> {/* estudiantes */}
							<Table.Cell textAlign="center">{formatDateTime(sede.fecha_inicio)}</Table.Cell> {/* fecha */}
							<Table.Cell>
								{/*
							<IconButton size="md" colorPalette="purple">
								<MdPictureAsPdf />
								
							</IconButton>*/}
							<Link to={`/coord-general/gestion-sedes/${sede.id_sede}`} state={{ sedes, currentIndex: index }}>
								<Button size="md" colorPalette="purple" onClick={() => handleSelectSede(sede.id_sede)}>
									<MdMenu />
									<Text textStyle="md">Ver detalles</Text>
								</Button>
							</Link>
							</Table.Cell>
						</Table.Row>
						))}
					</Table.Body>
				</Table.Root>
			</Table.ScrollArea>
		</>
	)
}