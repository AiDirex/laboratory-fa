import React from 'react'
import { connect } from 'react-redux'
import TextPicker from './FormComponents/TextPicker'
import OptionsTablePair from './OptionsTable/Pair'
import { sendOffer, setForm } from '../actions/manageOffer'
import { ErrorList } from './FormComponents/ErrorList'

class ManageOffer extends React.Component {

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
            <h2>مدیریت پیشنهاد</h2>
            <p></p>
          </div>
          {isLoggedIn && <div>
            {general.showError && <p>{general.errorMsg}</p>}
            {general.errors && <ErrorList errors={general.errors}/>}
            {general.showMsg && <p>{general.msg}</p>}
            {general.hash &&
            <a
              href={`#explorer?resource=transactions&endpoint=single&values=${btoa(JSON.stringify({transaction: general.hash}))}`}>برای
              مشاهده جزییات کلیک
              کنید.</a>}
            <div>
              <h3>خرید</h3>
              <OptionsTablePair label="کد دارایی برای خرید" key="buying_asset_code">
                <TextPicker value={form.buying_asset_code} onUpdate={(v) => {dispatch(setForm('buying_asset_code', v))}}
                            placeholder="XLM"/>
              </OptionsTablePair>
              {form.buying_asset_code.toLowerCase() !== 'xlm' &&
              <OptionsTablePair label="آدرس منتشر کننده دارایی برای خرید" key="buying_asset_issuer">
                <TextPicker value={form.buying_asset_issuer}
                            onUpdate={(v) => {dispatch(setForm('buying_asset_issuer', v))}}/>
              </OptionsTablePair>}
              <h3>فروش</h3>
              <OptionsTablePair label="کد دارایی برای فروش" key="selling_asset_code">
                <TextPicker value={form.selling_asset_code}
                            onUpdate={(v) => {dispatch(setForm('selling_asset_code', v))}} placeholder="XLM"/>
              </OptionsTablePair>
              {form.selling_asset_code.toLowerCase() !== 'xlm' &&
              <OptionsTablePair label="آدرس منتشر کننده دارایی برای فروش" key="selling_asset_issuer">
                <TextPicker value={form.selling_asset_issuer}
                            onUpdate={(v) => {dispatch(setForm('selling_asset_issuer', v))}}/>
              </OptionsTablePair>}
              <br/>
              <OptionsTablePair label="شناسه پیشنهاد (اختیاری)" key="offerId">
                <TextPicker value={form.offerId} value={form.id} onUpdate={(v) => {dispatch(setForm('offerId', v))}}/>
              </OptionsTablePair>
              <OptionsTablePair label="مقدار فروش" key="amount">
                <TextPicker value={form.amount} onUpdate={(v) => {dispatch(setForm('amount', v))}}/>
              </OptionsTablePair>
              <OptionsTablePair label="قیمت فروش (به ازای هر واحد)" key="price">
                <TextPicker value={form.price} onUpdate={(v) => {dispatch(setForm('price', v))}}/>
              </OptionsTablePair>
              <OptionsTablePair label="کلید خصوصی" key="source">
                <TextPicker value={form.source} onUpdate={(v) => {dispatch(setForm('source', v))}}/>
              </OptionsTablePair>
              <br/>
              <button className="s-button btn-warning" onClick={() => {dispatch(sendOffer(form))}}>ارسال</button>
            </div>
          </div>}
        </div>
      </div>
    </div>
  }
}

export default connect(chooseState)(ManageOffer)

function chooseState (reduxState) {
  return {
    general: reduxState.manageOffer.general,
    form: reduxState.manageOffer.form,
    user: reduxState.user
  }
}

