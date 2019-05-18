import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import NetworkPicker from './NetworkPicker';
import Introduction from './Introduction';
import AccountCreator from './AccountCreator';
import EndpointExplorer from './EndpointExplorer';
import TransactionBuilder from './TransactionBuilder';
import TransactionSigner from './TransactionSigner';
import Payment from './Payment';
import XdrViewer from './XdrViewer';
import {RouterListener} from '../utilities/simpleRouter';
import SLUG from '../constants/slug';
import ChangeTrust from './ChangeTrust'
import ManageOffer from './ManageOffer'

function LaboratoryChrome(props) {
  const {user} = props
  const isLoggedIn = user && user.access_token && user.accountId

  let tabItem = (name, slug) => {
    return <a
      href={'#' + slug}
      className={classNames(
        'buttonList__item s-button s-button--min btn btn-warning',
        {'is-active': props.routing.location === slug})}
      key={slug}>
      {name}
    </a>
  }

  return <div>
    <div className="so-back">
      <div className="so-chunk">
        <div className="so-siteHeader LaboratoryChrome__header">
          <span className="so-logo">
            <a href="http://polychain.aut.ac.ir" className="so-logo__main">Polychain</a>
            <span className="so-logo__separator"> </span>
            <a href="#" className="so-logo__subSite">پیش فروش سکه</a>
          </span>
          {/*<NetworkPicker />*/}
        </div>
      </div>
    </div>
    <div className="so-back LaboratoryChrome__siteNavBack">
      <div className="so-chunk">
        <nav className="s-buttonList">
          {tabItem('خانه', SLUG.HOME)}
          {/*{!isLoggedIn && tabItem('ساختن کیف پول', SLUG.ACCOUNT_CREATOR)}*/}
          {isLoggedIn && tabItem('جستجوگر', SLUG.EXPLORER)}
          {isLoggedIn && tabItem('ایجاد خط اعتماد', SLUG.CHANGE_TRUST)}
          {isLoggedIn && tabItem('پرداخت', SLUG.PAYMENT)}
          {isLoggedIn && tabItem('مدیریت پیشنهاد', SLUG.MANAGER_OFFER)}
          {isLoggedIn && tabItem('ساختن تراکنش', SLUG.TXBUILDER)}
          {isLoggedIn && tabItem('امضا تراکنش', SLUG.TXSIGNER)}
          {/*{tabItem('XDR Viewer', SLUG.XDRVIEWER)}*/}
        </nav>
      </div>
    </div>

    {getContent(props.routing.location)}
    <RouterListener />
  </div>;
}

function getContent(slug) {
  switch (slug) {
    case SLUG.HOME:
      return <Introduction />
    case SLUG.ACCOUNT_CREATOR:
      return <AccountCreator />;
    case SLUG.EXPLORER:
      return <EndpointExplorer />;
    case SLUG.TXBUILDER:
      return <TransactionBuilder />;
    case SLUG.TXSIGNER:
      return <TransactionSigner />;
    case SLUG.PAYMENT:
      return <Payment />;
    case SLUG.CHANGE_TRUST:
      return <ChangeTrust />;
    case SLUG.MANAGER_OFFER:
      return <ManageOffer />;
    case 'xdr-viewer':
      return <XdrViewer />;
    default:
      return <SimplePage><p>Page "{slug}" not found</p></SimplePage>
  }
}

function SimplePage(props) {
  return <div className="so-back SimplePage__back">
    <div className="so-chunk">
      {props.children}
    </div>
  </div>
}

export default connect(chooseState)(LaboratoryChrome);
function chooseState(state) {
  return {
    routing: state.routing,
    user: state.user
  }
}
