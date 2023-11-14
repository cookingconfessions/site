'use client';
import NavLink from './NavLink';

const MobileNavigationSection = () => {
	return (
		<div className='mobile-menu-container'>
			<a
				href='#nav'
				className='mobile-menu-reveal'
				style={{ right: 0, left: 'auto', display: 'inline' }}>
				<span>
					<span>
						<span></span>
					</span>
				</span>
			</a>
			<nav className='mobile-menu-nav'>
				<div className='mobile-menu-bar'>
					<a
						href='#nav'
						className='mobile-menu-reveal'
						style={{ right: 0, left: 'auto', display: 'inline' }}>
						<span>
							<span>
								<span></span>
							</span>
						</span>
					</a>
					<nav className='mobile-menu-nav'></nav>
				</div>
				<ul>
					<li className='has-submenu'>
						<NavLink href='/about'>Home</NavLink>
					</li>
					<li className='menu-lasts'>
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
		</div>
	);
};

export default MobileNavigationSection;
