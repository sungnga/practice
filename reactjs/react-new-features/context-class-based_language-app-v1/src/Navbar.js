import React, { Component } from 'react';
import {
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	InputBase,
	Switch
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/NavbarStyles';
import { ThemeContext } from './contexts/ThemeContext';
import { withLanguageContext } from './contexts/LanguageContext';

const content = {
	english: {
		search: 'Search',
		flag: '🇬🇧'
	},
	french: {
		search: 'Chercher',
		flag: '🇫🇷'
	},
	spanish: {
		search: 'Buscar',
		flag: '🇪🇸'
	}
};

class Navbar extends Component {
	static contextType = ThemeContext;
	render() {
		// console.log(this.context)
		const { isDarkMode, toggleTheme } = this.context;
		const { classes } = this.props;
		// languageContext is a prop that gets passed from the withLanguageContext higher oder component
		// Destructure language state, which is stored in the LanguageProvider component
		const { language } = this.props.languageContext;
		// Destructuring the search and flag properties of content object
		// The value for search and flag depends on the language
		const { search, flag } = content[language];
		return (
			<div className={classes.root}>
				<AppBar position='static' color={isDarkMode ? 'default' : 'primary'}>
					<Toolbar>
						<IconButton className={classes.menuButton} color='inherit'>
							<span>{flag}</span>
						</IconButton>
						<Typography className={classes.title} variant='h6' color='inherit'>
							App Title
						</Typography>
						<Switch onChange={toggleTheme} />
						<div className={classes.grow} />
						<div className={classes.search}>
							<div className={classes.searchIcon}>
								<SearchIcon />
							</div>
							<InputBase
								placeholder={`${search}...`}
								classes={{
									root: classes.inputRoot,
									input: classes.inputInput
								}}
							/>
						</div>
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}

// withLanguageContext is a higher order component
// Navbar component now has access to the context/state of LanguageContext
export default withLanguageContext(withStyles(styles)(Navbar));
