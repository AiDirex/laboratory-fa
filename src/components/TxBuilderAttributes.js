import React from 'react';
import OptionsTablePair from './OptionsTable/Pair';
import HelpMark from './HelpMark';
import PubKeyPicker from './FormComponents/PubKeyPicker';
import SequencePicker from './FormComponents/SequencePicker';
import StroopsPicker from './FormComponents/StroopsPicker';
import MemoPicker from './FormComponents/MemoPicker';
import TimeBoundsPicker from './FormComponents/TimeBoundsPicker';
import {connect} from 'react-redux';
import {StrKey} from 'stellar-sdk';
import NETWORK from '../constants/network';
import {fetchSequence} from '../actions/transactionBuilder';

export default function TxBuilderAttributes(props) {
  let {onUpdate, attributes} = props;

  return <div className="TransactionAttributes">
    <div className="TransactionOp__config TransactionOpConfig optionsTable">
      <OptionsTablePair label={<span>حساب مبدأ<HelpMark href="https://www.stellar.org/developers/learn/concepts/accounts.html" /></span>}>
        <PubKeyPicker
          value={attributes['sourceAccount']}
          onUpdate={(value) => {onUpdate('sourceAccount', value)}}
          />
        <p className="optionsTable__pair__content__note"><a href="#account-creator"></a></p>
      </OptionsTablePair>
      <OptionsTablePair label={<span>شماره ترتیب تراکنش <HelpMark href="https://www.stellar.org/developers/learn/concepts/transactions.html#sequence-number" /></span>}>
        <SequencePicker
          value={attributes['sequence']}
          onUpdate={(value) => {onUpdate('sequence', value)}}
          />
        <p className="optionsTable__pair__content__note">شماره توالی تراکنش یکی بیشتر از شماره توالی فعلی حساب میباشد.</p>
        <SequenceFetcher />
      </OptionsTablePair>
      <OptionsTablePair optional={true} label={<span>ارز پایه <HelpMark href="https://www.stellar.org/developers/learn/concepts/transactions.html#fee" /></span>}>
        <StroopsPicker
          value={attributes['fee']}
          onUpdate={(value) => {onUpdate('fee', value)}}
          />
        <p className="optionsTable__pair__content__note"> <a href="https://www.stellar.org/developers/learn/concepts/fees.html">کارمزد پایه شبکه</a> معادل ۱۰۰ استروپ در نظرگرفته شده است.کارمزد تراکنش برابر با کارمزد پایه در تعداد عملیات در یک تراکنش میباشد. </p>
      </OptionsTablePair>
      <OptionsTablePair optional={true} label={<span>از طرف(اختیاری) <HelpMark href="https://www.stellar.org/developers/learn/concepts/transactions.html#memo" /></span>}>
        <MemoPicker
          value={{
            type: attributes.memoType,
            content: attributes.memoContent,
          }}
          onUpdate={(value) => {onUpdate('memo', value)}}
          />
      </OptionsTablePair>
      <OptionsTablePair optional={true} label={<span>بازه زمانی(اختیاری) <HelpMark href="https://www.stellar.org/developers/guides/concepts/transactions.html#time-bounds" /></span>}>
        <TimeBoundsPicker
          value={{
            minTime: attributes.minTime,
            maxTime: attributes.maxTime
          }}
          onUpdate={(value) => {onUpdate('timebounds', value)}}
          />
        <p className="optionsTable__pair__content__note">زمانی که این تراکنش معتبر خواهد شد, مقادیر <a href="http://www.epochconverter.com/" target="_blank">فرمت زمانی یونیکس</a> را برای کرانهای زمانی وارد کنید.</p>
      </OptionsTablePair>
    </div>
  </div>
}

class sequenceFetcherClass extends React.Component {
  render() {
    let {attributes, sequenceFetcherError} = this.props.state;
    let dispatch = this.props.dispatch;
    let horizonURL = this.props.horizonURL;
    if (!StrKey.isValidEd25519PublicKey(attributes.sourceAccount)) {
      return null;
    }

    let sequenceErrorMessage;
    if (sequenceFetcherError.length > 0) {
      sequenceErrorMessage = <span className="optionsTable__pair__content__note optionsTable__pair__content__note--alert">
        {sequenceFetcherError}
      </span>
    }

    let truncatedAccountId = attributes.sourceAccount.substr(0,10);

    return <p className="optionsTable__pair__content__note">
      <a
        className="s-button"
        onClick={() => dispatch(
          fetchSequence(attributes.sourceAccount, horizonURL)
        )}
        >Fetch next sequence number for account starting with "{truncatedAccountId}"</a>
      <br />
      <small>Fetching from: <code>{horizonURL}</code></small><br />
      {sequenceErrorMessage}
    </p>
  }
}

let SequenceFetcher = connect(chooseState)(sequenceFetcherClass);
function chooseState(state) {
  return {
    user: state.user,
    state: state.transactionBuilder,
    horizonURL: state.network.current.horizonURL,
  }
}
