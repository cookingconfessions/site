import NavLink from './NavLink';

const NavigationSection = () => {
	return (
		<nav className='cf-header-menu' id='header-menu'>
			<ul>
				<li>
					<NavLink href='/'>Home</NavLink>
				</li>
				<li>
					<NavLink href='/menu'>Menu</NavLink>
				</li>
				<li>
					<NavLink href='/about'>About Us</NavLink>
				</li>
				<li>
					<NavLink href='/help'>Help</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default NavigationSection;
