import React from 'react';
import _ from 'lodash';
import PubKeyPicker from './PubKeyPicker';
import SelectPicker from './SelectPicker';
import TextPicker from './TextPicker';
import Unsigned8bitIntPicker from './Unsigned8bitIntPicker';

export default function SignerPicker(props) {
  let value = _.extend({type: null, content: '', weight: null}, props.value);

  const items = {
    ed25519PublicKey: "Ed25519 کلید عمومی",
    sha256Hash: "sha256 چکیده",
    preAuthTx: "چکیده تراکنش از قبل تصدیق شده"
  }


  let onUpdate = val => {
    if (val.type) {
      // When changing type clean content.
      val.content = '';
    }
    value = _.extend(value, val);
    props.onUpdate(value);
  }

  let input = null;
  let weight = null;

  switch (value.type) {
    case "ed25519PublicKey":
      input = <PubKeyPicker
        value={value.content}
        onUpdate={(content) => {onUpdate({content})}}
      />
      break;
    case "sha256Hash":
    case "preAuthTx":
      input = <TextPicker
        value={value.content}
        onUpdate={(content) => onUpdate({content})}
        placeholder=".یک چکیده ۳۲ بایتی به فرمت هگزادسیمال (۶۴ کاراکتر)وارد کنید."
        validator={hashValidator.bind(null, value.content)}
      />;
      break;
  }

  if (value.type) {
    weight = <div>
      <Unsigned8bitIntPicker
        value={value.weight}
        onUpdate={(weight) => {onUpdate({weight})}}
        />
      <p className="optionsTable__pair__content__note">در صورتی که این وزن صفر باشد, امضاکننده از حساب حذف خواهد شد.</p>
    </div>
  }

  return <div>
    <SelectPicker
      value={value.type}
      onUpdate={(type) => {onUpdate({type})}}
      placeholder="نوع امضا کننده را مشخص کنید."
      items={items}
      className="picker--spaceBottom"
      />
    {input}
    {weight}
  </div>
}

function hashValidator(value) {
  if (!value.match(/^[0-9a-f]{64}$/gi)) {
    return `پذیرش یک چکیده ۳۲ بایتی با فرمت هگزادسیمال(۶۴ کاراکتر) صورت میپذیرد`;
  }
}
