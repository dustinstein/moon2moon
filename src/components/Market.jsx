import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import Contract from 'web3-eth-contract';
import { ABI, ABI_V2, GETPAIR_V2_ABI } from '../contract/ABI'

import {
  Grid,
  Typo
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Transaction from './Transaction';
import Prices from './Prices';

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

const BUSD = '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56'
const SAFEMOON = '0x8076C74C5e3F5852037F31Ff0093Eeb8c8ADd8D3'

const Market = () => {
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [block, setBlock] = useState(null);
  const web3 = new Web3(prcURL)
  useEffect(() =>{

   const subscription = web3.eth.subscribe('newBlockHeaders')
   subscription.on('data', data => setBlock(data.number))
  }, [])

  useEffect(() => {
    const loadBlockchainData = async()  => {

    //const accounts = await web3.eth.getAccounts()
    const contract1 = await new web3.eth.Contract(ABI, '0xCC6b11DE64DCE6e5052a84b67cbbfd210ED530f7')
    const contract2 = await new web3.eth.Contract(ABI_V2, '0xeF967e3Da982ECc1c84bbe6053fD61Af2a65bB9a')
    const pancakeV2 = await new web3.eth.Contract(GETPAIR_V2_ABI, '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73')
    // const contract3 = await new web3.eth.Contract(ABI, '0x1B96B92314C44b159149f7E0303511fB2Fc4774f')
    // setAccount({ account: accounts[0] });

    const reserves1 = () => contract1.methods.getReserves().call()
    .then((response) => {
      return setContract(prev => ({...prev, v1:response}))
    })
    .catch(err => console.warn({err}))

    const reserves2 = () => contract2.methods.getReserves().call()
    .then((response) => {
      return setContract(prev => ({...prev, v2:response}))
    })
    .catch(err => console.warn({err}))

    const getPair = () => pancakeV2.methods.getPair(BUSD, SAFEMOON).call()
    .then((response) => {
      return console.log('PAIR INFO', response)
    })
    .catch(err => console.warn({err}))

    // const reserves3 = () => contract3.methods.getReserves().call()
    // .then(async (response) => {
    //   const res = await response
    //   return setContract(prev => ({...prev, v3:response}))
    // })
    // .catch(err => console.warn({err}))

    // .on('connected', () => console.log('connected'))
    // .on('data', data => console.log({socket: data}))
    reserves1();
    reserves2();
    //getPair();
    // reserves3();

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
      <Grid item xs={12}>
        <Prices
          v1={contract && contract.v1 && contract.v2 && ((contract.v1._reserve1 / contract.v1._reserve0) / 1000000000).toFixed(9)}
          v2={contract && contract.v1 && contract.v2 && ((contract.v2._reserve1 / contract.v2._reserve0)/ 1000000000).toFixed(9)}
        />
      </Grid>
      <Grid item xs={12}>
      </Grid>
    </Grid>
  );
};

export default Market;
