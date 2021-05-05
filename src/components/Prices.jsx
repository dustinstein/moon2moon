import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Paper
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 768,
    margin: '0 auto 15px',
    backgroundColor: theme.palette.background.paper
  }
}));

const Prices = ({v1, v2}) => {
  const classes = useStyles();
  return (
  <Paper className={classes.root}>
    <List>
      <ListItem>
        <ListItemText
          primary="Pancake V1"
          secondary={`$ ${v1}`}
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="Pancake V2"
          secondary={`$ ${v2}`}
        />
      </ListItem>
    </List>
  </Paper>
  )
};

export default Prices;