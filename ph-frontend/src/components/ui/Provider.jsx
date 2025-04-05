"use client";

import { ChakraProvider } from "@chakra-ui/react";
import system from "./Theme"; // Asegúrate de que la ruta sea correcta

export function Provider(props) {
  return (
    <ChakraProvider value={system}>
      {props.children}
    </ChakraProvider>
  );
}