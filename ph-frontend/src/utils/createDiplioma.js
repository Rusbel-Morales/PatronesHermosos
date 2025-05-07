import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { createZip } from "./createZip";
import { convertDateToSpanish } from "./formatDateTime";

/**
 * @param {Array<Object>} data - Lista de objetos con datos indispensables para modificar el PDF
 * @param {string} data.name - Nombre del usuario
 * @param {string} data.role - Rol del usuario
 * @param {Object} data.sede - Objeto que contiene información de la sede
 * @param {string} data.sede.nombre - Nombre de la sede
 * @param {string} data.sede.fecha_inicio - Fecha de inicio de la sede
 * @returns {Promise<void>} - Devuelve un zip con los PDFs modificados
 */

function determineDiplomaRoute(rol) {
    const pdfPath = {
        "participante": "../../public/diploma_template/participante.pdf",
        "colaboradora": "../../public/diploma_template/colaboradora.pdf",
        "mentora": "../../public/diploma_template/mentora.pdf",
        "coordinadora_asociada": "../../public/diploma_template/coordinadora_asociada.pdf",
        "coordinadora_sede": "../../public/diploma_template/coordinadora_sede.pdf"
    };

    return pdfPath[rol];
}

export async function modifyPdf(data) {
    try {
        // Guardar todos los pdfs modificados en un array
        const modifiedPdfs = [];

        for (let i = 0; i < data.length; i++) {

            // Verificar la longitud del nombre
            if (data[i].nombre.length > 31) {
                while (data[i].nombre.length > 31) {
                    data[i].nombre = data[i].nombre.split(" ").slice(0, -1).join(" ");
                }
            }

            // Ruta del archivo PDF 
            const diplomaPath = determineDiplomaRoute(data[i].rol);

            // Cargar el archivo PDF en memoria (Uint8Array)
            const response = await fetch(diplomaPath);
            const pdfBytes = await response.arrayBuffer();

            const pdfDoc = await PDFDocument.load(pdfBytes);

            // Cargar las fuentes estándar
            const timesRomanBoldItalic = await pdfDoc.embedFont(StandardFonts.TimesRomanBoldItalic);

            // Obtener la primera página
            const page = pdfDoc.getPages()[0];

            // Obtener el tamaño de la página
            const { width, height } = page.getSize();

            // Agregar nombre y sede en el diploma
            page.drawText(data[i].nombre, {
                x: (width - timesRomanBoldItalic.widthOfTextAtSize(data[i].nombre, 50)) / 2,
                y: (height - 30) / 2,
                size: 50,
                font: timesRomanBoldItalic,
                color: rgb(0, 0, 0)
            });

            page.drawText(data[i].sede.nombre, {
                x: width / 2 - 200,
                y: height / 2 - 84.5,
                size: 14,
                font: timesRomanBoldItalic,
                color: rgb(0, 0, 0)
            });

            // Convertir la fecha a español
            const dateInSpanish = convertDateToSpanish(data[i].sede.fecha_inicio);

            page.drawText(dateInSpanish, {
                x: width / 2 - 265,
                y: height / 2 - 101.5,
                size: 14,
                font: timesRomanBoldItalic,
                color: rgb(0, 0, 0)
            });

            // Guardar el PDF modificado
            const modifiedPdfBytes = await pdfDoc.save();

            // Agregar el PDF modificado al array
            modifiedPdfs.push({
                name: `diploma_${data[i].nombre}.pdf`,
                data: modifiedPdfBytes,
            });
        }

        // Crear y descargar el zip
        await createZip(modifiedPdfs);

    } catch (error) {
        throw new Error('Error al modificar el PDF:', error);
    }
}