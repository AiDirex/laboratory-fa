import React from 'react';

import For from './For';
import PositiveIntPicker from '../FormComponents/PositiveIntPicker.js';

export default function ForOffer(props) {
  let label = ' شناسه سفارش';
  let content = <PositiveIntPicker
    value={props.values['offer_id']}
    onUpdate={(value) => {props.onUpdate('offer_id', value)}}
    placeholder={'مثال: 323223'}
  />

  return <For label={label} content={content} {...props} />
}
