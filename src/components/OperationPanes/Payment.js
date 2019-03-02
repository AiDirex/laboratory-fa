import React from 'react';

import OptionsTablePair from '../OptionsTable/Pair';
import PubKeyPicker from '../FormComponents/PubKeyPicker.js';
import AmountPicker from '../FormComponents/AmountPicker.js';
import AssetPicker from '../FormComponents/AssetPicker.js';

export default function Payment(props) {
  return [
    <OptionsTablePair label="مقصد" key="destination">
      <PubKeyPicker
        value={props.values['destination']}
        onUpdate={(value) => {props.onUpdate('destination', value)}}
        />
    </OptionsTablePair>,
    <OptionsTablePair label="کالا" key="asset">
      <AssetPicker
        value={props.values['asset']}
        onUpdate={(value) => {props.onUpdate('asset', value)}}
        />
    </OptionsTablePair>,
    <OptionsTablePair label="مقدار" key="amount">
      <AmountPicker
        value={props.values['amount']}
        onUpdate={(value) => {props.onUpdate('amount', value)}}
        />
    </OptionsTablePair>,
  ];
}
