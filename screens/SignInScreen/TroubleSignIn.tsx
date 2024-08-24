import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

const TroubleSignInLink: React.FC = () => {
  const [x, setX] = useState(false)
  return (
    <TouchableOpacity
      onPress={() => {
        setX((p) => !p)
      }}
    >
      <Text style={styles.troubleText}>{x ? `Not my problem` : `Trouble signing in?`}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  troubleText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 19.5,
    paddingTop: 12,
    textAlign: 'center',
  },
})

export default TroubleSignInLink
