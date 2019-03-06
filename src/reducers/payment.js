import { combineReducers } from 'redux'
import {
  PAY_ERR,
  PAY_SUCCESS, SET_FORM_FIELD
} from '../actions/payment'
import _ from 'lodash'

const defaultFormState = {
  id: null,
  amount: null,
  asset_code: '',
  asset_issuer: null,
  destination: null,
  source: null
}

function form (state = defaultFormState, action) {
  if (action.type === PAY_ERR) {
    return state
  }
  if (action.type === PAY_SUCCESS) {
    return _.assign({}, defaultFormState)
  }
  if (action.type === SET_FORM_FIELD) {
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
  msg: null
}

function general (state = defaultGeneralState, action) {
  if (action.type === PAY_ERR) {
    return _.assign({}, state, {
      showMsg: false,
      msg: null,
      showError: true,
      errorMsg: action.errorMsg,
      errors: action.errors
    })
  }
  if (action.type === PAY_SUCCESS) {
    return _.assign({}, state, {
      showMsg: true,
      msg: action.msg,
      showError: false,
      errorMsg: null
    })
  }
  return state
}

const reducers = combineReducers({
  general,
  form
})
export default reducers
