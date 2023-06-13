import styles from '@/styles/Profile.module.css';
import Image from "next/image";
import IconBook from '../../public/open-book.png';
import IconClock from '../../public/clock.png';
import IconRanking from '../../public/ranking.png';
import IconNoUser from '../../public/nouser.png';
import FloatingMenu from "@/components/floatingMenu";
import { Cropper } from "react-cropper";
import 'cropperjs/dist/cropper.css';
import MenuButton from "./menuButton";
import { useUserData } from "@/hooks/useUserData";
import { useUserAvatar } from "@/hooks/useUserAvatar";
import { useUserStudyTime } from '@/hooks/useUserStudyTime';
import { useState } from 'react';
import AcademicModal from './AcademicPerformance/AcademicModal';

export default function ComponentProfile(){

    const { updatedUserData, loading, updatedUserUniqueClasses } = useUserData();
    const { 
        newAvatar, 
        openEditor, 
        cropped, 
        handleUploadAvatar, 
        handleSaveCroppedAvatar,
        setNewAvatar,
        setOpenEditor,
        setCropped,
    } = useUserAvatar();
    const { studyTime } = useUserStudyTime();
    // console.log(studyTime);
    // console.log(updatedUserUniqueClasses.length);

    const formatStudyTime = (studyTime) => {
        const minutes = Math.floor(studyTime / 60);
        const seconds = studyTime % 60;
        return `${minutes}:${seconds}`;
    }


    const [openAcademicModal, setOpenAcademicModal] = useState(false);

    const handleAcademicModal = () => {
        setOpenAcademicModal(!openAcademicModal);
    }

    if(loading){
        return <div>Carregando...</div>
    }
         
    return (
            <>
            {openEditor && 
            <div className={styles.containerEditor}>
                <section className={styles.whiteContainer}>
                    <Cropper 
                        src={newAvatar} 
                        style={{ height:'50rem', width:'50rem', zIndex: 1 }}
                        minCropBoxHeight={200}
                        minCropBoxWidth={200}
                        aspectRatio={1/1}
                        onInitialized={(instance) => {
                            setCropped(instance);
                        }}
                        dragMode='move'/>
                    <div style={{ display: 'flex', gap: '2rem'}}>
                        <button onClick={handleSaveCroppedAvatar} className={styles.btnSaveCrop}>SALVAR</button>
                        <button onClick={() => setOpenEditor(false)} className={styles.btnSaveCrop}>SAIR</button>
                    </div>
                </section>
            </div>}

            {openAcademicModal && <AcademicModal handleAcademicModal={handleAcademicModal}/>}

            <div className={styles.componentStatus}>
                
                <div className={styles.menuNav}>
                    <FloatingMenu
                        options={[
                            { type: 'file', text: 'Atualizar foto', callback: handleUploadAvatar },
                            { text: 'Meu desempenho', callback: handleAcademicModal },
                        ]}>
                            <MenuButton/>
                    </FloatingMenu>
                    <section className={styles.greetingBox}>
                        <h3>O QUE VAMOS ESTUDAR HOJE?</h3>
                    </section>
                </div>

                <div className={styles.mainStatus}>
                    <div className={styles.profilePic}>
                        <button className={styles.btnUpload}>
                            {updatedUserData[0].avatar_url?
                            <Image src={updatedUserData[0].avatar_url} priority width={120} height={120} alt="profile"/>
                            : <Image src={IconNoUser} priority width={120} height={120} alt="profile"/>}
                        </button>
                    </div>
                    <div className={styles.statusInfo}>
                        <h1>{updatedUserData[0].name}</h1>
                        <span className={styles.containerCurso}>{ updatedUserData[0].degrees ? updatedUserData[0].degrees.degree_name  : 'Nenhum curso selecionado'}</span>
                        <div className={styles.containerGamification}>
                            <div className={styles.containerIconStatus}>
                                <Image src={IconBook} priority width={20} height={20} alt="icon"/>
                                <h3>{updatedUserUniqueClasses.length}</h3>
                            </div>
                            <div className={styles.containerIconStatus}>
                                <Image src={IconClock} priority width={20} height={20} alt="icon"/>
                                <h3>{formatStudyTime(studyTime)}</h3>
                            </div>
                            <div className={styles.containerIconStatus}>
                                <Image src={IconRanking} priority width={20} height={20} alt="icon"/>
                                <h3>123</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )}