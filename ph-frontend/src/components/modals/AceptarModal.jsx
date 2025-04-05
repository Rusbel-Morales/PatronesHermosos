import {
  Button,
  CloseButton,
  Dialog,
  HStack,
  Portal,
} from "@chakra-ui/react";
import { PiExclamationMarkBold } from "react-icons/pi";

const AceptarModal = ({ onAceptar }) => {
  return (
    <HStack wrap="wrap" gap="4">
      <Dialog.Root placement="center" motionPreset="slide-in-bottom">
        <Dialog.Trigger asChild>
          <Button  
            bg="green.600"
            variant="solid"
            boxShadow="lg"
            _hover={{
              bg: "green.600",
              boxShadow: "xl",
              transform: "scale(1.05)",
            }}
            _active={{
              bg: "green.700",
              transform: "scale(1)",
            }}
            transition="all 0.2s ease-in-out"
          > 
            Aceptar
          </Button>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <PiExclamationMarkBold fontWeight={28} size={28} color="red" />
                <Dialog.Title fontSize="lg"> ATENCIÓN </Dialog.Title>
              </Dialog.Header>
              <Dialog.Body fontSize="md">
                <p>
                  Esta acción no se puede deshacer. ¿Estás segura de que desea <strong>aceptar</strong> la sede?
                </p>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">Cancelar</Button>
                </Dialog.ActionTrigger>
                <Button 
                  colorPalette="green"
                  onClick={onAceptar} // Aquí usamos la función pasada como prop
                >
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
    </HStack>
  );
};

export default AceptarModal;