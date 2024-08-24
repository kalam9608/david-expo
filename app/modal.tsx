import { Platform, StyleSheet } from 'react-native'

import { StatusBar } from 'expo-status-bar'

import EditScreenInfo from '@/components/EditScreenInfo'
import { Text, View } from '@/components/Themed'

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modal Example</Text>
      <View darkColor="rgba(255,255,255,0.1)" lightColor="#eee" style={styles.separator} />
      <EditScreenInfo path="app/modal.tsx" />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  separator: {
    height: 1,
    marginVertical: 30,
    width: '80%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})
