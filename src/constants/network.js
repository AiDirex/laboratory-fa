import {Network, Networks} from 'stellar-sdk';

const NETWORK = {
  api: {
    base: 'http://polychain1.com:8080/api/v1'
  },
  bridge: {
    base: 'http://polychain1.com:8006'
  },
  available: {
    main: {
      horizonURL: 'http://polychain1.com:8000',
      networkPassphrase: 'polychain_coin'
    },
    test: {
      horizonURL: 'https://horizon-testnet.stellar.org',
      networkPassphrase: Networks.TESTNET
    },
    /*public: {
      horizonURL: 'https://horizon.stellar.org',
      networkPassphrase: Networks.PUBLIC
    }*/
  },
  defaultName: 'main',
};
export default NETWORK;
