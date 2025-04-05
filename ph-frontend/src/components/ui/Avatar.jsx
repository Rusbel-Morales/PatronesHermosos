import {
	Avatar as ChakraAvatar,
	AvatarGroup as ChakraAvatarGroup,
} from "@chakra-ui/react";
import React from "react";

/**
 * @typedef {Object} AvatarProps
 * @property {string} [name] - Nombre para mostrar como fallback del avatar.
 * @property {string} [src] - URL de la imagen del avatar.
 * @property {string} [srcSet] - Conjunto de URLs de imágenes alternativas para el avatar.
 * @property {"eager" | "lazy"} [loading] - Indica cómo se carga la imagen (`eager` o `lazy`).
 * @property {React.ReactElement} [icon] - Icono a mostrar como fallback si no hay imagen.
 * @property {React.ReactNode} [fallback] - Nodo a mostrar si no hay imagen ni icono.
 */

/**
 * Componente Avatar personalizado que envuelve el Chakra Avatar con soporte para fallback e imagen.
 *
 * @param {AvatarProps & React.ComponentPropsWithoutRef<"div">} props - Props del componente.
 * @param {React.Ref<HTMLDivElement>} ref - Referencia al div raíz.
 * @returns {JSX.Element} El componente Avatar.
 */
export const Avatar = React.forwardRef(function Avatar(props, ref) {
	const { name, src, srcSet, loading, icon, fallback, children, ...rest } = props;

	return (
		<ChakraAvatar.Root ref={ref} {...rest}>
			<ChakraAvatar.Fallback name={name}>
				{icon || fallback}
			</ChakraAvatar.Fallback>
			<ChakraAvatar.Image src={src} srcSet={srcSet} loading={loading} />
			{children}
		</ChakraAvatar.Root>
	);
});

/**
 * Componente de grupo de avatares, útil para mostrar múltiples usuarios juntos.
 *
 * @type {typeof ChakraAvatarGroup}
 */
export const AvatarGroup = ChakraAvatarGroup;