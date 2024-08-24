import React from 'react'
import { Linking, StyleSheet, Text, View } from 'react-native'

const PrivacySection: React.FC = () => {
  const handlePressTerms = async () => {
    const url = 'https://terms'
    await Linking.openURL(url)
  }

  const handlePressPrivacyPolicy = async () => {
    const url = 'https://privacy-policy'
    await Linking.openURL(url)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.troubleText}>
        By signing up, you agree to our{' '}
        <Text style={styles.linkText} onPress={handlePressTerms}>
          Terms
        </Text>
        . See how we use your data in our{' '}
        <Text style={styles.linkText} onPress={handlePressPrivacyPolicy}>
          Privacy Policy
        </Text>
        .
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  linkText: {
    color: '#ffffff',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  troubleText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 15.8,

    textAlign: 'center',
  },
})

export default PrivacySection
