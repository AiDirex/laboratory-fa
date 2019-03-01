import React from 'react';

import OptionsTablePair from '../OptionsTable/Pair';
import TextPicker from '../FormComponents/TextPicker.js';

export default function ManageData(props) {
  let nameValidator = (value) => {
    if (value.length > 64) {
      return `Entry name can only contain a maximum of 64 characters. ${value.length} entered.`;
    }
  }

  let valueValidator = (value) => {
    let valueSize = new Buffer(value).length;
    if (valueSize > 64) {
      return `Entry value can only contain a maximum of 64 bytes. ${valueSize} bytes entered.`;
    }
  }

  return [
    <OptionsTablePair label="نام ورودی" key="name">
      <TextPicker
        value={props.values['name']}
        onUpdate={(value) => {props.onUpdate('name', value)}}
        validator={nameValidator}
      />
    </OptionsTablePair>,
    <OptionsTablePair label="مقدار ورودی" optional="true" key="value">
      <TextPicker
        value={props.values['value']}
        onUpdate={(value) => {props.onUpdate('value', value)}}
        validator={valueValidator}
        />
      <p className="optionsTable__pair__content__note">
        در صورت خالی بودن, نام داده ورودی در این عملیات پاک خواهد شد.
        <br />
        توجه : این سامانه فقط از رشته ها پشتیبانی میکند.
      </p>
    </OptionsTablePair>,
  ];
}
