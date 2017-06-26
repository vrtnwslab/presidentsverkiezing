import { VictoryBar, VictoryLabel, VictoryChart, VictoryAxis, Line } from 'victory'
import React, { Component } from 'react'

export default class ChartFrance extends Component {
  createLabel (data, datum) {
    const name = data[datum - 1].x.toUpperCase()
    const value = data[datum - 1].y
    const roundedValue = Math.round(Number(value) * 100) / 100
    const formattedValue = ` | ${roundedValue.toLocaleString('nl')}%`
    return `${name}${formattedValue}`
  }

  render () {
    const {
      data,
      selectedRound
    } = this.props

    const CustomLabel = (props) => {
      return (
        <g>
          <circle
            r={25}
            fill={'#fff'}
            stroke={data[props.datum - 1].fill}
            strokeWidth={2}
            cy={props.y + 12}
            cx={40}
          />
          <image
            width={50}
            height={50}
            y={props.y - 12}
            x={15}
            xlinkHref={data[props.datum - 1].img}
          />
        </g>
      )
    }
    const CustomLine = (props) => {
      return (
        <Line
          y1={props.y1 - 30}
          y2={props.y2 - 30}
          x1={props.x1 - 40}
          x2={props.x2}
          type={'grid'}
          style={{
            stroke: '#fff',
            strokeDasharray: 8,
            strokeWidth: 1.5
          }}
        />
      )
    }
    return (
      <VictoryChart
        height={selectedRound === 1 ? 450 : 188}
        width={500}
        padding={{
          top: 50,
          right: 50,
          bottom: 50,
          left: 80
        }}
      >
        <VictoryBar
          width={450}
          data={data}
          horizontal
          style={{
            data: {
              fill: '#ccc',
              width: 25
            }
          }}
          animate={{
            duration: 200,
            onLoad: {
              duration: 0
            },
            onEnter: {
              duration: 0
            }
          }}
        />
        <VictoryAxis
          style={{
            axis: {
              stroke: 'none'
            },
            tickLabels: {
              fill: '#fff',
              textTransform: 'uppercase',
              fontSize: 20,
              fontFamily: 'dincond-bold'
            }
          }}
          dependentAxis
          tickLabelComponent={
            <VictoryLabel
              text={(datum) => this.createLabel(data, datum)}
              dy={1.5}
              textAnchor={'start'}
              verticalAnchor={'middle'}
              x={80}
            />
          }
        />
        <VictoryAxis
          orientation={'left'}
          style={{
            axis: {
              stroke: 'none'
            },
            grid: {
              stroke: '#fff'
            }
          }}
          gridComponent={
            <CustomLine
            />
          }
          tickLabelComponent={
            <CustomLabel
            />
          }
        />
      </VictoryChart>
    )
  }
}
