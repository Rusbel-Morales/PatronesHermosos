import { Slider as ChakraSlider, For, HStack } from "@chakra-ui/react";
import React from "react";

/**
 * @typedef {Object} SliderMark
 * @property {number} value - El valor numérico de la marca.
 * @property {React.ReactNode} [label] - Texto o componente que aparece junto a la marca.
 */

/**
 * @typedef {Object} SliderProps
 * @property {ChakraSlider.RootProps} [rest] - Propiedades del slider raíz de Chakra.
 * @property {Array<number | SliderMark>} [marks] - Arreglo de marcas (con o sin etiquetas).
 * @property {React.ReactNode} [label] - Etiqueta del slider.
 * @property {boolean} [showValue] - Si se debe mostrar el valor actual.
 */

/**
 * Componente de Slider personalizado que soporta marcas y muestra el valor.
 *
 * @param {SliderProps & React.ComponentPropsWithoutRef<"div">} props
 * @param {React.Ref<HTMLDivElement>} ref
 */
export const Slider = React.forwardRef(function Slider(props, ref) {
	const { marks: marksProp, label, showValue, ...rest } = props;
	const value = props.defaultValue ?? props.value;

	const marks = marksProp?.map((mark) =>
		typeof mark === "number" ? { value: mark, label: undefined } : mark
	);

	const hasMarkLabel = !!marks?.some((mark) => mark.label);

	return (
		<ChakraSlider.Root ref={ref} thumbAlignment="center" {...rest}>
			{label && !showValue && <ChakraSlider.Label>{label}</ChakraSlider.Label>}
			{label && showValue && (
				<HStack justify="space-between">
					<ChakraSlider.Label>{label}</ChakraSlider.Label>
					<ChakraSlider.ValueText />
				</HStack>
			)}
			<ChakraSlider.Control data-has-mark-label={hasMarkLabel || undefined}>
				<ChakraSlider.Track>
					<ChakraSlider.Range />
				</ChakraSlider.Track>
				<SliderThumbs value={value} />
				<SliderMarks marks={marks} />
			</ChakraSlider.Control>
		</ChakraSlider.Root>
	);
});

/**
 * Renders one or multiple thumbs depending on slider value.
 *
 * @param {{ value?: number[] }} props
 */
function SliderThumbs({ value }) {
	return (
		<For each={value}>
			{(_, index) => (
				<ChakraSlider.Thumb key={index} index={index}>
					<ChakraSlider.HiddenInput />
				</ChakraSlider.Thumb>
			)}
		</For>
	);
}

/**
 * @typedef {Object} SliderMarksProps
 * @property {Array<number | SliderMark>} [marks]
 */

/**
 * Componente que representa las marcas del slider.
 *
 * @param {SliderMarksProps} props
 * @param {React.Ref<HTMLDivElement>} ref
 */
const SliderMarks = React.forwardRef(function SliderMarks(props, ref) {
	const { marks } = props;
	if (!marks?.length) return null;

	return (
		<ChakraSlider.MarkerGroup ref={ref}>
			{marks.map((mark, index) => {
				const value = typeof mark === "number" ? mark : mark.value;
				const label = typeof mark === "number" ? undefined : mark.label;
				return (
					<ChakraSlider.Marker key={index} value={value}>
						<ChakraSlider.MarkerIndicator />
						{label}
					</ChakraSlider.Marker>
				);
			})}
		</ChakraSlider.MarkerGroup>
	);
});