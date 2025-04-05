import { Popover as ChakraPopover, Portal } from "@chakra-ui/react";
import { CloseButton } from "./close-button";
import React from "react";

/**
 * @typedef {Object} PopoverContentProps
 * @property {boolean} [portalled] - Si se debe renderizar dentro de un portal.
 * @property {React.RefObject<HTMLElement>} [portalRef] - Referencia opcional para el contenedor del portal.
 * @property {import("@chakra-ui/react").PopoverContentProps} [rest] - Otras propiedades del contenido del popover.
 */

/**
 * Componente de contenido para el Popover, opcionalmente portaleado.
 *
 * @param {PopoverContentProps & React.RefAttributes<HTMLDivElement>} props
 * @param {React.Ref<HTMLDivElement>} ref
 */
export const PopoverContent = React.forwardRef(function PopoverContent(
	props,
	ref
) {
	const { portalled = true, portalRef, ...rest } = props;
	return (
		<Portal disabled={!portalled} container={portalRef}>
			<ChakraPopover.Positioner>
				<ChakraPopover.Content ref={ref} {...rest} />
			</ChakraPopover.Positioner>
		</Portal>
	);
});

/**
 * Flecha decorativa del Popover.
 *
 * @param {import("@chakra-ui/react").PopoverArrowProps & React.RefAttributes<HTMLDivElement>} props
 * @param {React.Ref<HTMLDivElement>} ref
 */
export const PopoverArrow = React.forwardRef(function PopoverArrow(props, ref) {
	return (
		<ChakraPopover.Arrow {...props} ref={ref}>
			<ChakraPopover.ArrowTip />
		</ChakraPopover.Arrow>
	);
});

/**
 * Botón para cerrar el Popover.
 *
 * @param {import("@chakra-ui/react").PopoverCloseTriggerProps & React.RefAttributes<HTMLButtonElement>} props
 * @param {React.Ref<HTMLButtonElement>} ref
 */
export const PopoverCloseTrigger = React.forwardRef(function PopoverCloseTrigger(
	props,
	ref
) {
	return (
		<ChakraPopover.CloseTrigger
			position="absolute"
			top="1"
			insetEnd="1"
			{...props}
			asChild
			ref={ref}
		>
			<CloseButton size="sm" />
		</ChakraPopover.CloseTrigger>
	);
});

// Exportación directa de componentes base del Popover de Chakra UI
export const PopoverRoot = ChakraPopover.Root;
export const PopoverTrigger = ChakraPopover.Trigger;
export const PopoverHeader = ChakraPopover.Header;
export const PopoverBody = ChakraPopover.Body;
export const PopoverFooter = ChakraPopover.Footer;
export const PopoverTitle = ChakraPopover.Title;
export const PopoverDescription = ChakraPopover.Description;