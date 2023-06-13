import styles from '@/styles/StudyCard.module.css'
import Image from 'next/image'
import SmallPrev from '../../../public/small_prev.png'
import SmallNext from '../../../public/small_next.png'
import Camera from '../../../public/camera.png'
import File from '../../../public/file.png'
import { useState } from 'react'
import dynamic from 'next/dynamic'
const PDFDocument = dynamic(() => import('@/components/PDFDocument'), { ssr: false })
// import { pdfjs, Document, Page } from 'react-pdf'
// import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
// import 'react-pdf/dist/esm/Page/TextLayer.css'
// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//     'pdfjs-dist/build/pdf.worker.min.js', 
//     import.meta.url,
// ).toString();

// const options = {
//     cMapUrl: 'cmaps/',
//     standardFontDataUrl: 'standard_fonts/',
// };

export default function StudyBackCard({ cardBackText, cardBackImage }) {

    const [activeButton, setActiveButton] = useState('image');

    const changeActiveButton = (value) => {
        setActiveButton(value);
    };

    // Function to get the file extension
    const getFileExtension = (filename) => {
        if (filename === undefined || filename === null) {
            return;
        }
        return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
    }

    // Check if cardBackImage is a jpg/jpeg/png or pdf
    const imageFileTypes = ['jpg', 'jpeg', 'png'];
    const isImageFile = imageFileTypes.includes(getFileExtension(cardBackImage));

    // PDF
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    const onDocumentLoadSuccess = ({ numPages: nextNumPages }) => {
        setNumPages(nextNumPages);
    };

    const changePage = (offset) => {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    };

    const previousPage = () => {
        changePage(-1);
    };

    const nextPage = () => {
        changePage(1);
    };

    return (
        <div className={styles.studyBackCard}>
        <div className={styles.contentContainer}>
        {activeButton === 'image' && cardBackImage && isImageFile ?
                <Image src={cardBackImage} alt='card back image' fill style={
                    {
                        objectFit: 'cover',
                    }
                }/> :
                activeButton === 'image' && cardBackImage && !isImageFile ?
                <>
                <div className={styles.btnControl}>
                    <button type="button" disabled={pageNumber <= 1} onClick={previousPage}>
                        <Image src={SmallPrev} width={20} height={20} alt='previous'/>
                    </button>
                    <p>{pageNumber || (numPages ? 1 : '--')} de {numPages || '--'}</p>
                    <button type="button" disabled={pageNumber >= numPages} onClick={nextPage}>
                        <Image src={SmallNext} width={20} height={20} alt='next'/>
                    </button>
                </div>
                <PDFDocument
                    cardBackImage={cardBackImage}
                    // options={options}
                    pageNumber={pageNumber}
                    onLoadSuccess={onDocumentLoadSuccess}
                />
                {/* <Document 
                    style={{width: '100%'}}
                    onClick={() => window.open(cardBackImage, '_blank')} 
                    file={cardBackImage} 
                    options={options} 
                    onLoadSuccess={onDocumentLoadSuccess}>
                    <Page pageNumber={pageNumber} />
                </Document> */}
                </> :
                activeButton === 'image' && !cardBackImage ? 
                <p>Nenhuma imagem/pdf neste card!</p> :
                <p>{cardBackText}</p>
            }
        </div>
        <div className={styles.btnTxtImg}>
            <button className={`${activeButton === 'image' && styles.isActive}`} onClick={() => changeActiveButton('image')}>
                <Image src={Camera} width={20} height={20} alt='camera'/>
            </button>
            <button className={`${activeButton === 'text' && styles.isActive}`} onClick={() => changeActiveButton('text')}>
                <Image src={File} width={20} height={20} alt='file'/>
            </button>
        </div>
    </div>
    )
}
