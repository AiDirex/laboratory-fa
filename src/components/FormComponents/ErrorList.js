import React from 'react'

export class ErrorList extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return this.props.errors && this.props.errors.length > 0 && <div>
      <ul>
        {this.props.errors.map((e) => {
          return <li>{e}</li>
        })}
      </ul>
    </div>
  }
}
