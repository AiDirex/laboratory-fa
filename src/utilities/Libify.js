// Libify is a utility that converts a wide variety of inputs into their stricter
// representations in Stellar libraries such as js-stellar-sdk and js-stellar-sdk.
//
// The Libify api aims to look similar to that of js-stellar-sdk and Sdk. It
// will output better error messages in cases where helpful (instead of just
// undefined error messages).
//
// Libify could also be used to generate source code from input but might not be
// the best choice since source code differs based on content.

import Sdk from 'stellar-sdk';
import _ from 'lodash';

// Helpers
let isEmpty = function(value) {
  return _.isUndefined(value) || value === '' || value === null;
}
let isInt = function(value) {
  return String(value).match(/^[0-9]*$/g);
}
let assertNotEmpty = function(value, message) {
  if (isEmpty(value)) {
    throw new Error(message);
  }
}
let assertIntOrEmpty = function(value, message) {
  if (!isEmpty(value) && !isInt(value)) {
    throw new Error(message);
  }
}

// Converts a value into a boolean. String values are converted to their respective
// boolean values since html forms can only output string values.
let isLooseTruthy = function(value) {
  if (value == 'true') {
    return true;
  }
  if (value == 'false') {
    return false;
  }
  return value == true;
}

// This function processes the value in three situations:
// 1. Is a number: return as is
// 2. String contains just digits: will convert into JavaScript Number integer
// 3. String is empty: converts to undefined (useful for optional arguments)
let castIntOrUndefined = function(value) {
  if (typeof value === 'number') {
    return value;
  }
  if (_.isString(value) && value.match(/^[0-9]+$/g)) {
    return Number(value);
  }
  return undefined;
}

// This function processes the value in three situations:
// 1. Is a string: return as is
// 2. String is empty: converts to undefined (useful for optional arguments)
let castStringOrUndefined = function(value) {
  if (!_.isString(value) || value === '') {
    return undefined;
  }
  return String(value);
}

let castStringOrNull = function(value) {
  if (!_.isString(value) || value === '') {
    return null;
  }
  return String(value);
}

let Libify = {};

Libify.Asset = function(opts) {
  if (isEmpty(opts) || opts.type === 'native') {
    return Sdk.Asset.native();
  }

  assertNotEmpty(opts.code, 'برای کالا, کد کالا ضروری میباشد.');
  return new Sdk.Asset(opts.code, opts.issuer);
}

Libify.Memo = function(opts) {
  switch(opts.type) {
  case '':
  case 'MEMO_TEXT':
    return Sdk.Memo.text(opts.content);
  case 'MEMO_ID':
    return Sdk.Memo.id(opts.content);
  case 'MEMO_HASH':
    return Sdk.Memo.hash(opts.content);
  case 'MEMO_RETURN':
    return Sdk.Memo.return(opts.content);
  }
}

// Takes in a type and a pile of options and attempts to turn it into a valid
// js-stellar-sdk operation. If not, it will throw an error.
Libify.Operation = function(type, opts) {
  assertNotEmpty(type, 'وارد کردن نوع عملیات الزامی است.');
  let opFunction = Libify.Operation[type];
  if (typeof opFunction === 'undefined' || _.has(Libify.Operation, 'opFunction')) {
    throw new Error('نوع عملیات نامشخص است' + type);
  }
  return opFunction(opts);
}

Libify.Operation.createAccount = function(opts) {
  assertNotEmpty(opts.destination, 'برای عملیات ساختن حساب مقصد لازم است.');
  assertNotEmpty(opts.startingBalance, 'برای عملیات ساختن حساب موجودی اولیه لازم است.');
  return Sdk.Operation.createAccount({
    destination: opts.destination,
    startingBalance: opts.startingBalance,
    source: opts.sourceAccount,
  })
}

