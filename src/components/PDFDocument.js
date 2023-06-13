// components/PDFDocument.js
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js', 
    import.meta.url,
).toString();

const options = {
    cMapUrl: 'cmaps/',
    standardFontDataUrl: 'standard_fonts/',
};

function PDFDocument({ cardBackImage, pageNumber, onLoadSuccess }) {
    return (
        <Document 
            style={{width: '100%'}}
            onClick={() => window.open(cardBackImage, '_blank')} 
            file={cardBackImage} 
            options={options} 
            onLoadSuccess={onLoadSuccess}>
            <Page pageNumber={pageNumber} />
        </Document>
    );
}

export default PDFDocument;
