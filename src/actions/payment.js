import axios from 'axios'
import querystring from 'querystring'
import dispatchInNewStack from '../utilities/dispatchInNewStack'
import NETWORK from '../constants/network'

export const SET_FORM_FIELD = 'SET_FORM_FIELD'

export function setForm (k, v) {
  return {
    type: SET_FORM_FIELD,
    key: k,
    value: v,
  }
}

export const PAY_SUCCESS = 'PAY_SUCCESS'
export const PAY_ERR = 'PAY_ERR'

function getResponseError (e) {
  if (e.response && e.response.data) {
    if (e.response.data.code === 'missing_parameter') {
      return [`${e.response.data.data.name} را وارد کنید. `]
    } else if (e.response.data.code === 'invalid_parameter') {
      if (e.response.data.data.name === 'source') {
        return ['کلید خصوصی اشتباه است.']
      } else if (e.response.data.data.name === 'destination') {
        return ['آدرس مقصد اشتباه است.']
      }else if (e.response.data.data.name === 'amount') {
        return ['مقدار اشتباه است.']
      }else if (e.response.data.data.name === 'asset_code') {
        return ['کد دارایی اشتباه است.']
      }else if (e.response.data.data.name === 'asset_issuer') {
        return ['آدرس منتشر کننده دارایی اشتباه است.']
      }
      return [`${e.response.data.data.name} اشتباه است. `]
    }
  }
  return null
}

export function sendPayment (data) {
  return dispatch => {
    // dispatch({
    //   type: START_FRIENDBOT_REQUEST,
    //   message: 'Loading...',
    //   status: 'loading',
    // });
    if (data.asset_code.toLowerCase() === 'xlm') {
      data.asset_code = ''
    }
    const options = {
      method: 'POST',
      // headers: {'Authorization': `Basic aW9zOnZNeUs2dGVnWTU=`},
      url: `${NETWORK.bridge.base}/payment`,
      data: querystring.stringify(data)
    }
    axios(options).then(response => {
      console.log(response)
      dispatchInNewStack(dispatch, {
        type: PAY_SUCCESS,
        msg: 'تراکنش شما با موفقیت انجام شد.',
      })
    }).catch(e => {
      dispatchInNewStack(dispatch, {
        type: PAY_ERR,
        errorMsg: 'خطا رخ داد.',
        errors: getResponseError(e)
      })
    })
  }
}
