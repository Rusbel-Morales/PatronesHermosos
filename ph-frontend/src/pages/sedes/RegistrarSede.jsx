import { useState } from "react";
import FormularioSede from "../../features/sedes/FormularioSede";
import { createSede } from "../../services/sedeService";
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
import ErrorModal from "@/components/modals/ErrorModal";

const RegisterSede = () => {
	const [isSuccessOpen, setIsSuccessOpen] = useState(false);
	const [isErrorOpen, setIsErrorOpen] = useState(false);
	const [message, setMessage] = useState("");
	const [progress, setProgress] = useState(0);

	const handleSubmit = async (formData) => {
		try {
			await createSede(formData);
			setMessage("Sede registrada con éxito. Pendiente de aprobación.");
			setIsSuccessOpen(true);
		} catch (error) {
			setIsErrorOpen(true);
			setMessage(error.response?.data?.message || "Ocurrió un error al registrar la sede.");
		}
	};

	return (
		<Box bg="purple.100" minH="100vh" w="full">
			<Stack w="full" maxW="100vw" px={0}>
				<Flex ml={["0", "0", "155px"]} px={[2, 5]}>
					<Image
						src={logoMorado}
						alt="Patrones Hermosos"
						boxSize={["80px", "100px"]}
						objectFit="cover"
						mt={5}
						mr={5}
					/>
					<Stack>
						<Heading size="4xl" fontWeight="bold" mt={4}>
							Únete a Patrones Hermosos
						</Heading>
						<Text>
							Con tu registro de sede, estás ayudando a inspirar a las mujeres a cambiar el mundo a través de las STEM.
							¡Comencemos!
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

				<FormularioSede onSubmit={handleSubmit} setProgress={setProgress} />
				{message && <Text color="red.500">{message}</Text>}

				<SuccessModal
					isOpen={isSuccessOpen}
					onClose={() => setIsSuccessOpen(false)}
					message={message}
				/>
				<ErrorModal
					isOpen={isErrorOpen}
					onClose={() => setIsErrorOpen(false)}
					message={message}
				/>
			</Stack>
		</Box>
	);
};

export default RegisterSede;