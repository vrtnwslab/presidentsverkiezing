import React, {Component} from 'react'
import {connect} from 'react-redux'

import * as actions from 'actions'
import Layout from 'components/Layout/layout'

let datafile = null

// uncomment for local data
// datafile = require("data/data.json");

class Data extends Component {
  constructor (props) {
    super(props)
    this.handleResetDepartement = this.handleResetDepartement.bind(this)
    this.handleSelectDepartement = this.handleSelectDepartement.bind(this)
    this.handleSelectRound = this.handleSelectRound.bind(this)
  }

  handleResetDepartement () {
    const {
      dispatch
    } = this.props

    dispatch(actions.setDepartement(false))
  }

  handleSelectDepartement (insee) {
    const {
      dispatch
    } = this.props

    dispatch(actions.setDepartement(insee))
  }

  handleSelectRound (round) {
    const {
      dispatch
    } = this.props

    dispatch(actions.setRound(round))
  }

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
    const {settings, data} = this.props

    if (!settings.fetched) {
      return <div className='loading' />
    } else {
      const departements = Object
        .keys(data.rounds[settings.round].entries)
        .map((insee) => {
          return {
            name: data.rounds[settings.round].entries[insee].name,
            insee: insee
          }
        })
      const selectedDepartement = settings.departement ? data.rounds[settings.round].entries[settings.departement].name : false
      return (
        <Layout
          selectedDepartement={selectedDepartement}
          selectedRound={settings.round}
          onSelectDepartement={this.handleSelectDepartement}
          onResetDepartement={this.handleResetDepartement}
          onSelectRound={this.handleSelectRound}
          candidates={data.candidates}
          round={data.rounds[settings.round]}
          departements={departements}
          departement={settings.departement ? data.rounds[settings.round].entries[settings.departement] : false}
        />
      )
    }
  }
}

const mapStateToProps = (store) => ({
  'data': store.data,
  'settings': store.settings
})

export default connect(mapStateToProps)(Data)
