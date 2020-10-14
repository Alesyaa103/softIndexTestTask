import React from "react";
import { Provider } from 'react-redux';
import FormSection from './FormSection';
import TableSection from './TableSection';
import store from '../store';
import { Grid, Paper, useMediaQuery } from "@material-ui/core";
import { makeStyles, Theme, createStyles, useTheme } from '@material-ui/core/styles';
import ThemeProvider from './ThemeProvider';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
    padding: theme.spacing(4),
  },
  paper: {
    boxShadow: "0px 2px 7px rgba(0, 0, 0, 0.25)"
  }
}));
function App() {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <main className="App">
      <ReactNotification />
      <Provider store={store}>
        <ThemeProvider>
          <div className={classes.root}>
            <Grid container spacing={3} direction={matches ? 'column-reverse' : 'row'}>
              <Grid item xs={12} md={8}>
                <Paper className={classes.paper}>
                  <TableSection />
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper className={classes.paper}>
                  <FormSection />
                </Paper>
              </Grid>
            </Grid>
          </div>
        </ThemeProvider>
      </Provider>
    </main>
  );
}

export default App;
