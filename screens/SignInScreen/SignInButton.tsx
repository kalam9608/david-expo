import React from 'react'
import { Image, ImageSourcePropType, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'

interface SignInButtonProps {
  title: string
  iconSource?: ImageSourcePropType // Update this prop to accept an image source
  onPress: () => unknown
}

const SignInButton: React.FC<SignInButtonProps> = ({ title, iconSource, onPress }) => {
  return (
    <Button
      buttonStyle={styles.button}
      icon={iconSource ? <Image source={iconSource} style={styles.iconImage} /> : undefined}
      title={title}
      titleStyle={styles.buttonTitle}
      onPress={onPress}
    />
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ffffff',
    borderRadius: 25,
    flexDirection: 'row',
    height: 48,
    justifyContent: 'center',
  },
  buttonTitle: {
    color: '#000000',
    fontFamily: 'Montserrat-Medium',
    fontSize: 16,
    fontWeight: 500,
    marginLeft: 10,
  },
  iconImage: {
    height: 20,
    width: 22,
  },
})

export default SignInButton
