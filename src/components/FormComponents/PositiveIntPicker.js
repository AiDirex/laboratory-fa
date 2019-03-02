import React from 'react';
import TextPicker from './TextPicker';

export default function PositiveIntPicker(props) {
  return <TextPicker
    {...props}
    validator={(value) => {
      if (value.charAt(0) === '-') {
        return 'عددی مثبت و یا صفر وارد کنید.';
      } else if (!value.match(/^[0-9]*$/g)) {
        return 'لطفا یک عدد وارد کنید.';
      }

      if (typeof props.validator !== 'undefined') {
        return props.validator(value);
      }
    }}
  />
}
