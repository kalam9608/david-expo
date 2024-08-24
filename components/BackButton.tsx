import React from 'react'
import { Image, StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native'

import { Href, useRouter, useSegments } from 'expo-router'

import { PATH } from '@/constants/constants'

import backIcon from './../assets/icons/back-screen.png'
import backIconDark from './../assets/icons/back-screen-dark.png'

interface BackWrapperProps {
  isDark?: boolean
  buttonStyles?: StyleProp<ViewStyle>
  backCallback?: (() => void) | undefined
}

const BACK = { '-': PATH.HOME, 'email-signin': PATH.HOME, 'test-1': PATH.BASICS_DONE } as Record<string, Href>

export const BackButton: React.FC<BackWrapperProps> = ({ buttonStyles, isDark, backCallback }) => {
  const router = useRouter()
  const segments = useSegments()

  const onPress = () => {
    if (backCallback) {
      backCallback()
      return
    }

    router.push(BACK[segments?.[0] ?? '-'] ?? '/')
  }
  return (
    <TouchableOpacity style={[styles.button, buttonStyles]} onPress={onPress}>
      <Image source={isDark ? backIconDark : backIcon} style={styles.image} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    left: 0,
    padding: 20,
    position: 'absolute',
    top: 30,
  },
  image: {
    height: 20,
  },
})
