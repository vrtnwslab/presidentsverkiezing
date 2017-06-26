/* eslint-disable no-unused-vars */
import React, {Component} from 'react'
import './style.scss'

export default class SvgContainer extends Component {
  render () {
    const {width, height, click} = this.props
    return (
      <div
        className='svg-container'
        style={{
          paddingTop: `${height / width * 100}%`
        }}
        >
        <svg
          viewBox={`0 0 ${width} ${height}`}
          >
          {this.props.children}
        </svg>
      </div>
    )
  }
}
