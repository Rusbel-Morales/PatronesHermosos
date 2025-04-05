import {
    Flex,
    Image,
    Text,
    Box,
    Link
} from "@chakra-ui/react";
import logoMorado from "../../assets/logo-morado.png";


const user = {id: 1, nombre: "El Diego Rusbel Armando Cano"}


const UserLogo = () => {
    return (
      <div style={{
                    position: "fixed",
                    top: 0,
                    right: 0,
                    width: "30%", // Ajusta el tamaño según necesites
                    //backgroundColor: "orange",
                    color: "Black",
                    padding: "1px",
                    zIndex: 1000 // Asegura que esté por encima de otros elementos
                }}>
                    <Flex gap="0px" align="end">
                        <Box height={100} p={4} borderRadius="md">
                            <Text textStyle="xl" textAlign= "right">{user.nombre}</Text>
                            <Text textStyle="md" textAlign= "right">
                                <Link href="#" colorPalette="purple">Cerrar Sesión</Link>
                            </Text>
                        </Box>
                        <Image src={logoMorado} alt="Patrones Hermosos" boxSize={["80px", "100px"]} objectFit="cover" mt={5} mr={5} />
                    </Flex>
        </div>
    );
  };
  
  export default UserLogo;