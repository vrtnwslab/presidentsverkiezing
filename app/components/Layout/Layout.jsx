require('font-awesome-sass-loader')
import React, { Component } from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import omit from 'lodash/omit'
import MapFrance from 'components/MapFrance/MapFrance'
import ChartFrance from 'components/ChartFrance/ChartFrance'
import SearchBar from 'components/SearchBar/SearchBar'

export default class Layout extends Component {
  constructor (props) {
    super(props)
    this.handleSelectRound = this.handleSelectRound.bind(this)
  }

  handleSelectRound (e, key, payload) {
    e.preventDefault()
    const {
      onSelectRound
    } = this.props
    onSelectRound(payload)
  }

  render () {
    const {
      candidates,
      departement,
      round,
      selectedDepartement,
      selectedRound,
      onSelectDepartement,
      onResetDepartement,
      departements
    } = this.props
    const candidatesForRound = omit(round, ['entries'])
    const chartData = Object
    .keys(candidatesForRound)
    .map((candidate) => ({
      x: candidates[candidate].lastname,
      sort: Number(round[candidate]),
      y: departement ? Number(departement[`${candidate}`]) : Number(round[candidate]),
      fill: candidates[candidate].color,
      img: candidates[candidate].img
    }))
    .sort((a, b) => Number(a.sort) - Number(b.sort))

    return (
      <MuiThemeProvider>
        <div id='app__main'>
          <header>
            <h2 className='app__title'>
              {'Franse presidentsverkiezingen'}
              <br />
              <small>
                {'Resultaten'}
              </small>
            </h2>
          </header>
          <section>
            <div className='app__nav'>
              <div className='nav__autocomplete'>
                <SearchBar
                  dataSource={departements}
                  onSelectDepartement={onSelectDepartement}
                />
              </div>
              <div className='nav__reset'>
                {
                  selectedDepartement &&
                  <button
                    className='reset__button'
                    onClick={onResetDepartement}
                  >
                    <i className='fa fa-close' />
                    {selectedDepartement}
                  </button>
                }
                {
                  selectedDepartement &&
                  <hr />
                }
              </div>
              <div className='nav__round'>
                <SelectField
                  hintText={`Ronde ${selectedRound}`}
                  floatingLabelText={`Ronde ${selectedRound}`}
                  onChange={this.handleSelectRound}
                  style={{
                    width: '100%'
                  }}
                >
                  <MenuItem
                    value={1}
                    primaryText={'Ronde 1'}
                  />
                  <MenuItem
                    value={2}
                    primaryText={'Ronde 2'}
                  />
                </SelectField>
              </div>
            </div>
            <div className='app__map'>
              <MapFrance onSelectDepartement={onSelectDepartement} />
            </div>
            <div className='app__chart'>
              <ChartFrance
                data={chartData}
                selectedRound={selectedRound}
              />
            </div>
          </section>
        </div>
      </MuiThemeProvider>
    )
  }
}
