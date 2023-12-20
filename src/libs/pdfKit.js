import PDFDocument from 'pdfkit';

export function builPDF (dataCallback, endCallback ) {
        const doc = new PDFDocument();
        doc.on("data". dataCallback);
        doc.on("end". endCallback);

        doc.text("PDF Document")
        if (carRentData) {
            carRentData.forEach((item) => {
                doc.text(`Brand: ${item.brand}, Model: ${item.model}, Created At: ${item.createdAt}`);
            });
        }
        doc.end();
    
};
