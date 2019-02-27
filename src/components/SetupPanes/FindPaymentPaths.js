import React from 'react';

import OptionsTablePair from '../OptionsTable/Pair';
import PubKeyPicker from '../FormComponents/PubKeyPicker.js';
import AssetPicker from '../FormComponents/AssetPicker.js';
import AmountPicker from '../FormComponents/AmountPicker.js';

export default function FindPaymentPaths(props) {
  return <div>
    <OptionsTablePair label=" حساب مبدا">
      <PubKeyPicker
      value={props.values['source_account']}
      onUpdate={(value) => {props.onUpdate('source_account', value)}}
      />
    </OptionsTablePair>
    <OptionsTablePair label=" حساب مقصد">
      <PubKeyPicker
      value={props.values['destination_account']}
      onUpdate={(value) => {props.onUpdate('destination_account', value)}}
      />
    </OptionsTablePair>
    <OptionsTablePair label="ارز مبدا ">
      <AssetPicker
      value={props.values['destination_asset']}
      onUpdate={(value) => {props.onUpdate('destination_asset', value)}}
      />
    </OptionsTablePair>
    <OptionsTablePair label=" ارز مقصد">
      <AmountPicker
      value={props.values['destination_amount']}
      onUpdate={(value) => {props.onUpdate('destination_amount', value)}}
      />
    </OptionsTablePair>
  </div>
}
