import React from 'react'
import OptionsTablePair from '../OptionsTable/Pair'
import _ from 'lodash'

export class ResultTable extends React.Component {

  translateKey (key) {
    if (translations[key]) {
      return translations[key]
    }
    return key
  }

  render () {
    let {body, keys, label} = this.props
    let data = body
    // console.log({data, keys})

    return <div>
      {data && Array.isArray(keys) && keys.map((k) => {
        if (typeof k === 'object' && k.fields && k.array === true) {
          if (data && data[k.name]) {
            return data[k.name].map((obj, i) => {
              return <OptionsTablePair label={this.translateKey(k.name)} key={i}>
                <ul>
                  {k.fields.map((field)  => {
                    // console.log(`${k.name}.[${i}].${field}`)
                    let v = _.get(data, `${k.name}.[${i}].${field}`)
                    // return v !== undefined && v !== null && <li key={`${i}.${field}`}>{field}: {v}</li>
                    return v !== undefined && v !== null &&
                      <OptionsTablePair label={this.translateKey(field)} key={`${i}.${field}`}>{v}</OptionsTablePair>
                  })}
                </ul>
              </OptionsTablePair>
            })
          }
        } else if (k === 'object' && k.fields) {
          return k.fields.map((kf, i) => {
            let v = _.get(data, `${k.name}.[${i}].${kf}`)
            return v !== undefined && v !== null &&
              <OptionsTablePair label={this.translateKey(kf)} key={kf}>{v}</OptionsTablePair>
          })
        } else {
          let v = _.get(data, k)
          return v !== undefined && v !== null &&
            <OptionsTablePair label={this.translateKey(k)} key={k}>{v}</OptionsTablePair>
        }
      })}
    </div>
  }
}

const translations = {
  accountId: 'شناسه حساب',
  hash: 'چکیده',
  created_at: 'تاریخ ساخت',
  balance: 'موجودی',
  asset_code:'کد سکه',
  asset_issuer: 'صادرکننده سکه',
  amount: 'مقدار',
  account: 'حساب',
  starting_balance: 'موجودی اولیه',
  type: 'نوع',
  weight: 'وزن',
  sequence: 'شماره توالی',
  successful_transaction_count: 'شماره ترتیب تراکنشهای موفق',
  failed_transaction_count: 'شماره ترتیب تراکنشهای ناموفق',
  operation_count: 'شماره ترتیب عملیات',
  closed_at: 'تاریخ بسته شدن',
  seller: 'فروشنده',
  id: 'شناسه',
  price: 'قیمت',
  funder: 'سرمایه گذار',
  transaction_successful: 'موفق بودن تراکنش',
  destination_amount: 'مقدار هزینه مقصد برای ساختن یک پرداخت',
  destination_asset_code :'کد سکه مقصد',
  source_amount: 'مقدار هزینه مبدأ برای ساختن یک پرداخت',
  source_asset_code: 'کد سکه مبدأ',
  source_account: 'حساب مبدأ',
  sender: 'فرستنده',
  receiver:'گیرنده',
  trade_count: 'تعداد مبادلات',
  base_volume: 'مقدار کل سکه طرف اول مبادله(طرف اصلی)',
  counter_volume: 'مقدار کل سکه طرف دوم مبادله(طرف اصلی)',
  base_account: 'حساب اصلی(طرف او مبادله)',
  ledger_close_time: 'تاریخ بسته شدن دفترکل',
  base_amount: 'مقدار پایه',
  base_asset_type: 'نوع سکه پایه(اصلی)',
  counter_account: 'حساب طرف دوم مبادله',
  counter_amount: 'مقدار مبادله از حساب طرف دوم به حساب طرف اصلی مبادله',
  counter_asset_type: 'نوع سکه طرف دوم مبادله',
  counter_asset_code: 'کد سکه طرف دوم مبادله',
  counter_asset_issuer: 'صادر کننده کالای طرف دوم مبادله',
  fee: 'کارمزد',
  ledger: 'دفترکل',
  envelope_xdr: 'بسته xdr',
  fee_paid: 'کارمزد پرداخت شده',
  account_sequence:'شماره توالی حساب',
  firstName:'نام',
  lastName:'نام خانوادگی',
  mobile:'شماره موبایل',
  subentry_count:'تعداد ورودی',
  balances:'موجودی ها',
  records:'رکوردها',
  pubKey:'کلید عمومی',
  secretKey:' کلید خصوصی',
  from: 'از',
  to: 'به',
  asset_type: 'نوع دارایی'

}
