import { Checkbox as ChakraCheckbox } from "@chakra-ui/react";
import React from "react";

/**
 * @typedef {Object} CheckboxProps
 * @property {React.ReactNode} [icon] - Ícono personalizado que se mostrará dentro del checkbox.
 * @property {React.InputHTMLAttributes<HTMLInputElement>} [inputProps] - Props adicionales para el input oculto.
 * @property {React.Ref<HTMLLabelElement>} [rootRef] - Referencia al contenedor raíz (label).
 * @property {React.ReactNode} [children] - Etiqueta o contenido que acompaña al checkbox.
 */

/**
 * Componente personalizado de Checkbox que envuelve al Chakra UI Checkbox.
 * Permite iconos personalizados y estilos adicionales.
 *
 * @param {CheckboxProps & React.ComponentPropsWithoutRef<"input">} props - Props del componente.
 * @param {React.Ref<HTMLInputElement>} ref - Referencia al input interno.
 * @returns {JSX.Element} El componente Checkbox.
 */
export const Checkbox = React.forwardRef(function Checkbox(props, ref) {
	const { icon, children, inputProps, rootRef, ...rest } = props;

	return (
		<ChakraCheckbox.Root ref={rootRef} {...rest}>
			<ChakraCheckbox.HiddenInput ref={ref} {...inputProps} />
			<ChakraCheckbox.Control>
				{icon || <ChakraCheckbox.Indicator />}
			</ChakraCheckbox.Control>
			{children != null && (
				<ChakraCheckbox.Label>{children}</ChakraCheckbox.Label>
			)}
		</ChakraCheckbox.Root>
	);
});