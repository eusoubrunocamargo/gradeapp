import '@/styles/globals.css';
import { Work_Sans } from 'next/font/google';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import { UserDataProvider } from '@/hooks/useUserData';
import { UserTasksProvider } from '@/hooks/useUserTasks';
import { AlertProvider } from '@/hooks/useAlert';
import Head from 'next/head';

const workSans = Work_Sans({subsets: ['latin']})

function App({ Component, pageProps }) {

  const [supabaseClient] = useState(()=>createBrowserSupabaseClient());

  return (
    <SessionContextProvider supabaseClient={supabaseClient} initialSession={pageProps.initialSession}>
      <AlertProvider>
        <UserDataProvider>
          <UserTasksProvider>
            <Head>
              <title>Grade+</title>
              <meta name="description" content="Organizando a sua vida universitária" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={workSans.className}>
              <Component {...pageProps}/>
            </main>
          </UserTasksProvider>
        </UserDataProvider>
      </AlertProvider>
    </SessionContextProvider>
  )
}

export default App;
