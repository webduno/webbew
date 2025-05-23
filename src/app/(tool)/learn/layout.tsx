import { Analytics } from '@vercel/analytics/next';

import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'
import '@/app/globals.css'
import '@/app/bew.css'
// import { ClientLayout } from '@/dom/organ/ClientLayout'
import { FetchedStatsProvider } from '@/script/state/context/FetchedStatsContext';
import { ProfileSnackbarProvider } from '@/../script/state/context/ProfileSnackbarProvider';
import { BackgroundMusicProvider } from '@/../script/state/context/BackgroundMusicContext';
// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Vew.quest',
  description: 'Web Brain Extrasensorial Witness Program',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" style={{ margin: 0, padding: 0 }}>
      <body
       style={{ margin: 0, padding: 0,
        // background: "white",
      //  background: 'radial-gradient(circle, rgb(255, 238, 255), rgb(255, 255, 255), rgb(255, 221, 255))',

      //  background: 'radial-gradient(circle, #3E3B34, #1E1B14)',
      // gradient like sunset
      // background: 'linear-gradient(-45deg, #ffba6e , #aad0f4 , #6aa0f4 )',
        // height: '100vh',
        // overflow: 'hidden' 
        }}>
        {/* <ClientLayout> */}
        <ProfileSnackbarProvider>
          <BackgroundMusicProvider>
            <FetchedStatsProvider>
              {children}
            </FetchedStatsProvider>
          </BackgroundMusicProvider>
        </ProfileSnackbarProvider>
        {/* </ClientLayout> */}
        <Analytics mode="production" />
      </body>
    </html>
  )
}
