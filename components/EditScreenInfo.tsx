import React from 'react'
import { StyleSheet } from 'react-native'

import Colors from '@/constants/Colors'

import { ExternalLink } from './ExternalLink'
import { MonoText } from './StyledText'
import { Text, View } from './Themed'

export default function EditScreenInfo({ path }: { path: string }) {
  return (
    <View>
      <View style={styles.getStartedContainer}>
        <Text darkColor="rgba(255,255,255,0.8)" lightColor="rgba(0,0,0,0.8)" style={styles.getStartedText}>
          Open up the code for this screen:
        </Text>

        <View
          darkColor="rgba(255,255,255,0.05)"
          lightColor="rgba(0,0,0,0.05)"
          style={[styles.codeHighlightContainer, styles.homeScreenFilename]}
        >
          <MonoText>{path}</MonoText>
        </View>

        <Text darkColor="rgba(255,255,255,0.8)" lightColor="rgba(0,0,0,0.8)" style={styles.getStartedText}>
          Change any of the text, save the file, and your app will automatically update.
        </Text>
      </View>

      <View style={styles.helpContainer}>
        <ExternalLink
          href="https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet"
          style={styles.helpLink}
        >
          <Text lightColor={Colors.light.tint} style={styles.helpLinkText}>
            Tap here if your app doesn&lsquo;t automatically update after making changes
          </Text>
        </ExternalLink>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  helpContainer: {
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 15,
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
})
