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
import {ThemeContext} from './contexts/ThemeContext'

class Navbar extends Component {
	static contextType = ThemeContext;
	render() {
		// console.log(this.context)
		const {isDarkMode} = this.context
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<AppBar position='static' color={isDarkMode ? 'default' : 'primary'}>
					<Toolbar>
						<IconButton className={classes.menuButton} color='inherit'>
							<span>🇫🇷</span>
						</IconButton>
						<Typography className={classes.title} variant='h6' color='inherit'>
							App Title
						</Typography>
						<Switch />
						<div className={classes.grow} />
						<div className={classes.search}>
							<div className={classes.searchIcon}>
								<SearchIcon />
							</div>
							<InputBase
								placeholder='Search...'
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

export default withStyles(styles)(Navbar);
