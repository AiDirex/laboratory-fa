import React from 'react';
import PositiveIntPicker from './PositiveIntPicker';

export default function Unsigned8bitIntPicker(props) {
  return <PositiveIntPicker
    {...props}
    placeholder="0 - 255"
    validator={(value) => {
      if (value >= 255) {
        return 'یک عدد صحیح بین 0 و ۲۵۵ وارد کنید.';
      }
    }}
  />
}
