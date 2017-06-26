import React, { Component } from 'react'

export default class ListItem extends Component {
  render () {
    const {
      title,
      subtitle,
      img,
      value
    } = this.props

    return (
      <li
        className='list__item row'
      >
        <div
          className='list__item__header small-20 columns'
        >
          <h3
            className='list__item__title'
          >
            {title}
          </h3>
          <h5>
            {`${subtitle} - ${value}`}
          </h5>
        </div>
        <div
          className='list__item__img small-4 columns'
        >
          <img
            src={img}
          />
        </div>
      </li>
    )
  }
}
