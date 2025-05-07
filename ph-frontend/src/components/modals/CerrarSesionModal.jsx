// components/modals/CerrarSesionModal.jsx
import {Dialog, Portal, Button, CloseButton} from "@chakra-ui/react";
import {useAuth} from "@/contexts/AuthContext.jsx";
import {postLogout} from "@/services/logoutService.js";

const CerrarSesionModal = ({open, onClose, onConfirm}) => {
	const {token, setToken, setUsername} = useAuth();

	const handleLogout = async () => {
		// Realizar la solicitud POST al backend de cierre de sesión
		await postLogout(token);
		onConfirm();

	}

	return (
		<Dialog.Root open={open} onOpenChange={(e) => onClose(e.open)} role="alertdialog">
			<Portal>
				<Dialog.Backdrop/>
				<Dialog.Positioner>
					<Dialog.Content>
						<Dialog.Header>
							<Dialog.Title>¿Segura que quieres cerrar tu sesión?</Dialog.Title>
						</Dialog.Header>
						<Dialog.Body>
							Esta acción <strong>cerrará tu cuenta</strong>, pero podrás volver a iniciar sesión.
						</Dialog.Body>
						<Dialog.Footer>
							<Dialog.ActionTrigger asChild>
								<Button variant="outline">Cancelar</Button>
							</Dialog.ActionTrigger>
							<Button colorPalette="red" onClick={handleLogout}>
								Aceptar
							</Button>
						</Dialog.Footer>
						<Dialog.CloseTrigger asChild>
							<CloseButton size="sm"/>
						</Dialog.CloseTrigger>
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>
	);
};

export default CerrarSesionModal;