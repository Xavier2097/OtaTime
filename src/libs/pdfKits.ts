import PDFDocument  from 'pdfkit'

export function buldPDF(dataCallback: (chunk: any) => void, endCallback: () => void){
    const doc = new PDFDocument()
    doc.on('data', dataCallback)
    doc.on('end', endCallback)

    doc.text('Hola, este es un PDF generado con pdfkit y TypeScript!');

    doc.end();
}