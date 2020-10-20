import FuseAnimate from '@fuse/core/FuseAnimate';
import { useForm } from '@fuse/hooks';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { darken } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import StorefrontIcon from '@material-ui/icons/Storefront';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import Modal from '@material-ui/core/Modal';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';


import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import MenuItem from '@material-ui/core/MenuItem';
// import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import AddIcCallIcon from '@material-ui/icons/AddIcCall';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import PageviewIcon from '@material-ui/icons/Pageview';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import PublishIcon from '@material-ui/icons/Publish';

import EditIcon from '@material-ui/icons/Edit';


import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Button from '@material-ui/core/Button';
import { blue, green, red } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import { makeStyles, ThemeProvider, useTheme } from '@material-ui/core/styles';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import axios from 'axios';
import { connect } from 'react-redux';

import Cookies from 'js-cookie';

// import { Form } from 'semantic-ui-react'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

import styles1 from './myStyle.module.css';

import picture from '../../fall-glow-small.jpg'



const styles = theme => ({
    root: {
        background: `radial-gradient(${darken(theme.palette.primary.dark, 0.5)} 0%, ${theme.palette.primary.dark} 80%)`,
        color: theme.palette.primary.contrastText
    },

    highlight: {
        backgroundColor: 'red',
    }
});


const overMap = {
    position: "relative",
    // top: "90%",
    // left: "1%",
    border: "0.1px solid black",
    borderRadius: "5px",
    width: "97%",
    height: "110px",
    backgroundColor: "rgb(216, 214, 214)"

}
const cropperstyle = {
    height: '100% !important'
}


