import {
	Text,
	Avatar,
	Float,
	Circle,
	HStack,
	Stack,
} from "@chakra-ui/react";
import logoMorado from "../../assets/logo-morado.png";
import {useAuth} from "@/contexts/AuthContext.jsx";

const UserProfile = () => {
	const { username } = useAuth();

	return (
		<Stack gap="8">
        		<HStack  gap="4">
          			<Avatar.Root>
            			<Avatar.Fallback name={username} />
            			<Avatar.Image src={logoMorado} />
						<Float placement="bottom-end" offsetX="1" offsetY="1">
        					<Circle
          					bg="green.500"
          					size="8px"
          					outline="0.2em solid"
          					outlineColor="bg"
        					/>
      					</Float>
          			</Avatar.Root>
          			<Stack gap="0">
            			<Text fontWeight="medium">{username}</Text>
          			</Stack>
        		</HStack>
    </Stack>
	)
}

export default UserProfile;