Libify.Operation.payment = function(opts) {
  assertNotEmpty(opts.destination,'برای عملیات پرداخت مقصد لازم است.' );
  assertNotEmpty(opts.asset, 'برای عملیات پرداخت کالا لازم است. ');
  assertNotEmpty(opts.amount, 'برای عملیات پرداخت مقدار لازم است.');
  return Sdk.Operation.payment({
    destination: opts.destination,
    asset: Libify.Asset(opts.asset),
    amount: opts.amount,
    source: opts.sourceAccount,
  })
}

Libify.Operation.pathPayment = function(opts) {
  assertNotEmpty(opts.sendAsset, 'Path Payment operation requires sending asset');
  assertNotEmpty(opts.sendMax, 'Path Payment operation requires max send');
  assertNotEmpty(opts.destination, 'Payment operation requires destination');
  assertNotEmpty(opts.destAsset, 'Path Payment operation requires destination asset');
  assertNotEmpty(opts.destAmount, 'Path Payment operation requires the destination amount');

  let libifiedPath = _.map(opts.path, (hopAsset) => {
    if (_.isUndefined(hopAsset.type)) {
      throw new Error('All assets in path must be filled out');
    }
    return Libify.Asset(hopAsset);
  })

  return Sdk.Operation.pathPayment({
    sendAsset: Libify.Asset(opts.sendAsset),
    sendMax: opts.sendMax,
    destination: opts.destination,
    destAsset: Libify.Asset(opts.destAsset),
    destAmount: opts.destAmount,
    path: libifiedPath,
    source: opts.sourceAccount,
  })
}

Libify.Operation.changeTrust = function(opts) {
  assertNotEmpty(opts.asset, 'برای عملیات تغییر خط اعتماد کالا لازم است.');
  return Sdk.Operation.changeTrust({
    asset: Libify.Asset(opts.asset),
    limit: (opts.limit === '') ? undefined : opts.limit,
    source: opts.sourceAccount,
  })
}

Libify.Operation.allowTrust = function(opts) {
  assertNotEmpty(opts.trustor, 'ایجاد خط اعتماد به اعتماد نیاز دارد.');
  assertNotEmpty(opts.assetCode, 'در عملیات ایجاد خط اعتماد کد کالا مورد نیاز است.');
  assertNotEmpty(opts.authorize, 'عملیات ایجاد خط اعتماد به تنظیمات احراز هویت نیاز دارد.');
  return Sdk.Operation.allowTrust({
    trustor: opts.trustor,
    assetCode: opts.assetCode,
    authorize: isLooseTruthy(opts.authorize),
    source: opts.sourceAccount,
  })
}

Libify.Operation.accountMerge = function(opts) {
  assertNotEmpty(opts.destination, 'برای عملیات ادغام اکانت مقصد لازم است.');
  return Sdk.Operation.accountMerge({
    destination: opts.destination,
    source: opts.sourceAccount,
  })
}

Libify.Operation.manageOffer = function(opts) {
  assertNotEmpty(opts.selling, 'برای عملیات میدیریت پیشنهاد به کالای فروشی  نیاز است.');
  assertNotEmpty(opts.buying, 'برای عملیات مدیریت پیشنهاد به کالایی که قصد خرید آن را داریم نیاز است.');
  assertNotEmpty(opts.amount, 'برای عملیات مدیریت پیشنهاد به مقدار نیاز است.');
  assertNotEmpty(opts.price, 'برای عملیات مدیریت پیشنهاد به قیمت نیاز است.');
  assertNotEmpty(opts.offerId, 'برای عملیات مدیریت پیشنهاد به شناسه پیشنهاد نیاز است.');
  return Sdk.Operation.manageOffer({
    selling: Libify.Asset(opts.selling),
    buying: Libify.Asset(opts.buying),
    amount: opts.amount,
    price: opts.price,
    offerId: opts.offerId,
    source: opts.sourceAccount,
  })
}

