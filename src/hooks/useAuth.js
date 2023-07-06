import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../supabase';
import { UserDataProvider } from './useUserData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  // console.log('LoadingAuth: ', loadingAuth);

    
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
    } else {
      router.push('/');
    }
  };

  const handleLogin = async (email, password) => {
    try{
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if(error){
            console.error(error.message);
            throw error; 
        } else {
            router.push('/dashboard');
        }
    } catch (error){
        throw error;
    }
};

  
  useEffect(() => {
    // console.log('useEffect useAuth');
    const checkAuth = async () => {
      setLoadingAuth(true);
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.log(error);
      }

      if (!session) {
        router.push('/');
      } else {
        // console.log(session);
        const { user } = session;
        setUser(user);
      }
      setLoadingAuth(false);
      // console.log('LoadingAuth: ', loadingAuth);
    };

    checkAuth();

    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        setUser(session.user);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });
  }, [loadingAuth]);

  return (
    <AuthContext.Provider value={{ 
      user, 
      handleSignOut, 
      handleLogin,
      loadingAuth,
      }}>
        {!loadingAuth && <UserDataProvider>{ children }</UserDataProvider>}
      {/* {children} */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
