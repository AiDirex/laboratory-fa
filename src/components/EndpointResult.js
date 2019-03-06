import React from 'react'
import { any } from 'lodash'
import { CodeBlock } from './CodeBlock'

export class EndpointResult extends React.Component {
  render () {
    let {id, available, isError, body} = this.props

    if (!available) {
      return null
    }

    if (isError) {
      return ErrorPane(body)
    }

    if (body.length === 0) {
      return <LoadingPane/>
    }

    return ResultPane(body)
  }
}

function LoadingPane (props) {
  return <div className="EndpointResult">
    <div className="EndpointResult__loading">Loading...</div>
  </div>
}

function ErrorPane (body) {
  return <div className="EndpointResult">
    <div className='EndpointResult__error'>
      {BodyContent(body)}
    </div>
  </div>
}

function ResultPane (body) {
  return <div className="EndpointResult">
    <div>
      <div className="EndpointResult__tabs">
        <button className="EndpointResult__tabs__tab is-current">پاسخ JSON</button>
      </div>
      <div className='EndpointResult__content'>
        {BodyContent(body)}
      </div>
    </div>
  </div>
}

function BodyContent (body) {
  return _.map(body, (bodyEntry, index) => {
    return body && body[index] && <CodeBlock key={index} code={body[index]} language="json"/>
  })
}
