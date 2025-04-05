import { Group, InputElement } from "@chakra-ui/react";
import React from "react";

/**
 * @typedef {import("@chakra-ui/react").BoxProps} BoxProps
 * @typedef {import("@chakra-ui/react").InputElementProps} InputElementProps
 */

/**
 * @typedef {Object} InputGroupProps
 * @property {InputElementProps} [startElementProps] - Props para el elemento de inicio.
 * @property {InputElementProps} [endElementProps] - Props para el elemento de fin.
 * @property {React.ReactNode} [startElement] - Elemento visual al inicio del input.
 * @property {React.ReactNode} [endElement] - Elemento visual al final del input.
 * @property {React.ReactElement<InputElementProps>} children - Elemento input que se desea mostrar.
 * @property {string} [startOffset] - Padding inicial si hay startElement.
 * @property {string} [endOffset] - Padding final si hay endElement.
 */

/**
 * Grupo de Input con elementos al inicio y final (como íconos o adornos).
 *
 * @param {InputGroupProps & React.RefAttributes<HTMLDivElement>} props
 * @param {React.Ref<HTMLDivElement>} ref
 * @returns {JSX.Element}
 */
export const InputGroup = React.forwardRef(function InputGroup(props, ref) {
	const {
		startElement,
		startElementProps,
		endElement,
		endElementProps,
		children,
		startOffset = "6px",
		endOffset = "6px",
		...rest
	} = props;

	const child = React.Children.only(children);

	return (
		<Group ref={ref} {...rest}>
			{startElement && (
				<InputElement pointerEvents="none" {...startElementProps}>
					{startElement}
				</InputElement>
			)}
			{React.cloneElement(child, {
				...(startElement && {
					ps: `calc(var(--input-height) - ${startOffset})`,
				}),
				...(endElement && {
					pe: `calc(var(--input-height) - ${endOffset})`,
				}),
				...children.props,
			})}
			{endElement && (
				<InputElement placement="end" {...endElementProps}>
					{endElement}
				</InputElement>
			)}
		</Group>
	);
});