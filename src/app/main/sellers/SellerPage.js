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
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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

import picture from '../../fall-glow-small.jpg'
import store from '../../store/index';


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
class SellersPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedStore: '',
            setRowsPerPage: 10,
            setPage: 0,
            page: 0,
            rowsPerPage: 10,
            // checkedA: true,
            active: true,
            suggestions: [],
            text: '',
            stores: [],
            checked: null,
            errOpen: false


        }
    }

    onTextChange = (e) => {
        let value = e.target.textContent;
        debugger;
        let suggestions = [];
        const regex = new RegExp(`^${value}`, 'i');
        if (value.length > 0) {
            for (const item of this.state.stores) {
                console.log(item);

                if (item.store_name.includes(value)) {
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
        // setPage(newPage);
        console.log(event)
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

    componentDidMount() {
        let token = Cookies.get('a#$s!');

        if (!token) {
            this.props.history.push('/login');
        }
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${token}`


            // 'Authorization': 'JWT fefege...'
        }
        axios.get('https://api.zacarta.com/api/admin/seller', {
            headers: headers
        }).then(res => {
            if (res.status == 200) {
                this.setState({
                    stores: res.data.data.sellers
                });
            }
        })

    }

    deleteSeller = (seller, e) => {

        let token = Cookies.get('a#$s!');

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${token}`
        }
        axios.post('https://api.zacarta.com/api/admin/seller/delete', { seller: seller._id }, {
            headers: headers
        }).then(res => {
            if (res.status == 200) {
                this.setState({
                    stores: res.data.data.seller,
                    errOpen:true

                });
            }
        })
    }
    handleSwitchChange = (seller, e) => {
        let token = Cookies.get('a#$s!');

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${token}`
        }
        axios.post('https://api.zacarta.com/api/admin/seller/toggle', { seller: seller._id }, {
            headers: headers
        }).then(res => {
            if (res.status == 200) {
                this.setState({
                    stores: res.data.data.seller,
                });
            }
        })
    };
    handleerrClose = () => {
        this.setState({
            errOpen: false
        })
    };

    handleDispatch = (e, id) => {
        // console.log(e)
        debugger
        store.dispatch({
            payload: e,
            type: 'SELLER'
        })
        localStorage.setItem('seller_id', e._id);
        localStorage.setItem('seller', JSON.stringify(e));


    }

    render() {
        const { text, suggestions } = this.state;
        const { classes } = this.props;


        return (
            <div className={classes.root}>


                <div className={'flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32'}>
                    <div className="flex flex-col items-center  w-full" style={{ height: "100vh", marginTop: "1vh" }}>
                        <FuseAnimate animation="transition.expandIn">
                            <Card className="w-full max-w-500" >
                                <CardContent className="flex flex-col items-center" style={{ height: "100%" }}>
                                    <Dialog
                                        open={this.state.errOpen}
                                        onClose={this.handleerrClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogTitle id="alert-dialog-title">{"Seller Deleted"}</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                                Seller is deleted successfully

                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={this.handleerrClose} color="primary">
                                                Close
                                              </Button>
                                        </DialogActions>
                                    </Dialog>
                                    <div className={styles1.search}>
                                        <Autocomplete
                                            id="search"
                                            freeSolo
                                            onChange={this.onTextChange}
                                            options={this.state.stores.map((option) => option.store_name)}
                                            renderInput={(params) => (
                                                <TextField {...params} label="Search" margin="normal" variant="outlined" />
                                            )}
                                        />
                                    </div>
                                    <div className={styles1.addsellerbtn}>
                                        <div className={styles1.heading}>
                                            <h1 >Sellers</h1>
                                        </div>
                                        <div className={styles1.addbtndiv}>
                                            <Link to='/add-seller' className={styles1.linkcls}>
                                                <Button variant="contained" color="primary" >
                                                    <PersonAddIcon />  Add New Seller
                                            </Button>
                                            </Link>
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
                                                        Seller Name
                                                    </TableCell>
                                                    <TableCell className={styles1.prostorename}>
                                                        Store Name
                                                    </TableCell>
                                                    <TableCell>Mobile Number</TableCell>
                                                    <TableCell >
                                                        Action
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
                                                {this.state.suggestions.length == 0 ? this.state.stores.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((product, index) => {
                                                    return (
                                                        <TableRow hover>

                                                            <TableCell>{index + 1}</TableCell>
                                                            <TableCell>{product.name}</TableCell>

                                                            <TableCell className={styles1.propic} ><img src={'https://api.zacarta.com/' + product.store_image} /><div className={styles1.propicdiv}><div><div >{product.store_name}</div><div>{product.address}</div></div></div></TableCell>

                                                            <TableCell>{product.store_contact_number}</TableCell>
                                                            <TableCell>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Switch
                                                                            checked={product.active}
                                                                            onChange={this.handleSwitchChange.bind(this, product)}
                                                                            name={index + 1}
                                                                            color="primary"
                                                                            value={product.active}
                                                                        />
                                                                    }
                                                                />

                                                            </TableCell>
                                                            <TableCell>
                                                                <Link to='/seller-details' className={styles1.linkcls}>
                                                                    <Button variant="contained" size="small" color="primary" onClick={this.handleDispatch.bind(this, product)}>
                                                                        <PageviewIcon /> View
                                                            </Button>
                                                                </Link>
                                                            </TableCell>
                                                            {/* <TableCell>
                                                                <Button variant="contained" color="primary" onClick={this.deleteSeller.bind(this, product)} >
                                                                    <DeleteIcon />
                                                                </Button>
                                                            </TableCell> */}

                                                        </TableRow>
                                                    )
                                                }) : this.state.suggestions.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((product, index) => {

                                                    return (
                                                        <TableRow hover>

                                                            <TableCell>{index + 1}</TableCell>
                                                            <TableCell>{product.name}</TableCell>

                                                            <TableCell className={styles1.propic} ><img src={'https://api.zacarta.com/' + product.store_image} /><div className={styles1.propicdiv}><div><div >{product.store_name}</div><div>{product.address}</div></div></div></TableCell>

                                                            <TableCell>{product.store_contact_number}</TableCell>
                                                            <TableCell>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Switch
                                                                            checked={product.active}
                                                                            onChange={this.handleSwitchChange.bind(this, product)}
                                                                            name={index + 1}
                                                                            color="primary"
                                                                        />
                                                                    }
                                                                />

                                                            </TableCell>
                                                            <TableCell>
                                                                <Link to='/seller-details' className={styles1.linkcls}>
                                                                    <Button variant="contained" size="small" color="primary" onClick={this.handleDispatch.bind(this, product)}>
                                                                        <PageviewIcon /> View
                                                                </Button>
                                                                </Link>
                                                            </TableCell>
                                                            {/* <TableCell>
                                                                <Button variant="contained" color="primary" onClick={this.deleteSeller.bind(this, product)}>
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
                                        count={this.state.stores.length}
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
SellersPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SellersPage);