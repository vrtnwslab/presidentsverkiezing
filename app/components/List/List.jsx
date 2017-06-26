import React, { Component } from 'react'
import ListItem from 'components/ListItem/ListItem'

export default class List extends Component {
  render () {
    const {
      data
    } = this.props

    return (
      <div className='content__list row'>
        <ul
          className='list small-12 columns'
        >
          {
            data.map((item) =>
              <ListItem
                title={item.title}
                subtitle={item.subtitle}
                img={item.img}
                value={item.value}
                key={item.key}
              />
            )
          }
        </ul>
      </div>
    )
  }
}
