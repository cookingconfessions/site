import { AppProvider } from '@/context/AppContext';
import '@/style/font/icofont.min.css';
import '@/style/main.css';
import '@/style/responsive.css';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'overlayscrollbars/overlayscrollbars.css';
import 'react-phone-number-input/style.css';
import 'react-toastify/dist/ReactToastify.css';
import 'swiper/css/bundle';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<AppProvider>
				<body suppressHydrationWarning={true}>{children}</body>
			</AppProvider>
		</html>
	);
}
