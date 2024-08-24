import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { router } from 'expo-router'

import { BackButton } from '@/components/BackButton'
import { BackgroundImageWrapper } from '@/components/BackgroundImageWrapper'
import { ContinueButton } from '@/components/buttons/ContinueButton'
import StyledButton from '@/components/buttons/StyledButton'
import { PATH } from '@/constants/constants'

export const BasicsDoneScreen = () => {
  const handleStartTest = () => {
    // Add navigation to the test screen
    router.push(PATH.TEST1)
  }

  const handleRemindMeLater = () => {
    // Handle "Remind me later" action
  }

  return (
    <BackgroundImageWrapper isCreation>
      <View style={styles.top}>
        <BackButton isDark buttonStyles={styles.backButtonStyles} />
      </View>
      <>
        <View>
          <Text style={styles.titleText}>Great!</Text>
          <Text style={styles.titleText}>Basics Done</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.subText}>
            Now, let’s help you find what you are looking for! For that, you will take quick and fun test
          </Text>
          <Text style={styles.subText}>Test consists of two parts</Text>
          <Text style={styles.subText}>Total Tests length</Text>
          <Text style={[styles.subText, styles.blueText]}>~12min</Text>
        </View>
      </>

      <View style={styles.flexibleSpace} />

      <View style={styles.continueButtonWrapper}>
        <ContinueButton textStyle={styles.continueButtonText} title="Start test now" onPress={handleStartTest} />

        <StyledButton
          style={styles.transparentButton}
          textStyle={[styles.transparentButtonText, styles.remindMeLaterText]}
          title=" Remind me later"
          onPress={handleRemindMeLater}
        />
      </View>
      <View style={styles.bottom} />
    </BackgroundImageWrapper>
  )
}

const styles = StyleSheet.create({
  backButtonStyles: { left: 'auto', padding: 2, position: 'relative', top: 'auto' },

  blueText: { color: 'rgba(63, 134, 255, 1)', marginTop: -6 },
  bottom: {
    height: 0,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Medium',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 19.5,
  },
  continueButtonWrapper: {
    alignItems: 'center',
    marginBottom: 60,
    marginTop: 0,
    width: '88%',
  },
  flexibleSpace: {
    flexGrow: 2,
  },
  remindMeLaterText: {
    color: 'rgba(63, 134, 255, 1)',
    fontFamily: 'Montserrat-Medium',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 19.5,
    textAlign: 'center',
  },
  subText: {
    color: '#111',
    fontFamily: 'Montserrat-Medium',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 22,
    marginVertical: 8,
    textAlign: 'center',
    width: '85%',
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 48,
    width: '100%',
  },
  titleText: {
    color: 'rgba(63, 134, 255, 1)',
    fontFamily: 'Montserrat-Medium',
    fontSize: 40,
    fontWeight: '700',
    letterSpacing: 1,
    lineHeight: 40,
    textAlign: 'center',
  },
  top: {
    display: 'flex',
    margin: 20,
    padding: 10,
    width: '100%',
  },
  transparentButton: {
    backgroundColor: 'transparent',
    marginBottom: 12,
    marginTop: 6,
  },
  transparentButtonText: {
    color: '#fff',
  },
})
