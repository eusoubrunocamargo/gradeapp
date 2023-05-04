import '@/styles/globals.css'
import { League_Gothic } from 'next/font/google'

const league_gothic = League_Gothic({subsets: ['latin']})

export default function App({ Component, pageProps }) {
  return (
  <main className={league_gothic.className}>
    <Component {...pageProps} />
  </main>
  )
}
