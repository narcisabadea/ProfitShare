import React, { useState, useCallback } from "react";
import { Button, TextField } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { handleResponse } from "./handleResponse";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function Home() {
  const classes = useStyles();
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#00A79D"
      },
      secondary: {
        main: "#5686d2"
      }
    }
  });

  const [url, setUrl] = useState("");
  const [showLUrl, setShowUrl] = useState(false);
  const [urlProfitShare, setUrlProfitShare] = useState("");

  function changeUrl() {
    fetch(
      `https://kdgprofitshare.azurewebsites.net/api/GetProfitshareUrl?code=185YA80CxDyw1A5CMC2A533wygfXTQvej9VsCStzz2yf5AnYyuLODw==&url=${url}`,
      {
        method: "GET"
      }
    )
      .then(handleResponse)
      .then(response => {
        setUrlProfitShare(response.url);
      });
    setShowUrl(true);
  }

  function addUrl(event) {
    setUrl(event.target.value);
  }

  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <Container component="main" maxWidth="sm">
          <Card
            style={{
              padding: "0 11% 11% 11%",
              margin: "20% 0% 0% 0%"
            }}
          >
            <CssBaseline />
            <div className={classes.paper}>
              <img src={"/images/kdg.PNG"} style={{ width: "70%" }} />
              <Typography
                component="h1"
                variant="h5"
                style={{ fontWeight: "600", paddingBottom: "5%" }}
              >
                ProfitShare
              </Typography>

              <form className={classes.form} noValidate autoComplete="off">
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  placeholder="Add URL"
                  autoFocus
                  onChange={addUrl}
                  value={url}
                />
                {showLUrl && (
                  <span>
                    <Typography component="h4" style={{ paddingTop: "10%" }}>
                      Link-ul de ProfitShare este:
                    </Typography>

                    <a href={urlProfitShare}> {urlProfitShare} </a>
                  </span>
                )}
                <Grid container justify="center" alignItems="center">
                  <Button
                    variant="contained"
                    className={classes.submit}
                    onClick={changeUrl}
                    style={{
                      marginTop: "40%",
                      padding: "3% 15% 3% 15%",
                      backgroundColor: "#00A79D",
                      color: "#fff"
                    }}
                  >
                    Submit
                  </Button>
                </Grid>
              </form>
            </div>
          </Card>
        </Container>
      </MuiThemeProvider>
    </div>
  );
}
