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
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Grid from '@material-ui/core/Grid';

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

import Cookies from 'js-cookie';
import styles1 from './myStyle.module.css';

import picture from '../../../images/excel.jpg'
import { fil } from 'date-fns/locale';



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



// const classes = useStyles();
// function HomePage() {
class ProductsPage extends React.Component {

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
            categories: [],
            units: [],
            pictures: [],
            displayPictures: [],
            quantities: 1,
            hidden1: true,
            hidden2: true,
            respOpen: false,
            errOpen: false,
            respOpen2: false,
            setEditProductOpen: false,
            fileOpen: false,
            file: '',
            displayfile: [],

            dialogTitle: '',
            dialogbody: '',

            mode: false,

            products: [],
            name: '',
            picture: '',
            desc: '',
            price: 0,
            category: 'Test Category',
            unit: '',

            us: false,
            india: false,
            us_id: "5f2a9e2e9fddd46945988828",
            india_id: "5f2a9e1e9fddd46945988827",
            weightage: ''



        }
    }
    pictures = [
        picture, picture, picture
    ]

    onTextChange = (e) => {
        let value = e.target.textContent;
        debugger;
        let suggestions = [];
        const regex = new RegExp(`^${value}`, 'i');
        if (value.length > 0) {
            for (const item of this.state.products) {
                console.log(item);

                if (item.title.includes(value)) {
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

    handleChangePage = (event, page) => {
        this.setState({
            page: page
        })
    };

    handleChangeRowsPerPage = (event) => {
        console.log(event.target.value)
        this.setState({
            setPage: 0,
            setRowsPerPage: +event.target.value,
            rowsPerPage: +event.target.value
        })

    };
    //Modal
    valuetext(value) {
        return `${value}°C`;
    }
    handleAddProductOpen = () => {
        this.setState({
            name: '',
            picture: '',
            desc: '',
            price: 0,
            category: '',
            unit: '',
            setAddProductOpen: true
        })
    };
    handleAddProductClose = () => {
        this.setState({
            setAddProductOpen: false
        })
    };
    handleEditProductOpen = (product, e) => {
        debugger
        if (product.countries.length > 1) {
            this.setState({
                product: product._id,
                name: product.title,
                picture: null,
                desc: product.description,
                price: product.price,
                category: product.category,
                unit: product.unit,
                setEditProductOpen: true,
                us: true,
                india: true,
                weightage: product.weight
            })
        } else {
            if (product.countries[0].country.code == "us") {
                this.setState({
                    product: product._id,

                    name: product.title,
                    picture: null,
                    desc: product.description,
                    price: product.price,
                    category: product.category,
                    unit: product.unit,
                    setEditProductOpen: true,
                    us: true,
                    india: false,
                    weightage: product.weight

                })
            } else {
                this.setState({
                    product: product._id,

                    name: product.title,
                    picture: null,
                    desc: product.description,
                    price: product.price,
                    category: product.category,
                    unit: product.unit,
                    setEditProductOpen: true,
                    us: false,
                    india: true,
                    weightage: product.weight

                })
            }
        }

    };
    handlefileopen = () => {
        this.setState({
            fileOpen: true,
            file: '',
            displayfile: [],
            category: '',
            unit: ''

        })
    };
    handlefileclose = () => {
        this.setState({
            fileOpen: false,
            file: '',
            displayfile: [],
            category: '',
            unit: ''

        })
    };
    handleEditProductClose = () => {
        this.setState({
            setEditProductOpen: false,
            respOpen: false
        })
    };
    toggle = () => {
        this.setState({ mode: true })
        console.log(this.state.mode)
    }
    toggle2 = () => {
        this.setState({ mode: false })
    }
    addFile = () => {

        let token = Cookies.get('a#$s!');

        const headers = {
            'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent> ',
            'Authorization': `bearer ${token}`

        }
        if (this.state.mode == false) {
            let data = new FormData();

            let countries = []
            if (this.state.us == true) {
                countries.push(this.state.us_id)
            }

            if (this.state.india == true) {
                countries.push(this.state.india_id)
            }

            if (this.state.file != null || this.state.file != '') {
                data.append('data', this.state.file)
            }

            data.append('category', this.state.category._id)
            data.append('countries', countries)
            data.append('unit', this.state.unit._id)

            console.log(countries)



            axios.post('https://api.zacarta.com/api/admin/product/fromExcelWithoutConfig', data, {
                headers: headers
            }).then(res => {
                debugger;
                if (res.status == 200) {

                    this.setState({
                        respOpen: true,
                        fileOpen:false,
                        dialogTitle: 'File Uploaded',
                        dialogbody: 'File is uploaded successfully',
                        picture: '',
                        file: '',
                        displayfile: [],
                        category: '',
                        unit: ''
                    })
                }
            }).catch(e => {
                this.setState({
                    errOpen: true,
                    

                })
            })
        } else {
            let data = new FormData();

            let countries = []
            if (this.state.us == true) {
                countries.push(this.state.us_id)
            }

            if (this.state.india == true) {
                countries.push(this.state.india_id)
            }
            debugger

            // for (let i = 0; i < this.state.file.length; i++) {
                let element = this.state.file;
                debugger
                data.append('data', element)
            // }

            // if (this.state.file != null || this.state.file != '') {
            //     debugger
            //     data.append('data', this.state.file[0])
            // }

            data.append('countries', countries)

            console.log(countries)



            axios.post('https://api.zacarta.com/api/admin/product/fromExcel', data, {
                headers: headers
            }).then(res => {
                debugger;
                if (res.status == 200) {

                    this.setState({
                        respOpen: true,
                        fileOpen:false,
                        dialogTitle: 'File Uploaded',
                        dialogbody: 'File is uploaded successfully',
                        picture: '',
                        file: '',
                        displayfile: [],
                        category: '',
                        unit: ''
                    })
                }
            }).catch(e => {
                this.setState({
                    errOpen: true,
                    

                })
            })
        }
    }
    updateProduct = (product, e) => {

        let token = Cookies.get('a#$s!');

        const headers = {
            'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent> ',
            'Authorization': `bearer ${token}`

        }
        let data = new FormData();
        debugger
        let countries = []
        if (this.state.us == true) {
            countries.push(this.state.us_id)
        }

        if (this.state.india == true) {
            countries.push(this.state.india_id)
        }
        if (this.state.picture != null) {
            data.append('image', this.state.picture)

        }

        data.append('product', this.state.product)
        data.append('countries', countries)
        data.append('unit', this.state.unit._id)
        data.append('title', this.state.name)
        data.append('description', this.state.desc)
        data.append('price', this.state.price)
        data.append('category', this.state.category._id)
        data.append('weight', this.state.weightage)



        // console.log(data);
        // 18.189.255.96
        axios.put('https://api.zacarta.com/api/admin/product', data, {
            headers: headers
        }).then(res => {
            debugger;
            if (res.status == 200) {

                this.setState({
                    respOpen: true,
                    dialogTitle: 'Product Updated',
                    dialogbody: 'Product is updated successfully',
                    picture: '',
                    products: res.data.data.product
                })
            }
        }).catch(e => {
            this.setState({
                errOpen: true
            })
        })
    }
    handleOpen = () => {
        debugger;
        this.setState({
            setOpen: true
        })
    };

    handleClose = () => {
        this.setState({
            setOpen: false
        })
    };
    handleUnitChange = (e) => {
        debugger;
        console.log(e.target.value)
        this.setState({
            unit: {
                _id: e.target.value
            }
        });
    };
    handleCategorytyChange = (e) => {
        this.setState({
            category: {
                _id: e.target.value
            }
        });
    }
    handlePriceChange = (e) => {
        this.setState({
            price: JSON.parse(e.target.value)
        });
    }
    handleWeightageChange = (e) => {
        this.setState({
            weightage: e.target.value
        });
    }
    setProductDetails = (product, e) => {
        debugger;
        this.setState({
            name: product.title,
            picture: product.image,
            desc: product.description,
            price: product.price,
            category: product.category.title,
            unit: product.unit.title,
            setOpen: true
        })
    }



    uploadProductPicture = (e) => {
        let val = e.target.files[0]
        if (e.target.files[0]) {
            let update = URL.createObjectURL(val)
            // let img = document.getElementById('img-2');
            // img.src = update

            this.setState({
                displayPictures: [...this.state.displayPictures, update],
                picture: e.target.files[0]
            })
        }

    }
    removePicture = (index, e) => {
        debugger;
        var displayPictures = [...this.state.displayPictures]; // make a separate copy of the array
        var picture = [...this.state.pictures]; // make a separate copy of the array
        // console.log(item)
        // var index = displayPictures.indexOf(e.target.value)
        // var index1 = picture.indexOf(e.target.value)
        debugger
        if (index !== -1) {
            displayPictures.splice(index, 1);
            picture.splice(index, 1);
            console.log(displayPictures, picture)
            this.setState({
                displayPictures: displayPictures,
                picture: picture

            });
        }
    }

    uploadFile = (e) => {
        let val = e.target.files[0]
        if (e.target.files[0]) {
            let update = URL.createObjectURL(val)
            // let img = document.getElementById('img-2');
            // img.src = update

            this.setState({
                displayfile: [...this.state.displayfile, update],
                file: e.target.files[0]
            })
        }

    }
    removeFile = (index, e) => {
        var displayfile = [...this.state.displayfile]; // make a separate copy of the array
        var file = this.state.file; // make a separate copy of the array
        // console.log(item)
        // var index = displayPictures.indexOf(e.target.value)
        // var index1 = picture.indexOf(e.target.value)
        debugger
        if (index !== -1) {
            let display = displayfile.splice(index, 1);
            // file.splice(index, 1);
            console.log(displayfile, file)
            this.setState({
                displayfile: [...this.state.displayfile, display],
                file: ''

            });
        }
    }

    handleerrClose = () => {
        this.setState({
            errOpen: false
        })
    };
    handleRespClose = () => {
        this.setState({
            respOpen: false,
            setAddProductOpen: false,
            setEditProductOpen: false,
            displayPictures: []
        })
    }

    handleRespClose2 = () => {
        this.setState({
            respOpen2: false,
            setEditProductOpen: false

        })
    }

    handleErrClose = () => {
        this.setState({
            respOpen: false
        })
    }
    handleProductField = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    addProduct = () => {
        let token = Cookies.get('a#$s!');

        const headers = {
            'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent> ',
            'Authorization': `bearer ${token}`

        }
        let data = new FormData();
        debugger
        let countries = []
        if (this.state.us == true) {
            countries.push(this.state.us_id)
        }

        if (this.state.india == true) {
            countries.push(this.state.india_id)
        }

        for (let i = 0; i < this.state.picture.length; i++) {
            let element = this.state.picture[i];
            data.append('image', element)
        }
        data.append('countries', countries)
        data.append('title', this.state.name)
        data.append('description', this.state.desc)
        data.append('price', this.state.price)
        data.append('category', this.state.category._id)
        data.append('unit', this.state.unit._id)
        data.append('image', this.state.picture)
        data.append('weight', this.state.weightage)



        console.log(data);
        // 18.189.255.96
        axios.post('https://api.zacarta.com/api/admin/product', data, {
            headers: headers
        }).then(res => {
            debugger;
            if (res.status == 200) {

                this.setState({
                    respOpen: true,
                    dialogTitle: 'Product Added',
                    dialogbody: 'Product is added successfully',
                    products: [...this.state.products, res.data.data.product]
                })
            }
        }).catch(e => {
            debugger;

            this.setState({
                errOpen: true
            })
        })
    }
    deleteProduct = (product, e) => {

        let token = Cookies.get('a#$s!');

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${token}`
        }
        axios.post('https://api.zacarta.com/api/admin/product/delete', { product: product._id }, {
            headers: headers
        }).then(res => {
            if (res.status == 200) {
                this.setState({
                    products: res.data.data.product,
                    respOpen2: true

                });
            }
        })
    }
    handleSwitchChange = (product, e) => {
        let token = Cookies.get('a#$s!');

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${token}`
        }
        axios.post('https://api.zacarta.com/api/admin/product/toggle', { product: product._id }, {
            headers: headers
        }).then(res => {
            if (res.status == 200) {
                this.setState({
                    products: res.data.data.product,
                });
            }
        })
    };

    componentDidMount() {
        let token = Cookies.get('a#$s!');

        if (!token) {
            this.props.history.push('/login');
        }
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${token}`
        }
        axios.get('https://api.zacarta.com/api/admin/product', {
            headers: headers
        }).then(res => {
            if (res.status == 200) {
                this.setState({
                    products: res.data.data.products
                });
                console.log(res.data.data.products)
            }
        })
        // get Cateeories
        axios.get('https://api.zacarta.com/api/admin/category', {
            headers: headers
        }).then(res => {
            if (res.status == 200) {
                this.setState({
                    categories: res.data.data.categories
                });
            }
        })
        // get units
        axios.get('https://api.zacarta.com/api/admin/unit', {
            headers: headers
        }).then(res => {
            if (res.status == 200) {
                this.setState({
                    units: res.data.data.units
                });
            }
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
        const { text, suggestions } = this.state;
        const { classes } = this.props


        return (
            <div className={classes.root}>

                <div className={'flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32'}>
                    <div className="flex flex-col items-center  w-full" style={{ minHeight: "150vh", marginTop: "1vh" }}>
                        <FuseAnimate animation="transition.expandIn">
                            <Card className="w-full max-w-500" >
                                <CardContent className="flex flex-col items-center" >
                                    <Dialog
                                        className={styles1.productdialog}
                                        open={this.state.setOpen}
                                        // onClose={this.handleerrClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogTitle id="alert-dialog-title">{"Product Details"}</DialogTitle>
                                        <DialogContent>
                                            <Card className={styles1.abc}>
                                                <CardActionArea>
                                                    <CardContent >
                                                        <Typography gutterBottom variant="h5" component="h2" className={styles1.modaldes}>
                                                            {this.state.name}
                                                        </Typography>
                                                        <CardContent className={styles1.flextest}>
                                                            <CardMedia
                                                                className={this.classes.media, styles1.modalmedia}
                                                                image={'https://api.zacarta.com/' + this.state.picture}
                                                                title="Contemplative Reptile"
                                                            >
                                                                {/* <img src={picture} /> */}

                                                            </CardMedia>
                                                            <Typography variant="body2" color="textSecondary" component="p" className={styles1.modaldes}>
                                                                {this.state.desc}
                                                            </Typography>
                                                        </CardContent>
                                                        <Typography variant="body2" color="textSecondary" component="p" className={styles1.modaldes}>
                                                            <b> {'Price: ' + this.state.price.toFixed(2)} </b>
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                                <CardActions>
                                                    <TextField
                                                        label="Category"
                                                        disabled
                                                        className={styles1.dropdown}
                                                        value={this.state.category}
                                                        // onChange={this.handleQuantityChange}
                                                        SelectProps={{
                                                            native: true,
                                                        }}
                                                        type='text'

                                                        // helperText="Please select your currency"
                                                        variant="outlined"
                                                    >
                                                    </TextField>
                                                    <TextField
                                                        label="Unit"
                                                        disabled
                                                        className={styles1.dropdown}
                                                        value={this.state.unit}
                                                        // onChange={this.handleWeightChange}
                                                        SelectProps={{
                                                            native: true,
                                                        }}
                                                        type='text'

                                                        // helperText="Please select your currency"
                                                        variant="outlined"
                                                    >
                                                    </TextField>
                                                </CardActions>
                                            </Card>
                                            <DialogActions>

                                                <Button onClick={this.handleClose} variant="contained" color="primary">
                                                    Close
                                              </Button>
                                            </DialogActions>
                                        </DialogContent>
                                    </Dialog>
                                    {/* Add File */}
                                    <Dialog
                                        className={styles1.productdialog}
                                        open={this.state.fileOpen}
                                        // onClose={this.handleClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogTitle id="alert-dialog-title">{"Add Products File"}</DialogTitle>
                                        <DialogContent>
                                            <Card className={styles1.abc}>
                                                {/* <CardActions>
                                                    <TextField
                                                        className={styles1.inpts}
                                                        id="outlined-name"
                                                        label="Product Name"
                                                        type="text"
                                                        variant="outlined"
                                                        name="name"
                                                        value={this.state.name}
                                                        onChange={this.handleProductField}
                                                    />
                                                </CardActions>
                                                <CardActions>
                                                    <TextField
                                                        className={styles1.inpts}
                                                        id="outlined-name"
                                                        label="Product Description"
                                                        type="text"
                                                        variant="outlined"
                                                        name="desc"
                                                        value={this.state.desc}
                                                        onChange={this.handleProductField}
                                                    />
                                                </CardActions> */}
                                                <CardActions>
                                                    <Button onClick={this.toggle2} className={this.state.mode ? styles1.inactive : styles1.active} variant="contained" color="primary" >Catgory Wise</Button>
                                                    <Button onClick={this.toggle} className={this.state.mode ? styles1.active : styles1.inactive} variant="contained" color="primary" >Country Wise</Button>

                                                </CardActions>
                                                <CardActions>

                                                    <TextField
                                                        id="outlined-select-currency-native"
                                                        select
                                                        label="Categories"
                                                        className={this.state.mode ? styles1.hidden : styles1.dropdown}
                                                        // className={styles1.dropdown}
                                                        // value={this.state.weight}
                                                        onChange={this.handleCategorytyChange}
                                                        SelectProps={{
                                                            native: true,
                                                        }}
                                                        // helperText="Please select your currency"
                                                        variant="outlined"
                                                    >
                                                        <option disabled selected>Please select</option>

                                                        {this.state.categories.map((option) => (
                                                            <option key={option.value} value={option._id}>
                                                                {option.title}
                                                            </option>
                                                        ))}
                                                    </TextField>

                                                    <TextField
                                                        label="Unit"
                                                        className={this.state.mode ? styles1.hidden : styles1.dropdown}
                                                        onChange={this.handleUnitChange}
                                                        SelectProps={{
                                                            native: true,
                                                        }}
                                                        select

                                                        variant="outlined"
                                                    >
                                                        <option disabled selected>Please select</option>
                                                        {this.state.units.map((option) => (
                                                            <option key={option.value} value={option._id}>
                                                                {option.title}
                                                            </option>
                                                        ))}
                                                    </TextField>
                                                </CardActions>
                                                {/* <CardActions>

                                                    <TextField
                                                        label="Unit Price"
                                                        className={styles1.dropdown}
                                                        // value={this.quantities[0].value}
                                                        onChange={this.handlePriceChange}
                                                        SelectProps={{
                                                            native: true,
                                                        }}
                                                        type='number'


                                                        // helperText="Please select your currency"
                                                        variant="outlined"
                                                    >
                                                    </TextField>


                                                    <TextField
                                                        label="Weightage"
                                                        className={styles1.dropdown}
                                                        // value={this.quantities[0].value}
                                                        onChange={this.handleWeightageChange}
                                                        SelectProps={{
                                                            native: true,
                                                        }}
                                                        type='number'
                                                        variant="outlined"
                                                    >
                                                    </TextField>
                                                </CardActions> */}
                                                <CardActions>
                                                    <Grid xs={12} item>
                                                        <div>

                                                        </div>
                                                        <div className={styles1.countrycheck}>
                                                            <FormControl>
                                                                <FormLabel color="black">Select Country</FormLabel>
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
                                                    </Grid>


                                                </CardActions>
                                                <CardActions className={styles1.picmaincontain}>
                                                    {/* <div > */}
                                                    {this.state.displayfile.map((item, index) => {
                                                        return <div className={styles1.upldpic} value={item}>
                                                            {/* <span className={styles1.picdelete}>x</span> */}
                                                            <img src={picture}
                                                            // onClick={this.removeFile.bind(this, index)} title='Click to remove' 
                                                            />
                                                        </div>
                                                    })

                                                    }



                                                    <input
                                                        onChange={this.uploadFile}
                                                        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                                        className={styles1.inphidden}
                                                        id="contained-button-file"
                                                        multiple
                                                        type="file"
                                                    />
                                                    <label htmlFor="contained-button-file" className={styles1.uploadptoductlabel}>
                                                        <Button className={styles1.inpts, styles1.filebtn} variant="contained" color="primary" component="span">
                                                            Upload File
                                                         </Button>
                                                    </label>

                                                </CardActions>

                                            </Card>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={this.handlefileclose} variant="contained" color="primary">
                                                Cancel
                                              </Button>

                                            <Button variant="contained" color="primary" onClick={this.addFile} >
                                                Save
                                                     </Button>
                                        </DialogActions>
                                    </Dialog>
                                    {/* add product dialog */}
                                    <Dialog
                                        className={styles1.productdialog}
                                        open={this.state.setAddProductOpen}
                                        // onClose={this.handleClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogTitle id="alert-dialog-title">{"Add Product"}</DialogTitle>
                                        <DialogContent>
                                            <Card className={styles1.abc}>
                                                <CardActions>
                                                    <TextField
                                                        className={styles1.inpts}
                                                        id="outlined-name"
                                                        label="Product Name"
                                                        type="text"
                                                        variant="outlined"
                                                        name="name"
                                                        value={this.state.name}
                                                        onChange={this.handleProductField}
                                                    />
                                                </CardActions>
                                                <CardActions>
                                                    <TextField
                                                        className={styles1.inpts}
                                                        id="outlined-name"
                                                        label="Product Description"
                                                        type="text"
                                                        variant="outlined"
                                                        name="desc"
                                                        value={this.state.desc}
                                                        onChange={this.handleProductField}
                                                    />
                                                </CardActions>
                                                <CardActions>

                                                    <TextField
                                                        id="outlined-select-currency-native"
                                                        select
                                                        label="Categories"
                                                        className={styles1.dropdown}
                                                        // value={this.state.weight}
                                                        onChange={this.handleCategorytyChange}
                                                        SelectProps={{
                                                            native: true,
                                                        }}
                                                        // helperText="Please select your currency"
                                                        variant="outlined"
                                                    >
                                                        <option disabled selected>Please select</option>

                                                        {this.state.categories.map((option) => (
                                                            <option key={option.value} value={option._id}>
                                                                {option.title}
                                                            </option>
                                                        ))}
                                                    </TextField>

                                                    <TextField
                                                        label="Unit"
                                                        className={styles1.dropdown}
                                                        // value={this.quantities[0].value}
                                                        onChange={this.handleUnitChange}
                                                        SelectProps={{
                                                            native: true,
                                                        }}
                                                        select

                                                        // helperText="Please select your currency"
                                                        variant="outlined"
                                                    >
                                                        <option disabled selected>Please select</option>
                                                        {this.state.units.map((option) => (
                                                            <option key={option.value} value={option._id}>
                                                                {option.title}
                                                            </option>
                                                        ))}
                                                    </TextField>
                                                </CardActions>
                                                <CardActions>

                                                    <TextField
                                                        label="Unit Price"
                                                        className={styles1.dropdown}
                                                        // value={this.quantities[0].value}
                                                        onChange={this.handlePriceChange}
                                                        SelectProps={{
                                                            native: true,
                                                        }}
                                                        type='number'


                                                        // helperText="Please select your currency"
                                                        variant="outlined"
                                                    >
                                                    </TextField>


                                                    <TextField
                                                        label="Weightage"
                                                        className={styles1.dropdown}
                                                        // value={this.quantities[0].value}
                                                        onChange={this.handleWeightageChange}
                                                        SelectProps={{
                                                            native: true,
                                                        }}
                                                        type='number'
                                                        variant="outlined"
                                                    >
                                                    </TextField>
                                                </CardActions>
                                                <CardActions>
                                                    <Grid xs={12} item>
                                                        <div>

                                                        </div>
                                                        <div className={styles1.countrycheck}>
                                                            <FormControl>
                                                                <FormLabel color="black">Select Country</FormLabel>
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
                                                    </Grid>


                                                </CardActions>
                                                <CardActions className={styles1.picmaincontain}>
                                                    {/* <div > */}
                                                    {this.state.displayPictures.map((item, index) => {
                                                        return <div className={styles1.upldpic} value={item}>
                                                            {/* <span className={styles1.picdelete}>x</span> */}
                                                            <img src={item} onClick={this.removePicture.bind(this, index)} title='Click to remove' />
                                                        </div>
                                                    })

                                                    }

                                                    <input
                                                        onChange={this.uploadProductPicture}
                                                        accept="image/*"
                                                        className={styles1.inphidden}
                                                        id="contained-button-file"
                                                        multiple
                                                        type="file"
                                                    />
                                                    <label htmlFor="contained-button-file" className={styles1.uploadptoductlabel}>
                                                        <Button className={styles1.inpts, styles1.filebtn} variant="contained" color="primary" component="span">
                                                            Upload Image
                                                         </Button>
                                                    </label>

                                                </CardActions>

                                            </Card>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={this.handleAddProductClose} variant="contained" color="primary">
                                                Cancel
                                              </Button>

                                            <Button variant="contained" color="primary" onClick={this.addProduct} >
                                                Save
                                                     </Button>
                                        </DialogActions>
                                    </Dialog>
                                    {/* update product */}

                                    <Dialog
                                        className={styles1.productdialog}
                                        open={this.state.setEditProductOpen}
                                        // onClose={this.handleClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogTitle id="alert-dialog-title">{"Update Product"}</DialogTitle>
                                        <DialogContent>
                                            <Card className={styles1.abc}>
                                                <CardActions>
                                                    <TextField
                                                        className={styles1.inpts}
                                                        id="outlined-name"
                                                        label="Product Name"
                                                        type="text"
                                                        variant="outlined"
                                                        name="name"
                                                        value={this.state.name}
                                                        onChange={this.handleProductField}
                                                    />
                                                </CardActions>
                                                <CardActions>
                                                    <TextField
                                                        className={styles1.inpts}
                                                        id="outlined-name"
                                                        label="Product Description"
                                                        type="text"
                                                        variant="outlined"
                                                        name="desc"
                                                        value={this.state.desc}
                                                        onChange={this.handleProductField}
                                                    />
                                                </CardActions>
                                                <CardActions>


                                                    <TextField
                                                        id="outlined-select-currency-native"
                                                        select
                                                        label="Categories"
                                                        className={styles1.dropdown}
                                                        // value={this.state.weight}
                                                        onChange={this.handleCategorytyChange}
                                                        SelectProps={{
                                                            native: true,
                                                        }}
                                                        // helperText="Please select your currency"
                                                        variant="outlined"
                                                    >
                                                        <option disabled selected value={this.state.category.id}>{this.state.category.title}</option>

                                                        {this.state.categories.map((option) => (
                                                            <option key={option.value} value={option._id}>
                                                                {option.title}
                                                            </option>
                                                        ))}
                                                    </TextField>
                                                    <TextField
                                                        label="Unit"
                                                        className={styles1.dropdown}
                                                        // value={this.quantities[0].value}
                                                        onChange={this.handleUnitChange}
                                                        SelectProps={{
                                                            native: true,
                                                        }}
                                                        select

                                                        // helperText="Please select your currency"
                                                        variant="outlined"
                                                    >
                                                        <option disabled selected value={this.state.unit.id}>{this.state.unit.title}</option>
                                                        {this.state.units.map((option) => (
                                                            <option key={option.value} value={option._id}>
                                                                {option.title}
                                                            </option>
                                                        ))}
                                                    </TextField>

                                                </CardActions>
                                                <CardActions>
                                                    <TextField
                                                        label="Unit Price"
                                                        className={styles1.dropdown}
                                                        value={this.state.price}
                                                        onChange={this.handlePriceChange}
                                                        SelectProps={{
                                                            native: true,
                                                        }}
                                                        type='number'
                                                        // helperText="Please select your currency"
                                                        variant="outlined"
                                                    >
                                                    </TextField>
                                                    <TextField
                                                        label="Weight"
                                                        className={styles1.dropdown}
                                                        value={this.state.weightage}
                                                        onChange={this.handleWeightageChange}
                                                        SelectProps={{
                                                            native: true,
                                                        }}
                                                        type='number'
                                                        // helperText="Please select your currency"
                                                        variant="outlined"
                                                    >
                                                    </TextField>
                                                </CardActions>
                                                <CardActions>
                                                    <Grid xs={12} item>
                                                        <div>

                                                        </div>
                                                        <div className={styles1.countrycheck}>
                                                            <FormControl>
                                                                <FormLabel color="black">Select Country</FormLabel>
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
                                                    </Grid>


                                                </CardActions>
                                                <CardActions className={styles1.picmaincontain}>
                                                    {/* <div > */}
                                                    {this.state.displayPictures.map((item, index) => {
                                                        return <div className={styles1.upldpic} value={item}>
                                                            {/* <span className={styles1.picdelete}>x</span> */}
                                                            <img src={item} onClick={this.removePicture.bind(this, index)} title='Click to remove' />
                                                        </div>
                                                    })

                                                    }

                                                    <input
                                                        onChange={this.uploadProductPicture}
                                                        accept="image/*"
                                                        className={styles1.inphidden}
                                                        id="contained-button-file"
                                                        multiple
                                                        type="file"
                                                    />
                                                    <label htmlFor="contained-button-file" className={styles1.uploadptoductlabel}>
                                                        <Button className={styles1.inpts, styles1.filebtn} variant="contained" color="primary" component="span">
                                                            Upload Image
                                                         </Button>
                                                    </label>

                                                </CardActions>

                                            </Card>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={this.handleEditProductClose} variant="contained" color="primary">
                                                Cancel
                                              </Button>

                                            <Button variant="contained" color="primary" onClick={this.updateProduct} >
                                                Save
                                                     </Button>
                                        </DialogActions>
                                    </Dialog>
                                    {/* Error and Response Dialog0s */}
                                    <Dialog
                                        open={this.state.errOpen}
                                        onClose={this.handleerrClose}
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
                                            <Button onClick={this.handleerrClose} color="primary">
                                                Close
                                              </Button>
                                        </DialogActions>
                                    </Dialog>
                                    <Dialog
                                        open={this.state.respOpen}
                                        onClose={this.handleRespClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogTitle id="alert-dialog-title">{this.state.dialogTitle}</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                                {this.state.dialogbody}
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            {/* <Link to='/seller-detail'> */}
                                            <Button onClick={this.handleRespClose} color="primary">
                                                Close
                                              </Button>
                                            {/* </Link> */}
                                        </DialogActions>
                                    </Dialog>
                                    {/* delete dialog */}
                                    <Dialog
                                        open={this.state.respOpen2}
                                        onClose={this.handleRespClose2}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogTitle id="alert-dialog-title">{"Product Delete"}</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                                Product is deleted successfully
                                        </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            {/* <Link to='/seller-detail'> */}
                                            <Button onClick={this.handleRespClose2} color="primary">
                                                Close
                                              </Button>
                                            {/* </Link> */}
                                        </DialogActions>
                                    </Dialog>

                                    {/* Actual body */}
                                    <div className={styles1.search}>
                                        <Autocomplete
                                            id="search"
                                            freeSolo
                                            onChange={this.onTextChange}
                                            options={this.state.products.map((option) => option.title)}
                                            renderInput={(params) => (
                                                <TextField {...params} label="Search" margin="normal" variant="outlined" />
                                            )}
                                        />
                                    </div>
                                    <div className={styles1.addsellerbtn}>
                                        <div className={styles1.heading}>
                                            <h1 >Products</h1>
                                        </div>
                                        <div className={styles1.addbtndiv}>
                                            {/* <Link to='/add-seller' className={styles1.linkcls}> */}
                                            <Button variant="contained" color="primary" onClick={this.handleAddProductOpen}>
                                                <AddIcon />  Add Product
                                            </Button>

                                            {/* </Link> */}
                                        </div>
                                        <div className={styles1.addbtndiv2}>
                                            {/* <Link to='/add-seller' className={styles1.linkcls}> */}
                                            <Button variant="contained" color="primary" onClick={this.handlefileopen}>
                                                <AddIcon />  Add File
                                            </Button>

                                            {/* </Link> */}
                                        </div>

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
                                                    <TableCell >
                                                        Weight
                                                    </TableCell>
                                                    <TableCell className={styles1.prostorename}>
                                                        Unit Type
                                                    </TableCell>
                                                    <TableCell>Unit Price</TableCell>
                                                    <TableCell >
                                                        Action
                                                    </TableCell>
                                                    <TableCell >
                                                        Edit
                                                    </TableCell>
                                                    <TableCell >
                                                        View
                                                    </TableCell>

                                                    {/* <TableCell>
                                                        Delete
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
                                                            <TableCell>{product.weight}</TableCell>

                                                            <TableCell>{product.unit.title}</TableCell>
                                                            <TableCell>{product.price.toFixed(2)}</TableCell>

                                                            <TableCell>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Switch
                                                                            checked={product.active}
                                                                            onChange={this.handleSwitchChange.bind(this, product)}
                                                                            name={product.sr}
                                                                            color="primary"
                                                                        />
                                                                    }
                                                                />

                                                            </TableCell>
                                                            <TableCell>
                                                                <Button variant="contained" color="primary" onClick={this.handleEditProductOpen.bind(this, product)} >
                                                                    <EditIcon />
                                                                </Button>
                                                            </TableCell>
                                                            <TableCell>
                                                                {/* <Link to='seller-details' className={styles1.linkcls}> */}
                                                                <Button variant="contained" size="small" color="primary" onClick={this.setProductDetails.bind(this, product)}>
                                                                    <PageviewIcon /> View
                                                            </Button>
                                                                {/* </Link> */}
                                                            </TableCell>
                                                            {/* <TableCell>
                                                                <Button variant="contained" color="primary" onClick={this.deleteProduct.bind(this, product)}>
                                                                    <DeleteIcon />
                                                                </Button>
                                                            </TableCell> */}

                                                        </TableRow>
                                                    )
                                                }) : this.state.suggestions.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((product, index) => {
                                                    return (
                                                        <TableRow hover>

                                                            <TableCell>{index + 1}</TableCell>
                                                            {/* <TableCell>{product.name}</TableCell> */}

                                                            <TableCell className={styles1.propic} ><img src={'https://api.zacarta.com/' + product.image} /><div className={styles1.propicdiv}><div><div >{product.title}</div></div></div></TableCell>
                                                            <TableCell>{product.weight}</TableCell>

                                                            <TableCell>{product.unit.title}</TableCell>
                                                            <TableCell>{product.price}</TableCell>

                                                            <TableCell>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Switch
                                                                            checked={product.active}
                                                                            onChange={this.handleSwitchChange.bind(this, product)}
                                                                            name={product.sr}
                                                                            color="primary"
                                                                        />
                                                                    }
                                                                />

                                                            </TableCell>
                                                            <TableCell>
                                                                <Button variant="contained" color="primary" onClick={this.handleEditProductOpen.bind(this, product)} >
                                                                    <EditIcon />
                                                                </Button>
                                                            </TableCell>
                                                            <TableCell>
                                                                {/* <Link to='seller-details' className={styles1.linkcls}> */}
                                                                <Button variant="contained" size="small" color="primary" onClick={this.setProductDetails.bind(this, product)}>
                                                                    <PageviewIcon /> View
                                                        </Button>
                                                                {/* </Link> */}
                                                            </TableCell>
                                                            {/* <TableCell>
                                                            <Button variant="contained" color="primary" onClick={this.deleteProduct.bind(this, product)}>
                                                                <DeleteIcon />
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
                                        onChangePage={this.handleChangePage}
                                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                    />
                                </CardContent>
                            </Card>
                        </FuseAnimate>
                    </div>
                </div>
            </div>
        );
    }
}
ProductsPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductsPage);