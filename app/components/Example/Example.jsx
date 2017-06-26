import React, { Component } from 'react'
require('font-awesome-sass-loader')

export default class Example extends Component {
  render () {
    return (
      <div
        className='content__example row'
      >
        <div
          className='example__icon small-24 columns'
        >
          <p>
            <i
              className='fa fa-home'
            />
            Font Awesome
          </p>
          <hr />
        </div>
        <div
          className='example__content small-24 columns'
        >
          <div
            className='row align-justify'
          >
            <p
              className='content__text small-12 columns'
            >
              dolor sit amet, consectetur adipisicing elit. Doloribus debitis beatae numquam voluptas hic, temporibus harum, eos fugit quaerat corporis quisquam et optio eaque deserunt quidem saepe dolorem non assumenda!
            </p>
            <div
              className='content__img small-4 columns'
            >
              <img
                className='img--round'
                src='assets/images/foto.jpg'
                alt='foto'
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
