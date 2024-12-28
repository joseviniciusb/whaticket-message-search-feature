import React, { useState } from "react";
import { Card, Button, IconButton, InputBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TicketHeaderSkeleton from "../TicketHeaderSkeleton";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import SearchIcon from "@material-ui/icons/Search";
import { useHistory, useParams } from "react-router-dom"; // Importando useParams para obter o ticketId
import api from "../../services/api"; // Importe o serviço de API

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
  const { ticketId } = useParams();
  const [showInput, setShowInput] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleBack = () => {
    history.push("/tickets");
  };

  const toggleSearchInput = () => {
    setShowInput((prev) => !prev);
  };

  const handleSearch = async (e) => {
    if (e.key === "Enter") {
      console.log(ticketId, searchTerm);
      try {
        const response = await api.get(`/messages/search/${ticketId}`, {
          params: { searchParam: searchTerm },
        });
      } catch (err) {
        console.error("Erro ao buscar mensagens:", err);
      }
    }
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleSearch}
            />
          </div>
        </Card>
      )}
    </>
  );
};

export default TicketHeader;
