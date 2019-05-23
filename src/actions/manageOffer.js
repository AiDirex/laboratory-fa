import axios from 'axios'
import dispatchInNewStack from '../utilities/dispatchInNewStack'
import NETWORK from '../constants/network'
import { getErrorFromResponse } from '../utilities/getErrorFromResponse'



export const SET_OFFER_FORM_FIELD = 'SET_OFFER_FORM_FIELD'
export function setForm(k, v){
  return {
    type: SET_OFFER_FORM_FIELD,
    key: k,
    value: v,
  }
}

export const OFFER_REQ_SUCCESS = 'OFFER_REQ_SUCCESS'
export const OFFER_REQ_ERR = 'OFFER_REQ_ERR'
export function sendOffer (data) {
  return dispatch => {
    // dispatch({
    //   type: START_FRIENDBOT_REQUEST,
    //   message: 'Loading...',
    //   status: 'loading',
    // });

    const options = {
      method: 'POST',
      // headers: {'Authorization': `Basic aW9zOnZNeUs2dGVnWTU=`},
      url: `${NETWORK.api.base}/users/manage_offer`,
      data
    }
    axios(options).then(response => {
      console.log(response)
      dispatchInNewStack(dispatch, {
        type: OFFER_REQ_SUCCESS,
        msg: 'تراکنش شما با موفقیت انجام شد.',
        hash: response.data.hash
      })
    }).catch(e => {
      dispatchInNewStack(dispatch, {
        type: OFFER_REQ_ERR,
        errorMsg: 'خطا رخ داد.',
        errors: getErrorFromResponse(e)
      })
    })
  }
}
