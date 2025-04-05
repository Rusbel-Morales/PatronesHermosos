"use client"

import { ClientOnly, IconButton, Skeleton, Span } from "@chakra-ui/react"
import { ThemeProvider, useTheme } from "next-themes"
import * as React from "react"
import { LuMoon, LuSun } from "react-icons/lu"

/**
 * Props para el proveedor de modo de color basado en `next-themes`.
 * Extiende las propiedades estándar de `ThemeProvider`.
 */
export function ColorModeProvider(props) {
	return (
		<ThemeProvider attribute="class" disableTransitionOnChange {...props} />
	)
}

/**
 * Tipos posibles para el modo de color.
 * @typedef {"light" | "dark"} ColorMode
 */

/**
 * Hook personalizado para manejar el modo de color.
 * @returns {{ colorMode: ColorMode, setColorMode: (colorMode: ColorMode) => void, toggleColorMode: () => void }}
 */
export function useColorMode() {
	const { resolvedTheme, setTheme } = useTheme()
	const toggleColorMode = () => {
		setTheme(resolvedTheme === "dark" ? "light" : "dark")
	}
	return {
		colorMode: resolvedTheme,
		setColorMode: setTheme,
		toggleColorMode,
	}
}

/**
 * Hook para retornar un valor dependiendo del modo de color.
 * @template T
 * @param {T} light - Valor para modo claro.
 * @param {T} dark - Valor para modo oscuro.
 * @returns {T}
 */
export function useColorModeValue(light, dark) {
	const { colorMode } = useColorMode()
	return colorMode === "dark" ? dark : light
}

/**
 * Componente que muestra un ícono según el modo de color actual.
 * @returns {JSX.Element}
 */
export function ColorModeIcon() {
	const { colorMode } = useColorMode()
	return colorMode === "dark" ? <LuMoon /> : <LuSun />
}

/**
 * Botón que permite cambiar entre modo claro y oscuro.
 * @param {import("@chakra-ui/react").IconButtonProps} props
 * @returns {JSX.Element}
 */
export const ColorModeButton = React.forwardRef(function ColorModeButton(props, ref) {
	const { toggleColorMode } = useColorMode()
	return (
		<ClientOnly fallback={<Skeleton boxSize="8" />}>
			<IconButton
				onClick={toggleColorMode}
				variant="ghost"
				aria-label="Toggle color mode"
				size="sm"
				ref={ref}
				{...props}
				css={{
					_icon: {
						width: "5",
						height: "5",
					},
				}}
			>
				<ColorModeIcon />
			</IconButton>
		</ClientOnly>
	)
})

/**
 * Componente que aplica modo claro a sus hijos.
 * @param {import("@chakra-ui/react").SpanProps} props
 * @returns {JSX.Element}
 */
export const LightMode = React.forwardRef(function LightMode(props, ref) {
	return (
		<Span
			color="fg"
			display="contents"
			className="chakra-theme light"
			colorPalette="gray"
			colorScheme="light"
			ref={ref}
			{...props}
		/>
	)
})

/**
 * Componente que aplica modo oscuro a sus hijos.
 * @param {import("@chakra-ui/react").SpanProps} props
 * @returns {JSX.Element}
 */
export const DarkMode = React.forwardRef(function DarkMode(props, ref) {
	return (
		<Span
			color="fg"
			display="contents"
			className="chakra-theme dark"
			colorPalette="gray"
			colorScheme="dark"
			ref={ref}
			{...props}
		/>
	)
})