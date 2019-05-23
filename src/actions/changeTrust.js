import axios from 'axios'
import dispatchInNewStack from '../utilities/dispatchInNewStack'
import NETWORK from '../constants/network'
import { getErrorFromResponse } from '../utilities/getErrorFromResponse'



export const SET_TRUST_FORM_FIELD = 'SET_TRUST_FORM_FIELD'
export function setForm(k, v){
  return {
    type: SET_TRUST_FORM_FIELD,
    key: k,
    value: v,
  }
}

export const TRUST_SUCCESS = 'TRUST_SUCCESS'
export const TRUST_ERR = 'TRUST_ERR'
export function sendChangeTrust (data) {
  return dispatch => {
    const options = {
      method: 'POST',
      // headers: {'Authorization': `Basic aW9zOnZNeUs2dGVnWTU=`},
      url: `${NETWORK.api.base}/users/change_trust`,
      data
    }
    axios(options).then(response => {
      console.log(response)
      dispatchInNewStack(dispatch, {
        type: TRUST_SUCCESS,
        msg: 'تراکنش شما با موفقیت انجام شد.',
        hash: response.data.hash
      })
    }).catch(e => {
      dispatchInNewStack(dispatch, {
        type: TRUST_ERR,
        errorMsg: 'خطا رخ داد.',
        errors: getErrorFromResponse(e)
      })
    })
  }
}
