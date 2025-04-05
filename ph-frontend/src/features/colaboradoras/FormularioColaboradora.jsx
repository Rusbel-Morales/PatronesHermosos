import { useState, useEffect } from "react";
import { Button, Card, Stack, Field, Input, Portal, Select, createListCollection, CloseButton, Dialog, Flex, Box, Link, Text } from "@chakra-ui/react";
import { FaArrowUp, FaInfoCircle } from "react-icons/fa";
import { fetchSedesPersonal, createPersonal } from "@/services/personalService.js";
import { calcularProgresoPersonal } from '@/utils/personalProgreso.js';
import { escolaridades, idiomas, niveles, roles } from "@/utils/optionsCollections.js";
import PersonalPreview from "../../components/previews/PersonalPreview";
/**
 * @typedef {Object} PersonalFormData
 * @property {{ nombre: string, correo: string, universidad_origen: string, carrera: string, idioma_preferencia: string, nivel_preferencia: string, rol_preferencia: string }} personal
 * @property {{ id_sede: number, nombre_sede: string }} sede
 */

/**
 * @typedef {Object} PersonalFormProps
 * @property {(data: PersonalFormData) => void} onSubmit
 * @property {(progress: number) => void} setProgress
 */

/**
 * @param {PersonalFormProps} props
 */
