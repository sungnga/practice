import React, { useContext } from 'react';
import {
	Avatar,
	Button,
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
import { LanguageContext } from './contexts/LanguageContext';

const words = {
	english: {
		signIn: 'Sign In',
		email: 'Email Address',
		password: 'Password',
		rememberMe: 'Remember Me'
	},
	french: {
		signIn: 'Se Connecter',
		email: 'Adresse Électronique',
		password: 'Mot de Passe',
		rememberMe: 'Souviens-toi De Moi'
	},
	spanish: {
		signIn: 'Registrarse',
		email: 'Correo Electrónico',
		password: 'Contraseña',
		rememberMe: 'Recuérdame'
	}
};

function Form(props) {
	const { language, changeLanguage } = useContext(LanguageContext);
	const { classes } = props;
	const { email, signIn, password, rememberMe } = words[language];
	return (
		<main className={classes.main}>
			<Paper className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlined />
				</Avatar>
				<Typography variant='h5'>{signIn}</Typography>
				<Select value={language} onChange={changeLanguage}>
					<MenuItem value='english'>English</MenuItem>
					<MenuItem value='french'>French</MenuItem>
					<MenuItem value='spanish'>Spanish</MenuItem>
				</Select>
				<form className={classes.form}>
					<FormControl margin='normal' required fullWidth>
						<InputLabel htmlFor='email'>{email}</InputLabel>
						<Input id='email' name='email' autoFocus />
					</FormControl>
					<FormControl margin='normal' required fullWidth>
						<InputLabel htmlFor='password'>{password}</InputLabel>
						<Input id='password' name='password' autoFocus />
					</FormControl>
					<FormControlLabel
						control={<Checkbox color='primary' />}
						label={rememberMe}
					/>
					<Button
						className={classes.submit}
						variant='contained'
						type='submit'
						color='primary'
						fullWidth
					>
						{signIn}
					</Button>
				</form>
			</Paper>
		</main>
	);
}

export default withStyles(styles)(Form);
