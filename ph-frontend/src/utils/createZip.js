import JSZip from "jszip";
import { saveAs } from "file-saver";

export async function createZip(files) {
    const zip = new JSZip();

    // Agregar cada archivo al zip
    files.forEach(pdf => {
        zip.file(pdf.name, pdf.data);
    });

    // Generar el contenido del zip
    const zipContent = await zip.generateAsync({ type: "blob"});

    // Descargar el ZIP con todos los PDFs
    saveAs(zipContent, "diplomas.zip");
}