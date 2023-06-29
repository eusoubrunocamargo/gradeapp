import '@/styles/globals.css';
import { Work_Sans } from 'next/font/google';
import { UserDataProvider } from '@/hooks/useUserData';
import { UserTasksProvider } from '@/hooks/useUserTasks';
import { UserOccurrencesProvider } from '@/hooks/useUserOccurrences';
import { AuthProvider } from '@/hooks/useAuth';
import { AlertProvider } from '@/hooks/useAlert';
import Head from 'next/head';

const workSans = Work_Sans({subsets: ['latin']})

function App({ Component, pageProps }) {


  return (
    <AlertProvider>
      <AuthProvider>
        {/* <UserDataProvider> */}
          <UserOccurrencesProvider>
            <UserTasksProvider>
              <Head>
                <title>Grade+</title>
                <meta name="description" content="Organizando a sua vida universitária" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="logowhite.png" />
              </Head>
              <main className={workSans.className}>
                <Component {...pageProps}/>
              </main>
            </UserTasksProvider>
          </UserOccurrencesProvider>
        {/* </UserDataProvider> */}
      </AuthProvider>
    </AlertProvider>
  )
}

export default App;
