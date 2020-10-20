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
import Autocomplete from 'react-google-autocomplete';

import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import TextField from '@material-ui/core/TextField';
// import Autocomplete from '@material-ui/lab/Autocomplete';
import StorefrontIcon from '@material-ui/icons/Storefront';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import Modal from '@material-ui/core/Modal';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import SaveIcon from '@material-ui/icons/Save';
import PublishIcon from '@material-ui/icons/Publish';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';

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

import { connect } from 'react-redux';


import styles1 from './myStyle.module.css';

import picture from '../../fall-glow-small.jpg'
import { tr } from 'date-fns/locale';



const styles = theme => ({
    root: {
        background: `radial-gradient(${darken(theme.palette.primary.dark, 0.5)} 0%, ${theme.palette.primary.dark} 80%)`,
        color: theme.palette.primary.contrastText,
        width: "auto"
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

const hidden = {
    display: 'hidden'
}



// const classes = useStyles();
// function HomePage() {
class EditSellerPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            image1: '',
            image2: '',
            hidden1: true,
            hidden2: true,
            success: false,
            open: false,
            errOpen: false,
            // checkedA: true,
            sr: true,
            // storeType: 'none',
            storeTypes: [
                "type1", "Type2", "Type3"
            ],
            images: [],
            name: '',
            sellerNumber: '',
            sellerEmail: '',
            sellerPicture: '',
            address: '',
            storeName: '',
            storeNumber: '',
            storeTypeId: '',
            storePicture: '',
            seller: '',


            position: {
                lat: 37.77,
                lng: -122.42
            }



        }
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
    handleTypeChange = (event) => {
        this.setState({
            storeType: event.target.value
        });
    };

    change2 = (e) => {
        debugger;
        // fileReader.readAsDataURL(e.target.files[0])
        let val = e.target.files[0]
        if (e.target.files[0]) {
            let update = URL.createObjectURL(val)
            let img = document.getElementById('img-1');
            img.src = update

        }
        this.setState({
            [e.target.name]: e.target.files[0],
            hidden1: false,
        })

    }
   
    handleChange = (e) => {
        debugger;
        // fileReader.readAsDataURL(e.target.files[0])
        let val = e.target.files[0]
        if (e.target.files[0]) {
            let update = URL.createObjectURL(val)
            let img = document.getElementById('img-2');
            img.src = update

        }
        this.setState({
            [e.target.name]: e.target.files[0],
            hidden2: false,
        })
    }
    handleForm = e => {
        this.setState({
            [e.target.name]: e.target.value,
        })
        console.log(this.state);
    }
    componentDidMount() {
        let token = Cookies.get('a#$s!');

        if (!token) {
            this.props.history.push('/login');
        }
        let seller = JSON.parse(localStorage.getItem('seller'));
        // console.log(seller);
        // debugger;
        this.setState({
            name: seller.name,
            sellerEmail: seller.email,
            sellerNumber: seller.mobile,
            storeName: seller.store_name,
            storeNumber: seller.store_contact_number,
            address: seller.store_address.address,
            // markers: seller.store_address.geolocation,
            // [markers.position.lng]: seller.store_address.geolocation.longitude,
            // storeTypeId: seller ,
            sellerPicture: seller.avatar,
            storePicture: seller.store_image,
            hidden1: false,
            hidden2: false
        })
    }
    submitDetails = () => {
        let token = Cookies.get('a#$s!');

        const headers = {
            'Content-Type': 'multipart/form-data ',
            'Authorization': `bearer ${token}`
        }

        let data = {
            name: this.state.name,
            email: this.state.sellerEmail,
            mobile: this.state.sellerNumber,
            store_name: this.state.storeName,
            store_contact_number: this.state.storeNumber,
            address: this.state.address,
            latitude: this.state.position.lat,
            longitude: this.state.position.lng,
            store_types: this.state.storeTypeId,
            avatar: this.state.sellerPicture,
            store_image: this.state.storePicture
        }

        axios.post(' https://api.zacarta.com/api/admin/seller', data, {
            headers: headers
        }).then(res => {
            if (res.status == 200) {
                this.setState({
                    open: true
                })
            }
        }).catch(e => {
            this.setState({
                errOpen: true
            })
        })
    }
    handleerrClose = () => {
        this.setState({
            errOpen: false
        })
    };

    handleClose = () => {
        this.setState({
            open: false
        })
    };

    onPlaceSelected = (place) => {
        // const address = place.formatted_address,
        //     addressArray = place.address_components,
        //     city = this.getCity(addressArray),
        //     area = this.getArea(addressArray),
        //     state = this.getState(addressArray),
        let latValue = place.geometry.location.lat();
        let lngValue = place.geometry.location.lng();
        // Set these values in the state.
        console.log(latValue, lngValue);

        this.setState({
            // address: (address) ? address : '',
            // area: (area) ? area : '',
            // city: (city) ? city : '',
            // state: (state) ? state : '',

            position: {
                lat: latValue,
                lng: lngValue
            }


            // mapPosition: {
            //     lat: latValue,
            //     lng: lngValue
            // },
        })
    }

    render() {
        const { text, suggestions } = this.state;
        const { classes } = this.props


        return (
            <div className={classes.root}>

                <div className={'flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32'}  >
                    <div className="flex flex-col items-center  w-full" style={{ marginTop: "2vh" }}>
                        <FuseAnimate animation="transition.expandIn">
                            <Card className="w-full max-w-800" >
                                <CardContent className="flex flex-col items-center" style={{ minWidth: "591px", height: "1400px"  }} >
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
                                        open={this.state.open}
                                        onClose={this.handleClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogTitle id="alert-dialog-title">{"Seller Added"}</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                                Seller is Successfuly Updated.
                                        </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Link to='/seller-detail'>
                                                <Button onClick={this.handleClose} color="primary">
                                                    Close
                                              </Button>
                                            </Link>
                                        </DialogActions>
                                    </Dialog>
                                    <div className={styles1.heading}>
                                        <h1 >Edit Seller</h1>
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
                                                        <TextField
                                                            className={styles1.inpts}
                                                            onChange={this.handleForm}
                                                            name='sellerNumber'
                                                            id="outlined-number"
                                                            label="Seller Contact Number"
                                                            type="numeric"
                                                            variant="outlined"
                                                            value={this.state.sellerNumber}

                                                        />
                                                        <TextField
                                                            className={styles1.inpts}
                                                            onChange={this.handleForm}

                                                            name='storeNumber'
                                                            id="outlined-store-number"
                                                            label="Store Contact Number"
                                                            type="numeric"
                                                            variant="outlined"
                                                            value={this.state.storeNumber}

                                                        />


                                                    </div>
                                                    <div>
                                                        <TextField
                                                            className={styles1.inpts}
                                                            onChange={this.handleForm}

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

                                                            name='storeType'
                                                            select
                                                            label="Store Type"
                                                            className={styles1.inpts}
                                                            // value={this.state.weight}
                                                            onChange={this.handleTypeChange}
                                                            SelectProps={{
                                                                native: true,
                                                            }}
                                                            // helperText="Please select your currency"
                                                            variant="outlined"
                                                            value={this.state.storeType}

                                                        >
                                                            {<option className={styles1.inphidden} value=''></option>}
                                                            {this.state.storeTypes.map((option) => (
                                                                <option key={option} value={option}>
                                                                    {option}
                                                                </option>
                                                            ))}
                                                        </TextField>
                                                    </div>
                                                    <div>
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
                                                    </div>

                                                    <div style={{ display: 'flex' }}>
                                                        <div style={{ marginLeft: '2%' }}>
                                                            <InputLabel id="demo-controlled-open-select-label"
                                                                name='sellerPicture'
                                                                onChange={this.handleForm}

                                                            >Upload Seller Picture</InputLabel>

                                                        </div>
                                                        <div style={{ marginLeft: '37.6%' }}>
                                                            <InputLabel id="demo-controlled-open-select-label"
                                                                name='storePicture'
                                                            >Upload Store Picture</InputLabel>

                                                        </div>
                                                    </div>

                                                    <div className={styles1.umagescontiner}>

                                                        {/* <div> */}
                                                        <div className={styles1.images}>
                                                            <img id='img-1' src={'https://api.zacarta.com/' + this.state.sellerPicture} className={this.state.hidden1 ? styles1.hidden1 : styles1.imagetag} alt="image" />
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
                                                            </label>
                                                            {/* </div> */}
                                                        </div>
                                                        <div className={styles1.images}>
                                                            <img id='img-2' src={'https://api.zacarta.com/' + this.state.storePicture} alt="image" className={this.state.hidden2 ? styles1.hidden2 : styles1.imagetag} />
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
                                                            </label>

                                                        </div>
                                                    </div>
                                                </form>
                                            </Grid>
                                        </div>
                                        <div className={styles1.mapcont}>
                                            <Grid xs={12} item className={styles1.uigrids}>
                                                <Autocomplete
                                                    style={{
                                                        width: '100%',
                                                        height: '40px',
                                                        paddingLeft: '16px',
                                                        marginTop: '10px',
                                                        border: '1px solid #f26836',
                                                        borderRadius: '5px'
                                                        // marginBottom: '500px'
                                                    }}
                                                    onPlaceSelected={this.onPlaceSelected}
                                                    types={['(regions)']}
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
                                            <Button className={styles1.submitbtn} onClick={this.submitDetails} variant="contained" color="primary" component="span">
                                                <SaveIcon /> Save
                                                           </Button>
                                            {/* </Link> */}
                                        </Grid>
                                        {/* </Grid> */}
                                    </div>
                                </CardContent>
                            </Card>
                        </FuseAnimate>
                    </div>
                </div>
            </div >
        );
    }
}
EditSellerPage.propTypes = {
    classes: PropTypes.object.isRequired,
};


function mapStateToProps(state) {
    return {
        seller: state.fuse.seller.seller

    }
}
let ConnectedSellerDetails = connect(mapStateToProps)(EditSellerPage);


export default compose(GoogleApiWrapper({
    // apiKey: 'AIzaSyAd4Ne-6KGiOXB6rnYY_lxEW0o8YUUmvjM'
    apiKey: "https://maps.googleapis.com/maps/api/js?v=weekly&key=AIzaSyDbtagfH98A-FpI31sAYzX0M2J1rei8Qt0&callback=initMap"
}), withStyles(styles)
)(ConnectedSellerDetails); 