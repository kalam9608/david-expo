import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { router } from 'expo-router'

import { BackgroundImageWrapper } from '@/components/BackgroundImageWrapper'
import StyledButton from '@/components/buttons/StyledButton'
import { PATH } from '@/constants/constants'

export const SignUpSuccessScreen = () => {
  const handleContinue = () => {
    router.push(PATH.NAME)
  }

  return (
    <BackgroundImageWrapper>
      <View style={styles.container}>
        <View style={styles.top} />
        <>
          <View>
            <Text style={styles.congratulationsText}>Welcome to our family!</Text>
          </View>
          <View style={styles.congratulationsContainer}>
            <Text style={styles.congratulationsSubText}>
              This app isn&lsquo;t just another dating app where you swipe a lot nut find no-one.
            </Text>
            <Text style={styles.congratulationsSubText}>
              Our&lsquo;s sole mission is to help find you The Love Of Your Life.
            </Text>
            <Text style={styles.congratulationsSubText}>
              By using various methods, we try to understand who you are, on multiple levels, and find you the most
              aligned potential partner - and that doesn&lsquo;t necessarily mean being same as you.
            </Text>
            <Text style={styles.congratulationsSubText}>Questionaires are based on: </Text>
            <Text style={[styles.congratulationsSubText, styles.point]}>• Psychometric Tests</Text>
            <Text style={[styles.congratulationsSubText, styles.point]}>• Projective Tests</Text>
            <Text style={[styles.congratulationsSubText, styles.point]}>• Behavioral Assessments</Text>
            <Text style={[styles.congratulationsSubText, styles.point]}>• Self-Report Questionnaires</Text>
            <Text style={styles.congratulationsSubText}>
              The more questions you answer, the better we can match you with your potential partner. You can skip as
              many questions as you can - this will also be used as signal for matchmaking algorithm, that you
              don&lsquo;t have interest in this topic.
            </Text>
          </View>
        </>

        <View style={styles.between} />
        <View style={styles.continueButtonContainer}>
          <StyledButton textStyle={styles.continueButtonText} title="Start test" onPress={() => handleContinue()} />
        </View>
        <View style={styles.bottom} />
        <View style={styles.errorNone} />
      </View>
    </BackgroundImageWrapper>
  )
}

const styles = StyleSheet.create({
  between: {
    flex: 1,
  },
  bottom: {
    height: 30,
  },
  congratulationsContainer: {
    marginTop: 12,
    width: '90%',
  },
  congratulationsSubText: {
    color: '#111',
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 16,
    marginVertical: 12,
    textAlign: 'auto',
  },
  congratulationsText: {
    color: '#92b',
    fontFamily: 'Montserrat-Bold',
    fontSize: 40,
    fontWeight: '700',
    letterSpacing: 0.01,
    lineHeight: 40,
    textAlign: 'left',
  },
  container: {
    padding: 12,
  },
  continueButtonContainer: { alignContent: 'center', display: 'flex', marginTop: 24 },
  continueButtonText: {
    color: '#000',
    fontFamily: 'Montserrat-Medium',
    fontSize: 16,
  },
  errorNone: {
    height: 16,
    marginTop: 6,
  },
  point: {
    marginVertical: 1,
  },
  top: {
    flex: 1.2,
    marginTop: 40,
  },
})
