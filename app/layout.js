import './globals.css';
import '@/public/styles/jquery-jvectormap-2.0.5.css';
import '@/public/styles/apexcharts.css';
import Footer from '@/components/footer';
import { CoursesProvider } from '@/components/courses';
import { FiltersProvider } from '@/components/filters';
export const metadata = {
  title: 'Global Migration Health Training and Course Repository',
  description: 'This site is a repository of migration health related training and courses available globally, obtained from the MHADRI database',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <CoursesProvider>
          <FiltersProvider>
            {children}
          </FiltersProvider>
        </CoursesProvider>
        <Footer/>
      </body>
    </html>
  )
}
