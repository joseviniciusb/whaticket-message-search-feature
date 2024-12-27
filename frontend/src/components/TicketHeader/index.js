import React, { useState } from "react";
import { Card, Button, IconButton, InputBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TicketHeaderSkeleton from "../TicketHeaderSkeleton";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import SearchIcon from "@material-ui/icons/Search";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  ticketHeader: {
    display: "flex",
    backgroundColor: "#eee",
    flex: "none",
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
    justifyContent: "space-between",
    padding: "10px",
    [theme.breakpoints.down("sm")]: {
      flexWrap: "wrap",
    },
  },
  searchIcon: {
    marginLeft: "auto",
    cursor: "pointer",
  },
  searchInputWrapper: {
    display: "flex",
    alignItems: "center",
    transition: "all 0.3s ease",
  },
  searchInput: {
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "5px 10px",
    marginLeft: "10px",
    width: "200px",
    display: "none",
  },
  showInput: {
    display: "block",
  },
}));

const TicketHeader = ({ loading, children }) => {
  const classes = useStyles();
  const history = useHistory();
  const handleBack = () => {
    history.push("/tickets");
  };

  const [showInput, setShowInput] = useState(false);

  const toggleSearchInput = () => {
    setShowInput((prev) => !prev);
  };

  return (
    <>
      {loading ? (
        <TicketHeaderSkeleton />
      ) : (
        <Card square className={classes.ticketHeader}>
          <Button color="primary" onClick={handleBack}>
            <ArrowBackIos />
          </Button>
          {children}
          <div className={classes.searchInputWrapper}>
            <IconButton
              className={classes.searchIcon}
              onClick={toggleSearchInput}
            >
              <SearchIcon />
            </IconButton>
            <InputBase
              className={`${classes.searchInput} ${
                showInput ? classes.showInput : ""
              }`}
              placeholder="Pesquisar mensagens"
            />
          </div>
        </Card>
      )}
    </>
  );
};

export default TicketHeader;
