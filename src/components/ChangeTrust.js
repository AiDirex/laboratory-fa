import React from 'react'
import { connect } from 'react-redux'
import TextPicker from './FormComponents/TextPicker'
import OptionsTablePair from './OptionsTable/Pair'
import { sendChangeTrust, setForm } from '../actions/changeTrust'
import { ErrorList } from './FormComponents/ErrorList'

class ChangeTrust extends React.Component {

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
            <h2>ایجاد خط اعتماد</h2>
          </div>
          {isLoggedIn && <div>
            {general.showError && <p>{general.errorMsg}</p>}
            {general.errors && <ErrorList errors={general.errors} />}
            {general.showMsg && <p>{general.msg}</p>}
            {general.hash &&
            <a
              href={`#explorer?resource=transactions&endpoint=single&values=${btoa(JSON.stringify({transaction: general.hash}))}`}>برای
              مشاهده جزییات کلیک
              کنید.</a>}
            <div>
              <OptionsTablePair label="کلید خصوصی" key="source">
                <TextPicker value={form.source} onUpdate={(v) => {dispatch(setForm('source', v))}}/>
              </OptionsTablePair>
              <OptionsTablePair label="کد دارایی" key="asset_code">
                <TextPicker value={form.asset_code} onUpdate={(v) => {dispatch(setForm('asset_code', v))}} placeholder="coin"/>
              </OptionsTablePair>
              <OptionsTablePair label="آدرس منتشر کننده دارایی" key="asset_issuer">
                <TextPicker value={form.asset_issuer} onUpdate={(v) => {dispatch(setForm('asset_issuer', v))}}/>
              </OptionsTablePair>
              <OptionsTablePair label="سقف اعتماد" key="limit">
                <TextPicker value={form.limit} onUpdate={(v) => {dispatch(setForm('limit', v))}}/>
              </OptionsTablePair>
              <br/>
              <button className="s-button btn-warning" onClick={() => {dispatch(sendChangeTrust(form))}}>ارسال</button>
            </div>
          </div>}
        </div>
      </div>
    </div>
  }
}

export default connect(chooseState)(ChangeTrust)

function chooseState (reduxState) {
  return {
    general: reduxState.changeTrust.general,
    form: reduxState.changeTrust.form,
    user: reduxState.user
  }
}

