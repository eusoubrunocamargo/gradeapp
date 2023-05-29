import '@/styles/globals.css';
// import { Oswald } from 'next/font/google';
import { Work_Sans } from 'next/font/google';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import { DegreeProvider } from '@/hooks/useDegree';
import Head from 'next/head';

// const oswald = Oswald({subsets: ['latin']})
const workSans = Work_Sans({subsets: ['latin']})

function App({ Component, pageProps }) {

  const [supabaseClient] = useState(()=>createBrowserSupabaseClient());

  return (
    <SessionContextProvider supabaseClient={supabaseClient} initialSession={pageProps.initialSession}>
      <DegreeProvider>
        <Head>
          <title>Grade+</title>
          <meta name="description" content="Organizando a sua vida universitária" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={workSans.className}>
          <Component {...pageProps}/>
        </main>
      </DegreeProvider>
    </SessionContextProvider>
  )
}

export default App;
