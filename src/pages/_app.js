import '@/styles/globals.css';
import { Oswald } from 'next/font/google';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { useState } from 'react';

const oswald = Oswald({subsets: ['latin']})

function App({ Component, pageProps }) {

  const [supabaseClient] = useState(()=>createBrowserSupabaseClient());

  return (
    <SessionContextProvider 
    supabaseClient={supabaseClient} 
    initialSession={pageProps.initialSession}>
  <main className={oswald.className}>
    <Component {...pageProps}/>
  </main>
  </SessionContextProvider>
  )
}

export default App;
