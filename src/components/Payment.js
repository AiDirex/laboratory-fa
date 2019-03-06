import React from 'react'
import { connect } from 'react-redux'
import TextPicker from './FormComponents/TextPicker'
import OptionsTablePair from './OptionsTable/Pair'
import { sendPayment, setForm } from '../actions/payment'
import { ErrorList } from './FormComponents/ErrorList'

class Payment extends React.Component {

  constructor (props) {
    super(props)
  }

  render () {
    const {general, form, dispatch, user} = this.props
    const isLoggedIn = user && user.access_token && user.accountId

    return <div className="Introduction">
      <div className="so-back">
        <div className="so-chunk">
          <div className="Introduction__container">
            <h2>پرداخت</h2>
          </div>
          {isLoggedIn && <div>
            {general.showError && <p>{general.errorMsg}</p>}
            {general.showMsg && <p>{general.msg}</p>}
            {general.errors && <ErrorList errors={general.errors} />}
            <div>
              <OptionsTablePair label="شناسه پرداخت (اختیاری)" key="id">
                <TextPicker value={form.id} onUpdate={(v) => {dispatch(setForm('id', v))}}/>
              </OptionsTablePair>
              <OptionsTablePair label="مقدار" key="amount">
                <TextPicker value={form.amount} onUpdate={(v) => {dispatch(setForm('amount', v))}}/>
              </OptionsTablePair>
              <OptionsTablePair label="آدرس مقصد" key="destination">
                <TextPicker onUpdate={(v) => {dispatch(setForm('destination', v))}}/>
              </OptionsTablePair>
              <OptionsTablePair label="کلید خصوصی" key="source">
                <TextPicker onUpdate={(v) => {dispatch(setForm('source', v))}}/>
              </OptionsTablePair>
              <OptionsTablePair label="کد دارایی" key="asset_code">
                <TextPicker onUpdate={(v) => {dispatch(setForm('asset_code', v))}} placeholder="XLM"/>
              </OptionsTablePair>
              {(form.asset_code === null || form.asset_code === undefined || (form.asset_code.trim() !== '' && form.asset_code.toLowerCase() !== 'xlm')) &&
              <OptionsTablePair label="آدرس منتشر کننده دارایی" key="asset_issuer">
                <TextPicker onUpdate={(v) => {dispatch(setForm('asset_issuer', v))}}/>
              </OptionsTablePair>}
              <br/>
              <button className="s-button btn-warning" onClick={() => {dispatch(sendPayment(form))}}>ارسال</button>
            </div>
          </div>}
        </div>
      </div>
    </div>
  }
}

export default connect(chooseState)(Payment)

function chooseState (reduxState) {
  return {
    general: reduxState.payment.general,
    form: reduxState.payment.form,
    user: reduxState.user
  }
}

