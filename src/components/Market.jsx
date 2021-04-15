import React from 'react';
import {
  Grid
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Transaction from './Transaction';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: 'calc(99vh)',
    overflow: 'hidden'
  },
}));


const Market = () => {
  const classes = useStyles();
  return (
    <Grid container spacing={3} className={classes.root}>
      <Grid item xs={12}>
        <Transaction />
      </Grid>
    </Grid>
  );
};

export default Market;
