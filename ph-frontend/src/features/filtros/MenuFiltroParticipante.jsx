"use client"

import { 
  Button, CloseButton, Drawer, Portal, Icon, Text, Select, Spinner, createListCollection,
  Input, InputGroup, Field, defineStyle } from "@chakra-ui/react"
import { useRef, useState } from "react"
import {
    MdFilterAlt
} from "react-icons/md"

const frameworks = createListCollection({
  items: [
    { label: "Por defecto", value: "Default" },
    { label: "Estado", value: "Estado" },
    { label: "Nombre", value: "Nombre" },
    { label: "Escolaridad", value: "Escolaridad" },
    { label: "Grado", value: "Grado" },
  ],
})

const stados = createListCollection({
  items: [
    { label: "Cualquiera", value: "Cualquiera" },
    { label: "Pendiente", value: "pendiente" },
    { label: "Aceptado", value: "aceptado" },
    { label: "Rechazado", value: "rechazado" },
  ],
})

const escolaridad = createListCollection({
  items: [
    { label: "Cualquiera", value: "Cualquiera" },
    { label: "Preparatoria", value: "Preparatoria" },
    { label: "Secundaria", value: "Secundaria" },
  ],
})

const grado = createListCollection({
  items: [
    { label: "Cualquiera", value: "Cualquiera" },
    { label: "1°", value: "1" },
    { label: "2°", value: "2" },
    { label: "3°", value: "3" },
  ],
})



const MenuFiltroParticipante = ({setData, data}) => {
  const [open, setOpen] = useState(false)

  /*const [data, setData] = useDataState();*/

  const updateValue = (key, value) => {
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  return (
    <Drawer.Root open={open} onOpenChange={(e) => setOpen(e.open)} placement="start">
      <Drawer.Trigger asChild>
        <Button top = "15%" colorPalette="purple">
            <Icon size="xl">
                <MdFilterAlt />
            </Icon>
            <Text textStyle="lg">Buscar y Filtrar</Text>
        </Button>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Buscar:</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              {/* El filtro inicia aqui */}

              {/* El filtro acaba aqui  
              
              <InputGroup>
                <Input
                  size = "xs"
                  ref={inputRef}
                  placeholder="Por nombre:"
                  value={value2}
                  onChange={(e) => {
                    setValue2(e.currentTarget.value)

                  }}
                />
              </InputGroup>*/}

              <Field.Root>
                <Field.Label>
                  Buscar por nombre: <Field.RequiredIndicator />
                </Field.Label>
                <Input 
                  value={data.nombre}
                  onChange={(e) => {
                    updateValue("nombre", e.currentTarget.value);
                  }}
                />
                <Field.HelperText>Ej. Diego Gadiro Armando Rusbell</Field.HelperText>
              </Field.Root>
              
              </Drawer.Body>
              <Drawer.Header>
                <Drawer.Title>Filtrar:</Drawer.Title>
              </Drawer.Header>
              <Drawer.Body>

                {/* Select de Estado */}
              <Select.Root
                collection={stados}
                width="250px"
                value={data.estado}
                onValueChange={(e) => {
                  updateValue("estado", e.value);
                }}
              >
                <Select.HiddenSelect />
                <Select.Label>Estado:</Select.Label>
                <Select.Control>
                  <Select.Trigger>
                    <Select.ValueText placeholder={data.estado} />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    <Select.Indicator />
                  </Select.IndicatorGroup>
                </Select.Control>
                <Portal>
                  <Select.Positioner>
                    <Select.Content zIndex="9998">
                      {stados.items.map((estado) => (
                        <Select.Item item={estado} key={estado.value}>
                          {estado.label}
                          <Select.ItemIndicator />
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Positioner>
                </Portal>
              </Select.Root>

              {/* Select de Rol */}
              <Select.Root
                collection={escolaridad}
                width="250px"
                value={data.escolaridad}
                onValueChange={(e) => {
                  updateValue("escolaridad", e.value);
                }}
              >
                <Select.HiddenSelect />
                <Select.Label>Escolaridad:</Select.Label>
                <Select.Control>
                  <Select.Trigger>
                    <Select.ValueText placeholder={data.escolaridad} />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    <Select.Indicator />
                  </Select.IndicatorGroup>
                </Select.Control>
                <Portal>
                  <Select.Positioner>
                    <Select.Content zIndex="9997">
                      {escolaridad.items.map((r) => (
                        <Select.Item item={r} key={r.value}>
                          {r.label}
                          <Select.ItemIndicator />
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Positioner>
                </Portal>
              </Select.Root>

            {/* Select de Grado */}
            <Select.Root
                collection={grado}
                width="250px"
                value={data.grado}
                onValueChange={(e) => {
                  updateValue("grado", e.value);
                }}
              >
                <Select.HiddenSelect />
                <Select.Label>Grado:</Select.Label>
                <Select.Control>
                  <Select.Trigger>
                    <Select.ValueText placeholder={data.grado} />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    <Select.Indicator />
                  </Select.IndicatorGroup>
                </Select.Control>
                <Portal>
                  <Select.Positioner>
                    <Select.Content zIndex="9997">
                      {grado.items.map((r) => (
                        <Select.Item item={r} key={r.value}>
                          {r.label}
                          <Select.ItemIndicator />
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Positioner>
                </Portal>
              </Select.Root>

            </Drawer.Body>
            <Drawer.Header>
              <Drawer.Title>Ordenar por:</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>

              {/* Select de Orden */}
              <Select.Root
                collection={frameworks}
                width="250px"
                value={data.orden}
                onValueChange={(e) => {
                  updateValue("orden", e.value);
                }}
              >
                <Select.HiddenSelect />
                <Select.Label>Ordenar por:</Select.Label>
                <Select.Control>
                  <Select.Trigger>
                    <Select.ValueText placeholder={data.orden} />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    <Select.Indicator />
                  </Select.IndicatorGroup>
                </Select.Control>
                <Portal>
                  <Select.Positioner>
                    <Select.Content zIndex="9999">
                      {frameworks.items.map((framework) => (
                        <Select.Item item={framework} key={framework.value}>
                          {framework.label}
                          <Select.ItemIndicator />
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Positioner>
                </Portal>
              </Select.Root>



            </Drawer.Body>

            <Drawer.Footer>
              <Button colorPalette="purple" width="100%"
                onClick={() => {
                  updateValue("orden", "Default");
                  
                  updateValue("nombre", "");
                  updateValue("grupos", "");
                  
                  updateValue("estado", "Cualquiera");
                  updateValue("fecha", "");
                  updateValue("escolaridad", "Cualquiera");
                  updateValue("grado", "Cualquiera");
                  setOpen(false);

                 }}
              >
                  <Icon size="xl">
                      <MdFilterAlt />
                  </Icon>
                  <Text textStyle="2xl">Limpiar todo</Text>
              </Button>
              {/*
              <Button variant="outline">Cancel</Button>
              <Button>Save</Button>*/}
            </Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  )
};

  
export default MenuFiltroParticipante;