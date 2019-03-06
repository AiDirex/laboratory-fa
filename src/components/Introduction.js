import React from 'react'
import { connect } from 'react-redux'
import TextPicker from './FormComponents/TextPicker'
import OptionsTablePair from './OptionsTable/Pair'
import axios from 'axios'
import NETWORK from '../constants/network'
import { generateNewKeypair } from '../actions/accountCreator'
import { loginRequest, registerRequest, showLogin, showRegister } from '../actions/introduction'
import { ResultTable } from './SetupPanes/ResultTable'
import { logoutUser, setUser } from '../actions/user'
import classNames from 'classnames'
import { ErrorList } from './FormComponents/ErrorList'

class Introduction extends React.Component {

  constructor (props) {
    super(props)
    this.user = {
      firstName: null,
      lastName: null,
      mobile: null,
      accountId: null,
      password: null,
      email: null
    }
    this.auth = {
      mobile: null,
      password: null,
    }
  }

  register () {
    let {state, dispatch} = this.props

    dispatch(registerRequest(this.user))
  }

  login () {
    let {state, dispatch} = this.props

    console.log(this.auth)

    dispatch(loginRequest(this.auth))
  }

  logout () {
    let {state, dispatch} = this.props
    dispatch(showLogin())
    dispatch(logoutUser())
    setTimeout(() => {window.location.reload()}, 1000)
  }

  render () {
    const {state, dispatch, user} = this.props
    const isLoggedIn = user && user.access_token && user.accountId

    return <div className="Introduction">
      <div className="so-back">
        <div className="so-chunk">
          <div className="Introduction__container">
            <h2>سامانه پیش فروش سکه</h2>
            {/*<p className="Introduction__lead">The Stellar Laboratory is a set of tools that enables people to try out*/}
            {/*and learn about the Stellar network. The laboratory can <a href="#txbuilder">build transactions</a>, <a*/}
            {/*href="#txsigner">sign them</a>, and <a href="#explorer?resource=transactions&endpoint=create">submit*/}
            {/*them to the network</a>. It can also <a href="#explorer">make requests to any of the Horizon*/}
            {/*endpoints</a>.</p>*/}
            <br/>
          </div>
          {isLoggedIn && <div>
            <div>
              <p>{`${user.firstName} ${user.lastName} خوش آمدید.`}</p>
              <p>برای <a className={'link-payment'} href={'#payment'}>پرداخت</a> کلیک کنید.</p>
              <button className="s-button red btn-warning" onClick={() => {this.logout()}}>خروج</button>
            </div>
            <div style={{}}>
              <br/>
              <ResultTable body={user} keys={['firstName', 'lastName', 'accountId', 'mobile']} label="اطلاعات حساب پول شما"/>
            </div>
          </div>}
          {!isLoggedIn && <div>
            {state.showKeypair && <div>
              <ResultTable body={state.keypair} keys={state.keypairFields} label="اطلاعات کیف پول شما"/>
            </div>}
            <br/>
            {!isLoggedIn && <div style={{width: 200, margin: 'auto'}}>
              {state.showRegister &&
              <button className="s-bمیدیutton--min" onClick={() => {dispatch(showRegister())}}>ثبت نام &nbsp;|</button>}
              {state.showLogin &&
              <button className="s-button--min" onClick={() => {dispatch(showLogin())}}>ورود</button>}
            </div>}
            {state.showError && <p>{state.errorMsg}</p>}
            {state.showMsg && <p>{state.msg}</p>}
            {state.errors && <ErrorList errors={state.errors} />}
            {state.mode === 'register' &&
            <div>
              <OptionsTablePair label="نام" key="firstName">
                <TextPicker onUpdate={(v) => {this.user.firstName = v}} placeholder='نام'/>
              </OptionsTablePair>
              <OptionsTablePair label="نام خانوادگی" key="lastName">
                <TextPicker onUpdate={(v) => {this.user.lastName = v}} placeholder='نام خانوادگی'/>
              </OptionsTablePair>
              <OptionsTablePair label="موبایل" key="mobile">
                <TextPicker onUpdate={(v) => {this.user.mobile = v}} placeholder='موبایل'/>
              </OptionsTablePair>
              <OptionsTablePair label="ایمیل" key="email">
                <TextPicker onUpdate={(v) => {this.user.email = v}} placeholder='ایمیل'/>
              </OptionsTablePair>
              <OptionsTablePair label="رمز عبور" key="password">
                <TextPicker type="password" onUpdate={(v) => {this.user.password = v}} placeholder='رمز عبور'/>
              </OptionsTablePair>
              <br/>
              <button className="s-button btn-warning" onClick={() => {this.register()}}>ارسال</button>
            </div>}
            {state.mode === 'login' &&
            <div>
              <OptionsTablePair label="موبایل" key="mobile">
                <TextPicker onUpdate={(v) => {this.auth.mobile = v}} placeholder='موبایل'/>
              </OptionsTablePair>
              <OptionsTablePair label="رمز عبور" key="password">
                <TextPicker type="password" onUpdate={(v) => {this.auth.password = v}} placeholder='رمز عبور'/>
              </OptionsTablePair>
              <br/>
              <button className="s-button btn-warning" onClick={() => {this.login()}}>ورود</button>
            </div>}
          </div>}
        </div>
      </div>
    </div>
  }
}

export default connect(chooseState)(Introduction)

function chooseState (reduxState) {
  return {
    state: reduxState.introduction,
    user: reduxState.user
  }
}

