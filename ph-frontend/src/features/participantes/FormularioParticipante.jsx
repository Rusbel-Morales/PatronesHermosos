import { useState, useEffect } from "react";
import {Button, Card, Stack, Field, Input, Text, NumberInput, Portal, Select, createListCollection, Flex, Box, Link,
} from "@chakra-ui/react";
import { FaArrowUp, FaInfoCircle } from "react-icons/fa";
import { fetchSedesParticipante, createParticipante } from "../../services/participanteService";
import { calcularProgresoParticipante } from '../../utils/participanteProgreso';
import { escolaridades, idiomas, niveles, roles } from "../../utils/optionsCollections";
import ParticipanteFormPreview from "../../components/form_previews/ParticipanteFormPreview.jsx";
import SuccessModal from "../../components/modals/SuccessModal";
import ErrorModal from "../../components/modals/ErrorModal";

/**
 * @typedef {Object} ParticipanteFormData
 * @property {{ nombre: string, correo: string, edad: number, escolaridad: string, grado: number }} participante
 * @property {{ nombre: string, correo: string, telefono: string }} tutor
 * @property {{ id_sede: number, nombre_sede: string }} sede
 * @property {File | null} archivo
 */

/**
 * @typedef {Object} ParticipanteFormProps
 * @property {(data: ParticipanteFormData) => void} onSubmit
 * @property {(progress: number) => void} setProgress
 */

/**
 * @param {ParticipanteFormProps} props
 */
