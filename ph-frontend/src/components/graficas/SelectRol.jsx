// SelectRol.jsx (solución corregida)
"use client";

import React from "react";
import {
  HStack,
  IconButton,
  Portal,
  Select,
  useSelectContext,
  createListCollection,
} from "@chakra-ui/react";
import { RiForbidLine } from "react-icons/ri";
import { roles } from "../../utils/roles.jsx";

const CustomTrigger = () => {
  const select = useSelectContext();
  const items = select.selectedItems || [];

  return (
    <IconButton
      variant="outline"
      minW="2.5rem"
      minH="2.5rem"
      {...select.getTriggerProps()}
    >
      {select.hasSelectedItems ? items[0]?.icon : <RiForbidLine />}
    </IconButton>
  );
};

const SelectRol = ({ value, onChange, rolesConDatos = [] }) => {
  const rolesCollection = createListCollection({ items: roles });

  return (
    <Select.Root
      positioning={{ sameWidth: false }}
      collection={rolesCollection}
      size="sm"
      width="320px"
      defaultValue={["participantes"]}
      onValueChange={(val) => {
        const valueFinal = Array.isArray(val) ? val[0] : val.value || val;
        onChange(valueFinal);
      }}
    >
      <Select.HiddenSelect />
      <Select.Control>
        <CustomTrigger />
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content minW="32">
            {rolesCollection.items.map((rol) => {
              const desactivado = !rolesConDatos.includes(rol.value);
              return (
                <Select.Item
                  item={rol}
                  key={rol.value}
                  disabled={desactivado}
                >
                  <HStack>
                    {rol.icon}
                    {rol.label}
                    {desactivado && <span style={{ color: "gray", marginLeft: "4px" }}>(Sin datos)</span>}
                  </HStack>
                  {!desactivado && <Select.ItemIndicator />}
                </Select.Item>
              );
            })}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};

export default SelectRol;