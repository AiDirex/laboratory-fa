import React from 'react';
import {connect} from 'react-redux';
import {Transaction, Keypair, Network} from 'stellar-sdk';
import TransactionImporter from './TransactionImporter';
import {
  importFromXdr,
  clearTransaction,
  setSecrets,
  setBIPPath,
  signWithLedger,
} from '../actions/transactionSigner';
import {EasySelect} from './EasySelect';
import OptionsTablePair from './OptionsTable/Pair';
import SecretKeyPicker from './FormComponents/SecretKeyPicker';
import MultiPicker from './FormComponents/MultiPicker';
import BipPathPicker from './FormComponents/BipPathPicker';
import {txPostLink, xdrViewer} from '../utilities/linkBuilder';
import HelpMark from './HelpMark';
import clickToSelect from '../utilities/clickToSelect';
import scrollOnAnchorOpen from '../utilities/scrollOnAnchorOpen';
import extrapolateFromXdr from '../utilities/extrapolateFromXdr';
import validateTxXdr from '../utilities/validateTxXdr';
import NETWORK from '../constants/network';
import {signTransaction} from '../utilities/Libify';

class TransactionSigner extends React.Component {
  render() {
    let {dispatch, networkPassphrase} = this.props;
    let {xdr, signers, bipPath, ledgerwalletStatus} = this.props.state;
    let content;

    let networkObj = new Network(networkPassphrase)

    if (validateTxXdr(xdr).result !== 'success') {
      content = <div className="so-back">
        <div className="so-chunk">
          <div className="TxSignerImport TransactionSigner__import">
            <p className="TxSignerImport__title">یک تراکنش در فرمت XDR وارد کنید </p>
            <TransactionImporter onImport={(xdr) => dispatch(importFromXdr(xdr))}/>
          </div>
        </div>
      </div>
    } else {
      let ledgerSigs = ledgerwalletStatus.signatures;
      let result = signTransaction(xdr, signers, networkObj, ledgerSigs);
      let transaction = new Transaction(xdr);

      let infoTable = {
        'رمز عبور شبکه': <pre className="so-code so-code__wrap"><code>{networkPassphrase}</code></pre>,
        ' پاکت XDR تراکنش': <EasySelect plain={true}><pre className="so-code so-code__wrap"><code>{xdr}</code></pre></EasySelect>,
        'چکیده تراکنش': <EasySelect plain={true}><pre className="so-code so-code__wrap"><code>{transaction.hash().toString('hex')}</code></pre></EasySelect>,
        'حساب مبدا': transaction.source,
        'شماره توالی': transaction.sequence,
        'کارمزد تراکنش (استروپ)': transaction.fee,
        'تعداد عملیات': transaction.operations.length,
        'تعداد امضاهای موجود': transaction.signatures.length,
      };

      let codeResult, submitLink, xdrLink, resultTitle, submitInstructions;

      if (!_.isUndefined(result.xdr)) {
        codeResult = <pre className="TxSignerResult__xdr so-code so-code__wrap" onClick={clickToSelect}><code>{result.xdr}</code></pre>;
        submitLink = <a
          className="s-button TxSignerResult__submit"
          href={txPostLink(result.xdr)}
          onClick={scrollOnAnchorOpen}
          >تراکنش را ارسال نمایید.</a>;
        xdrLink = <a
          className="s-button TxSignerResult__submit"
          href={xdrViewer(result.xdr, 'TransactionEnvelope')}
          onClick={scrollOnAnchorOpen}
          >در بخش نمایش دهنده XDR نشان داده شود.</a>;
        resultTitle = <h3 className="TxSignerResult__title"> تراکنش امضا شد!</h3>;
        submitInstructions = <p className="TxSignerResult__instructions">
          اکنون تراکنش شما امضا شده و شما میتوانید آن را در شبکه ارسال و ثبت کنید. نتایج به شما اعلام خواهد شد.
        </p>
      }

      let ledgerwalletMessage;
      if (ledgerwalletStatus.message) {

        let messageAlertType;
        if (ledgerwalletStatus.status === 'loading') {
          messageAlertType = 's-alert--info';
        } else if (ledgerwalletStatus.status === 'success') {
          messageAlertType = 's-alert--success';
        } else if (ledgerwalletStatus.status === 'failure') {
          messageAlertType = 's-alert--alert';
        }

        ledgerwalletMessage = <div>
          <br />
          <div className={`s-alert TxSignerKeys__ledgerwallet_message ${messageAlertType}`}> {ledgerwalletStatus.message} </div>
        </div>
      }


      content = <div>
        <div className="so-back">
          <div className="so-chunk">
            <div className="TxSignerOverview TransactionSigner__overview">
              <div className="TxSignerOverview__titleBar">
                <p className="TxSignerOverview__titleBar__title"> لطفا قبل از ارسال، اطلاعات تراکنش را به طور کامل بررسی نمایید</p>
                <a className="TxSignerOverview__titleBar__reset"
                  onClick={() => dispatch(clearTransaction())}>
                  تراکنش فعلی را پاک کرده و یک تراکنش جدید بسازید.</a>
              </div>
              <div className="simpleTable">
                {_.map(infoTable, (content, label) => {
                  return <div className="simpleTable__row" key={label}>
                    <div className="simpleTable__row__label">{label}</div>
                    <div className="simpleTable__row__content">{content}</div>
                  </div>
                })}
              </div>
            </div>
          </div>
          <div className="so-chunk">
            <div className="TxSignerKeys TransactionSigner__keys">
              <p className="TxSignerKeys__title">امضاها <HelpMark href="https://www.stellar.org/developers/learn/concepts/multi-sig.html" /></p>
              <div className="optionsTable">
                <OptionsTablePair label="امضا کننده را اضافه کنید">
                  <MultiPicker
                    component={SecretKeyPicker}
                    value={signers}
                    onUpdate={(value) => dispatch(setSecrets(value))}
                  />
                </OptionsTablePair>
                <OptionsTablePair label="دفترکل کیف پول">
                  <BipPathPicker
                    value={bipPath}
                    onUpdate={(value) => dispatch(setBIPPath(value))}
                  />
                  <button
                    className="s-button TxSignerKeys__signBipPath btn-warning"
                    onClick={() => {dispatch(signWithLedger(xdr, bipPath))}}
                  >با </button>
                  {ledgerwalletMessage}
                </OptionsTablePair>
              </div>

            </div>
          </div>
        </div>
        <div className="so-back TxSignerResult TransactionSigner__result">
          <div className="so-chunk">
            {resultTitle}
            <p className="TxSignerResult__summary">{result.message}</p>
            {codeResult}
            {submitInstructions}
            {submitLink} {xdrLink}
          </div>
        </div>
      </div>
    }
    return <div className="TransactionSigner">
      <div className="so-back">
        <div className="so-chunk">
          <div className="pageIntro">
            <p>
              در بخش امضای تراکنش شما میتوانید امضاهایی را به تراکنشهای استلار اضافه کنید.امضاها در شبکه استلار برای تایید هویت شخصی که دارنده حساب بوده و قصد انجام تراکنش را دارد استفاده میشود.
            </p>
            <p>
              برای تراکنشهای ساده شما تنها به یک امضا نیاز دارید.برخی از تراکنشهای پیچیده در صورتی که بیش از یک مبدأ و کلید خصوصی داشته باشند به بیش از یک امضا برای انجام تراکنش نیاز دارند.
            </p>
           {/* <p><a href="https://www.stellar.org/developers/learn/concepts/multi-sig.html" target="_blank">برای مطالعه بیشتر در مورد امضاها در سایت توسعه دهندگان بر روی این لینک کلیک کنید.</a></p>*/}
          </div>
        </div>
      </div>
      {content}
    </div>
  }
}

export default connect(chooseState)(TransactionSigner);

function chooseState(state) {
  return {
    state: state.transactionSigner,
    networkPassphrase: state.network.current.networkPassphrase,
  }
}


