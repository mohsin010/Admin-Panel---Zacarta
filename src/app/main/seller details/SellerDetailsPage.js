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
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
// import 'react-google-places-autocomplete/dist/index.min.css';
import { withStyles, Tab } from '@material-ui/core';
import PropTypes, { func } from 'prop-types';
import compose from 'recompose/compose';
import TextField from '@material-ui/core/TextField';
import { default as Autocompletee } from '@material-ui/lab/Autocomplete';
import StorefrontIcon from '@material-ui/icons/Storefront';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import Modal from '@material-ui/core/Modal';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import InputLabel from '@material-ui/core/InputLabel';
import PublishIcon from '@material-ui/icons/Publish';
import SaveIcon from '@material-ui/icons/Save';

import MuiPhoneNumber from 'material-ui-phone-number';


import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';


import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import MenuItem from '@material-ui/core/MenuItem';
import SearchIcon from '@material-ui/icons/Search';
import Slider from '@material-ui/core/Slider';
import EditIcon from '@material-ui/icons/Edit';
import PageviewIcon from '@material-ui/icons/Pageview';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

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
import store from '../../store/index';
import Cookies from 'js-cookie';


import styles1 from './myStyle.module.css';
import './abc.css'

import picture from '../../fall-glow-small.jpg'
import { tr } from 'date-fns/locale';
import { dateFnsLocalizer } from 'react-big-calendar';


const styles = theme => ({
    root: {
        background: `radial-gradient(${darken(theme.palette.primary.dark, 0.5)} 0%, ${theme.palette.primary.dark} 80%)`,
        color: theme.palette.primary.contrastText
    },
    container: {
        width: "100%"
    },

    highlight: {
        backgroundColor: 'red',
    }
});
// const overMap = {
//     position: "relative",
//     // top: "90%",
//     // left: "1%",
//     border: "0.1px solid black",
//     borderRadius: "5px",
//     width: "97%",
//     height: "110px",
//     backgroundColor: "rgb(216, 214, 214)"


// }


const overMap = {
    position: "relative",
    // top: "90%",
    // left: "1%",
    width: "30%",
    minWidth: ' 300px',
    height: "40pvh",
    border: '1px solid orange',
    borderRadius: "5px",

    // minHeight: "40vh",
    // backgroundColor: "rgb(216, 214, 214)"

}



