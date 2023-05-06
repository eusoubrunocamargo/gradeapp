import '@/styles/globals.css'
import { League_Gothic, Oswald } from 'next/font/google'

const league_gothic = League_Gothic({subsets: ['latin']})
const oswald = Oswald({subsets: ['latin']})

export default function App({ Component, pageProps }) {
  return (
  <main className={`${league_gothic.className} ${oswald.className}`}>
    <Component {...pageProps} />
  </main>
  )
}
