import React, { Component } from 'react'
import Example from 'components/Example/Example'
import List from 'components/List/List'
require('font-awesome-sass-loader')

export default class Layout extends Component {
  render () {
    const {
      candidates
    } = this.props.data
    const {
      rounds
    } = this.props.data
    const candidateNames = Object.keys(candidates)

    const listData = candidateNames.map((candidate) => {
      return {
        title: `${candidates[candidate].firstname} ${candidates[candidate].lastname}`,
        subtitle: candidates[candidate].party,
        img: candidates[candidate].img,
        key: candidate,
        value: `${Number(rounds[1][candidate]).toLocaleString('nl')}%`
      }
    })

    return (
      <div className='app__main row'>
        <header className='app__header small-24 columns'>
          <h2 className='header__title'>
            {'Data loaded'}
          </h2>
        </header>
        <div className='app__content small-24 columns'>
          <Example />
          <List data={listData} />
        </div>
      </div>
    )
  }
}
