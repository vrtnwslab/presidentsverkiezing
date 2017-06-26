import React, { Component } from 'react'

export default class MapPath extends Component {
  constructor (props) {
    super(props)
    this.handleSelectDepartement = this.handleSelectDepartement.bind(this)
  }

  handleSelectDepartement () {
    const {
      insee,
      onSelectDepartement,
      active
    } = this.props
    if (active === insee) {
      onSelectDepartement(false)
    } else {
      onSelectDepartement(insee)
    }
  }

  render () {
    const {
      fill,
      d,
      active,
      insee
    } = this.props

    return (
      <path
        fill={active === insee ? 'white' : fill}
        strokeWidth={1}
        stroke={'#fff'}
        d={d}
        onClick={this.handleSelectDepartement}
      />
    )
  }
}
