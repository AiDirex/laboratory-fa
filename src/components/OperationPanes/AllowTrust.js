import React from 'react';

import OptionsTablePair from '../OptionsTable/Pair';
import PubKeyPicker from '../FormComponents/PubKeyPicker.js';
import TextPicker from '../FormComponents/TextPicker.js';
import BooleanPicker from '../FormComponents/BooleanPicker.js';

export default function AllowTrust(props) {
  return [
    <OptionsTablePair label="اعتماد کننده" key="trustor">
      <PubKeyPicker
        value={props.values['trustor']}
        onUpdate={(value) => {props.onUpdate('trustor', value)}}
        />
    </OptionsTablePair>,
    <OptionsTablePair label="کد کالا" key="assetCode">
      <TextPicker
        value={props.values['assetCode']}
        onUpdate={(value) => {props.onUpdate('assetCode', value)}}
        />
    </OptionsTablePair>,
    <OptionsTablePair label="تصدیق هویت" key="authorize">
      <BooleanPicker
        value={props.values['authorize']}
        onUpdate={(value) => {props.onUpdate('authorize', value)}}
        />
    </OptionsTablePair>,
  ];
}
