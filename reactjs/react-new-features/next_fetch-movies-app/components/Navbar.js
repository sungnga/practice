import Link from 'next/link';

const Navbar = () => {
	const style = {
		display: 'flex',
		background: 'grey',
    justifyContent: 'space-between',
    padding: '1rem'
	};

	return (
		<div style={style}>
			<Link href='/'>
				<a>Home Page</a>
			</Link>
			<Link href='/about'>
				<a>About Page</a>
			</Link>
			<Link href='/contact'>
				<a>Contact Page</a>
			</Link>
		</div>
	);
};

export default Navbar;
