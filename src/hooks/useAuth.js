import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../supabase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);

    
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
    const checkAuth = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.log(error);
      }

      if (!session) {
        router.push('/');
      } else {
        console.log(session);
        const { user } = session;
        setUser(user);
      }
    };

    checkAuth();

    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        setUser(session.user);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, handleSignOut, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
