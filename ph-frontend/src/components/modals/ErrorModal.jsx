// ErrorModal.jsx
// Modal de error que se muestra cuando ocurre un error al enviar un formulario.

import { ImCancelCircle } from "react-icons/im";
import { AbsoluteCenter, Center, Circle, Square } from "@chakra-ui/react";
import {
    Button,
    Dialog,
    Portal,
} from "@chakra-ui/react";

/**
 * @typedef {Object} ErrorModalProps
 * @property {boolean} isOpen - Indica si el modal está abierto.
 * @property {() => void} onClose - Función para cerrar el modal.
 * @property {string} message - Mensaje de error a mostrar.
 */

/**
 * Modal de error que se muestra cuando ocurre un error al enviar un formulario.
 *
 * @param {ErrorModalProps} props
 */
const ErrorModal = ({ isOpen, onClose, message }) => {
    if (!isOpen) return null;

    return (
        <Dialog.Root open={isOpen} onOpenChange={onClose} placement={"center"}>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Center bg="withe" h="120px" color="white">
                            <motion.div
                                initial={{ scale: 0, rotate: -180, opacity: 0 }}
                                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                            >
                                <ImCancelCircle color="purple" size={90} />
                            </motion.div>
                        </Center>

                        <Center bg="withe" h="40px" color="white">
                            <Dialog.Header fontSize="4xl" color={"black"} fontWeight="bold">
                                Error
                            </Dialog.Header>
                        </Center>

                        <Dialog.Body fontSize="lg">
                            <Center
                                fontSize={"1xl"}
                                bg="withe"
                                h="60px"
                                color="white"
                                textAlign={"center"}
                            >
                                <p style={{ color: "black" }}>{message}</p>
                            </Center>
                        </Dialog.Body>

                        <Center
                            fontSize={"2xl"}
                            bg="withe"
                            h="60px"
                            color="white"
                            textAlign={"center"}
                        >
                            <Dialog.Footer fontSize="3xl">
                                <Button
                                    onClick={onClose}
                                    colorPalette={"purple"}
                                    width="100%"
                                    fontSize="2xl"
                                    paddingX="20"
                                    paddingY="4"
                                >
                                    Cerrar
                                </Button>
                            </Dialog.Footer>
                        </Center>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
};

export default ErrorModal;