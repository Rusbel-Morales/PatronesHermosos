import { useState } from "react";
import { Button, Card, Stack, Field, Input, Text, NumberInput, Select, Portal } from "@chakra-ui/react";
import { FaArrowUp } from "react-icons/fa";
import { createSede } from "../../services/sedeService";
import { calcularProgresoSede } from '../../utils/sedeProgreso';
import { fechas } from "@/utils/optionsCollections.js";
import SedePreview from "../../components/previews/SedePreview";
/**
 * @typedef {Object} SedeFormData
 * @property {{ nombre: string, correo: string, telefono: string }} coordSede
 * @property {{ nombre_sede: string, num_grupos_sede: number, fecha_inicio: string }} sede
 * @property {File | null} archivo
 */

/**
 * @typedef {Object} SedeFormProps
 * @property {(data: SedeFormData) => void} onSubmit
 * @property {(progress: number) => void} setProgress
 */

/**
 * @param {SedeFormProps} props
 */
const SedeForm = ({ onSubmit, setProgress }) => {
	const [formData, setFormData] = useState({
		coordSede: {
			nombre: "",
			correo: "",
			telefono: "",
		},
		sede: {
			nombre_sede: "",
			num_grupos_sede: 0,
			fecha_inicio: ""
		},
		archivo: null
	});

	const [fileName, setFileName] = useState("");
	const [fileURL, setFileURL] = useState(null);
	const [showPreview, setShowPreview] = useState(false);

	const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	const isValidPhone = (phone) => /^\d{10}$/.test(phone);

	const isFormComplete = () => {
		const { coordSede, sede } = formData;
		return (
			coordSede.nombre.trim() !== "" &&
			coordSede.correo.trim() !== "" &&
			coordSede.telefono.trim() !== "" &&
			sede.nombre_sede.trim() !== "" &&
			sede.num_grupos_sede > 0 &&
			sede.fecha_inicio.trim() !== "" &&
			formData.archivo !== null
		);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		const updatedData = {
			...formData,
			coordSede: {
				...formData.coordSede,
				...(name in formData.coordSede ? { [name]: value } : {}),
			},
			sede: {
				...formData.sede,
				...(name in formData.sede ? { [name]: value } : {}),
			},
		};
		setFormData(updatedData);
		const updatedProgress = calcularProgresoSede(updatedData);
		setProgress(updatedProgress);
	};

	const handleFileUpload = (e) => {
		const file = e.target.files?.[0] || null;
		if (file) {
			const url = URL.createObjectURL(file);
			setFileURL(url);
			setFileName(file.name);
			const updatedData = { ...formData, archivo: file };
			setFormData(updatedData);
			const updatedProgress = calcularProgresoSede(updatedData);
			setProgress(updatedProgress);
		}
	};

	const handleShowPreview = () => {
		if (!isValidEmail(formData.coordSede.correo)) {
			alert("Correo electrónico inválido");
			return;
		}
		if (!isValidPhone(formData.coordSede.telefono)) {
			alert("Número de teléfono inválido");
			return;
		}
		if (isFormComplete()) {
			setShowPreview(true);
		}
	};

	const handleBackToForm = () => {
		setShowPreview(false);
	};

	// Define la función una sola vez, por ejemplo, al inicio del componente:
const convertirFechaISO = (fechaStr) => {
	if (!fechaStr || !fechaStr.includes('/')) {
	  console.error("El valor de fecha no es válido:", fechaStr);
	  return fechaStr; // O devuelve una cadena vacía según convenga
	}
	const [dia, mes, anio] = fechaStr.split('/');
	return `${anio}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
  };
  
  const handleSubmit = async (e) => {
	e.preventDefault();
	// Verifica el valor actual de fecha_inicio
	const fechaSeleccionada = formData.sede.fecha_inicio; // Por ejemplo "01/04/2025"
	
	// Crea un nuevo objeto con la fecha convertida
	const formDataToSend = {
	  ...formData,
	  sede: {
		...formData.sede,
		fecha_inicio: convertirFechaISO(fechaSeleccionada),
	  },
	};
  
	try {
	  // Asegúrate de enviar el objeto convertido
	  const response = await createSede(formDataToSend);
	  console.log("✅ Registro exitoso:", response);
	} catch (error) {
	  console.error("❌ Error al registrar:", error);
	}
  };

	return (
		<form onSubmit={handleSubmit}>
			<Stack align="center" mt="4">
				<Card.Root maxW="6xl" w="full" bg="gray.100" pl="10" pr="10">
					{!showPreview ? (
						<>
							{/* Formulario de ingreso de datos */}
							<Card.Header>
								<Card.Title fontWeight="bold" fontSize={"3xl"}>
									Datos de la Coordinadora
								</Card.Title>
							</Card.Header>
							<Card.Body>
								<Stack gap="4" w="full">
									<Field.Root>
										<Field.Label fontSize="lg">
											Nombre Completo de la Coordinadora:
										</Field.Label>
										<Input
											type="text"
											name="nombre"
											value={formData.coordSede.nombre}
											onChange={handleChange}
											placeholder="Rosa Paredes"
											required
										/>
									</Field.Root>
									<Field.Root>
										<Field.Label fontSize="lg">
											Correo de la Coordinadora:
										</Field.Label>
										<Input
											type="text"
											name="correo"
											value={formData.coordSede.correo}
											onChange={handleChange}
											placeholder="Rosa@gmail.com"
											pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
											required
										/>
									</Field.Root>
									<Field.Root>
										<Field.Label fontSize="lg">Teléfono:</Field.Label>
										<Input
											type="text"
											name="telefono"
											value={formData.coordSede.telefono}
											onChange={handleChange}
											placeholder="2223568972"
											pattern="[0-9]{10}"
											required
										/>
									</Field.Root>
								</Stack>
							</Card.Body>

							<Card.Header>
								<Card.Title fontWeight="bold" fontSize={"3xl"}>
									Datos de la Sede
								</Card.Title>
							</Card.Header>
							<Card.Body>
								<Stack gap="4" w="full">
									<Field.Root>
										<Field.Label fontSize="lg">Nombre de la Sede:</Field.Label>
										<Input
											type="text"
											name="nombre_sede"
											value={formData.sede.nombre_sede}
											onChange={handleChange}
											placeholder="TEC Campus Puebla"
											required
										/>
									</Field.Root>

									<Field.Root>
										<Field.Label fontSize="lg">Grupos a abrir:</Field.Label>
										<NumberInput.Root
											defaultValue={formData.sede.num_grupos_sede}
											min={1}
											max={50}
											onValueChange={(details) => {
												const updatedData = {
													...formData,
													sede: {
														...formData.sede,
														num_grupos_sede: details.valueAsNumber || 0,
													},
												};
												setFormData(updatedData);
												const updatedProgress = calcularProgresoSede(updatedData);
												setProgress(updatedProgress);
											}}
										>
											<NumberInput.Control />
											<NumberInput.Input />
										</NumberInput.Root>
										<Field.HelperText>Seleciona Entre 1 a 50 Grupos</Field.HelperText>
									</Field.Root>

									<Select.Root
										collection={fechas}
										value={[formData.sede.fecha_inicio]}
										onValueChange={(details) => {
											const updatedData = {
												...formData,
												sede: {
													...formData.sede,
													fecha_inicio: details.value[0], // Extraemos el primer valor
												},
											};
											setFormData(updatedData);
											const updatedProgress = calcularProgresoSede(updatedData);
											setProgress(updatedProgress);
										}}
									>
										<Select.HiddenSelect />
										<Select.Label fontSize="lg">Seleciona la Fecha de Inicio:</Select.Label>
										<Select.Control>
											<Select.Trigger>
												<Select.ValueText placeholder="DD/MM/AAAA" />
											</Select.Trigger>
											<Select.IndicatorGroup>
												<Select.Indicator />
											</Select.IndicatorGroup>
										</Select.Control>
										<Portal>
											<Select.Positioner>
												<Select.Content>
													{fechas.items.map((movie) => (
														<Select.Item item={movie} key={movie.value}>
															{movie.label}
															<Select.ItemIndicator />
														</Select.Item>
													))}
												</Select.Content>
											</Select.Positioner>
										</Portal>
									</Select.Root>

									<Field.Root>
										<Field.Label fontSize="lg">Convocatoria:</Field.Label>
										<Input
											type="file"
											name="convocatoria_firmada"
											onChange={handleFileUpload}
											required
											style={{ display: "none" }}
											id="fileInput"
										/>
										<Button
											onClick={() => document.getElementById("fileInput")?.click()}
											colorPalette={"purple"}
											variant="outline"
										>
											<FaArrowUp /> Subir Archivo
										</Button>
										{fileName && <Text mt={2}>Archivo seleccionado: {fileName}</Text>}
									</Field.Root>
								</Stack>
							</Card.Body>

							<Card.Footer display="flex" justifyContent="center">
								<Button
									onClick={handleShowPreview}
									colorPalette={"purple"}
									size="xl"
									disabled={!isFormComplete()} // Deshabilita el botón si el formulario no está completo
								>
									Ver Datos
								</Button>
							</Card.Footer>
						</>
					) : (
						<SedePreview
							formData={formData}
							fileURL={fileURL}
							fileName={fileName}
							handleBackToForm={handleBackToForm}
						/>
					)}
				</Card.Root>
			</Stack>
		</form>
	);
};

export default SedeForm;
