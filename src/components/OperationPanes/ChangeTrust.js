import React from 'react';

import OptionsTablePair from '../OptionsTable/Pair';
import AssetPicker from '../FormComponents/AssetPicker.js';
import PositiveIntPicker from '../FormComponents/PositiveIntPicker.js';

export default function ChangeTrust(props) {
  return [
    <OptionsTablePair label="کالا" key="asset">
      <AssetPicker
        value={props.values['asset']}
        disableNative={true}
        onUpdate={(value) => {props.onUpdate('asset', value)}}
        />
    </OptionsTablePair>,
    <OptionsTablePair label="حد اعتماد" optional="true" key="limit">
      <PositiveIntPicker
        value={props.values['limit']}
        onUpdate={(value) => {props.onUpdate('limit', value)}}
        />
      <p className="optionsTable__pair__content__note">
        در صورت خالی بودن به طور پیش فرض, بیشترین عدد صحیح ۶۴ بیتی انتخاب میشود.
        <br />
        در صورتی که میخواهید خط اعتماد را حذف کنید, کافی است این مقدار را برابر 0 قرار دهید.
      </p>
    </OptionsTablePair>,
  ];
}
