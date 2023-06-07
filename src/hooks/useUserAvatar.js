import { useState } from "react";
import { supabase } from "../../supabase";
import { v4 as uuidv4 } from 'uuid';
import { useUserData } from "./useUserData";
import { useAlert } from "./useAlert";
import { useAuth } from "./useAuth";

export const useUserAvatar = () => {

    const { user } = useAuth();
    const { fetchUserData } = useUserData();
    const { showAlert } = useAlert();

    const [newAvatar, setNewAvatar] = useState(null);
    const [openEditor, setOpenEditor] = useState(false);
    const [cropped, setCropped] = useState(null);

    const handleUploadAvatar = async (event) => {
        if(event.target.files[0]){
            setNewAvatar(URL.createObjectURL(event.target.files[0]));
            setOpenEditor(true);
        };
    };

    const createFileFromCroppedImage = async (cropped) => {
        const uniqueId = uuidv4();
        return await fetch(cropped.getCroppedCanvas({
            maxWidth: 1024,
            maxHeight: 1024,
            imageSmoothingQuality: 'high',
        }).toDataURL())
        .then((res) => res.blob())
        .then((blob) => {
            return new File([blob], `${user.id}-newAvatar-${uniqueId}.png`, { type: 'image/png'});
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
            showAlert('Erro ao atualizar foto!', 'fail');
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
                showAlert('Erro ao atualizar foto!', 'fail');
                return null;
            }

            return data.publicUrl
    }

    const updateProfileAvatarUrl = async (publicUrl) => {
    const { error } = await supabase
        .from('profiles')
        .update({avatar_url: publicUrl})
        .eq('id', user.id);

        if(error){
            showAlert('Erro ao atualizar foto!', 'fail');
            return false;
        }
        return true;
    }

    const handleSaveCroppedAvatar = async () => {
        if(cropped){
            const file = await createFileFromCroppedImage(cropped);
            if(file){
                const key = await uploadImageToStorage(file);
                if(key){
                    const publicUrl = await getPublicUrlOfImage(key);
                    if(publicUrl){
                        const updateSuccess = await updateProfileAvatarUrl(publicUrl);
                        if(updateSuccess){
                            fetchUserData();
                            showAlert('Foto atualizada!', 'success');
                            setOpenEditor(false);
                        }
                    }
                }
            }
        }
    }

    return {
        newAvatar,
        openEditor,
        cropped,
        handleUploadAvatar,
        handleSaveCroppedAvatar,
        setNewAvatar,
        setOpenEditor,
        setCropped,
    };
};
