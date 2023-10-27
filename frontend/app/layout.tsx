import '@/style/font/icofont.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'swiper/css/bundle'
import 'aos/dist/aos.css';
import '@/style/main.css'
import '@/style/responsive.css'
import 'react-toastify/dist/ReactToastify.css';
import 'overlayscrollbars/overlayscrollbars.css';
import { CafeuProvider } from '@/context/CafeuContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <CafeuProvider>
        <body>
          {children}
        </body>
      </CafeuProvider>
    </html>
  )
}
