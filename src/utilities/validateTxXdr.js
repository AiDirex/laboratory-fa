import _ from 'lodash';
import {Transaction} from 'stellar-sdk';
import validateBase64 from './validateBase64';

export default function validateTxXdr(input) {
  input = _.trim(input);

  let base64Validation = validateBase64(input);
  if (base64Validation.result !== 'success') {
    return base64Validation;
  }

  try {
    new Transaction(input);
    return {
      result: 'success',
      message: 'Valid Transaction Envelope XDR',
    }
  } catch (e) {
    return {
      result: 'error',
      message: 'قادر به تجزیه XDR ورودی به یک بسته تراکنش نیست.',
    };
  }
}
