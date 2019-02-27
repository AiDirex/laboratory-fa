import React from 'react';
import OptionsTablePair from '../OptionsTable/Pair';
import AssetPicker from '../FormComponents/AssetPicker.js';
import TextPicker from '../FormComponents/TextPicker.js';
import PositiveIntPicker from '../FormComponents/PositiveIntPicker.js';
import OrderPicker from '../FormComponents/OrderPicker.js';

export default function TradeAggregations(props) {
  return <div>
    <OptionsTablePair label="ارز پایه" optional={false}>
      <AssetPicker
      value={props.values['base_asset']}
      onUpdate={(value) => {props.onUpdate('base_asset', value)}}
      />
    </OptionsTablePair>
    <OptionsTablePair label="ارز مقایسه شونده " optional={false}>
      <AssetPicker
      value={props.values['counter_asset']}
      onUpdate={(value) => {props.onUpdate('counter_asset', value)}}
      />
    </OptionsTablePair>
    <OptionsTablePair label="زمان شروع" optional={false}>
      <TextPicker
        value={props.values['start_time']}
        onUpdate={(value) => {props.onUpdate('start_time', value)}}
        />
    </OptionsTablePair>
    <OptionsTablePair label="زمان پایان" optional={false}>
      <TextPicker
        value={props.values['end_time']}
        onUpdate={(value) => {props.onUpdate('end_time', value)}}
        />
    </OptionsTablePair>
    <OptionsTablePair label="درجه مقایسه" optional={false}>
      <TextPicker
        value={props.values['resolution']}
        onUpdate={(value) => {props.onUpdate('resolution', value)}}
        />
    </OptionsTablePair>
    <OptionsTablePair label="محدودیت" optional={true}>
      <PositiveIntPicker
      value={props.values['limit']}
        onUpdate={(value) => {props.onUpdate('limit', value)}}
        />
    </OptionsTablePair>
    <OptionsTablePair label="به ترتیب" optional={true}>
      <OrderPicker
        value={props.values['order']}
        onUpdate={(value) => {props.onUpdate('order', value)}}
        />
    </OptionsTablePair>
  </div>
}
