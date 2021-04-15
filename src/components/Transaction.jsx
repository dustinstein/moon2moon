import React, { useState } from 'react';
import clsx from 'clsx';
import {
  Paper,
  Tabs,
  Tab,
  Box,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { red, green } from '@material-ui/core/colors';

import TransactionPanel from './TransactionPanel';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 768,
    margin: '0 auto 15px',
    backgroundColor: theme.palette.background.paper,
  },
  buy: {
    boxShadow: '0px 8px 10px -5px rgb(76 175 80 / 20%), 0px 16px 24px 2px rgb(76 175 80 / 14%), 0px 6px 30px 5px rgb(76 175 80 / 12%)'
  },
  sell: {
    boxShadow: '0px 8px 10px -5px rgb(245 0 87 / 20%), 0px 16px 24px 2px rgb(245 0 87 / 14%), 0px 6px 30px 5px rgb(245 0 87 / 12%)'
  },
  header: {
    color: theme.palette.primary.main,
    textAlign: 'center',
    margin: 15
  },
  tabs: [
      {
        color: green[400]
      },
      {
        color: red[400]
      }
    ]
}));

function a11yProps(index) {
  return {
    id: `${index === 0 ? 'buy-tab' : 'sell-tab'}`,
    'aria-controls': `tabpanel-${index === 0 ? 'buy-tab' : 'sell-tab'}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Transaction = () => {
  const classes = useStyles();
  const [index, setIndex] = useState(0);
  const currency = ['BNB', 'SAFEMOON'];
  const handleChange = (event, newIndex) => {
    setIndex(newIndex);
  };

  const tabColor = index === 0 ? 'primary' : 'secondary'
  const buy = index === 0
  return (
    <div>
      <Typography
        component="h1"
        variant="h5"
        className={classes.header}
        color="textPrimary"
      >
        Moon 2 Moon
      </Typography>
      <Paper
        square
        elevation={16}
        className={clsx(classes.root, {
            [classes.buy]: buy,
            [classes.sell]: !buy
          })}>
        <Tabs
          value={index}
          onChange={handleChange}
          indicatorColor={tabColor}
          textColor={tabColor}
          variant="fullWidth"
          centered
          aria-label="buy sell tabs"
        >
          <Tab label="Buy"  {...a11yProps(0)} />
          <Tab label="Sell"  {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={index} index={0}>
          <TransactionPanel
            from={currency[0]}
            to={currency[1]}
            buy={buy}
          />
        </TabPanel>
        <TabPanel value={index} index={1}>
          <TransactionPanel
            from={currency[1]}
            to={currency[0]}
            buy={buy}
          />
        </TabPanel>
      </Paper>
    </div>
  )
}

export default Transaction;