// const classes = useStyles();
// function HomePage() {
class CategoryDetailsPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedStore: '',
            setRowsPerPage: 10,
            setPage: 0,
            page: 0,
            rowsPerPage: 10,
            // checkedA: true,
            sr: true,
            suggestions: [],
            text: '',
            open: false,
            setOpen: false,
            setAddProductOpen: false,
            setFilterOpen: false,
            weight: "1kg",
            quantities: 1,
            hidden: true,
            dialoghidden: true,
            image: '',
            uploadedImage: '',
            src: null,
            crop: {
                unit: "%",
                width: 30,
                aspect: 1 / 1
            },
            croppedImageUrl: null,
            croppedImage: null,
            category_id: '',
            title: '',
            errOpen: false,
            respOpen: false,
            weImage: '',
            imageUse: true,
            view: false,

            products: [],
            us: false,
            india: false,
            us_id: "5f2a9e2e9fddd46945988828",
            india_id: "5f2a9e1e9fddd46945988827"
        }
    }

    handleEdit = () => {
        this.setState({
            view: true
        })
        document.getElementById('outlined-name').removeAttribute('disabled')
        document.getElementById('contained-button-file').removeAttribute('disabled')

    }
    //cropping functions
    handleFile = e => {
        const fileReader = new FileReader()
        fileReader.onloadend = () => {
            this.setState({ src: fileReader.result })
        }
        fileReader.readAsDataURL(e.target.files[0])
    }

    handleSubmit = e => {
        e.preventDefault()

        let token = Cookies.get('a#$s!');

        const data = new FormData()

        let countries = []
        if (this.state.us == true) {
            countries.push(this.state.us_id)
        }

        if (this.state.us == true) {
            countries.push(this.state.india_id)
        }

        // data.append('countries', countries.toString())
        data.append('icon', this.state.croppedImage)
        data.append('title', this.state.title)
        data.append('category', this.state.category_id)
        const headers = {
            'Content-Type': 'multipart/form-data ',
            'Authorization': `bearer ${token}`
        }

        axios.put('https://api.zacarta.com/api/admin/category', data, {
            headers: headers
        }).then(res => {
            if (res.status == 200) {
                this.setState({
                    respOpen: true,
                    view: false
                })
                document.getElementById('outlined-name').setAttribute('disabled', 'disabled')
                document.getElementById('contained-button-file').setAttribute('disabled', 'disabled')

            }
        }).catch(e => {
            this.setState({
                errOpen: true
            })
        })
    }

    onImageLoaded = image => {
        this.imageRef = image
    }

    onCropChange = (crop) => {
        this.setState({ crop });
    }

    onCropComplete = crop => {
        if (this.imageRef && crop.width && crop.height) {
            const croppedImageUrl = this.getCroppedImg(this.imageRef, crop)
            this.setState({ croppedImageUrl })
        }
    }

    getCroppedImg(image, crop) {
        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext("2d");

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        )

        const reader = new FileReader()
        canvas.toBlob(blob => {
            reader.readAsDataURL(blob)
            reader.onloadend = () => {
                this.dataURLtoFile(reader.result, 'cropped.jpg')
            }
        })
    }

    dataURLtoFile(dataurl, filename) {
        let arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        let croppedImage = new File([u8arr], filename, { type: mime });
        this.setState({ croppedImage: croppedImage, image: dataurl, imageUse: false })
        console.log(croppedImage)
    }

    //Cropping functions ends

    onTextChange = (e) => {
        let value = e.target.textContent;
        debugger;
        let suggestions = [];
        const regex = new RegExp(`^${value}`, 'i');
        if (value.length > 0) {
            for (const item of this.state.products) {

                if (item.name.includes(value)) {
                    suggestions.push(item)
                    // this.selectedText(item.name)
                }
            }
        }
        this.setState(() => ({
            suggestions,
            text: value
        }))
    }

    handleImageChange = e => {
        const fileReader = new FileReader()
        fileReader.onloadend = () => {
            this.setState({ src: fileReader.result })
        }
        fileReader.readAsDataURL(e.target.files[0])
        // let val = e.target.files[0]
        // if (e.target.files[0]) {
        //     let update = URL.createObjectURL(val)
        //     let img = document.getElementById('cat-image1');
        //     let img2 = document.getElementById('cat-image');
        //     img.src = update
        //     img2.src = update

        //     // if(up)
        // }
        this.setState({
            open: true,
            // image: val,
            hidden: true,
            dialoghidden: false
        })

    };
    imageCropped = () => {
        this.setState({
            open: false,
            hidden: false,
            dialoghidden: true
        })
    }
    // handleSetImage = () =>{

    // }


    handleSwitchChange = (event) => {
        this.setState({ [event.target.name]: event.target.checked });
    };
    handleChangePage = (page) => {
        // setPage(newPage);
        console.log(page)
        this.setState({
            setPage: +0.01
        })
    };

    handleChangeRowsPerPage = (event) => {
        console.log(event.target.value)
        this.setState({
            setPage: 0,
            setRowsPerPage: +event.target.value,
            rowsPerPage: +event.target.value
        })
        // setRowsPerPage(+event.target.value);
        // setPage(0);
    };
    //Modal
    valuetext(value) {
        return `${value}°C`;
    }
    handleAddProductOpen = () => {
        debugger;
        this.setState({
            setAddProductOpen: true
        })
    };

    handelCropper = () => {
        this.setState({
            open: true
        })
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    };
    handleWeightChange = (event) => {
        this.setState({
            weight: event.target.value
        });
    };
    handleQuantityChange = (event) => {
        this.setState({
            weight: event.target.value
        });
    }
    handleRespClose = () => {
        this.setState({
            respOpen: false
        })
    };
    handleErrClose = () => {
        this.setState({
            errOpen: false
        })
    };

    titleChange = (e) => {
        this.setState({
            title: e.target.value,

        })
    }

    componentDidMount() {
        let token = Cookies.get('a#$s!');

        if (!token) {
            this.props.history.push('/login');
        }
        let category = JSON.parse(localStorage.getItem('category'))

        if (category.countries.length == 1) {
            if (category.countries[0].id == "5f2a9e2e9fddd46945988828") {
                this.setState({
                    title: category.title,
                    weImage: category.icon,
                    hidden: false,
                    category_id: category._id,
                    croppedImage: category.icon,
                    us: true,
                    india: false
                })
            } else {
                this.setState({
                    title: category.title,
                    weImage: category.icon,
                    hidden: false,
                    category_id: category._id,
                    croppedImage: category.icon,
                    us: false,
                    india: true
                })
            }

        } else if (category.countries.length == 2) {
            this.setState({
                title: category.title,
                weImage: category.icon,
                hidden: false,
                category_id: category._id,
                croppedImage: category.icon,
                us: true,
                india: true
            })
        } else {
            this.setState({
                title: category.title,
                weImage: category.icon,
                hidden: false,
                category_id: category._id,
                croppedImage: category.icon,
            })
        }


        let category_id = category._id
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${token}`
        }
        // debugger;
        console.log(category)
        axios.get('https://api.zacarta.com/api/admin/product?category=' + category_id, {
            headers: headers
        }).then(res => {
            if (res.status == 200) {
                this.setState({
                    products: res.data.data.products
                });
                document.getElementById('outlined-name').setAttribute('disabled', 'disabled')
                document.getElementById('contained-button-file').setAttribute('disabled', 'disabled')
            }
        }).catch(e => {
            debugger;
            console.log(e)
        })
    }

    handleChange = (e) => {
        if (e.target.name == "us" && e.target.checked == false && this.state.india == false) {
            this.setState({
                india: true,
                us: false
            })
            debugger
        } else if (e.target.name == "india" && e.target.checked == false && this.state.us == false) {
            this.setState({
                us: true,
                india: false
            })
            debugger

        } else {
            this.setState({
                [e.target.name]: e.target.checked
            })
            debugger

        }

        console.log(this.state.us, this.state.india)
    }

    classes = this.props


    render() {
        const { text, suggestions, crop, profile_pic, src } = this.state;
        const { classes } = this.props


        return (
            <div className={classes.root}>

                <div className={'flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32'}>
                    <div className="flex flex-col items-center  w-full" style={{ marginTop: "1vh" }}>
                        <FuseAnimate animation="transition.expandIn">
                            <Card className="w-full max-w-500" >
                                <CardContent className="flex flex-col items-center" >
                                    <Dialog
                                        open={this.state.errOpen}
                                        // onClose={this.handleerrClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogTitle id="alert-dialog-title">{"Error"}</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                                Please Fill Details Correctly.
                                        </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={this.handleErrClose} color="primary">
                                                Close
                                              </Button>
                                        </DialogActions>
                                    </Dialog>
                                    <Dialog
                                        open={this.state.respOpen}
                                        // onClose={this.handleClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogTitle id="alert-dialog-title">{"Category Updated"}</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                                Category is Successfuly Updated.
                                        </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Link to='/category' className={styles1.linkcls}>
                                                <Button onClick={this.handleRespClose} color="primary">
                                                    Close
                                              </Button>
                                            </Link>
                                        </DialogActions>
                                    </Dialog>
                                    <div className={styles1.addsellerbtn}>
                                        <div className={styles1.heading}>
                                            <h1 >Category Details</h1>
                                        </div>
                                    </div>
                                    <div className={styles1.catdetails}>
                                        < Grid xs={12} item >
                                            {/* <form noValidate autoComplete="off"> */}


                                            <div className={styles1.uigrids}>
                                                <TextField
                                                    onChange={this.titleChange}
                                                    className={styles1.inpts}
                                                    id="outlined-name"
                                                    label="Category Name"
                                                    type="text"
                                                    variant="outlined"
                                                    value={this.state.title}
                                                />
                                            </div>
                                        </Grid>
                                        {/* <Grid xs={12} item>
                                            <div>

                                            </div>
                                            <div className={styles1.countrycheck}>
                                                <FormControl>
                                                    <FormLabel>Select Country</FormLabel>
                                                    <FormControlLabel

                                                        control={
                                                            <Checkbox
                                                                checked={this.state.us}
                                                                onChange={this.handleChange}
                                                                name="us"
                                                                color="primary"
                                                            />
                                                        }
                                                        label="US"
                                                    />
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={this.state.india}
                                                                onChange={this.handleChange}
                                                                name="india"
                                                                color="primary"
                                                            />
                                                        }
                                                        label="India"
                                                    />
                                                </FormControl>
                                            </div>
                                        </Grid> */}

                                        {/* onClick={this.handelCropper} */}
                                        <Grid xs={4}  >
                                            <div className={styles1.picgrid}>
                                                <img id='cat-image' src={this.state.imageUse ? 'https://api.zacarta.com/' + this.state.weImage : this.state.image} style={{ height: '150px', width: '200px' }} className={this.state.hidden ? styles1.hidden : ''} alt="image" />
                                                <input
                                                    onChange={this.handleImageChange}
                                                    hidden
                                                    name='image1'
                                                    accept="image/*"
                                                    // onChange={this.change2}

                                                    className={classes.input}
                                                    id="contained-button-file"
                                                    multiple
                                                    type="file"
                                                />
                                                <label htmlFor="contained-button-file">
                                                    {/* <IconButton color="primary" aria-label="upload picture" component="span"> */}
                                                    {/* <PublishIcon ></PublishIcon> */}


                                                    {/* </IconButton> */}
                                                    <div className={styles1.changegrid}>
                                                        <h5>Change Image</h5>
                                                    </div>
                                                </label>
                                            </div>
                                        </Grid>
                                        <Grid xs={4} >
                                            <div className={styles1.addbtndv}>
                                                <Button className={this.state.view ? '' : styles1.hidden} variant="contained" color="primary" onClick={this.handleSubmit}>
                                                    Update Category
                                                </Button>
                                                <Button className={this.state.view ? styles1.hidden : ''} variant="contained" color="primary" onClick={this.handleEdit}>
                                                    <EditIcon /> Edit Category
                                                </Button>
                                            </div>
                                        </Grid>
                                        {/* <Button variant="outlined" color="primary" onClick={this.handleOpen}>
                                            Slide in alert dialog
                                          </Button> */}
                                        <Dialog

                                            item
                                            xs={12}
                                            open={this.state.open}
                                            // TransitionComponent={Transition}
                                            keepMounted
                                            onClose={this.handleClose}
                                            aria-labelledby="alert-dialog-slide-title"
                                            aria-describedby="alert-dialog-slide-description"
                                        >
                                            <DialogTitle id="alert-dialog-slide-title">{"Crop Image"}</DialogTitle>
                                            <DialogContent xs={12} className={styles1.dialog}>
                                                {/* <div><img src={this.state.croppedImage} /></div> */}

                                                <div className={styles1.picgrid2}>
                                                    {/* <img src={this.state.croppedImage} style={{ height: '150px' }} className={this.state.dialoghidden ? styles1.hidden : ''} alt="image" /> */}
                                                    <ReactCrop
                                                        src={src}
                                                        crop={crop}
                                                        onImageLoaded={this.onImageLoaded}
                                                        onComplete={this.onCropComplete}
                                                        onChange={this.onCropChange}
                                                        className='cropper'
                                                        style={cropperstyle}
                                                    />
                                                </div>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={this.handleClose} color="primary">
                                                    Cancel
                                                   </Button>
                                                <Button onClick={this.imageCropped} color="primary">
                                                    Done
                                                 </Button>
                                            </DialogActions>
                                        </Dialog>
                                    </div>

                                    <div className={styles1.search}>
                                        <Autocomplete
                                            id="search"
                                            freeSolo
                                            onChange={this.onTextChange}
                                            options={this.state.products.map((option) => option.name)}
                                            renderInput={(params) => (
                                                <TextField {...params} label="Search" margin="normal" variant="outlined" />
                                            )}
                                        />
                                    </div>
                                    <div className={styles1.addsellerbtn}>
                                        <div className={styles1.heading}>
                                            <h1 >Products</h1>
                                        </div>
                                        {/* <div className={styles1.addbtndiv}>
                                            <Button variant="contained" color="primary" onClick={this.handleAddProductOpen}>
                                                <AddIcon />  Add Product
                                            </Button>
                                        </div> */}
                                    </div>
                                    <TableContainer className={classes.container}>
                                        <Table stickyHeader aria-label="sticky table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell >
                                                        Sr.#
                                                    </TableCell>
                                                    <TableCell >
                                                        Product
                                                    </TableCell>
                                                    <TableCell className={styles1.prostorename}>
                                                        Unit Type
                                                    </TableCell>
                                                    <TableCell>Unit Price</TableCell>
                                                    <TableCell >
                                                        Action
                                                    </TableCell>
                                                    {/* <TableCell >
                                                        View
                                                    </TableCell> */}
                                                    {/* {this.columns.map((column) => (
                                                        <TableCell
                                                            key={column.id}
                                                            align={column.align}
                                                            style={{ minWidth: column.minWidth }}
                                                        >
                                                            {column.label}
                                                        </TableCell>
                                                    ))} */}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {this.state.suggestions.length == 0 ? this.state.products.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((product, index) => {
                                                    return (
                                                        <TableRow hover>

                                                            <TableCell>{index + 1}</TableCell>
                                                            {/* <TableCell>{product.name}</TableCell> */}

                                                            <TableCell className={styles1.propic} ><img src={'https://api.zacarta.com/' + product.image} /><div className={styles1.propicdiv}><div><div >{product.title}</div></div></div></TableCell>

                                                            <TableCell>{product.unit.title}</TableCell>
                                                            <TableCell>{product.price}</TableCell>

                                                            <TableCell>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Switch
                                                                            checked={this.state.checkedB}
                                                                            onChange={this.handleSwitchChange}
                                                                            name={product.sr}
                                                                            color="primary"
                                                                        />
                                                                    }
                                                                />

                                                            </TableCell>
                                                            {/* <TableCell>
                                                                <Button variant="contained" size="small" color="primary" onClick={this.handleOpen}>
                                                                    <PageviewIcon /> View
                                                            </Button>
                                                            </TableCell> */}

                                                        </TableRow>
                                                    )
                                                }) : this.state.suggestions.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((product, index) => {
                                                    return (
                                                        <TableRow hover>
                                                            <TableCell>{index + 1}</TableCell>
                                                            {/* <TableCell>{product.na}</TableCell> */}

                                                            <TableCell className={styles1.propic} ><img src={'https://api.zacarta.com/' + product.image} /><div className={styles1.propicdiv}><div><div >{product.title}</div></div></div></TableCell>

                                                            <TableCell>{product.unit.title}</TableCell>
                                                            <TableCell>{product.price}</TableCell>

                                                            <TableCell>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Switch
                                                                            checked={this.state.checkedB}
                                                                            onChange={this.handleSwitchChange}
                                                                            name={product.sr}
                                                                            color="primary"
                                                                        />
                                                                    }
                                                                />

                                                            </TableCell>
                                                            {/* <TableCell>
                                                                <Button variant="contained" size="small" color="primary" onClick={this.handleOpen}>
                                                                    <PageviewIcon /> View
                                                                </Button>
                                                            </TableCell> */}

                                                        </TableRow>
                                                    )
                                                })
                                                }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <TablePagination
                                        rowsPerPageOptions={[10, 25, 100]}
                                        component="div"
                                        count={this.state.products.length}
                                        rowsPerPage={this.state.rowsPerPage}
                                        page={this.state.page}
                                        onChangePage={(e) => { this.handleChangePage(this.state.page) }}
                                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                    />
                                    <div >
                                        <Modal
                                            className={styles1.modal}
                                            open={this.state.setOpen}
                                            onClose={this.handleClose}
                                            aria-labelledby="simple-modal-title"
                                            aria-describedby="simple-modal-description"
                                        >
                                            {this.body}
                                        </Modal>
                                    </div>
                                    <div >
                                        <Modal
                                            className={styles1.modal}
                                            open={this.state.setAddProductOpen}
                                            onClose={this.handleAddProductClose}
                                            aria-labelledby="simple-modal-title"
                                            aria-describedby="simple-modal-description"
                                        >
                                            {this.body2}
                                        </Modal>
                                    </div>
                                </CardContent>
                            </Card>
                        </FuseAnimate>
                    </div>
                </div>
            </div>
        );
    }
}
const mapSTP = state => {
    return { currentUser: state.currentUser }
}
CategoryDetailsPage.propTypes = {
    classes: PropTypes.object.isRequired,
};


function mapStateToProps(state) {
    return {
        category: state.fuse.seller.category

    }
}
let ConnectedSCategoryDetailsPage = connect(mapStateToProps)(CategoryDetailsPage);

export default withStyles(styles)(ConnectedSCategoryDetailsPage);