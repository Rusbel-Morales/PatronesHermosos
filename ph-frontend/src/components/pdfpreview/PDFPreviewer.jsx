import { Box } from "@chakra-ui/react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
// import pdfUrl from "../../assets/Boleto-31096001.pdf"

const PDFPreviewer = ({ pdfUrl }) => {
  console.log("PDF URL:", pdfUrl); // Para depuración
    return (
      <Box 
        border="1px solid #E2E8F0" 
        borderRadius="md" 
        overflow="hidden" 
        height="60vh"
        width="30vw"
      >
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <Viewer fileUrl={pdfUrl} />
        </Worker>
      </Box>
    );
  };

export default PDFPreviewer;