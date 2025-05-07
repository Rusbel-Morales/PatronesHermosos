// components/modals/BorrarDatosModal.jsx
import { Dialog, Portal, Button, CloseButton } from "@chakra-ui/react";

  
  const BorrarDatosModal = ({ open, onClose, onConfirm }) => {
    return (
      <Dialog.Root open={open} onOpenChange={(e) => onClose(e.open)} role="alertdialog">
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>¿Seguro que quieres borrar la base de datos?</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                Esta acción <strong>no es reversible</strong>. Se eliminarán todos los datos permanentemente.
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">Cancelar</Button>
                </Dialog.ActionTrigger>
                <Button colorPalette="red" onClick={onConfirm}>
                  Aceptar
                </Button>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    );
  };
  
  export default BorrarDatosModal;