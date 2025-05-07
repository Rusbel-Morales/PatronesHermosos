// ErrorModal.jsx
// Modal de error que se muestra cuando ocurre un error al enviar un formulario.

import { ImCancelCircle } from "react-icons/im";
import { motion } from "framer-motion";  // Importa motion
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
                    <Dialog.Content
                    w="70vw"
                    h="30vh">

                        <Center bg="withe" h="13vh"  color="white">
                            <motion.div
                                initial={{ scale: 0, rotate: -180, opacity: 0 }}
                                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                            >
                                <ImCancelCircle color="purple" size={60} />
                            </motion.div>
                        </Center>

                        <Center bg="withe" h="5vh" color="white">
                            <Dialog.Header fontSize="2xl" color={"black"} fontWeight="bold">
                                Error
                            </Dialog.Header>
                        </Center>

                        <Dialog.Body fontSize="lg">
                            <Center
                                fontSize={"1xl"}
                                bg="withe"
                                h="4vh"
                               
                                color="white"
                                textAlign={"center"}
                            >
                                <p style={{ color: "black" }}>{message}</p>
                            </Center>
                        </Dialog.Body>

                        <Center
                            fontSize={"2xl"}
                            bg="withe"
                            h="7vh"
                            
                            color="white"
                            textAlign={"center"}
                        >
                            <Dialog.Footer fontSize="2xl">
                                <Button
                                    onClick={onClose}
                                    colorPalette={"purple"}
                                    width="12vw"
                                    height="5vh"
                                    fontSize="sm"
                                    
                                    
                                    
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