import { supabase } from "../../supabase";
import { useEffect , useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import styles from '@/styles/Profile.module.css';
import Image from "next/image";
import IconBook from '../../public/open-book.png';
import IconClock from '../../public/clock.png';
import IconRanking from '../../public/ranking.png';
import IconNoUser from '../../public/nouser.png';
import FloatingMenu from "@/components/floatingMenu";
import { Cropper } from "react-cropper";
import 'cropperjs/dist/cropper.css';
import { v4 as uuidv4 } from 'uuid';

export default function ComponentProfile(){

    const [newAvatar, setNewAvatar] = useState(null);
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [openEditor, setOpenEditor] = useState(false);
    const [cropped, setCropped] = useState(null);
    const [loggedUser, setLoggedUser] = useState(null);

    useAuth();
    const { user } = useAuth();
    
    useEffect(() => {
        const fetchAvatarUrl = async () => {
            const { data , error } = await supabase
                .from('profiles')
                .select('avatar_url')
                .eq('id', user.id)
                .single();

            if(error){
                console.error(error);
            } else {
                setAvatarUrl(data.avatar_url);
                console.log(data.avatar_url);
            }
        }
        if(user){
            fetchAvatarUrl();
        }
    }, [user]);

    useEffect(()=>{
        const getUser = async () => {
            const {data: { session } } = await supabase.auth.getSession();
            
            if(!session){
               return;
            }
            setLoggedUser(session.user.user_metadata.name);        
        };
        getUser();
    }, []);

    const handleUploadAvatar = async (event) => {
        if(event.target.files[0]){
            setNewAvatar(URL.createObjectURL(event.target.files[0]));
            setOpenEditor(true);
        };
    };

    const createFileFromCroppedImage = async (cropped, userId) => {
        const uniqueId = uuidv4();
        return await fetch(cropped.getCroppedCanvas({
            maxWidth: 1024,
            maxHeight: 1024,
            imageSmoothingQuality: 'high',
        }).toDataURL())
        .then((res) => res.blob())
        .then((blob) => {
            return new File([blob], `${userId}-newAvatar-${uniqueId}.png`, { type: 'image/png'});
        });
    }

    const uploadImageToStorage = async (file) => {
        const { data , error } = await supabase
            .storage
            .from('avatars')
            .upload(file.name, file, {
                cacheControl: '3600',
                upsert: false
            });

        if(error){
            console.error(error);
            return null;
        }
        return data.path
    }

    const getPublicUrlOfImage = async (key) => {
        const { data , error } = await supabase
            .storage
            .from('avatars')
            .getPublicUrl(key);

        if(error){
            console.error(error);
            return null;
        }

        return data.publicUrl
    }

    const updateProfileAvatarUrl = async (userId, publicUrl) => {
        const { error } = await supabase
        .from('profiles')
        .update({avatar_url: publicUrl})
        .eq('id', userId);

        if(error){
            console.error(error);
            return false;
        }
        return true;
    }

    const handleSaveCroppedAvatar = async () => {
        
        if(cropped){
            const file = await createFileFromCroppedImage(cropped, user.id);
            if(file){
                const key = await uploadImageToStorage(file);
                if(key){
                    const publicUrl = await getPublicUrlOfImage(key);
                    if(publicUrl){
                        const updateSuccess = await updateProfileAvatarUrl(user.id, publicUrl);
                        if(updateSuccess){
                            console.log('sucesso');
                            setAvatarUrl(publicUrl);
                            setOpenEditor(false);
                        }
                    }
                }
            }
        }
    }
         
    return (
        
            <>
            {openEditor && 
            <div className={styles.containerEditor}>
                    <Cropper 
                        src={newAvatar} 
                        style={{ height:'50rem', width:'50rem' }}
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
            </div>}

                    <div className={styles.componentStatus}>
                        <section>
                            <h1>Olá!</h1>
                            <span>O QUE VAMOS ESTUDAR HOJE?</span>
                        </section>
                        <div className={styles.mainStatus}>
                            <div className={styles.profilePic}>
                                <FloatingMenu
                                    options={[
                                        { type: 'file', text: "Atualizar foto", callback: handleUploadAvatar },
                                        // { text: "Deletar foto", callback: handleDeleteAvatar },
                                    ]}>
                                    <button className={styles.btnUpload}>
                                        {avatarUrl?
                                        <Image src={avatarUrl} priority width={120} height={120} alt="profile"/>
                                        : <Image src={IconNoUser} priority width={120} height={120} alt="profile"/>}
                                    </button>
                                </FloatingMenu>
                            </div>
                            <div className={styles.statusInfo}>
                                <h1>{loggedUser}</h1>
                                <span className={styles.containerCurso}>Nenhum curso selecionado</span>
                                <div className={styles.containerGamification}>
                                    <div className={styles.containerIconStatus}>
                                        <Image src={IconBook} priority width={20} height={20} alt="icon"/>
                                        <h3>0</h3>
                                    </div>
                                    <div className={styles.containerIconStatus}>
                                        <Image src={IconClock} priority width={20} height={20} alt="icon"/>
                                        <h3>00:00</h3>
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