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

import DeleteIcon from '@material-ui/icons/Delete';

import EditIcon from '@material-ui/icons/Edit';

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
import store from '../../store/index';
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
class UnitsPage extends React.Component {

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

            units: [],
            unit: '',
            errOpen: false



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
            for (const item of this.state.units) {
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
    handlechange = (e) => {
        this.setState({
            unit: e.target.value
        })
    }
    addunit = (category, e) => {

        let token = Cookies.get('a#$s!');

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${token}`
        }
        
        axios.post('https://api.zacarta.com/api/admin/unit', { title: this.state.unit }, {
            headers: headers
        }).then(res => {
            if (res.status == 200) {
                this.setState({
                    units: [...this.state.units, res.data.data.unit],
                    errOpen: true,
                    setOpen: false

                });
            }
        })
    }
    handleSwitchChange = (category, e) => {
        let token = Cookies.get('a#$s!');

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${token}`
        }
        axios.post('https://api.zacarta.com/api/admin/category/toggle', { category: category._id }, {
            headers: headers
        }).then(res => {
            if (res.status == 200) {
                this.setState({
                    categories: res.data.data.category,
                });
            }
        })
    };
    handleerrClose = () => {
        this.setState({
            errOpen: false
        })
    };
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


            // 'Authorization': 'JWT fefege...'
        }
        axios.get('https://api.zacarta.com/api/admin/unit', {
            headers: headers
        }).then(res => {
            if (res.status == 200) {
                debugger
                this.setState({
                    units: res.data.data.units
                });
            }
        })
    }
    handleDispatch = (e, id) => {
        // console.log(e)
        store.dispatch({
            payload: e,
            type: 'CATEGORY'
        })
        localStorage.setItem('category', JSON.stringify(e))
    }


    classes = this.props


    render() {
        const { text, suggestions } = this.state;
        const { classes } = this.props


        return (
            <div className={classes.root}>

                <div className={'flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32'}>
                    <div className="flex flex-col items-center  w-full" style={{ minHeight: "100vh", marginTop: "1vh" }}>
                        <FuseAnimate animation="transition.expandIn">
                            <Card className="w-full max-w-500" >
                                <CardContent className="flex flex-col items-center" >
                                    <Dialog
                                        open={this.state.errOpen}
                                        onClose={this.handleerrClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogTitle id="alert-dialog-title">{"Unit Added"}</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                                Unit is added successfully

                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={this.handleerrClose} color="primary">
                                                Close
                                              </Button>
                                        </DialogActions>
                                    </Dialog>
                                    {/* add unit */}
                                    <Dialog
                                        open={this.state.setOpen}
                                        onClose={this.handleClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogTitle id="alert-dialog-title">{"Add Unit"}</DialogTitle>
                                        <DialogContent>
                                            <TextField label="Unit" margin="normal" variant="outlined"
                                                onChange={this.handlechange}
                                                value={this.state.unit}
                                            />

                                            {/* <DialogContentText id="alert-dialog-description">
                                                Category is deleted successfully

                                            </DialogContentText> */}
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={this.handleClose} color="primary">
                                                Close
                                              </Button>
                                            <Button onClick={this.addunit} color="primary">
                                                Save
                                              </Button>
                                        </DialogActions>
                                    </Dialog>

                                    {/* end */}
                                    <div className={styles1.search}>
                                        <Autocomplete
                                            id="search"
                                            freeSolo
                                            onChange={this.onTextChange}
                                            options={this.state.units.map((option) => option.title)}
                                            renderInput={(params) => (
                                                <TextField {...params} label="Search" margin="normal" variant="outlined" />
                                            )}
                                        />
                                    </div>
                                    <div className={styles1.addsellerbtn}>
                                        <div className={styles1.heading}>
                                            <h1 >Units</h1>
                                        </div>
                                        <div className={styles1.addbtndiv}>
                                            {/* <Link to='/add-category' className={styles1.linkcls}> */}
                                            <Button onClick={this.handleOpen} variant="contained" color="primary" >
                                                <AddIcon />  Add Unit
                                            </Button>
                                            {/* </Link> */}
                                        </div>
                                    </div>
                                    <TableContainer className={classes.container}>
                                        <Table stickyHeader aria-label="sticky table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell className={styles1.srno} >
                                                        Sr.#
                                                    </TableCell>
                                                    <TableCell className={styles1.namecell}>
                                                        Name
                                                    </TableCell>
                                                    {/* <TableCell>
                                                        Country
                                                    </TableCell> */}
                                                    {/* <TableCell className={styles1.prostorename}>
                                                        Unit Type
                                                    </TableCell>
                                                    <TableCell>Unit Price</TableCell> */}
                                                    {/* <TableCell >
                                                        Action
                                                    </TableCell>
                                                    <TableCell >
                                                        View
                                                    </TableCell> */}
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
                                                {this.state.suggestions.length == 0 ? this.state.units.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((product, index) => {
                                                    return (
                                                        <TableRow hover>

                                                            <TableCell >{index + 1}</TableCell>
                                                            {/* <TableCell>{product.name}</TableCell> */}

                                                            <TableCell className={styles1.propic} ><div className={styles1.propicdiv}><div><div >{product.title}</div></div></div></TableCell>

                                                            {/* <TableCell>{product.unit}</TableCell>
                                                            <TableCell>{product.price}</TableCell> */}
                                                            {/* <TableCell>

                                                                {product.countries.map((item) => {
                                                                    return <span>
                                                                        <span>{item.title}  </span>
                                                                    </span>
                                                                })}
                                                            </TableCell>


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
                                                                <Link to='/view-category' className={styles1.linkcls}>
                                                                    <Button variant="contained" size="small" color="primary" onClick={this.handleDispatch.bind(this, product)} >
                                                                        <PageviewIcon /> View
                                                            </Button>
                                                                </Link>
                                                            </TableCell> */}
                                                            {/* <TableCell>
                                                                <Button variant="contained" color="primary" onClick={this.deleteCategory.bind(this, product)}>
                                                                    <DeleteIcon />
                                                                </Button>
                                                            </TableCell> */}

                                                        </TableRow>
                                                    )
                                                }) : this.state.suggestions.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((product, index) => {
                                                    return (
                                                        <TableRow hover>
                                                            <TableCell >{index + 1}</TableCell>
                                                            {/* <TableCell>{product.na}</TableCell> */}

                                                            <TableCell className={styles1.propic} ><div className={styles1.propicdiv}><div><div >{product.title}</div></div></div></TableCell>

                                                            {/* <TableCell>{product.unit}</TableCell>
                                                            <TableCell>{product.price}</TableCell> */}

                                                            {/* <TableCell>

                                                                {product.countries.map((item) => {
                                                                    return <span>
                                                                        <span>{item.title}  </span>
                                                                    </span>
                                                                })}
                                                            </TableCell>
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
                                                                <Link to='/view-category' className={styles1.linkcls}>
                                                                    <Button variant="contained" size="small" color="primary" onClick={this.handleDispatch.bind(this, product)} >
                                                                        <PageviewIcon /> View
                                                            </Button>
                                                                </Link>
                                                            </TableCell> */}
                                                            {/* <TableCell>
                                                                <Button variant="contained" color="primary" onClick={this.deleteCategory.bind(this, product)}>
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
                                        count={this.state.units.length}
                                        rowsPerPage={this.state.rowsPerPage}
                                        page={this.state.page}
                                        onChangePage={this.handleChangePage}
                                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                    />
                                    {/* <div >
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
                                    </div> */}
                                </CardContent>
                            </Card>
                        </FuseAnimate>
                    </div>
                </div>
            </div>
        );
    }
}
UnitsPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UnitsPage);