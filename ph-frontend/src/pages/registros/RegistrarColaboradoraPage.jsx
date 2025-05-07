// RegistrarColaboradoraPage.jsx
// Página que muestra el formulario y lo conecta con el backend.

import { useState } from "react";
import FormularioPersonal from "../../features/colaboradoras/FormularioColaboradora.jsx";
import { createPersonal } from "@/services/personalService.js";
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

const RegistrarColaboradoraPage = () => {
	const [message, setMessage] = useState("");
	const [progress, setProgress] = useState(0);

	const handleSubmit = async (formData) => {
		try {
			await createPersonal(formData);
			setMessage("Personal registrado con éxito. Revisa tu correo para la confirmación.");
		} catch (error) {
			setMessage("Error al registrar al colaboradoras.");
		}
	};

	return (
		<Box bg="purple.100" minH="120vh">
			<Stack align="center">
				<Flex >
					<Image src={logoMorado} alt="Patrones Hermosos" boxSize={["80px", "100px"]} objectFit="cover" mt={4} mr={5} />
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

				<FormularioPersonal onSubmit={handleSubmit} setProgress={setProgress} />
				{message && <Text color="red.500">{message}</Text>}
			</Stack>
		</Box>
	);
};

export default RegistrarColaboradoraPage;