Libify.Operation.createPassiveOffer = function(opts) {
  assertNotEmpty(opts.selling, 'برای عملیات ساختن پیشنهاد منفعل به کالای فروشی نیاز است.');
  assertNotEmpty(opts.buying, 'برای عملیات ساختن پیشنهاد منفعل به کالایی که قصد خرید آن را داریم نیاز است.');
  assertNotEmpty(opts.amount, 'برای عملیات ساختن پیشنهاد منفعل به مقدار نیاز است.');
  assertNotEmpty(opts.price, 'برای عملیات ساختن پیشنهاد منفعل به قیمت نیاز است.e');
  return Sdk.Operation.createPassiveOffer({
    selling: Libify.Asset(opts.selling),
    buying: Libify.Asset(opts.buying),
    amount: opts.amount,
    price: opts.price,
    source: opts.sourceAccount,
  })
}

Libify.Operation.inflation = function(opts) {
  return Sdk.Operation.inflation({
    source: opts.sourceAccount,
  })
}

Libify.Operation.setOptions = function(opts) {
  let signer;
  if (opts.signer && opts.signer.type) {
    let signerPubKeyEmpty = isEmpty(opts.signer.content);
    let signerWeightEmpty = isEmpty(opts.signer.weight);
    if (signerPubKeyEmpty && !signerWeightEmpty) {
      throw new Error('اگر کلید امضا کننده موجود باشد به وزن امضا کننده نیاز است.');
    }
    if (!signerPubKeyEmpty && signerWeightEmpty) {
      throw new Error('اگر وزن امضا کننده موجود باشد به کلید امضا کننده نیاز است. ');
    }

    if (!signerPubKeyEmpty && !signerWeightEmpty) {
      signer = {
        weight: castIntOrUndefined(opts.signer.weight)
      };
      switch (opts.signer.type) {
        case "ed25519PublicKey":
          signer.ed25519PublicKey = opts.signer.content;
          break;
        case "sha256Hash":
        case "preAuthTx":
          signer[opts.signer.type] = Buffer.from(opts.signer.content, "hex");
          break;
        default:
          throw new Error('نوع امضا کننده نامعتبر است.');
      }
    } else {
      throw new Error('کلید و وزن امضا کننده را وارد کنید.');
    }
  }

  assertIntOrEmpty(opts.clearFlags, 'Clear flags must be an integer');
  assertIntOrEmpty(opts.setFlags, 'Set flags must be an integer');
  assertIntOrEmpty(opts.masterWeight, 'Master Weight must be an integer');
  assertIntOrEmpty(opts.lowThreshold, 'آستانه پایین باید عدد صحیح باشد.');
  assertIntOrEmpty(opts.medThreshold, 'آستانه متوسط باید عدد صحیح باشد.');
  assertIntOrEmpty(opts.highThreshold, 'آستانه بالا باید عدد صحیح باشد.');

  return Sdk.Operation.setOptions({
    inflationDest: opts.inflationDest,
    clearFlags: castIntOrUndefined(opts.clearFlags),
    setFlags: castIntOrUndefined(opts.setFlags),
    masterWeight: castIntOrUndefined(opts.masterWeight),
    lowThreshold: castIntOrUndefined(opts.lowThreshold),
    medThreshold: castIntOrUndefined(opts.medThreshold),
    highThreshold: castIntOrUndefined(opts.highThreshold),
    signer: signer,
    homeDomain: castStringOrUndefined(opts.homeDomain),
    source: opts.sourceAccount,
  })
}

Libify.Operation.manageData = function(opts) {
  assertNotEmpty(opts.name, 'Manage Data operation requires entry name');

  return Sdk.Operation.manageData({
    name: opts.name,
    value: castStringOrNull(opts.value),
    source: opts.sourceAccount,
  })
}

Libify.Operation.bumpSequence = function(opts) {
  assertNotEmpty(opts.bumpTo, 'شماره تنظیم باید تنظیم شود.');
  return Sdk.Operation.bumpSequence({
    bumpTo: opts.bumpTo,
    source: opts.sourceAccount,
  })
}

