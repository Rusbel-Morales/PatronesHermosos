import { Field as ChakraField } from "@chakra-ui/react";
import React from "react";

/**
 * @typedef {Object} FieldProps
 * @property {React.ReactNode} [label] - Etiqueta que se muestra encima del campo.
 * @property {React.ReactNode} [helperText] - Texto de ayuda que aparece debajo del campo.
 * @property {React.ReactNode} [errorText] - Texto de error que aparece en caso de validación.
 * @property {React.ReactNode} [optionalText] - Texto que se muestra si el campo no es obligatorio.
 * @property {import("@chakra-ui/react").FieldRootProps} [rest] - Cualquier otra prop del componente raíz de Chakra Field.
 */

/**
 * Componente Field personalizado que agrupa etiqueta, contenido, texto de ayuda y errores.
 *
 * @param {FieldProps} props - Propiedades del campo.
 * @param {React.Ref<HTMLDivElement>} ref - Referencia al contenedor del campo.
 * @returns {JSX.Element}
 */
export const Field = React.forwardRef(function Field(props, ref) {
	const { label, children, helperText, errorText, optionalText, ...rest } = props;

	return (
		<ChakraField.Root ref={ref} {...rest}>
			{label && (
				<ChakraField.Label>
					{label}
					<ChakraField.RequiredIndicator fallback={optionalText} />
				</ChakraField.Label>
			)}
			{children}
			{helperText && (
				<ChakraField.HelperText>{helperText}</ChakraField.HelperText>
			)}
			{errorText && (
				<ChakraField.ErrorText>{errorText}</ChakraField.ErrorText>
			)}
		</ChakraField.Root>
	);
});