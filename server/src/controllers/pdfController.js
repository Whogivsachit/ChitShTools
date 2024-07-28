const { PDFDocument, StandardFonts  } = require('pdf-lib');
const fontkit = require('@pdf-lib/fontkit');
const fs = require('fs');
const path = require('path');
const mammoth = require('mammoth');

exports.convertToPdf = async (req, res) => {
    if(!req.file) return res.status(400).send('No file uploaded');

    // Constants
    const uploadFolder = 'uploads';
    const filePath = path.join(uploadFolder, req.file.filename);
    const fileExtension = path.extname(req.file.originalname);
    const fontSize = 12;
    let sanitizedText = ''; // This will hold the text extracted from the file

    try {

        // Extract text from the file
        switch (fileExtension) {
            case '.docx':
                const { value: rawText } = await mammoth.extractRawText({ path: filePath  });
                sanitizedText = rawText.replace(/[\u0000-\u001F\u007F-\u009F]/g, '');
                break;
            case '.txt':
                sanitizedText = fs.readFileSync(filePath, 'utf8');
                break;
            default:
                throw new Error('Unsupported file format');
        }

        const pdfDoc = await PDFDocument.create();
        pdfDoc.registerFontkit(fontkit);

        // Embed a font in the PDF document
        const fontPath = path.join(uploadFolder, 'NotoSans-Regular.ttf');
        if (!fs.existsSync(fontPath)) throw new Error('Font file not found');
        const fontBytes = fs.readFileSync(fontPath);
        const customFont = await pdfDoc.embedFont(fontBytes);

        // Add a page to the PDF document
        const page = pdfDoc.addPage([600, 800]);
        const { width, height } = page.getSize()

        // Add text to the page
        page.drawText(sanitizedText, {
            x: 50,
            y: height - 50,
            size: fontSize,
            font: customFont,
            maxWidth: width - 100,
        });

        // Save the PDF
        const pdfBytes = await pdfDoc.save();

        // Save to disk
        fs.writeFileSync('output.pdf', pdfBytes);

        // Send the pdf as a response
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=output.pdf');
        res.send(Buffer.from(pdfBytes));

    } catch (error) {
        console.error(error);
        res.send({status: 500, message: 'Couldnt convert file to PDF'});
    } finally {
        if(fs.existsSync(filePath)) return fs.unlinkSync(filePath);
        pdfDoc.reset();
    }
}