const PersonalForm = ({ onSubmit, setProgress }) => {
	const [formData, setFormData] = useState({
		personal: {
			nombre: "",
			correo: "",
			universidad_origen: "",
			carrera: "",
			idioma_preferencia: "",
			nivel_preferencia: "",
			rol_preferencia: "",
		},
		sede: {
			id_sede: 0,
			nombre_sede: "",
		},
	});

	const [fileName, setFileName] = useState("");
	const [fileURL, setFileURL] = useState(null);
	const [showPreview, setShowPreview] = useState(false);

	const [sedesCollection, setSedesCollection] = useState(
		createListCollection({ items: [] })
	);

	useEffect(() => {
		const cargarSedes = async () => {
			try {
				const items = await fetchSedesPersonal();
				const listaFinal = items.length > 0 ? items : [{ value: "0", label: "Datos inexistentes" }];
				setSedesCollection(createListCollection({ items: listaFinal }));
			} catch (error) {
				console.error("❌ Error:", error);
				setSedesCollection(createListCollection({ items: [{ value: "0", label: "Datos inexistentes" }] }));
			}
		};
		cargarSedes();
	}, []);

	const isFormComplete = () => {
		const { personal,sede } = formData;
		const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(personal.correo);
		const isSedeSeleccionada = sede.id_sede !== 0;
		return (
			personal.nombre.trim() !== "" &&
			personal.correo.trim() !== "" &&
			isEmailValid &&
			personal.carrera.trim() !== "" &&
			personal.idioma_preferencia.trim() !== "" &&
			personal.nivel_preferencia.trim() !== "" &&
			personal.rol_preferencia.trim() !== "" &&
			isSedeSeleccionada
		);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name in formData.personal) {
			const updatedData = {
				...formData,
				personal: { ...formData.personal, [name]: value },
			};
			setFormData(updatedData);
			const updatedProgress = calcularProgresoPersonal(updatedData);
			setProgress(updatedProgress);
		}
	};

	const handleShowPreview = () => {
		if (isFormComplete()) setShowPreview(true);
	};

	const handleBackToForm = () => {
		setShowPreview(false);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await createPersonal({
				personal: formData.personal,
				sede: formData.sede,
			});
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
								<Card.Title fontWeight="bold" fontSize={"3xl"}>Datos de la/el Colaborador(a)</Card.Title>
							</Card.Header>
							<Card.Body>
								<Stack gap="4" w="full">
									<Field.Root>
										<Field.Label fontSize="lg">Nombre Completo</Field.Label>
										<Input
											type="text"
											name="nombre"
											value={formData.personal.nombre}
											onChange={handleChange}
											placeholder="Nombre Apellido"
											required
										/>
									</Field.Root>
									<Field.Root>
										<Field.Label fontSize="lg">Correo electrónico</Field.Label>
										<Input
											type="text"
											name="correo"
											value={formData.personal.correo}
											onChange={handleChange}
											pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
											placeholder="Example@gmail.com"
											required
										/>
										{formData.personal.correo && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.personal.correo) && (
											<Text color="red.500" fontSize="sm" mt={1}>
												Por favor, ingresa un correo electrónico válido.
											</Text>
										)}
									</Field.Root>
									<Field.Root>
										<Field.Label fontSize="lg">Universidad de Origen:</Field.Label>
										<Input
											type="text"
											name="universidad_origen"
											value={formData.personal.universidad_origen}
											onChange={handleChange}
											placeholder="TEC Puebla"
											required
										/>
									</Field.Root>
									<Field.Root>
										<Field.Label fontSize="lg">Carrera:</Field.Label>
										<Input
											type="text"
											name="carrera"
											value={formData.personal.carrera}
											onChange={handleChange}
											placeholder="ITC"
											required
										/>
									</Field.Root>

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
											const updatedProgress = calcularProgresoPersonal(updatedData);
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

									<Select.Root
										collection={idiomas}
										value={[formData.personal.idioma_preferencia]}
										onValueChange={(details) => {
											const updatedData = {
												...formData,
												personal: {
													...formData.personal,
													idioma_preferencia: details.value[0], // Extraemos el primer valor
												},
											};
											setFormData(updatedData);
											const updatedProgress = calcularProgresoPersonal(updatedData);
											setProgress(updatedProgress);
										}}
									>
										<Select.HiddenSelect />
										<Select.Label fontSize="lg">Idioma de Preferencia:</Select.Label>
										<Select.Control>
											<Select.Trigger>
												<Select.ValueText placeholder="Selecciona el Idioma" />
											</Select.Trigger>
											<Select.IndicatorGroup>
												<Select.Indicator />
											</Select.IndicatorGroup>
										</Select.Control>
										<Portal>
											<Select.Positioner>
												<Select.Content>
													{idiomas.items.map((movie) => (
														<Select.Item item={movie} key={movie.value}>
															{movie.label}
															<Select.ItemIndicator />
														</Select.Item>
													))}
												</Select.Content>
											</Select.Positioner>
										</Portal>
									</Select.Root>

									<Select.Root
										collection={niveles}
										value={[formData.personal.nivel_preferencia]}
										onValueChange={(details) => {
											const updatedData = {
												...formData,
												personal: {
													...formData.personal,
													nivel_preferencia: details.value[0], // Extraemos el primer valor
												},
											};
											setFormData(updatedData);
											const updatedProgress = calcularProgresoPersonal(updatedData);
											setProgress(updatedProgress);
										}}
									>
										<Select.HiddenSelect />
										<Select.Label fontSize="lg">Nivel de Preferencia:</Select.Label>
										<Select.Control>
											<Select.Trigger>
												<Select.ValueText placeholder="Selecciona el Nivel" />
											</Select.Trigger>
											<Select.IndicatorGroup>
												<Select.Indicator />
											</Select.IndicatorGroup>
										</Select.Control>
										<Portal>
											<Select.Positioner>
												<Select.Content>
													{niveles.items.map((movie) => (
														<Select.Item item={movie} key={movie.value}>
															{movie.label}
															<Select.ItemIndicator />
														</Select.Item>
													))}
												</Select.Content>
											</Select.Positioner>
										</Portal>
									</Select.Root>

									<Flex align="center" gap={4}>
										<Select.Root
											collection={roles}
											value={[formData.personal.rol_preferencia]}
											onValueChange={(details) => {
												const updatedData = {
													...formData,
													personal: {
														...formData.personal,
														rol_preferencia: details.value[0], // Extraemos el primer valor
													},
												};
												setFormData(updatedData);
												const updatedProgress = calcularProgresoPersonal(updatedData);
												setProgress(updatedProgress);
											}}
										>
											<Select.HiddenSelect />
											<Select.Label fontSize="lg">Rol de Preferencia:</Select.Label>
											<Select.Control>
												<Select.Trigger>
													<Select.ValueText placeholder="Selecciona el Rol" />
												</Select.Trigger>
												<Select.IndicatorGroup>
													<Select.Indicator />
												</Select.IndicatorGroup>
											</Select.Control>
											<Portal>
												<Select.Positioner>
													<Select.Content>
														{roles.items.map((movie) => (
															<Select.Item item={movie} key={movie.value}>
																{movie.label}
																<Select.ItemIndicator />
															</Select.Item>
														))}
													</Select.Content>
												</Select.Positioner>
											</Portal>
										</Select.Root>

										<Dialog.Root size={"lg"}>
											<Dialog.Trigger asChild>
												<Button variant="outline" size="md" mt="6" colorPalette={"purple"}>
													{<FaInfoCircle />}
												</Button>
											</Dialog.Trigger>
											<Portal>
												<Dialog.Backdrop />
												<Dialog.Positioner>
													<Dialog.Content>
														<Dialog.Context>
															{(store) => (
																<Dialog.Body pt="6" spaceY="3" fontWeight="bold">
																	<p>Opciones de Roles:</p>
																	<p>
																		Facilitadora: Encargada de guiar a los participantes en las actividades.
																	</p>
																	<p>
																		Instructora: Encargada de impartir las clases a los participantes.
																	</p>
																	<p>
																		Staff: Encargada de apoyar en las actividades del evento.
																	</p>
																	<p>
																		Nota: El único rol donde un hombre se puede inscribir es en el rol de Staff.
																	</p>
																	<button onClick={() => store.setOpen(false)}></button>
																</Dialog.Body>
															)}
														</Dialog.Context>
														<Dialog.CloseTrigger asChild>
															<CloseButton size="lg" />
														</Dialog.CloseTrigger>
													</Dialog.Content>
												</Dialog.Positioner>
											</Portal>
										</Dialog.Root>
									</Flex>
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
						<PersonalPreview
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

export default PersonalForm;
