import React from 'react';

import OptionsTablePair from '../OptionsTable/Pair';
import PubKeyPicker from '../FormComponents/PubKeyPicker.js';
import PositiveNumberPicker from '../FormComponents/PositiveNumberPicker.js';
import AmountPicker from '../FormComponents/AmountPicker.js';
import AssetPicker from '../FormComponents/AssetPicker.js';

export default function GenericOffer(props) {
  return [
    <OptionsTablePair label="فروش" key="selling">
      <AssetPicker
        value={props.values['selling']}
        onUpdate={(value) => {props.onUpdate('selling', value)}}
        />
    </OptionsTablePair>,
    <OptionsTablePair label="خرید" key="buying">
      <AssetPicker
        value={props.values['buying']}
        onUpdate={(value) => {props.onUpdate('buying', value)}}
        />
    </OptionsTablePair>,
    <OptionsTablePair label="مقداری که قصد فروش دارید" key="amount">
      <AmountPicker
        value={props.values['amount']}
        onUpdate={(value) => {props.onUpdate('amount', value)}}
        />
      <p className="optionsTable__pair__content__note">مقدار صفر به معنی پاک کردن پیشنهاد است.</p>
    </OptionsTablePair>,
    <OptionsTablePair label="قیمت یک واحد از کالای فروشی شما" key="price">
      <PositiveNumberPicker
        value={props.values['price']}
        onUpdate={(value) => {props.onUpdate('price', value)}}
        />
    </OptionsTablePair>,
  ];
}
