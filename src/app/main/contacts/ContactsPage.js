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
import PersonAddIcon from '@material-ui/icons/PersonAdd';

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
class Contacts extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedCustomer: '',
            setRowsPerPage: 10,
            setPage: 0,
            page: 0,
            rowsPerPage: 10,
            // checkedA: true,
            sr: true,
            suggestions: [],
            text: '',

            customers: [],



        }
    }

    onTextChange = (e) => {
        let value = e.target.textContent;
        debugger;
        let suggestions = [];
        const regex = new RegExp(`^${value}`, 'i');
        if (value.length > 0) {
            for (const item of this.state.customers) {
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
    handleSwitchChange = (customer, e) => {
        let token = Cookies.get('a#$s!');

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${token}`
        }
        axios.post('https://api.zacarta.com/api/admin/buyer/', { buyer: customer._id }, {
            headers: headers
        }).then(res => {
            if (res.status == 200) {
                this.setState({
                    customers: res.data.data.buyers,
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
        debugger

        axios.post('https://api.zacarta.com/api/admin/seller/contacts', {}, {
            headers: headers
        }).then(res => {
            debugger
            if (res.status == 200) {
                this.setState({
                    customers: res.data.data.contact
                });
                // console.log(res.data.data.buyers)
            }
        })
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
                                            options={this.state.customers.map((option) => option.name)}
                                            renderInput={(params) => (
                                                <TextField {...params} label="Search" margin="normal" variant="outlined" />
                                            )}
                                        />
                                    </div>
                                    <div className={styles1.addsellerbtn}>
                                        <div className={styles1.heading}>
                                            <h1 >
                                                Contacts
                                            </h1>
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
                                                        Customer Name
                                                    </TableCell>
                                                    <TableCell>Email</TableCell>
                                                    <TableCell>Mobile Number</TableCell>
                                                    <TableCell >
                                                        Subject
                                                    </TableCell>
                                                    <TableCell >
                                                        Message
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
                                                {this.state.suggestions.length == 0 ? this.state.customers.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((customer, index) => {
                                                    //    this.setState({
                                                    //        quantity: product.quantity
                                                    //    })
                                                    return (
                                                        <TableRow hover>
                                                            <TableCell>{index + 1}</TableCell>

                                                            <TableCell className={styles1.propic} ><div className={styles1.propicdiv}><div><div >{customer.name}</div></div></div></TableCell>
                                                            <TableCell>{customer.email}</TableCell>
                                                            <TableCell>{customer.mobile}</TableCell>
                                                            <TableCell>{customer.subject}</TableCell>
                                                            <TableCell>{customer.message}</TableCell>

                                                            {/* <TableCell>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Switch
                                                                            checked={customer.active}
                                                                            onChange={this.handleSwitchChange.bind(this, customer)}
                                                                            name={customer.sr}
                                                                            color="primary"
                                                                        />
                                                                    }
                                                                />

                                                            </TableCell> */}
                                                        </TableRow>
                                                    )
                                                }) : this.state.suggestions.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((customer, index) => {
                                                    return (
                                                        <TableRow hover>
                                                            <TableCell>{index + 1}</TableCell>

                                                            <TableCell className={styles1.propic} ><div className={styles1.propicdiv}><div><div >{customer.name}</div></div></div></TableCell>
                                                            <TableCell>{customer.email}</TableCell>
                                                            <TableCell>{customer.mobile}</TableCell>
                                                            <TableCell>{customer.subject}</TableCell>
                                                            <TableCell>{customer.message}</TableCell>


                                                            {/* <TableCell>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Switch
                                                                            checked={customer.active}
                                                                            onChange={this.handleSwitchChange.bind(this, customer)}
                                                                            name={customer.sr}
                                                                            color="primary"
                                                                        />
                                                                    }
                                                                />

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
                                        count={this.state.customers.length}
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
Contacts.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Contacts);