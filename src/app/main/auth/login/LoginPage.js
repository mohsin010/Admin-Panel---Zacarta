import FuseAnimate from '@fuse/core/FuseAnimate';
import { useForm } from '@fuse/hooks';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link, Redirect, useHistory } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import Cookies from 'js-cookie';

import style1 from './mystyle.module.css';
import { set } from 'date-fns';


const useStyles = makeStyles(theme => ({
	root: {
		background: `radial-gradient(${darken(theme.palette.primary.dark, 0.5)} 0%, ${theme.palette.primary.dark} 80%)`,
		color: theme.palette.primary.contrastText,
		width: '100%',
		'& > * + *': {
			marginTop: theme.spacing(2),
		},
	}
}));
const mystyle = {
	marginLeft: "15%",
	textDecoration: 'none'
}
const hide = {
	display: 'hidden'
}


function LoginPage() {
	const classes = useStyles();
	const [errMessage, setErrMessage] = useState(false);
	const { form, handleChange, resetForm } = useForm({
		email: '',
		password: ''


	});
	let history = useHistory();
	useEffect(() => {
		let token = Cookies.get('a#$s!');

		if (token) {
			history.push('/seller');
		}


	});
	function handleSubmit(ev) {
		ev.preventDefault();
		// console.log(form)
		let email = form.email;
		let password = form.password;
		Axios.post('https://api.zacarta.com/api/admin/auth/login', { email, password }).then(res => {
			// console.log(res)
			// return <Redirect to='/seller' />
			if (res.status == 200) {
				debugger
				if (res.data.data.token) {

					let token = res.data.data.token
					Cookies.set('a#$s!', token);
					Cookies.set('seller_id', res.data.data.user._id)
					history.push('/seller')
					console.log(res)
				}

			} else {
				setErrMessage(!errMessage)
				// history.push('/login')
			}
		}).catch(err => {
			setErrMessage(!errMessage)
		})
	}

	return (
		<div className={clsx(classes.root, 'flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32')}>
			<div className="flex flex-col items-center justify-center w-full">
				<FuseAnimate animation="transition.expandIn">
					<Card className="w-full max-w-384" >
						<CardContent className="flex flex-col items-center justify-center p-32">

							<Typography variant="h6" className="mt-16 mb-16">
								LOGIN TO YOUR ACCOUNT
							</Typography>
							<Alert className={!errMessage ? style1.hide : style1.view} severity="error">Email or Password is invalid..!</Alert>
							<form
								name="loginForm"
								noValidate
								className="flex flex-col justify-center w-full"
								onSubmit={handleSubmit}
							>
								<TextField
									className="mb-16"
									label="Email"
									autoFocus
									type="text"
									name="email"
									value={form.email}
									onChange={handleChange}
									variant="outlined"
									required
									fullWidth
								/>
								<TextField
									className="mb-16"
									label="Password"
									autoFocus
									type="password"
									name="password"
									value={form.password}
									onChange={handleChange}
									variant="outlined"
									required
									fullWidth
								/>
								{/* <Link to="/seller" style={mystyle}> */}
								<Button
									variant="contained"
									color="primary"
									className="w-224 mx-auto mt-16"
									aria-label="LOG IN"
									type="link"

								>
									LOGIN
								</Button>
								{/* </Link> */}
							</form>

						</CardContent>
					</Card>
				</FuseAnimate>
			</div>
		</div >
	);
}

export default LoginPage;
