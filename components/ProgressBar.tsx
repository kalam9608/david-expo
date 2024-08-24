import React from 'react'
import { StyleSheet, View } from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'

interface ProgressBarProps {
  progressCurrent: number
  progressMax: number
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progressCurrent, progressMax }) => {
  const progress = progressCurrent / progressMax
  const clampedProgress = Math.max(0, Math.min(progress, 1))

  return (
    <View style={styles.container}>
      <View style={[styles.progressOverlay, { width: `${clampedProgress * 100}%` }]}>
        <LinearGradient
          colors={['#DE60FF', '#3F86FF', '#39DEFF', '#FFAADD', '#FEFBE8']}
          end={[progressMax / progressCurrent, 0]}
          start={[0, 0]}
          style={styles.fixedGradient}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ddd',
    borderRadius: 2,
    height: 4,
    overflow: 'hidden',
    width: '100%',
  },
  fixedGradient: {
    borderRadius: 2,
    height: '100%',
    width: '100%',
  },
  progressOverlay: {
    height: '100%',
    overflow: 'hidden',
  },
})
