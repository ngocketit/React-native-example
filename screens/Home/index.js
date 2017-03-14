import React from 'react'
import {
  Text,
  View,
  ListView,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  TouchableHighlight
} from 'react-native'
import { StackNavigator } from 'react-navigation'
import { connect } from 'react-redux'
import autobind from 'autobind-decorator'

import { loadReposList } from '../../redux/actions/github'
import config from '../../config/github'

@connect(state => ({
  repos: state.github
}))
class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Github Repos'
  }

  constructor (props) {
    super(props)
    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })

    this.state = {
      dataSource
    }
  }

  componentDidMount () {
    const { username } = config
    this.props.dispatch(loadReposList(username))
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.repos && nextProps.repos.items && nextProps.repos !== this.props.repos) {
      const { dataSource } = this.state

      this.setState({
        dataSource: dataSource.cloneWithRows(nextProps.repos.items)
      })
    }
  }

  @autobind
  renderRow (repos, sectionId, rowId, highlightRow) {
    return (
      <TouchableHighlight underlayColor={'#ccc'} onPress={() => this.onRowPress(repos, sectionId, rowId, highlightRow)}>
        <View style={styles.rowWrapper}>
          <Text style={styles.reposName}>{ repos.name }</Text>
          <Text>{ repos.description }</Text>
        </View>
      </TouchableHighlight>
    )
  }

  @autobind
  onRowPress (rowData, sectionId, rowId, highlightRow) {
    highlightRow(sectionId, rowId)
    const { navigate } = this.props.navigation
    navigate('Repos', { repos: rowData })
  }

  @autobind
  onSearch (text) {
    const { repos } = this.props

    if (!repos.loading && repos.items) {
      const filteredRepos = repos.items.filter(
        item => item.name.indexOf(text) >= 0 ||
          item.description.indexOf(text) >= 0
      )

      const { dataSource } = this.state
      this.setState({
        dataSource: dataSource.cloneWithRows(filteredRepos)
      })
    }
  }

  @autobind
  renderHeader () {
    return (
      <View style={{ margin: 10 }}>
        <TextInput
          placeholder="Search"
          underlineColorAndroid="transparent"
          onChangeText={this.onSearch}
          style={styles.input}
        />
      </View>
    )
  }

  renderSeparator (sectionID, rowID, adjacentRowHighlighted) {
    return (
      <View key={`${sectionID} - ${rowID}`} style={styles.separator}/>
    )
  }

  renderChild () {
    const { loading, items, error } = this.props.repos

    if (loading) {
      return (
        <ActivityIndicator
          animating={true}
          size="large"
          style={styles.spinner}
        />
      )
    }

    if (error) {
      return (
        <Text style={styles.error}>{error.message}</Text>
      )
    }

    return (
      <ListView
        renderRow={this.renderRow}
        renderSeparator={this.renderSeparator}
        renderHeader={this.renderHeader}
        dataSource={this.state.dataSource}
      />
    )
  }

  render () {
    return (
      <View style={styles.wrapper}>
        { this.renderChild() }
      </View>
    )
  }
}

export default HomeScreen

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  spinner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  rowWrapper: {
    padding: 20
  },
  reposName: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  separator: {
    height: 1,
    backgroundColor: '#00695C',
    marginHorizontal: 10
  },
  input: {
    height: 40,
    padding: 10,
    borderWidth: 1,
    borderColor: '#00695C'
  },
  error: {
    flex: 1,
    color: 'red',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
