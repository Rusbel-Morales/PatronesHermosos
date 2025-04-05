import { useState, useEffect  } from "react";
import { Input, Button, Box, Text, Flex, Link, VStack } from "@chakra-ui/react";
import { frasesMotivacionales } from "../../assets/frasesInsanas";
import {postLogin} from "@/services/loginService.js";
import {useNavigate} from "react-router-dom";
import {useAuth} from "@/contexts/AuthContext.jsx";


const InicioSesion = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [fraseActual, setFraseActual] = useState("");
  const [indiceFrase, setIndiceFrase] = useState(0);

 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const {_, setToken} = useAuth();


   // Validar email
   const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

   const passwordValido = password.length >= 6;



  // Configurar el cambio automático de frases
  useEffect(() => {
    setFraseActual(frasesMotivacionales[indiceFrase]);
    
    const intervalo = setInterval(() => {
      setIndiceFrase((prev) => (prev + 1) % frasesMotivacionales.length);
    }, 6000);

    return () => clearInterval(intervalo);
  }, [indiceFrase]);

  // Actualizar la frase cuando cambia el índice
  useEffect(() => {
    setFraseActual(frasesMotivacionales[indiceFrase]);
  }, [indiceFrase]);

  const handleLogin = async () => {
    setError(""); // Limpia errores previos
  setIsSubmitting(true);




    if (!emailValido) {
      setError("Por favor ingresa un email válido");
      setIsSubmitting(false);
      return;
    }

    if (!passwordValido) {
      setError("La contraseña debe tener al menos 6 caracteres");
      setIsSubmitting(false);
      return;
    }

    try {
      const token = await postLogin(email, password);
      if (token) {
        setToken(token); // Guarda el token en el estado
        localStorage.setItem("token", token); // Guarda el token en localStorage
        
        //  Espera a que el estado de React se actualice antes de redirigir
        setTimeout(() => {
          navigate("/coord-general/dashboard");
        }, 100);
      } else {
        setError();
      }
    } catch (error) {
      setError("Credenciales incorrectas, favor de intentarlo nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Flex
    >
      <Flex
        boxShadow="4xl"
        borderRadius="2xl"
        overflow="hidden"
        maxH="60vh" 
        maxW="90vh"
      >
        {/* CUADRO MOTIVACIONAL (IZQUIERDA) */}
        <Box
          
          display="flex"
          flexDirection="column"
          justifyContent="center"
          textAlign="center"
          bg="rgba(255, 255, 255, 0.8)"
          backdropFilter="blur(2px)"
          borderRight={{ lg: "1px solid rgba(255,255,255,0.2)" }}
        >
          <VStack spacing={6}>
            <Text 
              fontSize="3vh" // Tamaños de fuente ajustados
              fontWeight="bold" 
              color="black"
            
            >
              ¡Bienvenida de nuevo!
            </Text>
            
            <Text fontSize="2.5vh" 
            fontStyle="italic" color="black"  p= {7}>
              "El éxito comienza con tu determinación"
            </Text>
            
            <Box w="80%" h="3px" bg="black" borderRadius="full" opacity={0.7} mb={4}/>
            
            <Text 
              fontSize="2.2vh"
              color="black"
           
              display="flex"
              alignItems="center"
              justifyContent="center"
              mb={5}
              p={5}
            >
              {fraseActual}
            </Text>
            
            <Text fontSize="2.5vh" opacity={0.9} color="black" mb={2}>
              - Patrones Hermosos
            </Text>
          </VStack>
        </Box>

        {/* FORMULARIO (DERECHA) */}
        <Box 
          w={{ base: "40%" }}                 
          p={{ base: 6, lg: 8 }}                       
          bg="white"
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Text 
            fontSize= "3.5vh"             
            mb={6}                    
            textAlign="center"
            fontWeight="bold"     
            color="black"
          >
            Inicio de sesión
          </Text>
          
          <Text fontSize="2vh" mb={3} color="black">  
            Correo Electrónico:
          </Text>
          <Input
            size="sm"                  
            height="6vh"           
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
              
              
            mb={4}
             
            color="black"  
                
          />
          
          <Text fontSize= "2vh" mb={3} color="black">
            Contraseña:
          </Text>
          <Input
            size="sm"
            height="6vh"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            
            
            mb={3}
            
            color="black"
          />

       
          
{error && (
            <Text 
              color="red.500" 
              fontSize="sm"
              textAlign="center"
              mb={4}
            >
              {error}
            </Text>
          )}
          
          <Button 
            color="white"
            size="sm"                   
            height="5vh"             
            onClick={handleLogin}
               
            bg="rgba(200, 100, 220)"
            _hover={{
              bg: "rgba(160, 70, 190, 0.9)",
              boxShadow: "lg",
            }}
            _active={{
              bg: "rgba(140, 50, 170, 0.9)",
            }}
          >
            ENTRAR
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
};

export default InicioSesion;