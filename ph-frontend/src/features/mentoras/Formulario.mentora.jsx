import { useState } from "react";
import {
  Button, Card, Stack, Field, Input, Text
} from "@chakra-ui/react";
import { registerMentora } from "@/services/mentoraService";
import { calcularProgresoPersonal } from '@/utils/personalProgreso.js';

import SuccessModal from "../../components/modals/SuccessModal";
import ErrorModal from "../../components/modals/ErrorModal";

const MentoraForm = ({ onSubmit, setProgress, idSede }) => {
  const [formData, setFormData] = useState({
    mentora: {
      nombre: "",
      correo: "",
    },
    id_sede: idSede // Usamos la prop directamente
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const isFormComplete = () => {
    const { mentora } = formData;
    const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(mentora.correo);
    return (
      mentora.nombre.trim() !== "" &&
      mentora.correo.trim() !== "" &&
      isEmailValid
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = {
      ...formData,
      mentora: { ...formData.mentora, [name]: value },
    };
    setFormData(updatedData);
    const updatedProgress = calcularProgresoPersonal(updatedData);
    setProgress && setProgress(updatedProgress);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await registerMentora(formData);
      console.log("✅ Mentora registrada con éxito:", response);
      setIsSuccessModalOpen(true);
      // Reset form after successful submission
      setFormData({
        mentora: {
          nombre: "",
          correo: "",
        },
        id_sede: idSede // Mantenemos el id_sede al resetear
      });
    } catch (error) {
      console.error("❌ Error al registrar mentora:", error);
      setErrorMessage(error.response?.data?.error || "Ocurrió un error al registrar");
      setIsErrorModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack align="center" justify="center" w="50vw" h="75vh">
        <Card.Root maxW="2xl" w="full" bg="gray.100" pl="10" pr="10">
          <Card.Header>
            <Card.Title padding={2} textAlign="center" fontWeight="bold" fontSize="3xl">
              Datos de la Mentora
            </Card.Title>
            {/* Mostramos la sede actual si es necesario */}
            {idSede && (
              <Text textAlign="center" fontSize="md" color="gray.600">
                Sede: {idSede}
              </Text>
            )}
          </Card.Header>

          <Card.Body>
            <Stack gap="4" w="full">
              <Field.Root>
                <Field.Label fontSize="lg">Nombre Completo</Field.Label>
                <Input
                  type="text"
                  name="nombre"
                  value={formData.mentora.nombre}
                  onChange={handleChange}
                  placeholder="Nombre Apellido"
                  required
                />
              </Field.Root>

              <Field.Root>
                <Field.Label fontSize="lg">Correo electrónico</Field.Label>
                <Input
                  type="email"
                  name="correo"
                  value={formData.mentora.correo}
                  onChange={handleChange}
                  placeholder="example@gmail.com"
                  required
                />
                {formData.mentora.correo && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.mentora.correo) && (
                  <Text color="red.500" fontSize="sm" mt={1}>
                    Por favor, ingresa un correo electrónico válido.
                  </Text>
                )}
              </Field.Root>
            </Stack>
          </Card.Body>

          <Card.Footer display="flex" justifyContent="center">
            <Button
              type="submit"
              bg={isFormComplete() ? "purple.500" : "gray.300"}
              _hover={isFormComplete() ? { bg: "purple.600" } : undefined}
              size="xl"
              disabled={!isFormComplete() || isLoading}
              isLoading={isLoading}
              loadingText="Registrando..."
            >
              Registrar
            </Button>
          </Card.Footer>
        </Card.Root>
      </Stack>

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        message="Mentora registrada con éxito"
      />

      <ErrorModal
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        message={errorMessage || "Ocurrió un error al registrar, por favor intenta nuevamente"}
      />
    </form>
  );
};

export default MentoraForm;