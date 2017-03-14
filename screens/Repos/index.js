import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Linking
} from 'react-native'

import { log } from '../../utils/logDev'

export default class ReposScreen extends Component {
  static navigationOptions = {
    title: ({ state }) => state.params.repos.name
  }

  renderInfo(label, content, isLink = false) {
    const onClick = () => {
      if (!isLink) return

      Linking.canOpenURL(content)
        .then(supported => {
          if (supported) {
            Linking.openURL(content)
          } else {
            log(`URL ${content} can not be opened`)
          }
        })
    }

    return (
      <View style={styles.section}>
        <Text style={styles.label}>{ label }</Text>
        <Text style={isLink && styles.link || null} onPress={onClick}>{ content }</Text>
      </View>
    )
  }

  render () {
    const { repos } = this.props.navigation.state.params
    return (
      <View style={styles.container}>
        { this.renderInfo('Name', repos.name) }
        { this.renderInfo('Description', repos.description) }
        { this.renderInfo('URL', repos.html_url, true) }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  section: {
    marginBottom: 20
  },
  label: {
    fontWeight: 'bold'
  },
  link: {
    color: 'blue'
  }
})
