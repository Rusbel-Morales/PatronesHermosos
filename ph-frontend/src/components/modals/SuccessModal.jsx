// SuccessModal.jsx
// Modal de éxito que se muestra cuando una operación se realiza correctamente.

import { ImCheckmark } from "react-icons/im";
import {
    Center,
    Button,
    Dialog,
    Portal,
} from "@chakra-ui/react";

/**
 * @typedef {Object} SuccessModalProps
 * @property {boolean} isOpen - Indica si el modal está abierto.
 * @property {() => void} onClose - Función para cerrar el modal.
 * @property {string} message - Mensaje de éxito a mostrar.
 */

/**
 * Modal de éxito que se muestra cuando una operación se realiza correctamente.
 *
 * @param {SuccessModalProps} props
 */
const SuccessModal = ({ isOpen, onClose, message }) => {
    if (!isOpen) return null;

    return (
        <Dialog.Root open={isOpen} onOpenChange={onClose} placement={"center"}>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        {/* Icono de éxito con animación */}
                        <Center bg="white" h="120px">
                            <motion.div
                                initial={{ scale: 0, rotate: -180, opacity: 0 }}
                                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                            >
                                <ImCheckmark color="purple" size={90} />
                            </motion.div>
                        </Center>

                        {/* Contenido del modal */}
                        <Center bg="white" h="40px">
                            <Dialog.Header fontSize="4xl" color="black" fontWeight="bold">
                                Éxito
                            </Dialog.Header>
                        </Center>

                        <Dialog.Body fontSize="lg">
                            <Center
                                fontSize="xl"
                                bg="white"
                                h="60px"
                                textAlign="center"
                                paddingY="10"
                            >
                                <p style={{ color: "black", lineHeight: "1.5" }}>{message}</p>
                            </Center>
                        </Dialog.Body>

                        {/* Botón de cerrar */}
                        <Center fontSize="2xl" bg="white" h="60px">
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

export default SuccessModal;