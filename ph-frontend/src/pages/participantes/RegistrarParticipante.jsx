// RegistrarParticipante.jsx
// Página que muestra el formulario y lo conecta con el backend.

import { useState } from "react";
import FormularioParticipante from "../../features/participantes/FormularioParticipante";
import { createParticipante } from "../../services/participanteService";
import {
	Heading,
	Flex,
	Image,
	Stack,
	Text,
	Progress,
	HStack,
	Box
} from "@chakra-ui/react";
import logoMorado from "../../assets/logo-morado.png";
import SuccessModal from "../../components/modals/SuccessModal";
import ErrorModal from "../../components/modals/ErrorModal";

const RegistrarParticipante = () => {
	const [isSuccessOpen, setIsSuccessOpen] = useState(false);
	const [isErrorOpen, setIsErrorOpen] = useState(false);
	const [message, setMessage] = useState("");
	const [progress, setProgress] = useState(0);

	const handleSubmit = async (formData) => {
		try {
			await createParticipante(formData);
			setMessage("Participante registrado con éxito. Revisa tu correo para la confirmación.");
			setIsSuccessOpen(true);
		} catch (error) {
			setMessage("Error al registrar al participante.");
			setIsErrorOpen(true);
		}
	};

	return (
		<Box bg="purple.100" minH="100vh" w="full">
			<Stack w="full" maxW="100vw" px={0}>
				<Flex ml={["0", "0", "155px"]} px={[2, 5]}>
					<Image src={logoMorado} alt="Patrones Hermosos" boxSize={["80px", "100px"]} objectFit="cover" mt={5} mr={5} />
					<Stack>
						<Heading size="4xl" fontWeight="bold" mt={4}>Bienvenida a Patrones Hermosos</Heading>
						<Text>
							Con tu registro, estás ayudando a inspirar a las mujeres a cambiar el mundo a través de las STEM. ¡Comencemos!
						</Text>
						<Progress.Root colorPalette="purple" value={progress} maxW="100%">
							<HStack gap="5">
								<Progress.Track flex="1">
									<Progress.Range />
								</Progress.Track>
								<Progress.ValueText>{progress}%</Progress.ValueText>
							</HStack>
						</Progress.Root>
					</Stack>
				</Flex>

				<FormularioParticipante onSubmit={handleSubmit} setProgress={setProgress} />

				<SuccessModal isOpen={isSuccessOpen} onClose={() => setIsSuccessOpen(false)} message={message} />
				<ErrorModal isOpen={isErrorOpen} onClose={() => setIsErrorOpen(false)} message={message} />
			</Stack>
		</Box>
	);
};

export default RegistrarParticipante;
