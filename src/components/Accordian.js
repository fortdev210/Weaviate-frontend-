import React, { useState, useRef } from "react";
import Chevron from "./Chevron";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "./Accordian.css";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
function Accordion(props) {
  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState("0px");
  const [setRotate, setRotateState] = useState("accordion__icon");

  const content = useRef(null);
  const classes = useStyles();

  function toggleAccordion() {
    setActiveState(setActive === "" ? "active" : "");
    setHeightState(
      setActive === "active" ? "0px" : `${content.current.scrollHeight}px`
    );
    setRotateState(
      setActive === "active" ? "accordion__icon" : "accordion__icon rotate"
    );
  }

  return (
    <div>
      {props.generaldata && (
        <div className="accordion__section">
          <button
            className={`accordion ${setActive}`}
            onClick={toggleAccordion}
          >
            <a
              href={props.generaldata.url}
              className="accordion__title"
              target="blank"
            >
              {props.generaldata.title}
            </a>
            <p>{props.generaldata.publicationDate}</p>
            <p className="wordCount">
              wordCount: {props.generaldata.wordCount}
            </p>
            <Chevron className={`${setRotate}`} width={10} fill={"#777"} />
          </button>
          <div
            ref={content}
            style={{ maxHeight: `${setHeight}` }}
            className="accordion__content"
          >
            <div
              className="accordion__text"
              dangerouslySetInnerHTML={{ __html: props.generaldata.content }}
            />
          </div>
        </div>
      )}
      {props.simanticdata && (
        <div className="accordion__section">
          <button
            className={`accordion ${setActive}`}
            onClick={toggleAccordion}
          >
            <p>{props.simanticdata.name}</p>
            <Chevron className={`${setRotate}`} width={10} fill={"#777"} />
          </button>
          <div
            ref={content}
            style={{ maxHeight: `${setHeight}` }}
            className="accordion__content"
          >
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>concept</TableCell>
                    <TableCell align="right">distanceToNext</TableCell>
                    <TableCell align="right">distanceToPrevious</TableCell>
                    <TableCell align="right">distanceToQuery</TableCell>
                    <TableCell align="right">distanceToResult</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props.simanticdata.semanticPath.map((row) => (
                    <TableRow key={row.concept}>
                      <TableCell component="th" scope="row">
                        {row.concept}
                      </TableCell>
                      <TableCell align="right">{row.distanceToNext}</TableCell>
                      <TableCell align="right">
                        {row.distanceToPrevious}
                      </TableCell>
                      <TableCell align="right">{row.distanceToQuery}</TableCell>
                      <TableCell align="right">
                        {row.distanceToResult}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      )}
    </div>
  );
}

export default Accordion;
