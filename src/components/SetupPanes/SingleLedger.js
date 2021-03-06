import React from 'react';
import OptionsTablePair from '../OptionsTable/Pair';
import LedgerPicker from '../FormComponents/LedgerPicker.js';

export default function SingleLedger(props) {
  return <div>
    <OptionsTablePair label="توالی دفتر کل">
      <LedgerPicker
        value={props.values['ledger']}
        onUpdate={(value) => {props.onUpdate('ledger', value)}}
      />
    </OptionsTablePair>
  </div>
}
