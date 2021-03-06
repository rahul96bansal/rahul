import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const toolbarStyle = theme => ({
    root: {
        paddingRight: theme.spacing.unit,
    },
    highlight: {
        backgroundColor: "light",
        // color:'#fff'
    },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        display: 'flex',
        justifyContent: 'space-between',
        position: 'absolute',
        width: '90%',
    },
    report: {
        fontSize: 16,
        color: "#0000FF",
        backgroundColor: "#D3D3D3",
        // textAlign: 'right',
    },
});

let EnhancedToolbar = props => {
    const { numSelected, classes } = props;

    return (
        <Toolbar
            className={classNames(classes.root, classes.highlight)}
        >
            <div className={classes.title}>
                <Typography color="inherit" variant="title" id="tableTitle">
                    Verified Item
            </Typography>
                <Button onClick={props.handleClickOpen.bind(this)} className={classes.report}>Report</Button>
            </div>
            <div className={classes.spacer} />
        </Toolbar>
    );
};
EnhancedToolbar = withStyles(toolbarStyle)(EnhancedToolbar);


const styles = {
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
    tablecell: {
        textDecorationLine: 'line-through',
        margin: "25px",
    },
    tableshow: {
        margin: "25px",
    },
    tabletitle: {
        margin: "15px",
    },
    table: {
        fontSize: 16,
        // display: block,
        // page-break-after: auto,
    },
    // buttonalign: {
    //     textAlign: 'center'
    // },
};

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

function getSorting(order, orderBy) {
    return order === 'desc'
        ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
        : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
}

class FullScreenDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            order: 'asc',
            orderBy: 'ITEM NAME',
        };
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    print() {
        window.print();
    }
    render() {
        const { classes } = this.props;
        const { order, orderBy } = this.state;
        return (
            <div>
                <EnhancedToolbar
                    handleClickOpen={this.handleClickOpen.bind(this)} />

                <Dialog
                    fullScreen
                    open={this.state.open}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                >
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="title" color="inherit" className={classes.flex}>
                                Report
                            </Typography>
                            <Button color="inherit" onClick={this.print}>
                                Print
                            </Button>
                        </Toolbar>
                    </AppBar>

                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>ITEM NAME</TableCell>
                                <TableCell >COMPANY</TableCell>
                                <TableCell >PACK</TableCell>
                                <TableCell >BATCH</TableCell>
                                <TableCell >EXPIRY</TableCell>
                                <TableCell >QTY
                                    <footer>
                                        Verified
                                        <root className={classes.tabletitle}>
                                            original
                                        </root>
                                    </footer>
                                </TableCell>
                                <TableCell >MRP
                                    <footer>
                                        Verified
                                        <root className={classes.tabletitle}>
                                            original
                                        </root>
                                    </footer>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {this.props.display
                                .sort(getSorting(order, orderBy))
                                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(n => {
                                    var searchedrow
                                    searchedrow = this.props.invoicedata.filter((row) => row.BATCH === n.BATCH)
                                    console.log(searchedrow)
                                    return (
                                        <TableRow className={classes.row} key={n.id}>
                                            <TableCell component="th" scope="row" >
                                                {n['ITEM NAME']}
                                            </TableCell>
                                            <TableCell >{n.COMPANY}</TableCell>
                                            <TableCell >{n.PACK}</TableCell>
                                            <TableCell>{n.BATCH}</TableCell>
                                            <TableCell >{n.EXPIRY}</TableCell>
                                            <TableCell >{n.QTY}
                                                <root className={Number(searchedrow[0].QTY) !== 0 ? classes.tablecell : classes.tableshow}>
                                                    {Number(searchedrow[0].QTY) + Number(n.QTY)}
                                                </root>
                                            </TableCell>
                                            <TableCell >{n.MRP}
                                                <root className={Number(searchedrow[0].MRP) !== Number(n.MRP) ? classes.tablecell : classes.tableshow}>
                                                    {Number(searchedrow[0].MRP)}
                                                </root>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </Dialog>
            </div>
        );
    }
}

FullScreenDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullScreenDialog);
