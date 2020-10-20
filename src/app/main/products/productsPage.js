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
            weight: "1kg",
            quantities: 1,

            products: [
                { name: "product1", price: '10', sr: ' 1', unit: ['ML'], picture: picture, des: "This is a good product for daily use at home office or work space. Customer can us it in resturant" },
                { name: "product2", price: '10', sr: ' 2', unit: ['ML'], picture: picture, des: "This is a good product for daily use at home office or work space. Customer can us it in resturant" },
                { name: "product3", price: '10', sr: ' 3', unit: ['ML'], picture: picture, des: "This is a good product for daily use at home office or work space. Customer can us it in resturant" },
                { name: "product4", price: '10', sr: ' 4', unit: ['ML'], picture: picture, des: "This is a good product for daily use at home office or work space. Customer can us it in resturant" },
                { name: "product5", price: '10', sr: '5 ', unit: ['ML'], picture: picture, des: "This is a good product for daily use at home office or work space. Customer can us it in resturant" },
                { name: "product6", price: '10', sr: ' 6', unit: ['ML'], picture: picture, des: "This is a good product for daily use at home office or work space. Customer can us it in resturant" },
                { name: "product7", price: '10', sr: ' 7', unit: ['ML'], picture: picture, des: "This is a good product for daily use at home office or work space. Customer can us it in resturant" },
                { name: "product8", price: '10', sr: ' 8', unit: ['ML'], picture: picture, des: "This is a good product for daily use at home office or work space. Customer can us it in resturant" },
                { name: "product9", price: '10', sr: ' 9', unit: ['ML'], picture: picture, des: "This is a good product for daily use at home office or work space. Customer can us it in resturant" },
                { name: "product10", price: '10', sr: ' 10', unit: ['ML'], picture: picture, des: "This is a good product for daily use at home office or work space. Customer can us it in resturant" },
                { name: "product111", price: '10', sr: ' 11', unit: ['ML'], picture: picture, des: "This is a good product for daily use at home office or work space. Customer can us it in resturant" },
                { name: "product12", price: '10', sr: ' 12', unit: ['ML'], picture: picture, des: "This is a good product for daily use at home office or work space. Customer can us it in resturant" },
                { name: "product13", price: '10', sr: '13 ', unit: ['ML'], picture: picture, des: "This is a good product for daily use at home office or work space. Customer can us it in resturant" },

            ],


        }
    }
    pictures = [
        picture, picture, picture
    ]
    quantities = [
        {
            value: '1',

        },
        {
            value: '2',
        },
        {
            value: '3',
        },
        {
            value: '4',
        },
    ];
    weightes = [
        {
            value: 'KG',
        },
        {
            value: 'ML',
        },
        {
            value: 'GM',
        },

    ];

    onTextChange = (e) => {
        let value = e.target.textContent;
        debugger;
        let suggestions = [];
        const regex = new RegExp(`^${value}`, 'i');
        if (value.length > 0) {
            for (const item of this.state.products) {
                console.log(item);

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

    handleSwitchChange = (event) => {
        this.setState({ [event.target.name]: event.target.checked });
    };
    handleChangePage = (event,page) => {
        // setPage(newPage);
        console.log(event )
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
    handleAddProductClose = () => {
        this.setState({
            setAddProductOpen: false
        })
    };
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
                // this.setState({
                //     products: res.data.data.products
                // });
            }
        })
    }

    classes = this.props

    body = (
        <Card className={styles1.abc}>
            <CardActionArea>

                <div className={styles1.productflex}>
                    <div>
                        <h2>Product Details</h2>
                    </div>
                    <div className={styles1.closebtn} onClick={this.handleClose} >
                        X
                </div>
                </div>
                <CardContent >
                    <Typography gutterBottom variant="h5" component="h2" className={styles1.modaldes}>
                        Lizard
      </Typography>
                    <CardContent className={styles1.flextest}>
                        <CardMedia
                            className={this.classes.media, styles1.modalmedia}
                            image={picture}
                            title="Contemplative Reptile"
                        >
                            {/* <img src={picture} /> */}

                        </CardMedia>
                        <Typography variant="body2" color="textSecondary" component="p" className={styles1.modaldes}>
                            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                            across all continents except Antarctica
      </Typography>
                    </CardContent>
                    <Typography variant="body2" color="textSecondary" component="p" className={styles1.modaldes}>
                        <b> Price: 15 </b>
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <TextField
                    label="Quantity"
                    disabled
                    className={styles1.dropdown}
                    value={this.quantities[0].value}
                    onChange={this.handleQuantityChange}
                    SelectProps={{
                        native: true,
                    }}
                    type='number'

                    // helperText="Please select your currency"
                    variant="outlined"
                >
                </TextField>
                <TextField
                    label="Unit"
                    disabled
                    className={styles1.dropdown}
                    value={this.weightes[0].value}
                    onChange={this.handleWeightChange}
                    SelectProps={{
                        native: true,
                    }}
                    type='text'

                    // helperText="Please select your currency"
                    variant="outlined"
                >
                </TextField>
                {/* 
                <Button variant="contained" size="small" color="primary" onClick={this.handleClose} >
                    <AddShoppingCartIcon /> Add to Cart
    </Button> */}
            </CardActions>
        </Card>
    );
    body2 = (
        <Card className={styles1.abc}>
            <CardActionArea>

                <div className={styles1.productflex}>
                    <div>
                        <h2>Add Product</h2>
                    </div>
                    <div className={styles1.closebtn2} onClick={this.handleAddProductClose} >
                        X
                </div>
                </div>

            </CardActionArea>
            <CardActions>
                <TextField
                    className={styles1.inpts}
                    id="outlined-name"
                    label="Product Name"
                    type="text"
                    variant="outlined"
                />
            </CardActions>
            <CardActions>
                <TextField
                    className={styles1.inpts}
                    id="outlined-name"
                    label="Product Description"
                    type="text"
                    variant="outlined"
                />
            </CardActions>
            <CardActions>
                <TextField
                    label="Unit Price"
                    className={styles1.dropdown}
                    // value={this.quantities[0].value}
                    onChange={this.handleQuantityChange}
                    SelectProps={{
                        native: true,
                    }}
                    type='number'

                    // helperText="Please select your currency"
                    variant="outlined"
                >
                </TextField>
                <TextField
                    id="outlined-select-currency-native"
                    select
                    label="Weight"
                    className={styles1.dropdown}
                    // value={this.state.weight}
                    onChange={this.handleWeightChange}
                    SelectProps={{
                        native: true,
                    }}
                    // helperText="Please select your currency"
                    variant="outlined"
                >
                    {this.weightes.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.value}
                        </option>
                    ))}
                </TextField>

            </CardActions>
            <CardActions className={styles1.picmaincontain}>
                {/* <div > */}
                {this.pictures.map(item => {
                    return <div className={styles1.upldpic}><img src={item} /></div>
                })

                }
                {/* </div> */}

                <input
                    accept="image/*"
                    className={styles1.inphidden}
                    id="contained-button-file"
                    multiple
                    type="file"
                />
                <label htmlFor="contained-button-file">
                    <Button className={styles1.inpts, styles1.filebtn} variant="contained" color="primary" component="span">
                        Upload Image
                    </Button>
                </label>

            </CardActions>
            <CardActions>
                <Button className={styles1.btnsave} variant="contained" size="small" color="primary" onClick={this.handleAddProductClose} >
                    <SaveIcon /> Save
                </Button>
            </CardActions>
        </Card>
    );

    render() {
        const { text, suggestions } = this.state;
        const { classes } = this.props


        return (
            <div className={classes.root}>

                <div className={'flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32'}>
                    <div className="flex flex-col items-center  w-full" style={{ height: "100vh", marginTop: "1vh" }}>
                        <FuseAnimate animation="transition.expandIn">
                            <Card className="w-full max-w-500" >
                                <CardContent className="flex flex-col items-center" style={{ height: "100%" }}>
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
                                                    <TableCell >
                                                        View
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
                                                {this.state.suggestions.length == 0 ? this.state.products.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((product, index) => {
                                                    return (
                                                        <TableRow hover>

                                                            <TableCell>{product.sr}</TableCell>
                                                            {/* <TableCell>{product.name}</TableCell> */}

                                                            <TableCell className={styles1.propic} ><img src={product.picture} /><div className={styles1.propicdiv}><div><div >{product.name}</div></div></div></TableCell>

                                                            <TableCell>{product.unit}</TableCell>
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
                                                            <TableCell>
                                                                {/* <Link to='seller-details' className={styles1.linkcls}> */}
                                                                <Button variant="contained" size="small" color="primary" onClick={this.handleOpen}>
                                                                    <PageviewIcon /> View
                                                            </Button>
                                                                {/* </Link> */}
                                                            </TableCell>
                                                            
                                                        </TableRow>
                                                    )
                                                }) : this.state.suggestions.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((product, index) => {
                                                    return (
                                                        <TableRow hover>
                                                            <TableCell>{product.sr}</TableCell>
                                                            {/* <TableCell>{product.na}</TableCell> */}

                                                            <TableCell className={styles1.propic} ><img src={product.picture} /><div className={styles1.propicdiv}><div><div >{product.name}</div></div></div></TableCell>

                                                            <TableCell>{product.unit}</TableCell>
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
                                                            <TableCell>
                                                                {/* <Link to='seller-details' className={styles1.linkcls}>/ */}
                                                                <Button variant="contained" size="small" color="primary" onClick={this.handleOpen}>
                                                                    <PageviewIcon /> View
                                                                </Button>
                                                                {/* </Link> */}
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
ProductsPage.propTypes = {
    classes: PropTypes.object.isRequired,
};


function mapStateToProps(state) {
    return {
        seller: state.fuse.seller.seller

    }
}
let ConnectedProductsPage = connect(mapStateToProps)(ProductsPage);


export default withStyles(styles)(ConnectedProductsPage);
