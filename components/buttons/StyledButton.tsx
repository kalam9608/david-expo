import React from 'react'
import { StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'

interface StyledButtonProps {
  onPress: () => void
  title: string
  disabled?: boolean
  style?: ViewStyle | ViewStyle[]
  textStyle?: TextStyle | TextStyle[]
  gradientColors?: string[]
}

const StyledButton: React.FC<StyledButtonProps> = ({
  onPress,
  title,
  disabled = false,
  style,
  textStyle,
  gradientColors,
}) => {
  const ButtonContent = <Text style={[styles.text, disabled && styles.disabledText, textStyle]}>{title}</Text>

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={disabled}
      style={[styles.container, disabled && styles.disabled, style]}
      onPress={onPress}
    >
      {gradientColors ? (
        <LinearGradient colors={gradientColors} end={[1, 0]} start={[0, 0]} style={styles.button}>
          {ButtonContent}
        </LinearGradient>
      ) : (
        <View style={styles.button}>{ButtonContent}</View>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 80,
    height: 48,
    justifyContent: 'center',
    width: '100%',
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 24,
    width: '90%',
  },
  disabled: {
    backgroundColor: '#A9A9A9',
  },
  disabledText: {
    color: '#D3D3D3',
  },
  text: {
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: 'Montserrat-Medium',
    fontSize: 16,
    lineHeight: 19.5,
  },
})

export default StyledButton
