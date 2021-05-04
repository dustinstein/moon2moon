import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import Contract from 'web3-eth-contract';
import { ChainId, JSBI, Pair, Route, Token, TokenAmount, Trade, TradeType } from '@pancakeswap-libs/sdk'
import { ABI } from '../contract/ABI'

import {
  Grid
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Transaction from './Transaction';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    height: 'calc(99vh)',
    overflow: 'hidden',
    padding: theme.spacing(2)
  },
}));

const prcURL = 'wss://spring-hidden-bush.bsc.quiknode.pro/63e582ed6c17529d98cc064ba97cad1d95650da5/'

const options = {
    timeout: 30000, // ms

    // Useful for credentialed urls, e.g: ws://username:password@localhost:8546
    headers: {
    'x-api-key': ''
    },

    clientConfig: {
      // Useful if requests are large
      maxReceivedFrameSize: 100000000,   // bytes - default: 1MiB
      maxReceivedMessageSize: 100000000, // bytes - default: 8MiB

      // Useful to keep a connection alive
      keepalive: true,
      keepaliveInterval: 60000 // ms
    },

    // Enable auto reconnection
    reconnect: {
        auto: true,
        delay: 5000, // ms
        maxAttempts: 5,
        onTimeout: false
    }
};

const Market = () => {
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [block, setBlock] = useState(null);
  const web3 = new Web3(prcURL, options)
  useEffect(() =>{

   const subscription = web3.eth.subscribe('newBlockHeaders')
   subscription.on('data', data => setBlock(data.number))
  }, [])

  useEffect(() => {
    const loadBlockchainData = async()  => {

    //const accounts = await web3.eth.getAccounts()
    const contract1 = await new web3.eth.Contract(ABI, '0xCC6b11DE64DCE6e5052a84b67cbbfd210ED530f7')
    const contract2 = await new web3.eth.Contract(ABI, '0x9adc6Fb78CEFA07E13E9294F150C1E8C1Dd566c0')
    const contract3 = await new web3.eth.Contract(ABI, '0x1B96B92314C44b159149f7E0303511fB2Fc4774f')
    // setAccount({ account: accounts[0] });

    const reserves1 = () => contract1.methods.getReserves().call()
    .then(async (response) => {
      const res = await response
      return setContract(prev => ({...prev, v1:response}))
    })
    .catch(err => console.warn({err}))

    const reserves2 = () => contract2.methods.getReserves().call()
    .then(async (response) => {
      const res = await response
      return setContract(prev => ({...prev, v2:response}))
    })
    .catch(err => console.warn({err}))

    const reserves3 = () => contract3.methods.getReserves().call()
    .then(async (response) => {
      const res = await response
      return setContract(prev => ({...prev, v3:response}))
    })
    .catch(err => console.warn({err}))

    // .on('connected', () => console.log('connected'))
    // .on('data', data => console.log({socket: data}))
    reserves1();
    reserves2();
    reserves3();

    // contract1.getPastEvents('allEvents', (data) => console.log({block: data}))
  }
  loadBlockchainData();
  }, [block])

  const classes = useStyles();
  return (
    <Grid container spacing={3} className={classes.root}>
      <Grid item xs={12}>
        <Transaction />
      </Grid>
      <Grid  item xs={12} onClick={() => console.log(contract)}>        {/*JSON.stringify(contract)*/}
        <div>{block}</div>
        <div>{contract && contract.v1 && contract.v2 && contract.v3 && contract.v1._reserve0 &&
        `$${(contract.v1._reserve1 / contract.v1._reserve0 / 1000000000)}`}</div>
        {
        <div>{contract && contract.v1 && contract.v2 && contract.v3 && contract.v2._reserve0 &&
        `$${((contract.v2._reserve1 / contract.v2._reserve0) * (contract.v3._reserve1 / contract.v3._reserve0)/ 1000000000)}`}</div>
      }
      </Grid>
    </Grid>
  );
};

export default Market;
