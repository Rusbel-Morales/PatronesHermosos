import { RadioGroup as ChakraRadioGroup } from "@chakra-ui/react";
import React from "react";

/**
 * @typedef {Object} RadioProps
 * @property {React.Ref<HTMLDivElement>} [rootRef] - Referencia para el contenedor del radio.
 * @property {React.InputHTMLAttributes<HTMLInputElement>} [inputProps] - Propiedades del input oculto.
 * @property {React.ReactNode} [children] - Contenido visual del radio.
 */

/**
 * Componente de Radio personalizado que usa Chakra UI y soporta referencias.
 *
 * @param {RadioProps & import("@chakra-ui/react").RadioGroupItemProps} props
 * @param {React.Ref<HTMLInputElement>} ref
 */
export const Radio = React.forwardRef(function Radio(props, ref) {
	const { children, inputProps, rootRef, ...rest } = props;

	return (
		<ChakraRadioGroup.Item ref={rootRef} {...rest}>
			<ChakraRadioGroup.ItemHiddenInput ref={ref} {...inputProps} />
			<ChakraRadioGroup.ItemIndicator />
			{children && (
				<ChakraRadioGroup.ItemText>{children}</ChakraRadioGroup.ItemText>
			)}
		</ChakraRadioGroup.Item>
	);
});

/**
 * Componente raíz del grupo de botones de opción (radio buttons).
 */
export const RadioGroup = ChakraRadioGroup.Root;