import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import TouchAppIcon from "@material-ui/icons/TouchApp";
import SearchIcon from "@material-ui/icons/Search";
import Filter from "./Filtercomp";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import { TableContainer } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "block",
    width: "142px",
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
    width: "90vw",
  },
  [theme.breakpoints.down("sm")]: {
    appbar: {
      display: "contents",
    },
  },
}));

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

export default function SearchAppBar(props) {
  const classes = useStyles();

  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState({
    filterfrom: "",
    weightfrom: 0.5,
    filteraway: "",
    weightaway: 0.5,
  });
  // const [filterfrom, setFilterfrom] = useState("");
  // const [weightfrom, setWeightfrom] = useState(0.5);
  // const [filteraway, setFilteraway] = useState("");
  // const [weightaway, setWeightaway] = useState(0.5);
  const onFilter = (e) => {
    if (e.keyCode === 13) {
      props.filter(e.target.value);
    }
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (evt) => {
    const value = evt.target.value;
    setStatus({ ...status, [evt.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.semanticFilter(status);
    setOpen(false);
    setStatus({
      filterfrom: "",
      weightfrom: 0.5,
      filteraway: "",
      weightaway: 0.5,
    });
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.appbar}>
          <div onClick={props.fetch}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <TouchAppIcon />
            </IconButton>
          </div>
          <Typography className={classes.title} variant="h6" noWrap>
            semantic search
          </Typography>

          <Filter
            publication={props.publication}
            category={props.category}
            onCatChange={props.onCatChange}
            onPubChange={props.onPubChange}
          />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              onKeyDown={onFilter}
            />
          </div>
          <Button color="inherit" onClick={handleOpen}>
            more option
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <div style={modalStyle} className={classes.paper}>
              <form
                onSubmit={handleSubmit}
                style={{ display: "table-caption", width: "314px" }}
              >
                <label>
                  <p>Filter From</p>
                  <TextField
                    type="text"
                    name="filterfrom"
                    value={status.filterfrom}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  <p>Weight From</p>
                  <TextField
                    type="text"
                    name="weightfrom"
                    value={status.weightfrom}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  <p>Filter Away</p>
                  <TextField
                    type="integer"
                    name="filteraway"
                    value={status.filteraway}
                    onChange={handleChange}
                  />
                </label>

                <label>
                  <p>Weight Away</p>
                  <TextField
                    type="text"
                    name="weightaway"
                    value={status.weightaway}
                    onChange={handleChange}
                  />
                </label>
                <Button type="submit" style={{ float: "right" }}>
                  Filter
                </Button>
              </form>
            </div>
          </Modal>
        </Toolbar>
      </AppBar>
    </div>
  );
}
