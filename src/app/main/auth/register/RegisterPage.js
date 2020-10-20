import FuseAnimate from '@fuse/core/FuseAnimate';
import { useForm } from '@fuse/hooks';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Container from '@material-ui/core/Container';
import FormHelperText from '@material-ui/core/FormHelperText';
import PublishIcon from '@material-ui/icons/Publish';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
	root: {
		background: `radial-gradient(${darken(theme.palette.primary.dark, 0.5)} 0%, ${theme.palette.primary.dark} 80%)`,
		color: theme.palette.primary.contrastText
	}
}));

const mystyle = {
	marginLeft: "15%",
	textDecoration: 'none'

}
function RegisterPage() {
	const classes = useStyles();

	const { form, resetForm } = useForm({
		name: '',
		number: '',
		gender: ''
	});

	// function isFormValid() {
	// 	return (
	// 		form.email.length > 0 &&
	// 		form.password.length > 0 &&
	// 		form.password.length > 3 &&
	// 		form.password === form.passwordConfirm &&
	// 		form.acceptTermsConditions
	// 	);
	// }

	function handleSubmit(ev) {
		ev.preventDefault();
		resetForm();
	}
	// export default function ControlledOpenSelect() {
	// const classes = useStyles();
	const [gender, setAge] = React.useState('');
	const [open, setOpen] = React.useState(false);

	const handleChange = (event) => {
		setAge(event.target.value);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleOpen = () => {
		setOpen(true);
	};
	const myInput = useRef();
	const handleUploadClick = (e) => {
		myInput.current.click();
	}

	return (
		<div className={clsx(classes.root, 'flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32')}>
			<div className="flex flex-col items-center justify-center w-full">
				<FuseAnimate animation="transition.expandIn">
					<Card className="w-full max-w-384">
						<CardContent className="flex flex-col items-center justify-center p-32">
							{/* <img clas	sName="w-128 m-32" src="assets/images/logos/fuse.svg" alt="logo" /> */}

							<Typography variant="h6" className="mt-16 mb-32">
								CREATE AN ACCOUNT
							</Typography>

							<form
								name="registerForm"
								noValidate
								className="flex flex-col justify-center w-full"
								onSubmit={handleSubmit}
							>
								<TextField
									className="mb-16"
									label="Full Name"
									autoFocus
									type="name"
									name="name"
									value={form.name}
									onChange={handleChange}
									variant="outlined"
									required
									fullWidth
								/>

								<TextField
									className="mb-16"
									label="Mobile Number"
									type="numeric"
									name="number"
									value={form.email}
									onChange={handleChange}
									variant="outlined"
									required
									fullWidth
								/>
								<FormControl variant="outlined" className={classes.formControl}>
									<InputLabel id="demo-simple-select-outlined-label">Gender</InputLabel>
									<Select
										labelId="demo-simple-select-outlined-label"
										id="demo-simple-select-outlined"
										className="mb-16"
										value={gender}
										onChange={handleChange}
										label="Gender"
									>
										<MenuItem value="">
											<em>None</em>
										</MenuItem>
										<MenuItem value={'male'}>Male</MenuItem>
										<MenuItem value={"female"}>Female</MenuItem>
										<MenuItem value={"other"}>Others</MenuItem>
									</Select>
								</FormControl>
								{/* <InputLabel id="demo-controlled-open-select-label">Age</InputLabel>
								<Select
									labelId="demo-controlled-open-select-label"
									id="demo-controlled-open-select"
									className="mb-16"
									variant="outlined"
									open={open}
									onClose={handleClose}
									onOpen={handleOpen}
									value={age}
									onChange={handleChange}
								>
									<FormHelperText>Placeholder</FormHelperText>
									<MenuItem value="">
										<em  >None</em>
									</MenuItem>
									<MenuItem value={10}>Ten</MenuItem>
									<MenuItem value={20}>Twenty</MenuItem>
									<MenuItem value={30}>Thirty</MenuItem>
								</Select> */}

								<InputLabel id="demo-controlled-open-select-label">Upload driving license</InputLabel>
								<Container maxWidth="xs" style={{ backgroundColor: 'darkgray', height: '20vh', marginTop: '01vh', borderRadius: "4px	" }}>

									<Typography variant="outlined" component="div" style={{ marginTop: "15%", marginLeft: '43%' }}>
										<img src="" alt="image"></img>

										<input
											hidden
											accept="image/*"
											className={classes.input}
											id="contained-button-file"
											multiple
											type="file"
										/>
										<label htmlFor="contained-button-file">
											<IconButton color="primary" aria-label="upload picture" component="span">
												<PublishIcon />
											</IconButton>
										</label>

									</Typography>
								</Container>
								<Link to="/login" style={mystyle}>
									<Button
										variant="contained"
										color="primary"
										className="w-224 mx-auto mt-16"
										aria-label="Register"
										// disabled={!isFormValid()}
										type="submit"
									>

										CREATE AN ACCOUNT
								</Button>
								</Link>
							</form>

							<div className="flex flex-col items-center justify-center pt-32 pb-24">
								<span className="font-medium">Already have an account?</span>
								<Link className="font-medium" to="/pages/auth/login">
									Login
								</Link>
							</div>
						</CardContent>
					</Card>
				</FuseAnimate>
			</div>
		</div>
	);
}

export default RegisterPage;
