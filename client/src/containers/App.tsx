import React from "react";
import { Provider } from 'react-redux';
import FormSection from './FormSection';
import TableSection from './TableSection';
import store from '../store';
import { Grid, Paper} from "@material-ui/core";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    flexGrow: 1
  },
  paper: {
    boxShadow: "0px 2px 7px rgba(0, 0, 0, 0.25)"
  }
}));
function App() {
  const classes = useStyles();

  return (
    <main className="App">
      <Provider store={store}>
        <div className={classes.root}>
          <Grid container spacing={2}>
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
      </Provider>
    </main>
  );
}

export default App;
