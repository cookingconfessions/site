import { useAppContext } from '@/context/AppContext';

const ShopSearchBarSection = () => {
	const { searchQuery, setSearchQuery } = useAppContext();
	return (
		<form
			className='hero-form mb-50'
			action='#'
			data-aos='fade-up'
			data-aos-duration='1000'
			onSubmit={(e) => {
				e.preventDefault();
			}}>
			<div className='input-group'>
				<input
					type='text'
					className='form-control subscribtion-input'
					placeholder='Search'
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
				<button type='submit' className='custom-btn'>
					<span className='icofont-search-1'></span>
				</button>
			</div>
		</form>
	);
};

export default ShopSearchBarSection;
