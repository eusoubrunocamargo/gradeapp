import { supabase } from "../../supabase";
import { useAuth } from "./useAuth";
import { useAlert } from "./useAlert";
import { useCallback, useEffect, useState } from "react";


export const useUserFlashcards = () => {

    const { user } = useAuth();
    const { showAlert } = useAlert();
    const [loading, setLoading] = useState(true);
    const [userFlashcards, setUserFlashcards] = useState([]);

    

    const [flashcards, setFlashcards] = useState({
        user_class_id: null,
        title: null,
        front_text: null,
        back_text: '',
        back_image: null,
    });

    const updateFlashcards = (field, content) => {
        setFlashcards({
            ...flashcards,
            [field]: content,
        });
    };

    const getUserClassId = async (degreeClassId) => {
        const { data, error } = await supabase
            .from('user_classes')
            .select('id')
            .eq('user_id', user.id)
            .eq('degree_class_id', degreeClassId)
            .single();

        if (error) {
            console.log(error);
            return;
        }

        return data.id;
    };

    const submitFlashcards = async () => {
        setLoading(true);
        console.log(flashcards);
        const file = flashcards.back_image;
        console.log(file);
        if(!flashcards.title || !flashcards.front_text || !flashcards.user_class_id || (!flashcards.back_text && !flashcards.back_image)) {
            showAlert('Preencha todos os campos', 'fail');
            setLoading(false);
            return;
        }

        try {

            const user_class_id = await getUserClassId(flashcards.user_class_id);
            let imageUrl = null;

            if(flashcards.back_image) {
                const file = flashcards.back_image;
                const fileName = `${user.id}-${Date.now()}-${file.name}`;

                const { data, error } = await supabase.storage
                    .from('flashcards')
                    .upload(fileName, file);

                if (error) {
                    showAlert('Erro ao enviar imagem', 'fail');
                    setLoading(false);
                    return;
                }

                const { data: publicURL, error: urlError } = await supabase.storage
                    .from('flashcards')
                    .getPublicUrl(fileName);

                if (urlError) {
                    showAlert('Erro ao enviar imagem', 'fail');
                    setLoading(false);
                    return;
                }

                // console.log(publicURL.publicUrl);

                imageUrl = publicURL.publicUrl;

            }

            const flashcardData = {
                user_class_id,
                title: flashcards.title,
                front_text: flashcards.front_text,
                back_text: flashcards.back_text,
                back_image: imageUrl,
            };

            const { error } = await supabase
                .from('user_flashcards')
                .insert(flashcardData);

            if (error) {
                showAlert('Erro ao enviar flashcard', 'fail');
                setLoading(false);
                return;
            }

            showAlert('Flashcard enviado com sucesso', 'success');
            setLoading(false);
            setFlashcards({
                user_class_id: null,
                title: null,
                front_text: null,
                back_text: '',
                back_image: null,
            });

        } catch (error) {
            console.error(error);
            showAlert('Erro ao enviar flashcard', 'fail');
            setLoading(false);
        }

    };

    const fetchUserFlashcards = useCallback(async (userId) => {
        const { data, error } = await supabase
            .from('user_flashcards_all')
            .select('*')
            .eq('user_id', userId);
            // .from('user_flashcards')
            // .select(`*, user_classes(user_id, degree_class_id)`)
            // .eq('user_classes.user_id', userId);

        if (error) {
            console.log(error);
            showAlert('Erro ao buscar flashcards', 'fail');
            return;
        }

        setUserFlashcards(data);
        console.log(data);
        setLoading(false);
    },[showAlert]);

    useEffect(() => {
        if (user) {
            fetchUserFlashcards(user.id);
        }
    }, [user, fetchUserFlashcards]);


    return {
        flashcards,
        updateFlashcards,
        submitFlashcards,
        loading,
        userFlashcards,
        loading,
        }
    }