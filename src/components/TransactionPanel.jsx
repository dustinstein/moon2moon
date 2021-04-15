import React, { useState } from 'react';
import {
  InputAdornment,
  Typography,
  TextField,
  ButtonGroup,
  Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  priceInput: {
    margintop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  buttonGroup: {
    marginBottom: theme.spacing(2)
  }
}));


const TransactionPanel = ({
  from, to, buy
}) => {
  const classes = useStyles();
  const [type, setType] = useState('limit')
  return (
    <div>
      <div className={classes.root}>
        <ButtonGroup>
          <Button
            onClick={() => setType('limit')}
            variant={type ==='limit' && 'contained'}
          >
            Limit
          </Button>
          <Button
            onClick={() => setType('market')}
            variant={type ==='market' && 'contained'}
          >
            Market
          </Button>
        </ButtonGroup>
      </div>
      <TextField
        label="Price"
        variant="filled"
        className={classes.priceInput}
        color={buy ? 'primary' : 'secondary'}
        fullWidth
          InputProps={{
            endAdornment: <InputAdornment position="end">{`USD`}</InputAdornment>,
          }}
      />
      <Typography variant="subtitle2">{`${from} Balance:`}</Typography>
      <TextField
        label="Amount"
        color={buy ? 'primary' : 'secondary'}
        variant="filled"
        fullWidth
          InputProps={{
            endAdornment: <InputAdornment position="end">{from}</InputAdornment>,
          }}
      />
      <ButtonGroup fullWidth className={classes.buttonGroup}>
        <Button>25%</Button>
        <Button>50%</Button>
        <Button>75%</Button>
        <Button>100%</Button>
      </ButtonGroup>
      <TextField
        label="Amount"
        variant="filled"
        color={buy ? 'primary' : 'secondary'}
        fullWidth
          InputProps={{
            startAdornment: <InputAdornment position="start">≈</InputAdornment>,
            endAdornment: <InputAdornment position="end">{to}</InputAdornment>
          }}
      />
      <Typography variant="subtitle2">{`${to} Balance:`}</Typography>
    </div>
  )
}

export default TransactionPanel;