import axios from 'axios'
import querystring from 'querystring'
import dispatchInNewStack from '../utilities/dispatchInNewStack'
import NETWORK from '../constants/network'



export const SET_FORM_FIELD = 'SET_FORM_FIELD'
export function setForm(k, v){
  return {
    type: SET_FORM_FIELD,
    key: k,
    value: v,
  }
}

export const PAY_SUCCESS = 'PAY_SUCCESS'
export const PAY_ERR = 'PAY_ERR'
export function sendPayment (data) {
  return dispatch => {
    // dispatch({
    //   type: START_FRIENDBOT_REQUEST,
    //   message: 'Loading...',
    //   status: 'loading',
    // });

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
        msg: 'ارسال شد.',
      })
    }).catch(e => {
      dispatchInNewStack(dispatch, {
        type: PAY_ERR,
        errorMsg: 'خطا رخ داد.'
      })
    })
  }
}
