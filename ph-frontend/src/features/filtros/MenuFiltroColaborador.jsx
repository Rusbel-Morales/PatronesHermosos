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
    { label: "Sede", value: "Sede" },
    { label: "Nombre", value: "Nombre" },
    { label: "Estado", value: "Estado" },
    { label: "Grupos", value: "Grupos" },
    { label: "Estudiantes", value: "Estudiantes" },
    { label: "Fecha", value: "Fecha" },
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

const rol = createListCollection({
  items: [
    { label: "Cualquiera", value: "Cualquiera" },
    { label: "Staff", value: "Staff" },
    { label: "Facilitadora", value: "Facilitadora" },
    { label: "Instructora", value: "Instructora" },
  ],
})


const MenuFiltroColaborador = ({setData, data}) => {
  const [open, setOpen] = useState(false)

  /*const [data, setData] = useDataState();*/

  const updateValue = (key, value) => {
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const [value, setValue] = useState("")
  const [value2, setValue2] = useState("")
  const [value3, setValue3] = useState("")

  return (
    <Drawer.Root open={open} onOpenChange={(e) => setOpen(e.open)} placement="start">
      <Drawer.Trigger asChild>
        <Button top = "15%" colorPalette="purple" height={"5vh"}>
            <Icon size="xl">
                <MdFilterAlt />
            </Icon>
            <Text textStyle="md">Buscar y Filtrar</Text>
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
{/*
              <Field.Root>
                <Field.Label>
                  Buscar por cantidad de grupos: <Field.RequiredIndicator />
                </Field.Label>
                <Input 
                  value={data.grupo}
                  onChange={(e) => {
                    updateValue("grupos", e.currentTarget.value);
                  }}
                />
                <Field.HelperText>Ej. 5</Field.HelperText>
              </Field.Root>

              <Field.Root>
                <Field.Label>
                  Buscar por cantidad de estudiantes: <Field.RequiredIndicator />
                </Field.Label>
                <Input 
                  value={data.estudiantes}
                  onChange={(e) => {
                    updateValue("estudiantes", e.currentTarget.value);
                  }}
                />
                <Field.HelperText>Ej. 100</Field.HelperText>
              </Field.Root>*/}
              
              </Drawer.Body>
              <Drawer.Header>
                <Drawer.Title>Filtrar:</Drawer.Title>
              </Drawer.Header>
              <Drawer.Body>

                {/* Select de Estado */}
              <Select.Root
                collection={stados}
                width="250px"
                value={value2}
                onValueChange={(e) => {
                  setValue2(e.value);
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
                collection={rol}
                width="250px"
                value={value3}
                onValueChange={(e) => {
                  setValue3(e.value);
                  updateValue("rol", e.value);
                }}
              >
                <Select.HiddenSelect />
                <Select.Label>Rol:</Select.Label>
                <Select.Control>
                  <Select.Trigger>
                    <Select.ValueText placeholder={data.rol} />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    <Select.Indicator />
                  </Select.IndicatorGroup>
                </Select.Control>
                <Portal>
                  <Select.Positioner>
                    <Select.Content zIndex="9997">
                      {rol.items.map((r) => (
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
                value={value}
                onValueChange={(e) => {
                  setValue(e.value);
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
                  updateValue("sede", "");
                  updateValue("nombre", "");
                  updateValue("grupos", "");
                  updateValue("estudiantes", "");
                  updateValue("estado", "Cualquiera");
                  updateValue("fecha", "");
                  updateValue("rol", "Cualquiera");
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

  
export default MenuFiltroColaborador;