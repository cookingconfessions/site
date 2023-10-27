import NavLink from './NavLink';

const NavigationSection = () => {
	return (
		<nav className='cf-header-menu' id='header-menu'>
			<ul>
				<li>
					<NavLink href='/'>Home</NavLink>
				</li>
				<li>
					<NavLink href='/shop'>Menu</NavLink>
				</li>
				<li>
					<NavLink href='/about'>About Us</NavLink>
				</li>
				<li>
					<NavLink href='/faq'>Help</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default NavigationSection;
