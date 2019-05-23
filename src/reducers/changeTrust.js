import { combineReducers } from 'redux'
import {
  TRUST_ERR,
  TRUST_SUCCESS, SET_TRUST_FORM_FIELD
} from '../actions/changeTrust'
import _ from 'lodash'

const defaultFormState = {
  asset_code: 'coin',
  asset_issuer: null,
  source: null
}

function form (state = defaultFormState, action) {
  if (action.type === TRUST_ERR) {
    return state
  }
  if (action.type === TRUST_SUCCESS) {
    return _.assign({}, defaultFormState)
  }
  if (action.type === SET_TRUST_FORM_FIELD) {
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
  if (action.type === TRUST_ERR) {
    return _.assign({}, state, {
      showMsg: false,
      msg: null,
      showError: true,
      errorMsg: action.errorMsg,
      errors: action.errors,
      hash: null
    })
  }
  if (action.type === TRUST_SUCCESS) {
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
