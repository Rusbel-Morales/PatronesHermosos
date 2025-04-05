import { IconButton as ChakraIconButton } from "@chakra-ui/react";
import React from "react";
import { LuX } from "react-icons/lu";

/**
 * @typedef {import("@chakra-ui/react").ButtonProps} CloseButtonProps
 */

/**
 * Botón de cerrar reutilizable que usa un `IconButton` de Chakra UI.
 * Si no se proporciona un hijo, se muestra por defecto el ícono `X`.
 *
 * @param {CloseButtonProps} props - Props del botón.
 * @param {React.Ref<HTMLButtonElement>} ref - Referencia al botón.
 * @returns {JSX.Element} Componente del botón de cerrar.
 */
export const CloseButton = React.forwardRef(function CloseButton(props, ref) {
	return (
		<ChakraIconButton variant="ghost" aria-label="Close" ref={ref} {...props}>
			{props.children ?? <LuX />}
		</ChakraIconButton>
	);
});