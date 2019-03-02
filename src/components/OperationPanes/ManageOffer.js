import React from 'react';

import OptionsTablePair from '../OptionsTable/Pair';
import GenericOffer from './GenericOffer';
import PubKeyPicker from '../FormComponents/PubKeyPicker.js';
import PositiveIntPicker from '../FormComponents/PositiveIntPicker.js';

export default function ManageOffer(props) {
  let GenericOfferPickers = GenericOffer(props);
  return GenericOfferPickers.concat(
    <OptionsTablePair label="شناسه پیشنهاد " key="offerId">
      <PositiveIntPicker
        value={props.values['offerId']}
        onUpdate={(value) => {props.onUpdate('offerId', value)}}
        />
      <p className="optionsTable__pair__content__note">در صورتی که عدد 0 وارد شود, یک پیشنهاد جدید ساخته خواهد شد.</p>
    </OptionsTablePair>
  );
}
