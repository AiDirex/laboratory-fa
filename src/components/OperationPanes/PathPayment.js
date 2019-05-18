import React from 'react';

import OptionsTablePair from '../OptionsTable/Pair';
import AssetPicker from '../FormComponents/AssetPicker.js';
import AmountPicker from '../FormComponents/AmountPicker.js';
import PubKeyPicker from '../FormComponents/PubKeyPicker.js';
import ManualMultiPicker from '../FormComponents/ManualMultiPicker.js';

export default function PathPayment(props) {
  return [
    <OptionsTablePair label="مقصد" key="destination">
      <PubKeyPicker
        value={props.values['destination']}
        onUpdate={(value) => {props.onUpdate('destination', value)}}
        />
    </OptionsTablePair>,
    <OptionsTablePair label="کالای ارسالی" key="sendAsset">
      <AssetPicker
        value={props.values['sendAsset']}
        onUpdate={(value) => {props.onUpdate('sendAsset', value)}}
        />
      <p className="optionsTable__pair__content__note">کالایی که از حساب مبدأ ارسال خواهد شد.</p>
    </OptionsTablePair>,
    <OptionsTablePair label="بیشینه مقدار ارسالی" key="sendMax">
      <AmountPicker
        value={props.values['sendMax']}
        onUpdate={(value) => {props.onUpdate('sendMax', value)}}
        />
      <p className="optionsTable__pair__content__note"> بیشترین مقداری که فرستنده تمایل دارد تا برای ارسال توسط مسیر هزینه کند. مقادیر میتواننند با توجه به
      <br /> پیشنهادات در دفتر سفارشها متفاوت باشند </p>
    </OptionsTablePair>,
    <OptionsTablePair label="مسیر واسطه" key="path" optional="true">
      <ManualMultiPicker
        component={AssetPicker}
        value={props.values['path']}
        default={{}}
        addNewLabel="یک کالای میانی جدید وارد کنید."
        onUpdate={(value) => {props.onUpdate('path', value)}}
        />
    </OptionsTablePair>,
    <OptionsTablePair label="کالای مقصد" key="destAsset">
      <AssetPicker
        value={props.values['destAsset']}
        onUpdate={(value) => {props.onUpdate('destAsset', value)}}
        />
      <p className="optionsTable__pair__content__note">کالایی که توسط حساب مقصد دریافت خواهد شد.</p>
    </OptionsTablePair>,
    <OptionsTablePair label="مقدار مقصد" key="destAmount">
      <AmountPicker
        value={props.values['destAmount']}
        onUpdate={(value) => {props.onUpdate('destAmount', value)}}
        />
    </OptionsTablePair>,
  ];
}