// const classes = useStyles();
// function HomePage() {
class SellerDetails extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedStore: '',
            setRowsPerPage: 10,
            setPage: 0,
            page: 0,
            rowsPerPage: 10,

            setRowsPerPage1: 10,
            setPage1: 0,
            pagee1: 0,
            rowsPerPage1: 10,
            // checked: '',

            // checkedA: true,
            sr: true,
            suggestions: [],
            text: '',
            open: false,
            setOpen: false,
            hidden1: true,
            hidden2: true,
            hiddenbtn: true,
            respOpen: false,
            errOpen: false,
            dialogTitle: '',
            dialogBody: '',
            product_id: '',
            store: [],
            address: '',
            excludedProducts: [],
            searchText: '',
            products: [],
            name: '',
            picture: [],
            desc: '',
            price: '',
            category: '',
            unit: '',
            picUpload: true,
            picUpload2: true,
            image1: '',
            image2: '',
            images: [],
            storeTypes: [],
            name: '',
            sellerNumber: '',
            sellerEmail: '',
            sellerPicture: '',
            storeName: '',
            storeNumber: '',
            storeType: {},
            storeTypeId: '',
            typeName: '',
            storePicture: '',
            seller: '',
            categories: [],

            position: {
                lat: 37.77,
                lng: -122.42
            },




        }
    }

    onTextChange = (e) => {
        let value = e.target.textContent;
        let suggestions = [];
        const regex = new RegExp(`^${value}`, 'i');
        if (value.length > 0) {
            for (const item of this.state.excludedProducts) {
                this.sellerAddProduct(item)
                debugger;
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
        // console.log(this.state.text)
    }
    setProductState = (e) => {
        this.setState({
            searchText: ''
        })
    }

    sellerAddProduct = (e) => {
        let token = Cookies.get('a#$s!');
        let seller = JSON.parse(localStorage.getItem('seller'))
        let categories = this.state.categories.toString()
        let data = {
            seller: seller._id,
            categories: categories
        }
        // var excludedProducts = [...this.state.excludedProducts];
        // var index = excludedProducts.indexOf(e)
        // console.log(this.state.excludedProducts[index])
        // debugger;
        // excludedProducts.splice(index, 1);
        // this.setState({
        //     products: [...this.state.products, e],
        //     excludedProducts: excludedProducts
        // })
        console.log(data)
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${token}`
        }
        // debugger;
        axios.post('https://api.zacarta.com/api/admin/seller/categories', data, {
            headers: headers
        }).then(res => {
            debugger;

            if (res.status == 200) {
                this.setState({
                    dialogTitle: 'Category Added',
                    dialogBody: 'Category Added Successfuly',
                    categories: [],
                    products: res.data.data.Seller.groupedCategories.included,
                    excludedProducts: res.data.data.Seller.groupedCategories.excluded,
                    respOpen: true,
                });
                // console.log(res.data.data.seller.groupedProducts.included)
            }
        }).catch(e => {
            debugger;
            this.setState({
                searchText: '',
                errOpen: true,
                dialogBody: "There is an error while adding category",
            });
        })
    }
    removeProduct = (item, index, e) => {

        let token = Cookies.get('a#$s!');
        let seller = JSON.parse(localStorage.getItem('seller'))
        let data = {
            seller: seller._id,
            categories: item._id
        }
        var products = [...this.state.products];
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${token}`
        }
        // debugger;
        axios.put('https://api.zacarta.com/api/admin/seller/removeCategories', data, {
            headers: headers
        }).then(res => {
            if (res.status == 200) {
                this.setState({
                    dialogTitle: 'Category Removed',
                    dialogBody: 'Category Removed Successfuly',
                    products: res.data.data.seller.groupedCategories.included,
                    excludedProducts: res.data.data.seller.groupedCategories.excluded,
                    respOpen: true,
                    searchText: ''
                });
            }
        }).catch(e => {
            debugger;
            this.setState({
                errOpen: true,
                dialogBody: "There is an error while removing category",
                searchText: ''
            });
        })
    }
    toggleSellerCategory = (category, e) => {
        // toggleSellerCategory
        let token = Cookies.get('a#$s!');
        let seller = JSON.parse(localStorage.getItem('seller'))
        let data = {
            seller: seller._id,
            category: category._id
        }
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${token}`
        }
        // debugger;
        axios.post('https://api.zacarta.com/api/admin/seller/toggleSellerCategory', data, {
            headers: headers
        }).then(res => {
            if (res.status == 200) {
                this.setState({
                    products: res.data.data.seller
                    // excludedProducts: res.data.data.seller.groupedCategories.excluded,
                    // respOpen: true,
                    // searchText: ''
                });
            }
        })
    }
    handleSwitchChange = (event) => {
        this.setState({ [event.target.name]: event.target.checked });
    };
    handleChangePage = (event, page) => {
        console.log(page)

        this.setState({
            page: page
        })
    };
    handleChangeRowsPerPage = (event) => {
        this.setState({
            setPage: 0,
            setRowsPerPage: +event.target.value,
            rowsPerPage: +event.target.value
        })
    };


    handleChangePage1 = (event, page1) => {
        console.log(page1)
        this.setState({
            pagee1: page1
        })
    };

    handleChangeRowsPerPage1 = (event) => {
        console.log('kkkkk')

        this.setState({
            setPage1: 0,
            setRowsPerPage1: +event.target.value,
            rowsPerPage1: +event.target.value
        })
    };
    //Modal
    valuetext(value) {
        return `${value}°C`;
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
        console.log(this.state.displayPictures)
    }

    handleerrClose = () => {
        this.setState({
            searchText: '',
            errOpen: false
        })
    };

    handleRespClose = () => {
        this.setState({
            searchText: '',
            respOpen: false
        })
    }
    handleTypeChange = (event) => {
        // console.log( this.state.storeTypeId)
        this.setState({
            storeTypeId: event.target.value
            // typeName: event.target.name
        });
    };


    componentDidMount() {
        // console.log(this.props.seller._id)
        let token = Cookies.get('a#$s!');

        if (!token) {
            this.props.history.push('/login');
        }
        let seller = this.props.seller._id
        let seller_id = localStorage.getItem('seller_id');
        this.setState({
            seller: seller_id
        })
        console.log(seller_id);
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${token}`
        }
        // debugger;
        axios.get('https://api.zacarta.com/api/admin/seller/categories/?seller=' + seller_id, {
            headers: headers
        }).then(res => {
            console.log(res);
            debugger;
            if (res.status == 200) {
                this.setState({
                    products: res.data.data.seller.groupedCategories.included,
                    excludedProducts: res.data.data.seller.groupedCategories.excluded,
                    store: res.data.data.seller,
                    address: res.data.data.seller.store_address.address,
                    storeType: res.data.data.seller.store_types[0],
                    storeTypeId: res.data.data.seller.store_types[0]._id,
                    categories: []
                    // storeTypeId: 

                });
                document.getElementById('outlined-name').setAttribute('disabled', 'disabled')
                document.getElementById('outlined-store-number').setAttribute('disabled', 'disabled')
                document.getElementById('outlined-number').setAttribute('disabled', 'disabled')

                document.getElementById('outlined-select-currency-native').setAttribute('disabled', 'disabled')
                // document.getElementById('outlined-seller-address').setAttribute('disabled', 'disabled')
                document.getElementById('react-google-places-autocomplete-input').setAttribute('disabled', 'disabled')
                document.getElementById('outlined-store').setAttribute('disabled', 'disabled')
                // debugger;
                console.log(res.data.data.seller)
            }
        }).catch(e => {
            debugger;
            console.log(e)
        })

        axios.get(' https://api.zacarta.com/api/admin/storeType', {
            headers: headers
        }).then(res => {
            if (res.status == 200) {
                this.setState({
                    storeTypes: res.data.data.storeTypes
                })
            }
        }).catch(e => {
            // this.setState({
            //     errOpen: true
            // })
            console.log(e)
        })
        let seller2 = JSON.parse(localStorage.getItem('seller'));
        // debugger;
        console.log(seller);
        this.setState({
            name: seller2.name,
            sellerEmail: seller2.email,
            sellerNumber: seller2.mobile,
            storeName: seller2.store_name,
            storeNumber: seller2.store_contact_number,
            address: seller2.store_address.address,
            position: {
                lat: seller2.store_address.geolocation.latitude,
                lng: seller2.store_address.geolocation.longitude,
            },
            // storeTypeId: seller ,
            sellerPicture: seller2.avatar,
            storePicture: seller2.store_image,
            hidden1: false,
            hidden2: false,
            picUpload: true,
            picUpload2: true
        })
    }
    onMarkerDragEnd = (coord, index) => {
        const { latLng } = coord;
        const lat = latLng.lat();
        const lng = latLng.lng();

        this.setState({
            // const markers = [...this.state.markers];
            // markers[index] = { ...markers[index], position: { lat, lng } };
            // return { markers };
            position: {
                lat: lat,
                lng: lng
            }
        });
    };


    change2 = (e) => {
        debugger;
        // fileReader.readAsDataURL(e.target.files[0])

        let val = e.target.files[0]
        if (e.target.files[0]) {
            var update = URL.createObjectURL(val)
            // let img = document.getElementById('img-1');
            // img.src = update
        }
        this.setState({
            [e.target.name]: e.target.files[0],
            hidden1: false,
            picUpload: false,
            image1: update

        })


    }
    handleChange = (e) => {
        debugger;
        // fileReader.readAsDataURL(e.target.files[0])
        let val = e.target.files[0]
        if (e.target.files[0]) {
            var update2 = URL.createObjectURL(val)
            // let img = document.getElementById('img-2');

            // img.src = update
        }
        this.setState({
            [e.target.name]: e.target.files[0],
            hidden2: false,
            picUpload2: false,

            image2: update2

        })
    }
    handleForm = e => {
        debugger
        this.setState({
            [e.target.name]: e.target.value,
        })
        console.log(this.state);
    }
    handle_seller_contact = e => {
        let num = e.replace(/(?!\w|\s)./g, '')
            .replace(/\s+/g, ' ')
            .replace(/^(\s*)([\W\w]*)(\b\s*$)/g, '$2');
        let num2 = num.replace(/\s/g, "");
        num2 = "+" + num2
        this.setState({
            sellerNumber: num2
        })
    }
    handle_store_contact = e => {
        let num = e.replace(/(?!\w|\s)./g, '')
            .replace(/\s+/g, ' ')
            .replace(/^(\s*)([\W\w]*)(\b\s*$)/g, '$2');
        let num2 = num.replace(/\s/g, "");
        num2 = "+" + num2
        this.setState({
            storeNumber: num2
        })
    }

    submitDetails = () => {
        let token = Cookies.get('a#$s!');

        console.log(this.state)
        const headers = {
            'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent> ',
            'Authorization': `bearer ${token}`
        }

        const data = new FormData();
        data.append('seller', this.state.seller);
        data.append('name', this.state.name);
        data.append('email', this.state.sellerEmail)
        data.append('mobile', this.state.sellerNumber)
        data.append('store_name', this.state.storeName)
        data.append('store_contact_number', this.state.storeNumber)
        data.append('address', this.state.address)
        data.append('latitude', this.state.position.lat)
        data.append('longitude', this.state.position.lng)
        data.append('store_types', this.state.storeTypeId)
        data.append('avatar', this.state.sellerPicture)
        data.append('store_image', this.state.storePicture)
        debugger;
        axios.put(' https://api.zacarta.com/api/admin/seller', data, {
            headers: headers
        }).then(res => {
            debugger;
            if (res.status == 200) {
                console.log(res.data)
                this.setState({
                    respOpen: true,
                    hiddenbtn: true,
                    dialogTitle: 'Seller Updated',
                    dialogBody: 'Seller Updated Successfuly',
                    name: res.data.data.seller.name,
                    sellerEmail: res.data.data.seller.email,
                    sellerNumber: res.data.data.seller.mobile,
                    storeName: res.data.data.seller.store_name,
                    storeNumber: res.data.data.seller.store_contact_number,
                    address: res.data.data.seller.store_address.address,
                    position: {
                        lat: res.data.data.seller.store_address.geolocation.latitude,
                        lng: res.data.data.seller.store_address.geolocation.longitude,
                    },
                    // storeTypeId: seller ,
                    sellerPicture: res.data.data.seller.avatar,
                    storePicture: res.data.data.seller.store_image
                })
                // localStorage.setItem('seller', res.data.seller)
                document.getElementById('outlined-name').setAttribute('disabled', 'disabled')
                document.getElementById('outlined-store-number').setAttribute('disabled', 'disabled')
                document.getElementById('outlined-number').setAttribute('disabled', 'disabled')

                document.getElementById('outlined-select-currency-native').setAttribute('disabled', 'disabled')
                // document.getElementById('outlined-seller-address').setAttribute('disabled', 'disabled')
                document.getElementById('react-google-places-autocomplete-input').setAttribute('disabled', 'disabled')
                document.getElementById('outlined-store').setAttribute('disabled', 'disabled')
            }
        }).catch(e => {

            debugger;
            this.setState({
                errOpen: true,
                dialogTitle: 'Error',
                dialogBody: 'Seller is not Updated',
            })
        })
    }



    onPlaceSelected = (place) => {

        geocodeByAddress(place.description)
            .then(results => getLatLng(results[0]))
            .then(({ lat, lng }) => {


                this.setState({
                    position: {
                        lat: lat,
                        lng: lng
                    },
                    address: place.description
                })
                console.log('Successfully got latitude and longitude', { lat, lng })

            }

            )

    }
    handleDispatch = () => {
        // console.log(e)
        store.dispatch({
            payload: this.state.store,
            type: 'SELLER'
        })
        localStorage.setItem('seller', JSON.stringify(this.state.store));
        console.log(this.state.store)
        debugger;
    }

    handleField = (e) => {
        this.setState({
            hiddenbtn: false
        })
        document.getElementById('outlined-name').removeAttribute('disabled')
        document.getElementById('outlined-store-number').removeAttribute('disabled')
        document.getElementById('outlined-select-currency-native').removeAttribute('disabled')
        // document.getElementById('outlined-seller-address').removeAttribute('disabled')
        document.getElementById('react-google-places-autocomplete-input').removeAttribute('disabled')
        document.getElementById('outlined-store').removeAttribute('disabled')
        // document.getElementById('outlined-name').setAttribute('disabled', 'disabled')

    }
    addCategory = (product, e) => {
        let categories = [...this.state.categories]
        let index = categories.findIndex(function (item) {
            return item == product._id
        })
        if (categories.length == 0) {
            categories.push(product._id)
            debugger
        } else if (index != -1) {
            categories.splice(index, 1)

            debugger

        } else {
            categories.push(product._id)
            debugger

        }
        // console.log(index)
        this.setState({
            categories: categories
        })

        console.log(categories)
    }

    classes = this.props


    render() {
        const { text, suggestions } = this.state;
        const { classes } = this.props


        return (
            <div className={classes.root}>

                <div className={'flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32'}>
                    <div className="flex flex-col items-center  w-full" style={{ marginTop: "1vh" }} >
                        <FuseAnimate animation="transition.expandIn">
                            <Card className="w-full max-w-500" >
                                <CardContent className="flex flex-col items-center" style={{ minHeight: "1600px" }}>
                                    <div className={styles1.heading}>
                                        <h1 >Seller Details</h1>
                                    </div>
                                    <div className={styles1.formdivsec}>
                                        <div className={styles1.formdiv}>
                                            {/* <Grid xs={12}> */}
                                            < Grid xs={12} item className={styles1.uigrids}>
                                                <form noValidate autoComplete="off">


                                                    <div>
                                                        <TextField
                                                            className={styles1.inpts}
                                                            onChange={this.handleForm}
                                                            name='name'
                                                            id="outlined-name"
                                                            label="Seller Name"
                                                            type="text"
                                                            variant="outlined"
                                                            value={this.state.name}
                                                        />
                                                        <TextField

                                                            className={styles1.inpts}
                                                            onChange={this.handleForm}
                                                            name='storeName'
                                                            id="outlined-store"
                                                            label="Store Name"
                                                            type="text"
                                                            variant="outlined"
                                                            value={this.state.storeName}

                                                        />



                                                    </div>
                                                    <div>
                                                        {/* <TextField
                                                            disabled
                                                            className={styles1.inpts}
                                                            onChange={this.handleForm}
                                                            name='sellerNumber'
                                                            id="outlined-number"
                                                            label="Seller Contact Number"
                                                            type="numeric"
                                                            variant="outlined"
                                                            value={this.state.sellerNumber}

                                                        /> */}
                                                        <MuiPhoneNumber defaultCountry={'us'}
                                                            onlyCountries={['us', 'in']}

                                                            onChange={this.handle_seller_contact}
                                                            value={this.state.sellerNumber}
                                                            variant="outlined"
                                                            id="outlined-number"
                                                            required
                                                            fullWidth
                                                            // className="mb-16"
                                                            className={styles1.inpts}
                                                            label="Seller Contact Number"
                                                            name="sellerNumber"

                                                        />
                                                        {/* <TextField
                                                            className={styles1.inpts}
                                                            onChange={this.handleForm}

                                                            name='storeNumber'
                                                            id="outlined-store-number"
                                                            label="Store Contact Number"
                                                            type="numeric"
                                                            variant="outlined"
                                                            value={this.state.storeNumber}

                                                        /> */}
                                                        <MuiPhoneNumber defaultCountry={'us'}
                                                            onlyCountries={['us', 'in']}

                                                            onChange={this.handle_store_contact}
                                                            value={this.state.storeNumber}
                                                            variant="outlined"
                                                            id="outlined-store-number"
                                                            required
                                                            fullWidth
                                                            // className="mb-16"
                                                            className={styles1.inpts}
                                                            label="Store Contact Number"
                                                            name="storeNumber"

                                                        />


                                                    </div>
                                                    <div>
                                                        <TextField
                                                            className={styles1.inpts}
                                                            onChange={this.handleForm}
                                                            disabled
                                                            name='sellerEmail'
                                                            id="outlined-seller-email"
                                                            label="Seller Email"
                                                            type="text"
                                                            variant="outlined"
                                                            value={this.state.sellerEmail}

                                                        />
                                                        <TextField
                                                            id="outlined-select-currency-native"
                                                            onChange={this.handleForm}

                                                            // name={this.state.typeName}
                                                            select
                                                            label="Store Type"
                                                            className={styles1.inpts}
                                                            // value="Test Type"
                                                            onChange={this.handleTypeChange}
                                                            SelectProps={{
                                                                native: true,
                                                            }}
                                                            // helperText="Please select your currency"
                                                            variant="outlined"
                                                        // value={this.state.storeType}

                                                        >
                                                            {/* {/* <option>a</option> */}
                                                            {/* <option>a</option>  */}

                                                            <option value={this.state.storeType._id}>{'' + this.state.storeType.title}</option>
                                                            {this.state.storeTypes.map((option) => (
                                                                <option key={option._id} name={option.title} value={option._id}>
                                                                    {option.title}
                                                                </option>
                                                            ))}
                                                        </TextField>
                                                    </div>
                                                    {/* <div>
                                                        <TextField
                                                            className={styles1.inpts}
                                                            onChange={this.handleForm}

                                                            name='address'
                                                            id="outlined-seller-address"
                                                            label="Address"
                                                            type="text"
                                                            variant="outlined"
                                                            value={this.state.address}

                                                        />
                                                    </div> */}

                                                    <div style={{ display: 'flex' }}>
                                                        <div style={{ marginLeft: '2%' }}>
                                                            <InputLabel id="demo-controlled-open-select-label"
                                                                name='sellerPicture'
                                                                onChange={this.handleForm}

                                                            >Upload Seller Picture</InputLabel>

                                                        </div>
                                                        <div style={{ marginLeft: '41%' }}>
                                                            <InputLabel id="demo-controlled-open-select-label"
                                                                name='storePicture'
                                                            >Upload Store Picture</InputLabel>

                                                        </div>
                                                    </div>

                                                    <div className={styles1.umagescontiner}>

                                                        {/* <div> */}
                                                        <div className={styles1.images}>
                                                            <img id='img-1' src={this.state.picUpload ? 'https://api.zacarta.com/' + this.state.sellerPicture : this.state.image1} className={this.state.hidden1 ? styles1.hidden1 : styles1.imagetag} alt="image" />
                                                            <input
                                                                // onChange={this.handleChanging}
                                                                hidden
                                                                name='sellerPicture'
                                                                accept="image/*"
                                                                onChange={this.change2}
                                                                className={classes.input}
                                                                id="contained-button-file"
                                                                multiple
                                                                type="file"
                                                            />
                                                            <label htmlFor="contained-button-file">
                                                                <IconButton color="primary" aria-label="upload picture" component="span">
                                                                    <span className={this.state.hidden1 ? '' : styles1.hidden1}><PublishIcon ></PublishIcon></span>

                                                                </IconButton>
                                                                <div className={this.state.hiddenbtn ? styles1.hidden : styles1.changegrid}>
                                                                    <h5>Change Image</h5>
                                                                </div>
                                                            </label>
                                                            {/* </div> */}
                                                        </div>
                                                        <div className={styles1.images} id={styles1.second_image}>
                                                            <img id='img-2' src={this.state.picUpload2 ? 'https://api.zacarta.com/' + this.state.storePicture : this.state.image2} className={this.state.hidden2 ? styles1.hidden1 : styles1.imagetag} alt="image" className={this.state.hidden2 ? styles1.hidden2 : styles1.imagetag} />
                                                            <input
                                                                onChange={this.handleChange}
                                                                hidden
                                                                name='storePicture'
                                                                accept="image/*"
                                                                className={classes.input}
                                                                id="contained-button-s"
                                                                multiple
                                                                type="file"
                                                            />
                                                            <label htmlFor="contained-button-s">
                                                                <IconButton color="primary" aria-label="upload picture" component="span">
                                                                    <span className={this.state.hidden2 ? '' : styles1.hidden2}> <PublishIcon className={styles1.upload}></PublishIcon></span>

                                                                </IconButton>
                                                                <div className={this.state.hiddenbtn ? styles1.hidden : styles1.changegrid}>
                                                                    <h5>Change Image</h5>
                                                                </div>
                                                            </label>

                                                        </div>
                                                    </div>
                                                </form>
                                            </Grid>
                                        </div>
                                        <div className={styles1.mapcont}>
                                            <Grid xs={12} item className={styles1.uigrids}>

                                                <GooglePlacesAutocomplete

                                                    inputStyle={{
                                                        width: '100%',
                                                        height: '40px',
                                                        paddingLeft: '16px',
                                                        marginTop: '10px',
                                                        border: '1px solid #f26836',
                                                        borderRadius: '5px'
                                                    }
                                                    }
                                                    suggestionsClassNames={{ suggestion: 'abc' }}
                                                    suggestionsStyles={
                                                        {
                                                            container: {
                                                                // color: 'red',
                                                            },
                                                            suggestion: {
                                                                fontSize: "20px",
                                                                borderBottom: "1px solid lightgray"
                                                            },
                                                            suggestion: {
                                                                fontSize: "20px",
                                                                borderBottom: "1px solid lightgray"
                                                            }

                                                        }
                                                    }
                                                    onSelect={this.onPlaceSelected}
                                                />
                                                <Map

                                                    google={this.props.google}
                                                    className={styles1.mapdiv}
                                                    center={{
                                                        lat: this.state.position.lat,
                                                        lng: this.state.position.lng
                                                    }}
                                                    // style={{
                                                    //     width: '19.7%',
                                                    //     height: '30.4vh ',
                                                    //     borderRadius: "5px"
                                                    // }}
                                                    zoom={14}
                                                >
                                                    {/* {this.state.markers.map((marker, index) => ( */}
                                                    <Marker

                                                        position={this.state.position}
                                                        draggable={true}
                                                        onDragend={(t, map, coord) => this.onMarkerDragEnd(coord)}
                                                    />
                                                </Map>
                                            </Grid>
                                        </div>
                                        <Grid xs={6} item></Grid>
                                        <Grid xs={6} item className={styles1.btndiv}>
                                            {/* <Link to='/seller' className={styles1.linkcls}> */}
                                            <Button className={this.state.hiddenbtn ? styles1.hidden : styles1.submitbtn} onClick={this.submitDetails} variant="contained" color="primary" component="span">
                                                <SaveIcon /> Save
                                                           </Button>
                                            <Button className={this.state.hiddenbtn ? styles1.submitbtn : styles1.hidden} onClick={this.handleField} variant="contained" color="primary" component="span">
                                                <EditIcon /> Edit
                                                           </Button>
                                            {/* </Link> */}
                                        </Grid>
                                        {/* </Grid> */}
                                    </div>
                                    {/* <div className={styles1.editsellerbtn}>
                                        <Link to='/edit-seller' className={styles1.linkcls} onClick={this.handleDispatch}>
                                            <Button variant="contained" color="primary" >
                                                <EditIcon />  Edit Seller
                                            </Button>
                                        </Link>
                                    </div> */}
                                    {/* <div className={styles1.flexcontainermain}>
                                        <div style={overMap} >
                                            <h4 className={styles1.headtittle}>Seller Inofrmation</h4>
                                            <div className={styles1.flexcontainer1}>
                                                <div className={styles1.sellerpicture}><img src={'https://api.zacarta.com/' + this.state.store.avatar} /></div>
                                                <div className={styles1.tbldiv}>
                                                    <table className={styles1.tbl}>
                                                        <tbody>
                                                            <tr><td>

                                                                <th>{this.state.store.name}</th>
                                                            </td>
                                                            </tr>
                                                            <tr>
                                                                <td>{this.state.store.mobile}</td>
                                                            </tr>
                                                            <tr></tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles1.sellerDetails} style={overMap} id="over_map">
                                            <h4 className={styles1.headtittle}>Store Inofrmation</h4>
                                            <div className={styles1.flexcontainer1}>
                                                <div className={styles1.sellerpicture}><img src={'https://api.zacarta.com/' + this.state.store.store_image} /></div>
                                                <div className={styles1.tbldiv}>
                                                    <table className={styles1.tbl}>
                                                        <tbody>
                                                            <tr><td>

                                                                <th>{this.state.store.store_name}</th>
                                                            </td>
                                                            </tr>
                                                            <tr>
                                                                <td>{this.state.address}</td>
                                                            </tr>
                                                            <tr>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>

                                            </div>
                                        </div>
                                    </div> */}


                                </CardContent>

                            </Card>

                        </FuseAnimate>

                    </div>
                </div>
                <div className={'flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32'}>
                    <div className="flex flex-col items-center  w-full" style={{ marginTop: "-5vh" }} >
                        <FuseAnimate animation="transition.expandIn">
                            <Card className="w-full max-w-500" >
                                <CardContent className="flex flex-col items-center" style={{ height: "100%" }}>
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
                                                            <b> {'Price: ' + this.state.price} </b>
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
                                    {/* add product dialog */}

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
                                                {this.state.dialogBody}

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
                                                {this.state.dialogBody}
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

                                    {/* Actual body */}
                                    <div className={styles1.addsellerbtn}>
                                        <div className={styles1.heading}>
                                            <h1 >Categories</h1>
                                        </div>

                                    </div>
                                    {/* <div className={styles1.search}>
                                        <Autocompletee
                                            id="search"
                                            freeSolo
                                            value={this.state.searchText}
                                            onChange={this.onTextChange}
                                            onClick={this.sellerAddProduct}
                                            options={this.state.excludedProducts.map((item) => item.title)}
                                            renderInput={(params) => (
                                                <TextField {...params} label="Search" margin="normal" variant="outlined" />
                                            )}
                                        />
                                    </div> */}
                                    <div className={styles1.tablecontainer}>
                                        <div className={styles1.tablesections}>
                                            <TableContainer className={classes.container}>
                                                <Table stickyHeader aria-label="sticky table">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell className={styles1.tablecell} >

                                                                Select
                                                    </TableCell>
                                                            <TableCell >
                                                                Category
                                                    </TableCell>
                                                            {/* <TableCell >
                                                            Products
                                                    </TableCell> */}
                                                            {/* <TableCell className={styles1.prostorename}>
                                                        Unit Type
                                                    </TableCell>
                                                    <TableCell>Unit Price</TableCell> */}
                                                            {/* <TableCell >
                                                            Action
                                                    </TableCell> */}
                                                            {/* <TableCell >
                                                        View
                                                    </TableCell> */}
                                                            {/* <TableCell >
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
                                                        {
                                                            this.state.excludedProducts
                                                                .slice(this.state.pagee1 * this.state.rowsPerPage1,
                                                                    this.state.pagee1 * this.state.rowsPerPage1 + this.state.rowsPerPage1).map((product, index) => {
                                                                        return (
                                                                            <TableRow hover>

                                                                                <TableCell>
                                                                                    <FormControlLabel

                                                                                        control={
                                                                                            <Checkbox
                                                                                                checked={this.state.checkedB}
                                                                                                onChange={this.addCategory.bind(this, product)}
                                                                                                name="add"
                                                                                                color="primary"
                                                                                            />
                                                                                        }
                                                                                    // label="US"
                                                                                    />

                                                                                </TableCell>
                                                                                {/* <TableCell>{index + 1}</TableCell> */}
                                                                                {/* <TableCell>{product.name}</TableCell> */}

                                                                                <TableCell className={styles1.propic} ><img src={'https://api.zacarta.com/' + product.icon} /><div className={styles1.propicdiv}><div><div >{product.title}</div></div></div></TableCell>
                                                                                {/* <TableCell>{product.category.title}</TableCell> */}

                                                                                {/* <TableCell>{product.unit.title}</TableCell>

                                                                        <TableCell>{product.price}</TableCell> */}
                                                                                {/* <TableCell></TableCell> */}


                                                                                {/* <TableCell>
                                                                            <Button variant="contained" size="small" color="primary" onClick={this.setProductDetails.bind(this, product)}>
                                                                                <PageviewIcon /> View
                                                            </Button>
                                                                        </TableCell> */}
                                                                                {/* <TableCell>
                                                                                <Button variant="contained" size="small" color="primary" onClick={this.removeProduct.bind(this, product, index)}>
                                                                                    <DeleteForeverIcon />
                                                                                </Button>
                                                                            </TableCell> */}
                                                                            </TableRow>
                                                                        )
                                                                    })
                                                        }
                                                        <TableRow className={this.state.categories.length == 0 ? styles1.hidden2 : 0}>
                                                            <TableCell></TableCell>
                                                            {/* <TableCell></TableCell> */}
                                                            {/* <TableCell></TableCell> */}
                                                            <TableCell className={styles1.btnrow}>

                                                                <Button onClick={this.sellerAddProduct} variant="contained" color="primary">Save</Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                            <TablePagination
                                                rowsPerPageOptions={[10, 25, 100]}
                                                component="div"
                                                count={this.state.excludedProducts.length}
                                                rowsPerPage={this.state.rowsPerPage1}
                                                page={this.state.pagee1}
                                                onChangePage={this.handleChangePage1}
                                                onChangeRowsPerPage={this.handleChangeRowsPerPage1}

                                                
                                            />
                                        </div>
                                        <div className={styles1.tablesections}>
                                            <TableContainer className={classes.container}>
                                                <Table stickyHeader aria-label="sticky table">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell >
                                                                Sr.#
                                                    </TableCell>
                                                            <TableCell >
                                                                Category
                                                    </TableCell>
                                                            {/* <TableCell >
                                                            Products
                                                    </TableCell> */}
                                                            {/* <TableCell className={styles1.prostorename}>
                                                        Unit Type
                                                    </TableCell>
                                                    <TableCell>Unit Price</TableCell> */}
                                                            <TableCell >
                                                                Action
                                                    </TableCell>
                                                            {/* <TableCell >
                                                        View
                                                    </TableCell> */}
                                                            <TableCell >
                                                                Delete
                                                    </TableCell>
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
                                                        {
                                                            this.state.products
                                                                .slice(this.state.page * this.state.rowsPerPage,
                                                                    this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((product, index) => {
                                                                        return (
                                                                            <TableRow hover>

                                                                                <TableCell>{index + 1}</TableCell>
                                                                                {/* <TableCell>{product.name}</TableCell> */}

                                                                                <TableCell className={styles1.propic} ><img src={'https://api.zacarta.com/' + product.icon} /><div className={styles1.propicdiv}><div><div >{product.title}</div></div></div></TableCell>
                                                                                {/* <TableCell>{product.category.title}</TableCell> */}

                                                                                {/* <TableCell>{product.unit.title}</TableCell>

                                                                        <TableCell>{product.price}</TableCell> */}
                                                                                {/* <TableCell></TableCell> */}

                                                                                <TableCell>
                                                                                    <FormControlLabel
                                                                                        control={
                                                                                            <Switch
                                                                                                checked={product.active}
                                                                                                onChange={this.toggleSellerCategory.bind(this, product)}
                                                                                                name={product.sr}
                                                                                                color="primary"
                                                                                            />
                                                                                        }
                                                                                    />

                                                                                </TableCell>
                                                                                {/* <TableCell>
                                                                            <Button variant="contained" size="small" color="primary" onClick={this.setProductDetails.bind(this, product)}>
                                                                                <PageviewIcon /> View
                                                            </Button>
                                                                        </TableCell> */}
                                                                                <TableCell>
                                                                                    <Button variant="contained" size="small" color="primary" onClick={this.removeProduct.bind(this, product, index)}>
                                                                                        <DeleteForeverIcon />
                                                                                    </Button>
                                                                                </TableCell>
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
                                        </div>
                                    </div>
                                </CardContent>

                            </Card>
                            {/* <CardContent>
                                <div>ddddddddddddddddddd</div>
                            </CardContent> */}
                        </FuseAnimate>
                    </div>
                </div>
            </div >
        );
    }
}
SellerDetails.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        seller: state.fuse.seller.seller

    }

}
let ConnectedSellerDetails = connect(mapStateToProps)(SellerDetails);


export default compose(GoogleApiWrapper({
    // apiKey: 'AIzaSyAd4Ne-6KGiOXB6rnYY_lxEW0o8YUUmvjM'
    apiKey: "https://maps.googleapis.com/maps/api/js?v=weekly&key=AIzaSyDbtagfH98A-FpI31sAYzX0M2J1rei8Qt0&libraries=places&callback=initMap"
}), withStyles(styles)
)(ConnectedSellerDetails); 