// buildTransaction is not something found js-stellar libs but acts as an
// abstraction to building a transaction with input data in the same format
// as the reducers
Libify.buildTransaction = function(attributes, operations, networkObj) {
  Sdk.Network.use(networkObj);
  let result = {
    errors: [],
    xdr: '',
  };

  try {
    var account = new Sdk.Account(attributes.sourceAccount, Sdk.UnsignedHyper.fromString(attributes.sequence).subtract(1).toString());

    let opts = {};
    if (attributes.fee !== '') {
      const MAX_UINT32 = Math.pow( 2, 32 ) - 1;
      if (parseInt(attributes.fee) > MAX_UINT32) {
        throw Error(`اعتبار پایه بیش از اندازه بزرگ است:(عدد ۳۲ بیتی امضا نشده نامعتبر است)`);
      }

      opts.fee = attributes.fee;
    }

    let timebounds = {};

    if (attributes.minTime !== '') {
      timebounds.minTime = attributes.minTime;
    }

    if (attributes.maxTime !== '') {
      timebounds.maxTime = attributes.maxTime;
    }

    if (!_.isEmpty(timebounds)) {
      opts.timebounds = _.defaults(timebounds, {
        minTime: '0',
        maxTime: '0'
      });
    }

    var transaction = new Sdk.TransactionBuilder(account, opts)

    if (attributes.memoType !== 'MEMO_NONE' && attributes.memoType !== '') {
      try {
        transaction = transaction.addMemo(Libify.Memo({
          type: attributes.memoType,
          content: attributes.memoContent,
        }));
      } catch(e) {
        result.errors.push(`Memo: ${e.message}`);
      }
    }

    _.each(operations, (op, index) => {
      try {
        transaction = transaction.addOperation(Libify.Operation(op.name, op.attributes));
      } catch(e) {
        result.errors.push(`Operation #${index + 1}: ${e.message}`);
      }
    })

    transaction = transaction.build();
    result.xdr = transaction.toEnvelope().toXDR('base64');
    result.hash = transaction.hash().toString('hex');
  } catch(e) {
    result.errors.push(e.message);
  }

  return result;
}


Libify.signTransaction = function(txXdr, signers, networkObj, ledgerWalletSigs) {
  Sdk.Network.use(networkObj);

  let validSecretKeys = [];
  let validPreimages = [];
  for (let i = 0; i < signers.length; i++) {
    let signer = signers[i];
    if (signer !== null && !_.isUndefined(signer) && signer !== '') {
      // Signer
      if (signer.charAt(0) == 'S') {
        if (!Sdk.StrKey.isValidEd25519SecretSeed(signer)) {
          return {
            message: 'یکی از کلیدهای خصوصی نامعتبر است.'
          }
        }
        validSecretKeys.push(signer);
      } else {
        // Hash preimage
        if (!signer.match(/^[0-9a-f]{2,128}$/gi) || signer.length % 2 == 1) {
          return {
            message: 'پیش تصویر چکیده نامعتبر است.'
          }
        }
        validPreimages.push(signer);
      }
    }
  }

  let newTx = new Sdk.Transaction(txXdr);
  let existingSigs = newTx.signatures.length;
  let addedSigs = 0;

  _.each(validSecretKeys, (signer) => {
    addedSigs++;
    newTx.sign(Sdk.Keypair.fromSecret(signer));
  });
  _.each(validPreimages, (signer) => {
    addedSigs++;
    newTx.signHashX(Buffer.from(signer, 'hex'));
  });
  _.each(ledgerWalletSigs, (ledgerSig) => {
    addedSigs++;
    newTx.signatures.push(ledgerSig);
  });


  if (addedSigs < 1) {
    return {
      message: 'یک کلید خصوصی برای امضا کردن پیام وارد کنید.'
    }
  }

  return {
    xdr: newTx.toEnvelope().toXDR('base64'),
    message: `${addedSigs} signature(s) added; ${existingSigs + addedSigs} signature(s) total`,
  };
}

export default Libify;
