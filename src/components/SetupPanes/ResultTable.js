import React from 'react'
import OptionsTablePair from '../OptionsTable/Pair'
import _ from 'lodash'

export class ResultTable extends React.Component {
  render () {
    let {body, keys, label} = this.props
    let data = body
    // console.log({data, keys})

    return <div>
      {data && <h3>{label ? label : 'نتیجه'}:</h3>}
      {data && Array.isArray(keys) && keys.map((k) => {
        if (typeof k === 'object' && k.fields && k.array === true) {
          if (data && data[k.name]) {
            return data[k.name].map((obj, i) => {
              return <OptionsTablePair label={k.name} key={i}>
                <ul>
                  {k.fields.map((field) => {
                    console.log(`${k.name}.[${i}].${field}`)
                    let v = _.get(data, `${k.name}.[${i}].${field}`)
                    // return v !== undefined && v !== null && <li key={`${i}.${field}`}>{field}: {v}</li>
                    return v !== undefined && v !== null && <OptionsTablePair label={field} key={`${i}.${field}`}>{v}</OptionsTablePair>
                  })}
                </ul>
              </OptionsTablePair>
            })
          }
        } else if (k === 'object' && k.fields) {
          return k.fields.map((kf, i) => {
            let v = _.get(data, `${k.name}.[${i}].${kf}`)
            return v !== undefined && v !== null && <OptionsTablePair label={kf} key={kf}>{v}</OptionsTablePair>
          })
        } else {
          let v = _.get(data, k)
          return v !== undefined && v !== null && <OptionsTablePair label={k} key={k}>{v}</OptionsTablePair>
        }
      })}
    </div>
  }
}
