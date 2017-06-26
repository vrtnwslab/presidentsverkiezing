import React, {Component} from 'react'
import {connect} from 'react-redux'

import * as actions from 'actions'
import Layout from 'components/layout/layout'

let datafile = null

// uncomment for local data
// datafile = require("data/data.json");

class Data extends Component {
  componentWillMount () {
    const {
            settings,
            dispatch
        } = this.props

    if (datafile) {
      dispatch(actions.fetchFile(datafile))
    } else {
      if (settings.realtime) {
        dispatch(actions.fetchRealtime(settings.projectName))
      } else {
        dispatch(actions.fetchOnce(settings.projectName))
      }
    }
  }

  render () {
    const {
      settings,
      data
    } = this.props

    if (!settings.fetched) {
      return <div className='loading' />
    }

    return (
      <Layout data={data} />
    )
  }
}

const mapStateToProps = (store) => ({
  'data': store.data,
  'settings': store.settings
})

export default connect(mapStateToProps)(Data)
