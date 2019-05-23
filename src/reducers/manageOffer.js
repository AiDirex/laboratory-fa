import { combineReducers } from 'redux'
import {
  OFFER_REQ_ERR,
  OFFER_REQ_SUCCESS, SET_OFFER_FORM_FIELD
} from '../actions/manageOffer'
import _ from 'lodash'

const defaultFormState = {
  offerId: null,
  amount: null,
  price: null,
  buying_asset_code: 'xlm',
  buying_asset_issuer: null,
  selling_asset_code: 'xlm',
  selling_asset_issuer: null,
  source: null
}

function form (state = defaultFormState, action) {
  if (action.type === OFFER_REQ_ERR) {
    return state
  }
  if (action.type === OFFER_REQ_SUCCESS) {
    return _.assign({}, defaultFormState)
  }
  if (action.type === SET_OFFER_FORM_FIELD) {
    return _.assign({}, state, {
      [action.key]: action.value,
    })
  }
  return state
}

const defaultGeneralState = {
  showError: false,
  errorMsg: null,
  showMsg: false,
  msg: null,
  hash: null
}

function general (state = defaultGeneralState, action) {
  if (action.type === OFFER_REQ_ERR) {
    return _.assign({}, state, {
      showMsg: false,
      msg: null,
      showError: true,
      errorMsg: action.errorMsg,
      errors: action.errors,
      hash: null
    })
  }
  if (action.type === OFFER_REQ_SUCCESS) {
    return _.assign({}, state, {
      showMsg: true,
      msg: action.msg,
      showError: false,
      errorMsg: null,
      hash: action.hash
    })
  }
  return state
}

const reducers = combineReducers({
  general,
  form
})
export default reducers
