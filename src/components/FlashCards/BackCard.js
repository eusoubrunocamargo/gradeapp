import styles from '@/styles/BackCard.module.css'
import Image from 'next/image'
import Camera from '../../../public/camera.png'
import File from '../../../public/file.png'
import { useState } from 'react'
import { useAlert } from '@/hooks/useAlert'
// import { useUserFlashcards } from '@/hooks/useUserFlashcards'
// import { pdfjs, Document, Page } from 'react-pdf'
// import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
// import 'react-pdf/dist/esm/Page/TextLayer.css'
import SmallPrev from '../../../public/small_prev.png'
import SmallNext from '../../../public/small_next.png'
import dynamic from 'next/dynamic'
const PDFDocument = dynamic(() => import('@/components/PDFDocument'), { ssr: false })

// pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url).toString();

// const options = {
//     cMapUrl: 'cmaps/',
//     standardFontDataUrl: 'fonts/',
// };

export default function BackCard({ flashcards, updateFlashcards, submitFlashcards }) {

    const { showAlert } = useAlert();
    // const { updateFlashcards, submitFlashcards } = useUserFlashcards();
    const [activeButton, setActiveButton] = useState('text');
    const [selectedImage, setSelectedImage] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    const changeActiveButton = (value) => {
        setActiveButton(value);
    };

    const handleImageChange = (e) => {

        if(e.target.files && e.target.files[0]) {

            let img = e.target.files[0];
            // console.log(img);

            if(img.type !== 'image/jpeg' && img.type !== 'image/png' && img.type !== 'image/jpg' && img.type !== 'application/pdf') {
                showAlert('Formato de imagem inválido, utilize PNG/JPEG/JPG/PDF', 'fail');
                return;
            }

            if(img.size > 5000000) {
                showAlert('Imagem muito grande, utilize uma imagem menor que 5MB', 'fail');
                return;
            }

            if(img.type === 'application/pdf') {
                setSelectedImage(img);
                updateFlashcards('back_image', img);
                return;
            } else {

                let reader = new FileReader();

                reader.onload = (e) => {
                    setSelectedImage(e.target.result);
                    updateFlashcards('back_image', img);
                };

                reader.readAsDataURL(e.target.files[0]);
        }
    }};

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
        <section className={styles.backCardContainer}>
            <section className={styles.contentContainer}>
                
                {activeButton === 'text' && 
                    <textarea 
                        onChange={(e) => updateFlashcards('back_text', e.target.value)}
                        value={flashcards.back_text}
                        minLength={1} 
                        maxLength={600} 
                        placeholder='Digite uma resposta, resumo ou explicação ...'>
                </textarea>}

                {activeButton === 'image' && 
                    <label className={styles.btnUploadImage} htmlFor='imageInput'>
                        <span>Imagem JPEG/PNG ou PDF</span>
                        <input id='imageInput' type='file' accept='.jpg, .jpeg, .png, .pdf' onChange={handleImageChange} />
                    </label>}
                    
                {activeButton === 'image' && selectedImage && 
                    (selectedImage.type === 'application/pdf' ? (
                        <>
                        <PDFDocument 
                            cardBackImage={selectedImage} 
                            // options={options} 
                            pageNumber={pageNumber} 
                            onLoadSuccess={onDocumentLoadSuccess} />
                        {/* <Document style={{width: '100%'}} file={selectedImage} options={options} onLoadSuccess={onDocumentLoadSuccess}>
                            <Page pageNumber={pageNumber} />
                        </Document> */}
                        <div className={styles.btnControl}>
                            <button type="button" disabled={pageNumber <= 1} onClick={previousPage}>
                                <Image src={SmallPrev} width={20} height={20} alt='previous'/>
                            </button>
                            <p>{pageNumber || (numPages ? 1 : '--')} de {numPages || '--'}</p>
                            <button type="button" disabled={pageNumber >= numPages} onClick={nextPage}>
                                <Image src={SmallNext} width={20} height={20} alt='previous'/>
                            </button>
                        </div>
                        </>
                    ) : (
                    // <img src={selectedImage} className={styles.imagePreview} alt="Selected" />
                    <Image src={selectedImage} style={{ objectFit: 'cover', borderRadius: '1rem'}} fill alt="Selected"/>
                    )
                    )
                }

                <div className={styles.btnTxtImg}>
                    <button onClick={() => changeActiveButton('image')}>
                        <Image src={Camera} width={20} height={20} alt='camera'/>
                    </button>
                    <button onClick={() => changeActiveButton('text')}>
                        <Image src={File} width={20} height={20} alt='file'/>
                    </button>
                </div>
            </section>
            <button onClick={submitFlashcards} className={styles.btnSubmit}>Criar</button>
        </section>
    )
}