import React, { Component } from 'react'
import {connect} from 'react-redux'
import * as topojson from 'topojson-client'
import fr from './FRA_adm2.json'
import SvgContainer from 'components/SvgContainer/SvgContainer'
import MapPath from 'components/MapPath/MapPath'
import omit from 'lodash/omit'

const d3 = require('d3')

class MapFrance extends Component {
  render () {
    const {
        scale,
        width,
        height,
        center
    } = this.props.map
    const {
      departements,
      candidates,
      departement,
      onSelectDepartement,
      round
    } = this.props
    const projection = d3
      .geoMercator()
      .scale(scale)
      .translate([width / 2, height / 2])
      .center(center)
    const path = d3
      .geoPath()
      .projection(
          projection
      )
    const regions = topojson
      .feature(
          fr,
          fr
          .objects
          .FRA_adm2
      )
      .features
    const mapData = Object
      .keys(departements[round].entries)
      .map((departement) => {
        const current = departements[round].entries[departement]
        const results = omit(
          current,
          [
            'name',
            'insee'
          ])
        const winner = Object
          .keys(results)
            .reduce((a, b) => Number(results[a]) - Number(results[b]) < 0 ? b : a)

        return {
          insee: departement,
          fill: departements[round].entries[departement][winner] !== '0' ? candidates[winner].color : '#ddd'
        }
      })
    return (
      <SvgContainer
        width={width}
        height={height}
      >
        {
          <g>
            {
              regions.map((e) => {
                const insee = e.properties.CCA_2
                const depData = mapData.filter((dep) => dep.insee === insee)
                return (
                  <MapPath
                    key={insee}
                    insee={insee}
                    d={path(e)}
                    fill={depData[0].fill}
                    active={departement}
                    onSelectDepartement={onSelectDepartement}
                  />
                )
              })
            }
          </g>
        }
      </SvgContainer>
    )
  }
}

const mapStateToProps = (store) => ({
  'map': store.map,
  'departements': store.data.rounds,
  'candidates': store.data.candidates,
  'departement': store.settings.departement,
  'round': store.settings.round
})

export default connect(mapStateToProps)(MapFrance)
