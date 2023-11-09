import './globals.css';
import '../public/styles/jquery-jvectormap-2.0.5.css';
import '../public/styles/apexcharts.css';
import Footer from '@/components/footer';
import Head from 'next/head';
import { CoursesProvider } from '@/components/courses';
export const metadata = {
  title: 'Global Migration Health Training and Course Repository',
  description: 'This site is a repository of migration health related training and courses available globally, obtained from the MHADRI database',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <body >
        <CoursesProvider>
          {children}
        </CoursesProvider>
        <Footer />
      </body>
    </html>
  )
}
