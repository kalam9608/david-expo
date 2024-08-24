import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

import StyledButton from './StyledButton'

interface ContinueButtonProps {
  onPress: () => void
  title: string
  disabled?: boolean
  style?: ViewStyle
  textStyle?: TextStyle
}

export const ContinueButton: React.FC<ContinueButtonProps> = ({
  onPress,
  title,
  disabled = false,
  style,
  textStyle,
}) => {
  return (
    <StyledButton
      disabled={disabled}
      gradientColors={disabled ? undefined : ['#3F86FF', '#39DEFF']}
      style={[styles.button, ...(style ? [style] : [])]}
      textStyle={textStyle}
      title={title}
      onPress={onPress}
    />
  )
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
  },
})