const ParticipanteForm = ({ onSubmit, setProgress }) => {
	const [formData, setFormData] = useState({
		participante: {
			nombre: "",
			correo: "",
			edad: 0,
			escolaridad: "",
			idioma_preferencia: "",
			grado: 0,
		},
		tutor: {
			nombre: "",
			correo: "",
			telefono: "",
		},
		sede: {
			id_sede: 0,
			nombre_sede: "",
		},
		archivo: null,
	});

	const [fileName, setFileName] = useState("");
	const [fileURL, setFileURL] = useState(null);
	const [showPreview, setShowPreview] = useState(false);
	const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
	const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

	const [sedesCollection, setSedesCollection] = useState(
		createListCollection({ items: [] })
	);
	
	useEffect(() => {
		const cargarSedes = async () => {
		try {
			const items = await fetchSedesParticipante();
			const listaFinal = items.length > 0 ? items : [{ value: "0", label: "Datos inexistentes" }];
			setSedesCollection(createListCollection({ items: listaFinal }));
		} catch (error) {
			console.error("❌ Error:", error);
			setSedesCollection(createListCollection({
				items: [{ value: "0", label: "Datos inexistentes" }],
			}));
		}
	};
		cargarSedes();
	}, []);

	const isFormComplete = () => {
		const { participante, tutor, archivo, sede } = formData;
		const isParticipanteEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(participante.correo);
		const isTutorEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(tutor.correo);
		const isSedeSeleccionada = sede.id_sede !== 0;
		const isArchivoSubido = archivo !== null;
		const isArchivoPDF = archivo && archivo.name.toLowerCase().endsWith('.pdf');
		const isArchivoSizeValid = archivo && archivo.size <= 2097152; // 2MB = 2097152 bytes

		return (
			participante.nombre.trim() !== "" &&
			participante.correo.trim() !== "" &&
			isParticipanteEmailValid &&
			participante.edad > 0 &&
			participante.escolaridad.trim() !== "" &&
			participante.grado > 0 &&
			tutor.nombre.trim() !== "" &&
			tutor.correo.trim() !== "" &&
			isTutorEmailValid &&
			tutor.telefono.trim() !== "" &&
			isSedeSeleccionada &&
			isArchivoSubido &&
			isArchivoPDF &&
			isArchivoSizeValid
		);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name in formData.participante) {
			const updatedData = {
				...formData,
				participante: { ...formData.participante, [name]: value },
			};
			setFormData(updatedData);
			const updatedProgress = calcularProgresoParticipante(updatedData);
			setProgress(updatedProgress);
		} else if (name.startsWith("tutor_")) {
			const field = name.replace("tutor_", "");
			const updatedData = {
				...formData,
				tutor: { ...formData.tutor, [field]: value },
			};
			setFormData(updatedData);
			const updatedProgress = calcularProgresoParticipante(updatedData);
			setProgress(updatedProgress);
		}
	};

	const handleFileUpload = (e) => {
		const file = e.target.files?.[0] || null;
		if (file) {
			const url = URL.createObjectURL(file);
			setFileURL(url);
			setFileName(file.name);
			const updatedData = {
				...formData,
				archivo: file,
			};
			setFormData(updatedData);
			const updatedProgress = calcularProgresoParticipante(updatedData);
			setProgress(updatedProgress);
		}
	};

	const handleShowPreview = () => {
		if (isFormComplete()) setShowPreview(true);
	};

	const handleBackToForm = () => {
		setShowPreview(false);
	};

	const [mensaje, setMensaje] = useState(<Field.Root></Field.Root>);
	const [nombreP, setNombreP] = useState("gray");
	const [correoP, setCorreoP] = useState("gray");
	const [nombreT, setNombreT] = useState("gray");
	const [correoT, setCorreoT] = useState("gray");
	const [telefonoT, setTelefonoT] = useState("gray");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await createParticipante(formData);
			console.log("✅ Registro exitoso:", response);
			setIsSuccessModalOpen(true);
		} catch (error) {
			console.error("❌ Error al registrar:", error);
			setIsErrorModalOpen(true);
		}
		};


	useEffect(() => {
		if (formData.participante.nombre) {
			if (/^[A-Za-zÁÉÍÓÚáéíóúÑñüÜ ]+$/u.test(formData.participante.nombre)) {
				setNombreP("gray");
			} else {
				setNombreP("red");
			}
		}
	}, [formData.participante.nombre]);

	useEffect(() => {
		if (formData.participante.correo) {
			if (/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/u.test(formData.participante.correo)) {
				setCorreoP("gray");
			} else {
				setCorreoP("red");
			}
		}
	}, [formData.participante.correo]);

	useEffect(() => {
		if (formData.tutor.nombre) {
			if (/^[A-Za-zÁÉÍÓÚáéíóúÑñüÜ ]+$/u.test(formData.tutor.nombre)) {
				setNombreT("gray");
			} else {
				setNombreT("red");
			}
		}
	}, [formData.tutor.nombre]);

	useEffect(() => {
		if (formData.tutor.correo) {
			if (/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/u.test(formData.tutor.correo)) {
				setCorreoT("gray");
			} else {
				setCorreoT("red");
			}
		}
	}, [formData.tutor.correo]);

	useEffect(() => {
		if (formData.tutor.telefono) {
			if (/^\d{9,15}$/u.test(formData.tutor.telefono)) {
				setTelefonoT("gray");
			} else {
				setTelefonoT("red");
			}
		}
	}, [formData.tutor.telefono]);

	console.log({formData})

	return (
		<form onSubmit={handleSubmit}>
			<Stack align="center" w="100vw" h="45vh" mt="4">
				<Card.Root maxW="6xl" w="full" bg="gray.100" pl="10" pr="10">
					{!showPreview ? (
						<>
							{/* Formulario de ingreso de datos */}
							<Card.Header>
								<Card.Title fontWeight="bold" fontSize={"3xl"}>
									Datos de la Participante
								</Card.Title>
							</Card.Header>
							<Card.Body>
								<Stack gap="4" w="full">
									{/* ... campos de la participante ... */}
									{mensaje}
									<Field.Root invalid>
										<Field.Label fontSize="lg" >
											Nombre Completo de la Participante:
										</Field.Label>
										<Input
											type="text"
											name="nombre"
											css={{ "--error-color": nombreP }}
											value={formData.participante.nombre}
											onChange={handleChange}
											borderColor="gray.200"
											placeholder="Nombre Apellido"
											required
										/>
										{formData.participante.nombre &&
											!/^[A-Za-zÁÉÍÓÚáéíóúÑñüÜ ]+$/u.test(formData.participante.nombre) && (
												<Text color="red.500" fontSize="sm" mt={1}>
													Por favor, ingresa un nombre válido.
												</Text>
										)}

									</Field.Root>
									<Field.Root invalid>
										<Field.Label fontSize="lg">
											Correo de la Participante:
										</Field.Label>
										<Input
											type="email"
											name="correo"
											css={{ "--error-color": correoP }}
											value={formData.participante.correo}
											onChange={handleChange}
											borderColor="gray.200"
											placeholder="Example@gmail.com"
											pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
											required
										/>
										{formData.participante.correo &&
											!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
												formData.participante.correo
											) && (
												<Text color="red.500" fontSize="sm" mt={1}>
													Por favor, ingresa un correo electrónico válido.
												</Text>
											)}
									</Field.Root>
									{/* Otros campos de la participante */}
									{/* Ejemplo para Edad */}
									<Field.Root>
										<Field.Label fontSize="lg">
											Edad de la Participante:
										</Field.Label>
										<NumberInput.Root
											defaultValue="0"
											min={12}
											max={17}
											value={formData.participante.edad.toString()}
											onValueChange={(details) => {
												const updatedData = {
													...formData,
													participante: {
														...formData.participante,
														edad: isNaN(details.valueAsNumber)
															? 0
															: details.valueAsNumber,
													},
												};
												setFormData(updatedData);
												const updatedProgress = calcularProgresoParticipante(updatedData);
												setProgress(updatedProgress);
											}}
										>
											<NumberInput.Control />
											<NumberInput.Input />
										</NumberInput.Root>
										<Field.HelperText>
											Selecciona de 12 a 17 años
										</Field.HelperText>
									</Field.Root>

									{/* Select de Escolaridad */}
									<Select.Root
										collection={escolaridades}
										value={[formData.participante.escolaridad]}
										onValueChange={(details) => {
											const updatedData = {
												...formData,
												participante: {
													...formData.participante,
													escolaridad: details.value[0],
												},
											};
											setFormData(updatedData);
											const updatedProgress = calcularProgresoParticipante(updatedData);
											setProgress(updatedProgress);
										}}
									>
										<Select.HiddenSelect />
										<Select.Label fontSize="lg">Escolaridad:</Select.Label>
										<Select.Control>
											<Select.Trigger>
												<Select.ValueText placeholder="Selecciona tu escolaridad" />
											</Select.Trigger>
											<Select.IndicatorGroup>
												<Select.Indicator />
											</Select.IndicatorGroup>
										</Select.Control>
										<Portal>
											<Select.Positioner>
												<Select.Content>
													{escolaridades.items.map((item) => (
														<Select.Item item={item} key={item.value}>
															{item.label}
															<Select.ItemIndicator />
														</Select.Item>
													))}
												</Select.Content>
											</Select.Positioner>
										</Portal>
									</Select.Root>

									{/* Select de Idioma Preferido */}
									<Select.Root
										collection={idiomas}
										value={[formData.participante.idioma_preferencia]}
										onValueChange={(details) => {
											const updatedData = {
												...formData,
												participante: {
													...formData.participante,
													idioma_preferido: details.value[0],
												},
											};
											setFormData(updatedData);
											const updatedProgress = calcularProgresoParticipante(updatedData);
											setProgress(updatedProgress);
										}}
									>
										<Select.HiddenSelect />
										<Select.Label fontSize="lg">Idioma de preferencia:</Select.Label>
										<Select.Control>
											<Select.Trigger>
												<Select.ValueText placeholder="Selecciona tu idioma preferido" />
											</Select.Trigger>
											<Select.IndicatorGroup>
												<Select.Indicator />
											</Select.IndicatorGroup>
										</Select.Control>
										<Portal>
											<Select.Positioner>
												<Select.Content>
													{idiomas.items.map((item) => (
														<Select.Item item={item} key={item.value}>
															{item.label}
															<Select.ItemIndicator />
														</Select.Item>
													))}
												</Select.Content>
											</Select.Positioner>
										</Portal>
									</Select.Root>

									{/* Ejemplo para Edad */}
									<Field.Root>
										<Field.Label fontSize="lg">Grado:</Field.Label>
										<NumberInput.Root
											defaultValue="0"
											min={1}
											max={3}
											value={formData.participante.grado.toString()}
											onValueChange={(details) => {
												const updatedData = {
													...formData,
													participante: {
														...formData.participante,
														grado: isNaN(details.valueAsNumber)
															? 0
															: details.valueAsNumber,
													},
												};
												setFormData(updatedData);
												const updatedProgress = calcularProgresoParticipante(updatedData);
												setProgress(updatedProgress);
											}}
										>
											<NumberInput.Control />
											<NumberInput.Input />
										</NumberInput.Root>
										<Field.HelperText>
											Selecciona tu año de 1er a 3er
										</Field.HelperText>
									</Field.Root>

									{/* Select Dinámico de Sedes obtenido desde el backend */}
									<Select.Root
										collection={sedesCollection}
										value={[formData.sede.id_sede.toString()]}
										onValueChange={(details) => {
											const selectedId = Number(details.value[0]);
											const selectedSede = sedesCollection.items.find(item => item.value === details.value[0]);

											const updatedData = {
												...formData,
												sede: {
													id_sede: selectedId,
													nombre_sede: selectedSede ? selectedSede.label : "",
												},
											};
											setFormData(updatedData);
											const updatedProgress = calcularProgresoParticipante(updatedData);
											setProgress(updatedProgress);
										}}
									>
										<Select.HiddenSelect />
										<Select.Label fontSize="lg">
											Sede Donde Deseas Participar:
										</Select.Label>
										<Select.Control>
											<Select.Trigger>
												<Select.ValueText placeholder="Selecciona la Sede" />
											</Select.Trigger>
											<Select.IndicatorGroup>
												<Select.Indicator />
											</Select.IndicatorGroup>
										</Select.Control>
										<Portal>
											<Select.Positioner>
												<Select.Content>
													{sedesCollection.items.map((item) => (
														<Select.Item item={item} key={item.value}>
															{item.label}
															<Select.ItemIndicator />
														</Select.Item>
													))}
												</Select.Content>
											</Select.Positioner>
										</Portal>
									</Select.Root>

									{/* Otros campos de la participante... */}
								</Stack>
							</Card.Body>

							<Card.Header>
								<Card.Title fontWeight="bold" fontSize={"3xl"}>
									Datos del Tutor
								</Card.Title>
							</Card.Header>
							<Card.Body>
								<Stack gap="4" w="full">
									<Field.Root invalid>
										<Field.Label fontSize="lg">Nombre Completo del Tutor:</Field.Label>
										<Input
											type="text"
											name="tutor_nombre"
											css={{ "--error-color": nombreT }}
											value={formData.tutor.nombre}
											onChange={handleChange}
											borderColor="gray.200"
											placeholder="Mario López"
											required
										/>
										{formData.tutor.nombre &&
											!/^[A-Za-zÁÉÍÓÚáéíóúÑñüÜ ]+$/u.test(formData.tutor.nombre) && (
												<Text color="red.500" fontSize="sm" mt={1}>
													Por favor, ingresa un nombre válido.
												</Text>
										)}
									</Field.Root>

									<Field.Root invalid>
										<Field.Label fontSize="lg">Correo del Tutor:</Field.Label>
										<Input
											type="email"
											name="tutor_correo"
											css={{ "--error-color": correoT }}
											value={formData.tutor.correo}
											onChange={handleChange}
											borderColor="gray.200"
											placeholder="Example@gmail.com"
											pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
											required
										/>
										{formData.tutor.correo &&
											!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
												formData.tutor.correo
											) && (
												<Text color="red.500" fontSize="sm" mt={1}>
													Por favor, ingresa un correo electrónico válido.
												</Text>
											)}
									</Field.Root>

									<Field.Root invalid>
										<Field.Label fontSize="lg">Teléfono:</Field.Label>
										<Input
											type="tel"
											name="tutor_telefono"
											css={{ "--error-color": telefonoT }}
											value={formData.tutor.telefono}
											onChange={handleChange}
											borderColor="gray.200"
											placeholder="2223334446"
											pattern="^\d{10}$"
											required
										/>
										{formData.tutor.telefono &&
											!/^\d{9,15}$/.test(formData.tutor.telefono) && (
												<Text color="red.500" fontSize="sm" mt={1}>
													Por favor, ingresa un número de teléfono válido.
												</Text>
											)}
									</Field.Root>

									<Field.Root>
										<Field.Label fontSize="lg">Permiso del Tutor:</Field.Label>
										<Input
											type="file"
											name="permiso_tutor"
											onChange={(e) => {
												const file = e.target.files?.[0];
												if (file && file.size > 2097152) { // 2MB = 2097152 bytes
													alert("El tamaño del archivo no debe superar 2MB.");
													e.target.value = null; // Clear the input
													return;
												}
												handleFileUpload(e);
											}}
											required
											style={{ display: "none" }}
											id="fileInput"
										/>
										<Button
											onClick={() =>
												document.getElementById("fileInput")?.click()
											}
											colorPalette={"purple"}
											variant="outline"
										>
											<FaArrowUp /> Subir Archivo
										</Button>
										{fileName && (
											<Text mt={2}>Archivo seleccionado: {fileName}</Text>
										)}
										{fileName && !fileName.endsWith('.pdf') && (
												<Text color="red.500" fontSize="sm" mt={2}>
													Porfavor, solo archivos tipo PDF
												</Text>
										)}
										<Text fontSize="sm" color="gray.500" mt={1}>
											El tamaño máximo del archivo es de 2MB.
										</Text>
									</Field.Root>
								</Stack>
							</Card.Body>
							<Card.Footer display="flex" justifyContent="center">
								<Button
									onClick={handleShowPreview}
									bg={isFormComplete() ? "purple.500" : "gray.300"} // Cambia el color de fondo
									_hover={isFormComplete() ? { bg: "purple.600" } : undefined} // Cambia el color de hover
									size="xl"
									disabled={!isFormComplete()}
								>
									Ver Datos
								</Button>
							</Card.Footer>
						</>
					) : (
							<ParticipanteFormPreview
							formData={formData}
							fileURL={fileURL}
							fileName={fileName}
							handleBackToForm={handleBackToForm}
						/>
					)}
				</Card.Root>
			</Stack>

			<SuccessModal
									isOpen={isSuccessModalOpen}
									onClose={() => setIsSuccessModalOpen(false)}
									message="Te has registrado correctamente"
									/>
			
						<ErrorModal
									isOpen={isErrorModalOpen}
									onClose={() => setIsErrorModalOpen(false)}
									message="Ocurrió un error en registrarte, intenta nuevamente"
									/>
		</form>
	);
};

export default ParticipanteForm;
