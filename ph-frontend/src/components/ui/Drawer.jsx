import { Drawer as ChakraDrawer, Portal } from "@chakra-ui/react";
import { CloseButton } from "./close-button";
import React from "react";

/**
 * @typedef {Object} DrawerContentProps
 * @property {boolean} [portalled] - Si el contenido se renderiza dentro de un Portal.
 * @property {React.RefObject<HTMLElement>} [portalRef] - Contenedor opcional para el Portal.
 * @property {string | number | undefined} [offset] - Espaciado del contenedor del drawer.
 */

/**
 * Contenido principal del Drawer, opcionalmente portaleado y con espaciado configurable.
 *
 * @param {DrawerContentProps & import("@chakra-ui/react").DrawerContentProps} props - Props del drawer.
 * @param {React.Ref<HTMLDivElement>} ref - Referencia al nodo HTML.
 * @returns {JSX.Element}
 */
export const DrawerContent = React.forwardRef(function DrawerContent(props, ref) {
	const { children, portalled = true, portalRef, offset, ...rest } = props;
	return (
		<Portal disabled={!portalled} container={portalRef}>
			<ChakraDrawer.Positioner padding={offset}>
				<ChakraDrawer.Content ref={ref} {...rest} asChild={false}>
					{children}
				</ChakraDrawer.Content>
			</ChakraDrawer.Positioner>
		</Portal>
	);
});

/**
 * Botón de cierre del Drawer, posicionado arriba a la derecha.
 *
 * @param {import("@chakra-ui/react").DrawerCloseTriggerProps} props
 * @param {React.Ref<HTMLButtonElement>} ref
 * @returns {JSX.Element}
 */
export const DrawerCloseTrigger = React.forwardRef(function DrawerCloseTrigger(props, ref) {
	return (
		<ChakraDrawer.CloseTrigger
			position="absolute"
			top="2"
			insetEnd="2"
			{...props}
			asChild
		>
			<CloseButton size="sm" ref={ref} />
		</ChakraDrawer.CloseTrigger>
	);
});

// Reexportaciones de componentes base del Drawer de Chakra
/** @type {typeof ChakraDrawer.Trigger} */
export const DrawerTrigger = ChakraDrawer.Trigger;
/** @type {typeof ChakraDrawer.Root} */
export const DrawerRoot = ChakraDrawer.Root;
/** @type {typeof ChakraDrawer.Footer} */
export const DrawerFooter = ChakraDrawer.Footer;
/** @type {typeof ChakraDrawer.Header} */
export const DrawerHeader = ChakraDrawer.Header;
/** @type {typeof ChakraDrawer.Body} */
export const DrawerBody = ChakraDrawer.Body;
/** @type {typeof ChakraDrawer.Backdrop} */
export const DrawerBackdrop = ChakraDrawer.Backdrop;
/** @type {typeof ChakraDrawer.Description} */
export const DrawerDescription = ChakraDrawer.Description;
/** @type {typeof ChakraDrawer.Title} */
export const DrawerTitle = ChakraDrawer.Title;
/** @type {typeof ChakraDrawer.ActionTrigger} */
export const DrawerActionTrigger = ChakraDrawer.ActionTrigger;