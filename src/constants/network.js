import {Network, Networks} from 'stellar-sdk';

const NETWORK = {
  api: {
    base: 'http://polychain2.com:8080/api/v1'
  },
  bridge: {
    base: 'http://polychain2.com/bridge'
  },
  available: {
    main: {
      horizonURL: 'http://polychain2.com:8000',
      networkPassphrase: 'polychain'
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
