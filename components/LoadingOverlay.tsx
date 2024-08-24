import React from 'react'
import { StyleSheet, View } from 'react-native'

import { CustomSpinner } from './CustomSpinner'

interface LoadingOverlayProps {
  isLoading: boolean
  color?: string
  backgroundColor?: string
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isLoading,
  backgroundColor = 'rgba(0, 0, 0, 0.65)',
}) => {
  if (!isLoading) return null

  return (
    <View style={[styles.loadingOverlay, { backgroundColor }]}>
      <CustomSpinner />
    </View>
  )
}

const styles = StyleSheet.create({
  loadingOverlay: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1000,
  },
})
