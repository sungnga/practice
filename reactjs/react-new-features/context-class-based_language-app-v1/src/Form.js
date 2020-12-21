import React, { Component } from 'react';
import {
	Avatar,
	Button,
	CssBaseline,
	FormControl,
	FormControlLabel,
	Checkbox,
	Input,
	InputLabel,
	Paper,
	Typography,
	MenuItem,
	Select
} from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles/FormStyles';

class Form extends Component {
	render() {
		const { classes } = this.props;
		return (
			<main className={classes.main}>
				<Paper className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlined />
					</Avatar>
					<Typography variant='h5'>Sign In</Typography>
					<Select value='english'>
						<MenuItem value='english'>English</MenuItem>
						<MenuItem value='french'>French</MenuItem>
						<MenuItem value='spanish'>Spanish</MenuItem>
					</Select>
					<form className={classes.form}>
						<FormControl margin='normal' required fullWidth>
							<InputLabel htmlFor='email'>Email</InputLabel>
							<Input id='email' name='email' autoFocus />
						</FormControl>
						<FormControl margin='normal' required fullWidth>
							<InputLabel htmlFor='password'>Password</InputLabel>
							<Input id='password' name='password' autoFocus />
						</FormControl>
						<FormControlLabel
							control={<Checkbox color='primary' />}
							label='Remember Me'
						/>
						<Button
							className={classes.submit}
							variant='contained'
							type='submit'
							color='primary'
							fullWidth
						>
							Sign In
						</Button>
					</form>
				</Paper>
			</main>
		);
	}
}

export default withStyles(styles)(Form);
