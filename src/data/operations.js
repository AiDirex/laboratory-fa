import _ from 'lodash';

export function getOperation(opName) {
  return _.find(operationsMap, { name: opName });
}

// Operations map documentation:
// [ // In an array because we really want this to be ordered correctly (whereas for params, it is not as important)
//   {
//     name: 'createAccount', // Corresponds to the operation key in js-stellar-sdk.Operation
//     label: 'Create Account', // Human friendly name for the operation
//     operationPane: require('../components/OperationPanes/CreateAccount'), // React component that contains the multiple pickers for this operation
//   },
// ]

export const operationsMap = [
  {
    name: 'createAccount',
    label: 'ساختن اکانت',
    operationPane: require('../components/OperationPanes/CreateAccount'),
    helpNote: 'یک حساب جدید ساخته و با توجه به موجودی اولیه مقداری را در آن واریز کنید.',
    docsUrl: 'https://www.stellar.org/developers/learn/concepts/list-of-operations.html#create-account',
  },
  {
    name: 'payment',
    label: 'پرداخت',
    operationPane: require('../components/OperationPanes/Payment'),
    helpNote: 'این بخش یک مقداری از کالای مشخص شده را به حساب مقصد ارسال میکند. ',
    docsUrl: 'https://www.stellar.org/developers/learn/concepts/list-of-operations.html#payment',
  },
  {
    name: 'pathPayment',
    label: 'مسیر پرداخت',
    operationPane: require('../components/OperationPanes/PathPayment'),
    helpNote: 'این بخش مقداری از کالای مشخص شده را توسط مسیری از پیشنهادها به حساب مقصد ارسال میکند.این بخش اجازه میدهد کالای ارسالی با کالای دریافتی متفاوت باشد.',
    docsUrl: 'https://www.stellar.org/developers/learn/concepts/list-of-operations.html#path-payment',
  },
  {
    name: 'manageOffer',
    label: 'مدیریت پیشنهاد',
    operationPane: require('../components/OperationPanes/ManageOffer'),
    helpNote: 'این بخش برای ساختن,به روز رسانی و یا پاک کردن پیشنهاد میباشد.',
    docsUrl: 'https://www.stellar.org/developers/learn/concepts/list-of-operations.html#manage-offer',
  },
  {
    name: 'createPassiveOffer',
    label: 'ساختن سفارش منفعل',
    operationPane: require('../components/OperationPanes/GenericOffer'),
    helpNote: 'این بخش یک پیشنهاد منفعل میسازد در نتیجه یک پیشنهاد با همان قیمت را قبول نمیکند.',
    docsUrl: 'https://www.stellar.org/developers/learn/concepts/list-of-operations.html#create-passive-offer',
  },
  {
    name: 'setOptions',
    label: 'تنظیم گزینه ها',
    operationPane: require('../components/OperationPanes/SetOptions'),
    helpNote: 'این بخش گزینه های زیادی را برای تنظیم حساب فراهم میکند.',
    docsUrl: 'https://www.stellar.org/developers/learn/concepts/list-of-operations.html#set-options',
  },
  {
    name: 'changeTrust',
    label: 'تغییر اعتماد',
    operationPane: require('../components/OperationPanes/ChangeTrust'),
    helpNote: 'این بخش یک خط اعتماد را ساخته و یا پاک و به روز رسانی میکند.',
    docsUrl: 'https://www.stellar.org/developers/learn/concepts/list-of-operations.html#change-trust',
  },
  {
    name: 'allowTrust',
    label: 'ایجاد اعتماد',
    operationPane: require('../components/OperationPanes/AllowTrust'),
    helpNote: 'این بخش یک پرچم تصدیق هویت شده در خط اعتماد موجود را به روز رسانی میکند.',
    docsUrl: 'https://www.stellar.org/developers/learn/concepts/list-of-operations.html#allow-trust',
  },
  {
    name: 'accountMerge',
    label: 'ادغام اکانت',
    operationPane: require('../components/OperationPanes/AccountMerge'),
    helpNote: ' .این بخش مقداری از ارز اصلی (XLM) که در حساب موجود میباشد را به یک حساب دیگر فرستاده و حساب مبدأ را از دفترکل پاک میکند.',
    docsUrl: 'https://www.stellar.org/developers/learn/concepts/list-of-operations.html#account-merge',
  },
  {
    name: 'inflation',
    label: 'تورم',
    operationPane: () => [], // empty operation pane
    helpNote: 'این بخش تورمهای هفتگی را انجام میدهد.',
    docsUrl: 'https://www.stellar.org/developers/learn/concepts/list-of-operations.html#inflation',
  },
  {
    name: 'manageData',
    label: 'مدیریت داده',
    operationPane: require('../components/OperationPanes/ManageData'),
    helpNote: 'این بخش یک داده ورودی(نام/مقدار) را مقداردهی,تغییر و یا پاک میکند.',
    docsUrl: 'https://www.stellar.org/developers/learn/concepts/list-of-operations.html#manage-data',
  },
  {
    name: 'bumpSequence',
    label: 'زیاد شدن ترتیب',
    operationPane: require('../components/OperationPanes/BumpSequence'),
    helpNote: 'این بخش شماره ترتیب را افزایش میدهد.',
    docsUrl: 'https://www.stellar.org/developers/guides/concepts/list-of-operations.html#bump-sequence',
  },
]
