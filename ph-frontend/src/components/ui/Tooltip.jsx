import { Tooltip as ChakraTooltip, Portal } from "@chakra-ui/react";
import React from "react";

/**
 * @typedef {Object} TooltipProps
 * @property {boolean} [showArrow] - Si debe mostrarse una flecha en el tooltip.
 * @property {boolean} [portalled] - Si el contenido debe renderizarse en un Portal.
 * @property {React.RefObject<HTMLElement>} [portalRef] - Referencia del contenedor para el Portal.
 * @property {React.ReactNode} content - Contenido que se muestra dentro del Tooltip.
 * @property {import("@chakra-ui/react").TooltipContentProps} [contentProps] - Props del contenido del Tooltip.
 * @property {boolean} [disabled] - Si el tooltip está deshabilitado.
 * @property {React.ReactNode} children - Elemento hijo sobre el que se activa el tooltip.
 */

/**
 * Tooltip personalizado que encapsula Chakra Tooltip con soporte para portales y flechas.
 *
 * @param {TooltipProps & React.ComponentPropsWithoutRef<"div">} props
 * @param {React.Ref<HTMLDivElement>} ref
 */
export const Tooltip = React.forwardRef(function Tooltip(props, ref) {
	const {
		showArrow,
		children,
		disabled,
		portalled = true,
		content,
		contentProps,
		portalRef,
		...rest
	} = props;

	if (disabled) return children;

	return (
		<ChakraTooltip.Root {...rest}>
			<ChakraTooltip.Trigger asChild>{children}</ChakraTooltip.Trigger>
			<Portal disabled={!portalled} container={portalRef}>
				<ChakraTooltip.Positioner>
					<ChakraTooltip.Content ref={ref} {...contentProps}>
						{showArrow && (
							<ChakraTooltip.Arrow>
								<ChakraTooltip.ArrowTip />
							</ChakraTooltip.Arrow>
						)}
						{content}
					</ChakraTooltip.Content>
				</ChakraTooltip.Positioner>
			</Portal>
		</ChakraTooltip.Root>
	);
});