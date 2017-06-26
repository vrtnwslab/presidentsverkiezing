import React, { Component } from 'react'
import AutoComplete from 'material-ui/AutoComplete'

export default class SearchBar extends Component {
  constructor (props) {
    super(props)
    this.handleUpdateInput = this.handleUpdateInput.bind(this)
    this.handleNewRequest = this.handleNewRequest.bind(this)
    this.state = {
      searchText: ''
    }
  }

  handleUpdateInput (searchText) {
    console.log(searchText)
    this.setState({
      searchText: searchText
    })
  }
  handleNewRequest (e) {
    const {
      onSelectDepartement
    } = this.props

    onSelectDepartement(e)
    this.setState({
      searchText: ''
    })
  }
  render () {
    const {
      dataSource
    } = this.props

    console.log(this.state.searchText)

    return (
      <AutoComplete
        fullWidth
        id={'1'}
        maxSearchResults={5}
        onNewRequest={(e) => this.handleNewRequest(e.insee)}
        onUpdateInput={this.handleUpdateInput}
        dataSource={dataSource}
        searchText={this.state.searchText}
        floatingLabelText={
          <div
            className='hintText'
          >
            <i className='fa fa-search' />
            <span>{'Klik op de kaart of zoek op departement'}</span>
          </div>
        }
        dataSourceConfig={{text: 'name', value: 'insee'}}
        filter={AutoComplete.caseInsensitiveFilter}
      />
    )
  }
}
