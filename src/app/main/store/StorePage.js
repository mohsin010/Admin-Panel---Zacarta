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

import picture from '../../../app/fall-glow-small.jpg'


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
class StorePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            suggestions: [],
            text: '',
            currentLocation: {
                latitude: 31.452136, longitude: 73.070382
            },
            zoom: 14,
            hidden: false,
            selectedStore: '',

            stores: [
                {
                    name: "imtiaz",
                    location: { latitude: 31.452136, longitude: 73.070382 },
                    data: { picture: picture, address: 'Abdullah pur street 1 38000', miles: '3.8', drive: '30 ' }
                },
                {
                    name: "metro",
                    location: { latitude: 31.459390, longitude: 73.123221 },
                    data: { picture: picture, address: 'Abdullah pur street 1 38000', miles: '3.8', drive: '30 ' }

                },
                {
                    name: "melano",
                    location: { latitude: 31.457095, longitude: 73.081730 },
                    data: { picture: picture, address: 'Abdullah pur street 1 38000', miles: '3.8', drive: '30 ' }

                },
                {
                    name: "packages",
                    location: { latitude: 31.455330, longitude: 73.068183 },
                    data: { picture: picture, address: 'Abdullah pur street 1 38000', miles: '5.8', drive: '80 ' }
                },
                //   {latitude: 47.3084488, longitude: -122.2140121},
                //   {latitude: 47.5524695, longitude: -122.0425407}
            ],
            categories: [
                { name: "category1", picture: picture },
                { name: "category2", picture: picture },
                { name: "category3", picture: picture },
                { name: "category4", picture: picture },
                { name: "category5", picture: picture },
                { name: "category6", picture: picture },
                { name: "category7", picture: picture },
                { name: "category8", picture: picture },
                { name: "category9", picture: picture },
                { name: "category10", picture: picture },
                { name: "category111", picture: picture },
                { name: "category12", picture: picture },
                { name: "category13", picture: picture },

            ]
        }
    }


    componentDidMount = () => {
        let token = Cookies.get('a#$s!');

        if (!token) {
            this.props.history.push('/login');
        }
    }
    onTextChange = (e) => {
        let value = e.target.textContent;
        debugger;
        let suggestions = [];
        const regex = new RegExp(`^${value}`, 'i');
        if (value.length > 0) {
            for (const item of this.state.categories) {
                console.log(item);

                if (item.name.includes(value)) {
                    suggestions.push(item)
                    // this.selectedText(item.name)
                }
            }
        }
        // else {
        //     this.setState({
        //         currentLocation: { latitude: this.state.stores[0].location.latitude, longitude: this.state.stores[0].location.longitude },
        //         zoom: 14,
        //     })
        // }
        console.log(suggestions);

        this.setState(() => ({
            suggestions,
            text: value
        }))
    }


    render() {
        const { text, suggestions } = this.state;
        const { classes } = this.props


        return (
            <div className={classes.root}>

                <div className={'flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32'}>
                    <div className="flex flex-col items-center justify-center w-full" >
                        <FuseAnimate animation="transition.expandIn">
                            <Card className="w-full max-w-500" >
                                <CardContent className="flex flex-col items-center" style={{ height: "100%" }}>
                                    <div style={overMap} id="over_map">
                                        {this.state.stores.map((item) => { //Store Section
                                            if (item.name == 'imtiaz') { //this condition coresponding value come from previous component

                                                return <div className={styles1.flexcontainer}>

                                                    <div className={styles1.picture}><img src={item.data.picture} /></div>
                                                    <div className={styles1.tbldiv}>
                                                        <table className={styles1.tbl}>
                                                            <tbody>
                                                                <tr><td>

                                                                    <th>{item.name.toUpperCase()}</th>
                                                                </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>{item.data.address}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>{item.data.miles + " " + "Miles Away"}</td>
                                                                    <td>< DriveEtaIcon />{item.data.drive + " " + "Min Drive"}</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <div className={styles1.btn}>
                                                        <Button variant="contained" color="primary" >
                                                            <Link to="/home"> <KeyboardBackspaceIcon />Back to Search </Link>
                                                        </Button>
                                                    </div>
                                                </div>
                                            }

                                        })}
                                    </div>

                                    <div className={styles1.search}>
                                        <Autocomplete
                                            id="search"
                                            freeSolo
                                            onChange={this.onTextChange}
                                            options={this.state.categories.map((option) => option.name)}
                                            renderInput={(params) => (
                                                <TextField {...params} label="Search" margin="normal" variant="outlined" />
                                            )}
                                        />
                                    </div>
                                    <div className={styles1.heading}>
                                        <h1>Categories</h1>
                                    </div>
                                    <div className={styles1.catcontainer}>
                                        {this.state.suggestions.length != 0 ? this.state.suggestions.map(item => {
                                            return <div className={styles1.flexchild}><Link to='/products'><img src={item.picture} /></Link></div>

                                        }) : this.state.categories.map(item => {
                                            return <div className={styles1.flexchild}><Link to='/products'><img src={item.picture} /></Link></div>


                                        })}

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
StorePage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StorePage);