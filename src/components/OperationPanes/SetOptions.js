import React from 'react';

import OptionsTablePair from '../OptionsTable/Pair';
import PubKeyPicker from '../FormComponents/PubKeyPicker';
import PositiveIntPicker from '../FormComponents/PositiveIntPicker';
import SignerPicker from '../FormComponents/SignerPicker';
import TextPicker from '../FormComponents/TextPicker';
import FlagfieldPicker from '../FormComponents/FlagfieldPicker';
import Unsigned8bitIntPicker from '../FormComponents/Unsigned8bitIntPicker';
import HelpMark from '../HelpMark';

const accountFlagFieldsSet = {
  1: 'الزامی بودن مجوز',
  2: 'لغو مجوز',
  4: 'تغییر ناپذیر بودن مجوز',
};

const accountFlagFieldsClear = {
  1: 'الزامی بودن مجوز',
  2: 'لغو مجوز',
};

export default function SetOptions(props) {
  return [
    <OptionsTablePair
      label={<span>مقصد تورم <HelpMark href="https://www.stellar.org/developers/learn/concepts/accounts.html#inflation-destination" /></span>}
      optional={true} key="inflationDest">
      <PubKeyPicker
        value={props.values['inflationDest']}
        onUpdate={(value) => {props.onUpdate('inflationDest', value)}}
        />
    </OptionsTablePair>,
    <OptionsTablePair
      label={<span>انتخاب مجوزها <HelpMark href="https://www.stellar.org/developers/learn/concepts/accounts.html#flags" /></span>}
      optional={true} key="setFlags">
      <FlagfieldPicker
        value={props.values['setFlags']}
        items={accountFlagFieldsSet}
        onUpdate={(value) => {props.onUpdate('setFlags', value)}}
        />
      <p className="optionsTable__pair__content__note"><a href="https://en.wikipedia.org/wiki/Flag_field" target="_blank">پرچمهای </a>انتخاب شده به این معنا میباشند که به پرچمهایی که در حال حاضر در حساب کاربری موجود هستند اضافه خواهند شد. </p>
    </OptionsTablePair>,
    <OptionsTablePair
      label={<span>پاک کردن مجوزها <HelpMark href="https://www.stellar.org/developers/learn/concepts/accounts.html#flags" /></span>}
      optional={true} key="clearFlags">
      <FlagfieldPicker
        value={props.values['clearFlags']}
        items={accountFlagFieldsClear}
        onUpdate={(value) => {props.onUpdate('clearFlags', value)}}
        />
      <p className="optionsTable__pair__content__note"> <a href="https://en.wikipedia.org/wiki/Flag_field" target="_blank">پرچمهای </a>انتخاب شده به این معنا میباشند که این پرچمها در حال حاضر در این حساب وجود دارند.</p>
    </OptionsTablePair>,
    <OptionsTablePair
      label={<span>وزن حساب اصلی <HelpMark href="https://www.stellar.org/developers/learn/concepts/accounts.html#thresholds" /></span>}
      optional={true} key="masterWeight">
      <Unsigned8bitIntPicker
        value={props.values['masterWeight']}
        onUpdate={(value) => {props.onUpdate('masterWeight', value)}}
        />
    </OptionsTablePair>,
    <OptionsTablePair
      label={<span>آستانه پایین<HelpMark href="https://www.stellar.org/developers/learn/concepts/accounts.html#thresholds" /></span>}
      optional={true} key="lowThreshold">
      <Unsigned8bitIntPicker
        value={props.values['lowThreshold']}
        onUpdate={(value) => {props.onUpdate('lowThreshold', value)}}
        />
    </OptionsTablePair>,
    <OptionsTablePair
      label={<span>آستانه میانه <HelpMark href="https://www.stellar.org/developers/learn/concepts/accounts.html#thresholds" /></span>}
      optional={true} key="medThreshold">
      <Unsigned8bitIntPicker
        value={props.values['medThreshold']}
        onUpdate={(value) => {props.onUpdate('medThreshold', value)}}
        />
    </OptionsTablePair>,
    <OptionsTablePair
      label={<span>آستانه بالا <HelpMark href="https://www.stellar.org/developers/learn/concepts/accounts.html#thresholds" /></span>}
      optional={true} key="highThreshold">
      <Unsigned8bitIntPicker
        value={props.values['highThreshold']}
        onUpdate={(value) => {props.onUpdate('highThreshold', value)}}
        />
    </OptionsTablePair>,
    <OptionsTablePair
      label={<span>نوع امضا کننده <HelpMark href="https://www.stellar.org/developers/learn/concepts/multi-sig.html#additional-signing-keys" /></span>}
      optional={true} key="signer">
      <SignerPicker
        value={props.values['signer']}
        onUpdate={(value) => {props.onUpdate('signer', value)}}
        />
      <p className="optionsTable__pair__content__note">برای حذف/اضافه و یا تنظیم وزن امضاکنندگان حساب استفاده میشود.</p>
    </OptionsTablePair>,
    <OptionsTablePair
      label={<span>دامنه <HelpMark href="https://www.stellar.org/developers/learn/concepts/multi-sig.html#additional-signing-keys" /></span>}
      optional={true} key="homeDomain">
      <TextPicker
        value={props.values['homeDomain']}
        placeholder="مثال: example.com"
        onUpdate={(value) => {props.onUpdate('homeDomain', value)}}
        />
    </OptionsTablePair>,
  ];
}
