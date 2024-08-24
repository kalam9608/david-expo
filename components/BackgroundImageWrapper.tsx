import React, { ReactNode } from 'react'
import { ImageBackground, ImageSourcePropType, ScrollView, StyleSheet, View } from 'react-native'

import isCreationImage from './../assets/backgrounds/creation-of-account-background.jpg'
import defaultBackground from './../assets/backgrounds/landing-page-background.png'

interface BackgroundImageWrapperProps {
  children: ReactNode
  image?: ImageSourcePropType
  isCreation?: boolean
  isNoBg?: boolean
}

export const BackgroundImageWrapper: React.FC<BackgroundImageWrapperProps> = ({
  children,
  image: imageArg,
  isCreation,
  isNoBg,
}) => {
  const image = imageArg ?? defaultBackground

  return (
    <View style={styles.container}>
      {isNoBg ? null : <ImageBackground source={isCreation ? isCreationImage : image} style={styles.backgroundImage} />}
      <ScrollView contentContainerStyle={styles.contentContainer}>{children}</ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  backgroundImage: {
    bottom: 0,
    height: '100%',
    left: 0,
    position: 'absolute',
    resizeMode: 'cover',
    right: 0,
    top: 0,
    width: '100%',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
})
