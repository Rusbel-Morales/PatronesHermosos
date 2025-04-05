import { Card, Stack, Text, Box } from "@chakra-ui/react";

/**
 * Componente que muestra una vista previa de los datos ingresados en el formulario de sede.
 *
 * @param {Object} props - Props del componente.
 * @param {Object} props.data - Datos del formulario.
 * @param {Object} props.data.coorsede - Datos de la coordinadora.
 * @param {string} props.data.coorsede.nombre - Nombre de la coordinadora.
 * @param {string} props.data.coorsede.correo - Correo de la coordinadora.
 * @param {string} props.data.coorsede.telefono - Teléfono de la coordinadora.
 * @param {Object} props.data.sede - Datos de la sede.
 * @param {string} props.data.sede.nombre_sede - Nombre de la sede.
 * @param {number} props.data.sede.num_grupos_sede - Número de grupos.
 * @param {string} props.data.sede.fecha - Fecha de inicio.
 * @param {File|null} props.data.sede.convocatoria_firmada - Archivo de la convocatoria.
 */
const FormPreview = ({ data }) => {
	return (
		<Card maxW="6xl" w="full" bg="gray.50" p="6">
			<Stack spacing="4">
				<Text fontSize="2xl" fontWeight="bold" mb="4">
					Vista Previa del Formulario
				</Text>

				{/* Datos de la Coordinadora */}
				<Box>
					<Text fontSize="xl" fontWeight="bold" mb="2">
						Datos de la Coordinadora
					</Text>
					<Text>
						<strong>Nombre:</strong> {data.coorsede.nombre || "No proporcionado"}
					</Text>
					<Text>
						<strong>Correo:</strong> {data.coorsede.correo || "No proporcionado"}
					</Text>
					<Text>
						<strong>Teléfono:</strong> {data.coorsede.telefono || "No proporcionado"}
					</Text>
				</Box>

				{/* Datos de la Sede */}
				<Box>
					<Text fontSize="xl" fontWeight="bold" mb="2">
						Datos de la Sede
					</Text>
					<Text>
						<strong>Nombre de la Sede:</strong> {data.sede.nombre_sede || "No proporcionado"}
					</Text>
					<Text>
						<strong>Grupos a abrir:</strong> {data.sede.num_grupos_sede || "0"}
					</Text>
					<Text>
						<strong>Fecha de Inicio:</strong> {data.sede.fecha || "No proporcionada"}
					</Text>
					<Text>
						<strong>Convocatoria:</strong>{" "}
						{data.sede.convocatoria_firmada ? data.sede.convocatoria_firmada.name : "No subida"}
					</Text>
				</Box>
			</Stack>
		</Card>
	);
};

export default FormPreview;