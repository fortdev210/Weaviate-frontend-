import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  colorControl: {
    color: "white",
  },
  [theme.breakpoints.down("sm")]: {
    filtergroup: {
      display: "contents",
    },
  },
}));

export default function GroupedSelect(props) {
  const classes = useStyles();

  return (
    <div className={classes.filtergroup}>
      <FormControl className={classes.formControl}>
        <InputLabel
          htmlFor="grouped-native-select"
          className={classes.colorControl}
        >
          Publication
        </InputLabel>
        <Select
          defaultValue=""
          id="grouped-native-select"
          onChange={(e) => props.onPubChange(e.target.value.name)}
          className={classes.colorControl}
        >
          <MenuItem value="All">All</MenuItem>
          {props.publication &&
            props.publication.map((pub, index) => (
              <MenuItem key={`pub${index}`} value={pub}>
                {pub.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="grouped-select" className={classes.colorControl}>
          Category
        </InputLabel>
        <Select
          defaultValue=""
          id="grouped-select"
          onChange={(e) => props.onCatChange(e.target.value.name)}
          className={classes.colorControl}
        >
          <MenuItem value="All">All</MenuItem>
          {props.category &&
            props.category.map((cat, index) => (
              <MenuItem key={`cat${index}`} value={cat}>
                {cat.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
}
