import { Dialog as ChakraDialog, Portal } from "@chakra-ui/react";
import { CloseButton } from "./close-button";
import React from "react";

/**
 * @typedef {Object} DialogContentProps
 * @property {boolean} [portalled] - Si se debe renderizar el contenido dentro de un Portal.
 * @property {React.RefObject<HTMLElement>} [portalRef] - Referencia al contenedor del portal.
 * @property {boolean} [backdrop] - Si se debe mostrar el fondo oscuro detrás del diálogo.
 * @property {import("@chakra-ui/react").DialogContentProps} [ChakraDialog.ContentProps] - Props nativas de Chakra para contenido del diálogo.
 */

/**
 * Contenido principal del diálogo. Puede envolverse en un `Portal` y mostrar un `Backdrop`.
 *
 * @param {DialogContentProps} props - Props del contenido del diálogo.
 * @param {React.Ref<HTMLDivElement>} ref - Ref al contenido del diálogo.
 * @returns {JSX.Element} Contenido del diálogo renderizado.
 */
export const DialogContent = React.forwardRef(function DialogContent(props, ref) {
	const {
		children,
		portalled = true,
		portalRef,
		backdrop = true,
		...rest
	} = props;

	return (
		<Portal disabled={!portalled} container={portalRef}>
			{backdrop && <ChakraDialog.Backdrop />}
			<ChakraDialog.Positioner>
				<ChakraDialog.Content ref={ref} {...rest} asChild={false}>
					{children}
				</ChakraDialog.Content>
			</ChakraDialog.Positioner>
		</Portal>
	);
});

/**
 * Botón para cerrar el diálogo. Usa `CloseButton` personalizado dentro de `Dialog.CloseTrigger`.
 *
 * @param {import("@chakra-ui/react").DialogCloseTriggerProps} props - Props del botón de cierre.
 * @param {React.Ref<HTMLButtonElement>} ref - Ref al botón.
 * @returns {JSX.Element} Botón de cerrar.
 */
export const DialogCloseTrigger = React.forwardRef(function DialogCloseTrigger(props, ref) {
	return (
		<ChakraDialog.CloseTrigger
			position="absolute"
			top="2"
			insetEnd="2"
			{...props}
			asChild
		>
			<CloseButton size="sm" ref={ref}>
				{props.children}
			</CloseButton>
		</ChakraDialog.CloseTrigger>
	);
});

// Reexportación de componentes base del diálogo de Chakra
/** @type {typeof ChakraDialog.Root} */
export const DialogRoot = ChakraDialog.Root;
/** @type {typeof ChakraDialog.Footer} */
export const DialogFooter = ChakraDialog.Footer;
/** @type {typeof ChakraDialog.Header} */
export const DialogHeader = ChakraDialog.Header;
/** @type {typeof ChakraDialog.Body} */
export const DialogBody = ChakraDialog.Body;
/** @type {typeof ChakraDialog.Backdrop} */
export const DialogBackdrop = ChakraDialog.Backdrop;
/** @type {typeof ChakraDialog.Title} */
export const DialogTitle = ChakraDialog.Title;
/** @type {typeof ChakraDialog.Description} */
export const DialogDescription = ChakraDialog.Description;
/** @type {typeof ChakraDialog.Trigger} */
export const DialogTrigger = ChakraDialog.Trigger;
/** @type {typeof ChakraDialog.ActionTrigger} */
export const DialogActionTrigger = ChakraDialog.ActionTrigger;