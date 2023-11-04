'use client';
import { useAppContext } from '@/context/AppContext';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

interface NavLinkProps {
	href: string;
	children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
	const { closeSidebar } = useAppContext();
	const router = useRouter();
	const pathname = usePathname();
	const isActive = pathname === href;
	const handleClick = () => {
		router.push(href); // Navigate to the specified href
		closeSidebar(); // Close the sidebar
	};

	return (
		<Link onClick={handleClick} href={href} className={isActive ? 'active' : ''}>
			{children}
		</Link>
	);
};

export default NavLink;
